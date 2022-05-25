from models.shared import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    username = db.Column(db.String(50), primary_key=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100))

    def __init__(self, username, password, name=''):
        self.username = username
        self.password_hash = generate_password_hash(password)
        self.name = name

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @staticmethod
    def create_new_account(username, password):
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
