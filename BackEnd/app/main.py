import random
from flask import Flask, render_template, request, redirect,\
    jsonify, url_for, flash, make_response, Response
from flask import session as login_session
from flask_cors import CORS
from app.assets.options import others, facilities
from app.util.aws.s3 import get_images
from app.bluePrints.auth import authetication
from app.util.search import search
from app.db.database_setup import Room
from flask_sqlalchemy import SQLAlchemy
from app.util.util import handleOptions
import json
from db.crud import room_json, read_rooms, write_room, add_bookmark, remove_bookmark
from db.database_setup import Base
from datetime import datetime
import os

password = os.environ["DBPASSWORD"]
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///db/housing.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'connect_args': {'connect_timeout': 10}}
app.register_blueprint(authetication)
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app)


@ app.route('/getRoom', methods=['GET'])
def showRooms():
    print(datetime.now())
    RETRY = 3
    rooms_db = []
    success = False
    track = 0
    # retry if timeout
    while not success and track < RETRY:
        try:
            session = db.create_scoped_session()
            rooms_db = read_rooms(session)
            success = True
        except:
            print("lost connection, retry")
            track += 1
    rooms = [room_json(room, session) for room in rooms_db]
    session.remove()
    response = jsonify(rooms)
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


@ app.route('/postRoom', methods=['POST', 'OPTIONS'])
def postRooms():
    # TODO check if logged in
    print(datetime.now())
    if request.method == 'OPTIONS':
        return handleOptions()
    photo = request.files.getlist("photos")
    requested_json = json.loads(request.form["json"])
    requested_json["photos"] = photo
    print(requested_json)
    session = db.create_scoped_session()
    success = write_room(requested_json, session)
    print(success)
    if success:
        print("COME A LONG WAYYYY")
        response = Response('Successfully created room.', status=201,
                            mimetype='application/json')
    else:
        response = Response('Internal Database Failure.\
                    We are working our ass off to fix it', status=500,
                            mimetype='application/json')
    print("COME A SHIEEEEET")
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    session.remove()
    return response


@ app.route('/searchRoom', methods=['POST', 'OPTIONS'])
def searchRooms():
    if request.method == 'OPTIONS':
        return handleOptions()
    session = db.create_scoped_session()
    response = jsonify(search(request.json, session))
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    session.remove()
    return response

@ app.route('/bookmark', methods=['POST', 'OPTIONS'])
def bookmark():
    if request.method == 'OPTIONS':
        return handleOptions()
    requested_json = request.json
    if requested_json['ACTION'] == 'add':
        add_bookmark(requested_json['room_id'], requested_json['user_id'], session)
    else:
        remove_bookmark(requested_json['room_id'], session)
    return



if __name__ == '__main__':
    app.secret_key = b'\xb7\xe2\xd6\xa3\xe2\xe0\x11\xd1\x92\xf1\x92G&>\xa2:'
    app.debug = True
    app.run(host='0.0.0.0', port=3001)
