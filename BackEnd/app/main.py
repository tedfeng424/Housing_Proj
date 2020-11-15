import random
from flask import Flask, render_template, request, redirect,\
    jsonify, url_for, flash, make_response, Response
from flask import session as login_session
from flask_cors import CORS, cross_origin
from app.assets.options import others, facilities
from app.util.aws.s3 import get_images
from app.bluePrints.auth import authetication
from app.util.search import search
from app.db.database_setup import Bookmark, Room
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
app.register_blueprint(authetication)
app.config['CORS_HEADERS'] = 'Content-Type'
session = db.create_scoped_session()
app.config['DB_CONNECTION'] = session
CORS(app)

@ app.route('/getRoom', methods=['GET'])
def showRooms():
    print(datetime.now())
    rooms_db = []
    success = False
    rooms_db = read_rooms(session)
    success = True
    rooms = [room_json(room, session) for room in rooms_db]
    response = jsonify(rooms)
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = "Content-Type"
    response.headers['Content-Type'] = 'application/json'
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
    response.headers['Access-Control-Allow-Headers'] = "Content-Type"
    response.headers['Content-Type'] = 'application/json'
    return response


@ app.route('/searchRoom', methods=['POST', 'OPTIONS'])
def searchRooms():
    if request.method == 'OPTIONS':
        return handleOptions()
    response = jsonify(search(request.json, session))
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = "Content-Type"
    response.headers['Content-Type'] = 'application/json'
    return response


@ app.route('/bookmark', methods=['POST', 'OPTIONS', 'GET'])
def bookmark():
    if request.method == 'OPTIONS':
        return handleOptions()
    requested_json = request.json

    client_token = request.cookies.get("access_token")
    print(client_token)
    print(login_session)
    if not client_token or (client_token != login_session["access_token"]):
        # if user is not logged in
        print(client_token, login_session["access_token"])
        response = Response("Bookmark get/add/remove is forbidden due to invalid token",
                            status=403, mimetype='application/json')
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        response.headers['Access-Control-Allow-Headers'] = "Content-Type"
        response.headers['Content-Type'] = "application/json"
        return response

    if request.method == 'GET':
        bookmarks = [bookmark.serialize for bookmark in session.query(Bookmark).all()]
        bookmark_rooms = [session.query(Room).filter_by(id = bookmark["room_id"]).one() for bookmark in bookmarks]
        room = [room_json(bookmark_room, session) for bookmark_room in bookmark_rooms]
        response = jsonify(room)
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        response.headers['Access-Control-Allow-Headers'] = "Content-Type"
        response.headers['Content-Type'] = 'application/json'
        return response

    else:
        if requested_json['action'] == 'add':
            add_bookmark(requested_json['room_id'], login_session["user_id"], session)
            response = Response('Successfully added bookmark.', status=201,
                            mimetype='application/json')
        else:
            remove_bookmark(requested_json['room_id'], login_session["user_id"], session)
            response = Response('Successfully deleted bookmark.', status=200,
                            mimetype='application/json')
    print(session.query(Bookmark).all())
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = "Content-Type"
    response.headers['Content-Type'] = 'application/json'
    return response



if __name__ == '__main__':
    app.secret_key = b'\xb7\xe2\xd6\xa3\xe2\xe0\x11\xd1\x92\xf1\x92G&>\xa2:'
    app.debug = True
    app.run(host='0.0.0.0', port=3001)
