from flask import Blueprint, request, session
from wtforms import Form, StringField, validators
from models.users import User
import logging

authenticate_api = Blueprint('authenticate_api', __name__)


class RegisterForm(Form):
    username = StringField('Name', [validators.Length(min=6, max=50),
                                    validators.DataRequired()])
    password = StringField('Name', [validators.Length(min=6, max=200)])
    name = StringField('Name', [validators.Length(max=100)])


@authenticate_api.route('/register', methods=['POST'])
def register():
    req = request.get_json()
    user = User.query.filter_by(username=req.get('username')).first()
    if user:
        return {'error': 'username has been register'}, 400
    User.create_new_account(username=req.get('username'),
                            password=req.get('password'))
    return {'message': 'success'}


class LoginForm(Form):
    username = StringField('Name', [validators.Length(max=50),
                                    validators.DataRequired()])
    password = StringField('Name', [validators.Length(max=200)])


@authenticate_api.route('/login', methods=['POST'])
def login():
    req = request.get_json()
    user = User.query.filter_by(username=req.get('username')).first()
    if not user or not user.check_password(req.get('password')):
        return {'error': 'username or password incorrect'}, 404
    session[req.get('username')] = req.get('username')
    return {'message': 'success'}
