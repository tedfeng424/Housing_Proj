from flask import Blueprint, request, \
    jsonify, session as login_session
import random
import string

authetication = Blueprint('auth', __name__)


@authetication.route("/login", methods=['GET'])
def login():
    """Create anti-forgery state token."""
    access_token = "".join(random.choice(string.ascii_uppercase + string.digits)
                           for x in range(32))
    login_session["access_token"] = access_token
    response = {}
    response['access_token'] = 'Successfully created room.'
    response['message'] = 'Successfully created room.'
    response.status_code = 200
    return jsonify(response)


@authetication.route("/logout", methods=['POST'])
def logout():
    client_token = request.form.get('access_token')
    response = {}
    if client_token == login_session["access_token"]:
        response.status_code = 200
        response['message'] = "Successful Logout!"
    else:
        response.status_code = 403
        response['message'] = "Logout is Forbidden due to wrong token"
    return jsonify(response)
