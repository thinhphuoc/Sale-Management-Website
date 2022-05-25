from flask import Flask
from routes.authenticate_api import authenticate_api
from routes.product_api import product_api
from routes.trans_api import trans_api
from models.shared import db
from flask_cors import CORS
import logging

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345678@localhost:3306/mrmanager'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'MrManager'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['JSON_SORT_KEYS'] = False

db.init_app(app)
CORS(app)

app.register_blueprint(authenticate_api, url_prefix='/api')
app.register_blueprint(product_api, url_prefix='/api')
app.register_blueprint(trans_api, url_prefix='/api')

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    app.run()
