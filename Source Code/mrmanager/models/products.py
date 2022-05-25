from models.shared import db


class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer,
                   autoincrement=True,
                   primary_key=True,
                   nullable=False)
    name = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Numeric(), nullable=False)

    def __init__(self, name, price):
        self.name = name
        self.price = price