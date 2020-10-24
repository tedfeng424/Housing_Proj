import random
from flask import Flask, render_template, request, redirect,\
    jsonify, url_for, flash, make_response
from flask import session as login_session
from flask_cors import CORS, cross_origin
from app.assets.options import others, facilities
from app.util.aws.s3 import get_images
from sqlalchemy import create_engine
from db.crud import room_json, read_rooms
from db.database_setup import Base
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///db/housing.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)


@app.route('/getRoom', methods=['GET'])
@cross_origin()
def showRooms():
    rooms = [room_json(room, session) for room in read_rooms(session)]
    return jsonify(rooms)


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='localhost', port=3001)
