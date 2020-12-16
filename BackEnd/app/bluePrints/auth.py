from flask import current_app, Blueprint, request, \
    jsonify, session as login_session, Response
from app.db.crud import check_exist, add_user
from app.db.database_setup import User
from datetime import datetime
from app.util.util import generateResponse
from app.util.aws.s3 import upload_file_wname
import os
import random
import string

authetication = Blueprint('auth', __name__)


@authetication.route("/login", methods=['POST', 'OPTIONS'])
def login():
    """Create anti-forgery state token."""
    if request.method == 'OPTIONS':
        return generateResponse()
    access_token = "".join(random.choice(string.ascii_uppercase + string.digits)
                           for x in range(32))
    login_session["access_token"] = access_token
    requested_json = request.json
    # check in with db to see if user is new
    session = current_app.config['DB_CONNECTION']
    user = check_exist(User, session, **{'email': requested_json['email']})
    if not user:
        user = add_user(requested_json['name'], requested_json['email'],
                        datetime.now(),
                        "", "", "", "",
                        session)
        icon_path = './assets/profile_default_icons/'
        selected_icon = random.choice(
            os.listdir(icon_path))
        path_name = "/".join([requested_json['email'],
                              'profile', selected_icon])
        upload_file_wname(icon_path+selected_icon, 'houseit', path_name)

    login_session["user_id"] = user.id
    print(user.serialize)
    json_response = {'user': requested_json['name'],
                     'email': requested_json['email'],
                     'access_token': access_token,
                     'message': 'Successfully created room.',
                     'description': user.description,
                     'phone': user.phone,
                     'schoolYear': user.school_year,
                     'major': user.major
                     }
    response = generateResponse(json_response)
    response.set_cookie('access_token', access_token)
    print(access_token)
    return response


@authetication.route("/logout", methods=['POST', 'OPTIONS'])
def logout():
    if request.method == 'OPTIONS':
        return generateResponse()
    client_token = request.json.get('access_token')
    message, status = 'Successful Logout!', 200
    if not client_token or (client_token != login_session["access_token"]):
        message, status = 'Logout is Forbidden due to wrong token', 403
        print(client_token, login_session["access_token"])
    return generateResponse(elem=message, status=status)
