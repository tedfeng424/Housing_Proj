from app.db.database_setup import *
import app.db.crud as crud
from datetime import datetime
import os

TEST_DB_NAME = "housing_test.db"
TEST_DB_STRING = "sqlite:///housing_test.db"


def create_test_db():
    createDB(TEST_DB_STRING)
    session = crud.getSession(TEST_DB_STRING)

    user_name = "cris"
    user_email = "haha@ucsd.edu"
    created_time = datetime.now()
    user_phone = "858-2867-3567"
    user_description = "cultured man"
    user_school_year = "Third"
    user_major = "Data Science"
    user = crud.add_user(user_name, user_email, created_time, user_phone,
                         user_description, user_school_year, user_major, session)

    room_1(user, session)
    room_2(user, session)
    room_3(user, session)
    room_4(user, session)
    room_5(user, session)
    room_6(user, session)
    room_7(user, session)
    room_8(user, session)
    room_9(user, session)
    room_10(user, session)
    room_11(user, session)
    room_12(user, session)
    room_13(user, session)
    room_14(user, session)
    room_15(user, session)
    room_16(user, session)
    room_17(user, session)
    room_18(user, session)
    room_19(user, session)
    room_20(user, session)

    return session


def room_1(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2021, 9, 1)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 3500
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 2
    num_baths = 2
    distance = "20 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_2(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2022, 1, 1)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 2400
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 2
    num_baths = 1
    distance = "30 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_3(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2021, 10, 22)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 3100
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 2
    num_baths = 2
    distance = "25 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_4(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2021, 8, 31)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 3000
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 3
    num_baths = 2
    distance = "35 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_5(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2022, 7, 1)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 2500
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 2
    num_baths = 2
    distance = "30 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_6(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2022, 2, 1)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 2200
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 2
    num_baths = 1
    distance = "20 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_7(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2021, 11, 16)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 3600
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 3
    num_baths = 2
    distance = "10 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_8(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2021, 9, 17)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 2100
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 2
    num_baths = 1
    distance = "25 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_9(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2023, 1, 1)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 1700
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 2
    num_baths = 1
    distance = "30 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_10(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2022, 4, 7)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 1500
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 2
    num_baths = 2
    distance = "30 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_11(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2021, 10, 10)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Double"
    ppm = 900
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 1
    num_baths = 1
    distance = "30 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_12(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2021, 12, 5)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 2300
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 3
    num_baths = 2
    distance = "25 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_13(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2022, 3, 4)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 3100
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 4
    num_baths = 2
    distance = "15 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_14(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2022, 6, 24)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 4000
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 4
    num_baths = 4
    distance = "20 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_15(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2022, 5, 28)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 4500
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 5
    num_baths = 3
    distance = "15 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_16(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2021, 11, 7)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 2300
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 2
    num_baths = 2
    distance = "20 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_17(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2023, 4, 8)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 2250
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 2
    num_baths = 1
    distance = "10 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_18(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2024, 2, 29)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 3200
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 3
    num_baths = 2
    distance = "20 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_19(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2024, 3, 25)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 1900
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 2
    num_baths = 1
    distance = "25 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def room_20(user, session):
    date_created = datetime(2021, 8, 15)
    from_month = datetime(2023, 6, 18)
    to_month = datetime(2060, 9, 1)
    stay_period = crud.add_stay_period(from_month, to_month, session)
    room_type = "Single"
    ppm = 2800
    negotiable = True
    description = ""
    move_in = crud.add_move_in(from_month, to_month, session)
    num_beds = 2
    num_baths = 2
    distance = "20 mins"
    address = ""
    address_object = crud.add_address(distance, address, session)
    crud.add_room(date_created, room_type, ppm, negotiable, description,
                  stay_period, address_object, user, move_in, num_beds, num_baths, session)


def removeDB():
    os.remove(TEST_DB_NAME)
