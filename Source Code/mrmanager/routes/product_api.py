from flask import Blueprint, request, jsonify, send_file
from models.products import Product

product_api = Blueprint('product_api', __name__)


@product_api.route('/products', methods=['GET'])
def products():
    product_list = Product.query.paginate()
    product_list = [{
        'id': item.id,
        'name': item.name
    } for item in product_list.items]
    if not product_list:
        return {'error': 'there is not products in the database'}, 400
    return jsonify(product_list)


@product_api.route('/products/<id>', methods=['GET'])
def products_id(id):
    product = Product.query.filter_by(id=id).first()
    if not product:
        return {'error': 'there is not products in the database'}, 400
    return {'id': product.id, 'name': product.name, 'price': int(product.price)}


@product_api.route('/products/img/<id>/', methods=['GET'])
def products_img(id):
    product = Product.query.filter_by(id=id).first()
    if not product:
        return {'error': 'there is not products in the database'}, 400
    return send_file(f'./data/{id}.jpg')
