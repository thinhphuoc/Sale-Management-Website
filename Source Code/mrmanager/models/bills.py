from models.shared import db


class Bill(db.Model):
    __tablename__ = 'bill'
    transaction_id = db.Column(db.Integer, db.ForeignKey('transaction.id'), primary_key=True, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), primary_key=True, nullable=False)
    price = db.Column(db.Numeric, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def __init__(self, transaction_id, product_id, price, quantity, ):
        self.transaction_id = transaction_id
        self.product_id = product_id
        self.price = price
        self.quantity = quantity

