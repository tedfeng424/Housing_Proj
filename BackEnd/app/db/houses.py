from database_setup import User, Room, Move_In, \
    House_Attribute, Attribute, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from app.util.aws.s3 import get_images
from crud import add_user, \
    add_room, add_move_in, add_house_attribute, add_attribute


engine = create_engine('sqlite:///housing.db')
# Bind the engine to the metadata of the Base class so that the
# declaratives can be accessed through a DBSession instance
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
# A DBSession() instance establishes all conversations with the database
# and represents a "staging zone" for all the objects loaded into the
# database session object. Any change made against the objects in the
# session won't be persisted into the database until you call
# session.commit(). If you're not happy about the changes, you can
# revert all of them back to the last commit by calling
# session.rollback()
session = DBSession()

# define constants
CRIS = "cris"
AMIT = "amit"
ADAM = "adam"
KEENAN = "keenan"

# Add mock users
cris = add_user(CRIS, "haha@ucsd.edu", datetime.now(), "858-911",
                "yo I am Cris. P dope. DAMNNNNNNNNNNNN", 3,
                "Data Science", session)
amit = add_user(AMIT, "amit@ucsd.edu", datetime.now(), "858-911989",
                "yo I am Amit. P dope. DAMNNNNNNNNNNNN",  3,
                "Data Science", session)
adam = add_user(ADAM, "adam@ucsd.edu", datetime.now(), "858-65386",
                "yo I am Adam. P dope. ADAMNNNNNNNNN. YOOOOOOO", 4,
                "Computer Science and Engineering",
                session)
keenan = add_user(KEENAN, "keenan@ucsd.edu", datetime.now(), "858-4675432",
                  "yo I am Keenan. P dope. DAMNNNNNNNNNNNN. YOOOOOOO",  4,
                  "Computer Science and Engineering",
                  session)
# Add mock Move-in
cris_move_in = add_move_in("Anytime", "September",
                           "Late", "September", session)
amit_move_in = add_move_in("Anytime", "January", "Late", "September", session)
keenan_move_in = add_move_in("Anytime", "January", "Late", "March", session)
adam_move_in = add_move_in("Anytime", "January", "Late", "October", session)

# Add mock Attribute
attr_gym = add_attribute('Gym room', 'facilities', session)
attr_park = add_attribute('Parking', 'facilities', session)
attr_ele = add_attribute('Elevator', 'facilities', session)
attr_male = add_attribute('Male', 'other', session)
attr_pri = add_attribute('Private', 'other', session)
attr_female = add_attribute('Female', 'other', session)

# Add Room
cris_room = add_room(datetime.now(), "Single", 1000, "Damn it LOOOOOOL", 2,
                     "16 mins",
                     "Costa Verde Village, Costa Verde Boulevard, San Diego, CA, USA",
                     cris, cris_move_in, session)
amit_room = add_room(datetime.now(), "Single", 2000, "Damn it LOOOOOOL", 10,
                     "5 mins",
                     "Solazzo Apartment Homes, Villa La Jolla Drive, La Jolla, CA, USA",
                     amit, amit_move_in, session)
keenan_room = add_room(datetime.now(), "Single", 3000, "Damn it LOOOOOOL", 5,
                       "1 hour 5 mins",
                       "Regents Court, Regents Road, San Diego, CA, USA",
                       keenan, keenan_move_in, session)
adam_room = add_room(datetime.now(), "Living", 5000, "Damn it LOOOOOOL", 9,
                     "2 hours 5 mins",
                     "Towers At Costa Verde, Costa Verde Boulevard, San Diego, CA, USA",
                     adam, adam_move_in, session)

# Add House_Attribute
add_house_attribute(cris_room, attr_gym, session)
add_house_attribute(cris_room, attr_park, session)
add_house_attribute(cris_room, attr_male, session)
add_house_attribute(amit_room, attr_gym, session)
add_house_attribute(amit_room, attr_ele, session)
add_house_attribute(amit_room, attr_park, session)
add_house_attribute(keenan_room, attr_male, session)
add_house_attribute(keenan_room, attr_ele, session)
add_house_attribute(keenan_room, attr_park, session)
add_house_attribute(keenan_room, attr_pri, session)
add_house_attribute(adam_room, attr_female, session)
add_house_attribute(adam_room, attr_ele, session)
add_house_attribute(adam_room, attr_park, session)
add_house_attribute(adam_room, attr_pri, session)

print("created Mock Database!")
