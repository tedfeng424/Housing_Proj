from flask import current_app, Blueprint, request, \
    jsonify, session as login_session, Response
from app.db.crud import check_exist, add_user
from app.db.database_setup import User
from datetime import datetime
from app.util.util import handleOptions
import random
import string

authetication = Blueprint('auth', __name__)


@authetication.route("/login", methods=['POST', 'OPTIONS'])
def login():
    """Create anti-forgery state token."""
    if request.method == 'OPTIONS':
        return handleOptions()
    access_token = "".join(random.choice(string.ascii_uppercase + string.digits)
                           for x in range(32))
    login_session["access_token"] = access_token
    requested_json = request.json
    # check in with db to see if user is new
    session = current_app.config['DB_CONNECTION']
    if not check_exist(User, session, **{'email': requested_json['email']}):
        add_user(requested_json['name'], requested_json['email'],
                 datetime.now(),
                 "", "", "", "",
                 session)
    json_response = {}
    json_response['user'] = requested_json['name']
    json_response['email'] = requested_json['email']
    json_response['access_token'] = access_token
    json_response['message'] = 'Successfully created room.'
    response = jsonify(json_response)
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


@authetication.route("/logout", methods=['POST', 'OPTIONS'])
def logout():
    if request.method == 'OPTIONS':
        return handleOptions()
    client_token = request.json.get('access_token')
    response = {}
    if client_token and (client_token == login_session["access_token"]):
        response = Response("Successful Logout!", status=200,
                            mimetype='application/json')
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response
    else:
        response = Response("Logout is Forbidden due to wrong token",
                            status=403, mimetype='application/json')
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response
