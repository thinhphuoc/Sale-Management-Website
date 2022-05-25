from models.shared import db


class Transaction(db.Model):
    __tablename__ = 'transaction'
    id = db.Column(db.Integer,
                   autoincrement=True,
                   primary_key=True,
                   nullable=False)
    created_at = db.Column(db.TIMESTAMP,
                           server_default=db.func.now(),
                           nullable=False)
    customer_email = db.Column(db.String(100), nullable=True)
    status = db.Column(db.String(10), nullable=False)

    def __init__(self, customer_email):
        self.customer_email = customer_email
        self.status = 'success'

    @staticmethod
    def create_new_transaction():
        transaction = Transaction()
        db.session.add(transaction)
        db.session.commit()
