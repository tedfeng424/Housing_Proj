import random
from flask import Flask, render_template, request, redirect,\
    jsonify, url_for, flash, make_response
from flask import session as login_session
from flask_cors import CORS, cross_origin
from app.assets.options import others, facilities
from app.util.aws.s3 import get_images
from flask_sqlalchemy import SQLAlchemy
from db.crud import room_json, read_rooms
from db.database_setup import Base

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///db/housing.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
session = db.create_scoped_session()
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)


@app.route('/getRoom', methods=['GET'])
@cross_origin()
def showRooms():
    rooms = [room_json(room, session) for room in read_rooms(session)]
    return jsonify(rooms)


@app.route('/postRoom', methods=['POST'])
@cross_origin()
def postRooms():
    photo = request.files.getlist("photo")
    requested_json = json.loads(request.form["json"])
    requested_json["photo"] = photo
    success = write_room(requested_json, session)
    response = {}
    if success:
        response['message'] = 'Successfully created room.'
        response.status_code = 200
    else:
        response['message'] = 'Internal Database Failure.\
                    We are working our ass off to fix it'
        response.status_code = 500
    return jsonify(response)


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='localhost', port=3001)
