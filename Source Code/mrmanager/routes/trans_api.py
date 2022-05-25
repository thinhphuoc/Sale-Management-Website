from flask import Blueprint, request, jsonify
from models.transactions import Transaction
from models.products import Product
from models.bills import Bill
from models.shared import db
import logging
from sqlalchemy import desc

trans_api = Blueprint('trans_api', __name__)


@trans_api.route('/transactions', methods=['GET', 'POST'])
def transaction():
    if request.method == 'GET':
        transaction_list = Transaction.query.order_by(desc(Transaction.created_at)).paginate(max_per_page=15)
        res = []
        for item in transaction_list.items:
            bill = Bill.query.filter_by(transaction_id=item.id)
            res.append({
                'transaction_id': item.id,
                'created_time': item.created_at,
                'items': [{'product_id': item2.product_id, 'price': int(item2.price), 'quantity': item2.quantity}
                          for item2 in bill],
                'status': item.status
            })
        if not transaction_list:
            return {'error': 'there is not transaction in the database'}, 400
        return jsonify(res)
    elif request.method == 'POST':
        req = request.get_json()
        logging.debug(req.get('customer_email'))
        transaction = Transaction(req.get('customer_email'))
        db.session.add(transaction)
        for item in req.get('items'):
            product = Product.query.filter_by(id=item.get('id')).first()
            if not product:
                return {
                           'error':
                               f'there is not product_id = {product.id} in the database'
                       }, 400
            logging.debug(product.id)
            bill = Bill(transaction.id, product.id, product.price, item.get('quantity'))
            db.session.add(bill)
        db.session.commit()
        return {
            'transaction_id': transaction.id,
            'created_at': transaction.created_at
        }


@trans_api.route('/transactions/<id>', methods=['GET', 'PUT'])
def transaction_id(id):
    transaction = Transaction.query.filter_by(id=id).first()
    if not transaction:
        return {'error': 'there is not transaction in the database'}, 400
    if request.method == 'PUT':
        transaction = Transaction.query.filter_by(id=id).first()
        transaction.status = request.get_json().get('status')
        db.session.commit()

    bill = Bill.query.filter_by(transaction_id=id)
    return jsonify({
        'transaction_id': id,
        'created_time': transaction.created_at,
        'items': [{'id': item.product_id, 'price': int(item.price), 'quantity': item.quantity}
                  for item in bill],
        'status': transaction.status
    })
