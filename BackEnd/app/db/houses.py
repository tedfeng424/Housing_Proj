from database_setup import User, Room, Move_In, \
    House_Attribute, Attribute, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from app.util.aws.s3 import get_images, upload_file_wname
from crud import add_user, \
    add_room, add_move_in, add_house_attribute, add_attribute
import os
import random

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
                "yo I am Cris. P dope. DAMNNNNNNNNNNNN", 'Third',
                "Data Science", session)
amit = add_user(AMIT, "amit@ucsd.edu", datetime.now(), "858-911989",
                "yo I am Amit. P dope. DAMNNNNNNNNNNNN",  'Third',
                "Data Science", session)
adam = add_user(ADAM, "adam@ucsd.edu", datetime.now(), "858-65386",
                "yo I am Adam. P dope. ADAMNNNNNNNNN. YOOOOOOO", 'Third',
                "Computer Science and Engineering",
                session)
keenan = add_user(KEENAN, "keenan@ucsd.edu", datetime.now(), "858-4675432",
                  "yo I am Keenan. P dope. DAMNNNNNNNNNNNN. YOOOOOOO",  'Grad',
                  "Computer Science and Engineering",
                  session)
# Add mock Move-in
cris_move_in = add_move_in("Anytime", "September",
                           "Late(21-31)", "September", session)
amit_move_in = add_move_in(
    "Anytime", "January", "Late(21-31)", "September", session)
keenan_move_in = add_move_in(
    "Anytime", "January", "Late(21-31)", "March", session)
adam_move_in = add_move_in(
    "Anytime", "January", "Late(21-31)", "October", session)

# Add mock Attribute
attr_pets = add_attribute('Pets Friendly', 'facilities', session)
attr_common = add_attribute('Common Area', 'facilities', session)
attr_furnished = add_attribute('Furnished', 'facilities', session)
attr_female = add_attribute('Female only', 'other', session)
attr_coed = add_attribute('Co-ed', 'other', session)
attr_lgbtq = add_attribute('LGBTQ+ friendly', 'other', session)

# Add Room
cris_room = add_room(datetime.now(), "Single", 1000, True, "Damn it LOOOOOOL", 2,
                     "16 mins",
                     "Costa Verde Village, Costa Verde Boulevard, San Diego, CA, USA",
                     cris, cris_move_in, 4, 4, session)
amit_room = add_room(datetime.now(), "Single", 2000, True, "Damn it LOOOOOOL", 10,
                     "5 mins",
                     "Solazzo Apartment Homes, Villa La Jolla Drive, La Jolla, CA, USA",
                     amit, amit_move_in, 2, 2, session)
keenan_room = add_room(datetime.now(), "Single", 3000, False, "Damn it LOOOOOOL", 5,
                       "65 mins",
                       "Regents Court, Regents Road, San Diego, CA, USA",
                       keenan, keenan_move_in, 2, 2, session)
adam_room = add_room(datetime.now(), "Living room", 5000, False, "Damn it LOOOOOOL", 9,
                     "60 mins",
                     "Towers At Costa Verde, Costa Verde Boulevard, San Diego, CA, USA",
                     adam, adam_move_in, 2, 2, session)
cris2_room = add_room(datetime.now(), "Single", 1000, True, "Damn it LOOOOOOL", 2,
                      "16 mins",
                      "Costa Verde Village, Costa Verde Boulevard, San Diego, CA, USA",
                      cris, cris_move_in, 2, 2, session)
amit2_room = add_room(datetime.now(), "Single", 2000, True, "Damn it LOOOOOOL", 10,
                      "5 mins",
                      "Solazzo Apartment Homes, Villa La Jolla Drive, La Jolla, CA, USA",
                      amit, amit_move_in, 1, 1, session)
keenan2_room = add_room(datetime.now(), "Single", 3000, False, "Damn it LOOOOOOL", 5,
                        "65 mins",
                        "Regents Court, Regents Road, San Diego, CA, USA",
                        keenan, keenan_move_in, 1, 1, session)
adam2_room = add_room(datetime.now(), "Living room", 5000, False, "Damn it LOOOOOOL", 9,
                      "60 mins",
                      "Towers At Costa Verde, Costa Verde Boulevard, San Diego, CA, USA",
                      adam, adam_move_in, 3, 3, session)

# Add House_Attribute
add_house_attribute(cris_room, attr_pets, session)
add_house_attribute(cris_room, attr_common, session)
add_house_attribute(cris_room, attr_furnished, session)
add_house_attribute(amit_room, attr_female, session)
add_house_attribute(amit_room, attr_coed, session)
add_house_attribute(amit_room, attr_lgbtq, session)
add_house_attribute(keenan_room, attr_pets, session)
add_house_attribute(keenan_room, attr_furnished, session)
add_house_attribute(keenan_room, attr_coed, session)
add_house_attribute(keenan_room, attr_lgbtq, session)
add_house_attribute(adam_room, attr_female, session)
add_house_attribute(adam_room, attr_common, session)
add_house_attribute(adam_room, attr_furnished, session)
add_house_attribute(adam_room, attr_coed, session)
add_house_attribute(cris2_room, attr_pets, session)
add_house_attribute(cris2_room, attr_common, session)
add_house_attribute(cris2_room, attr_furnished, session)
add_house_attribute(amit2_room, attr_female, session)
add_house_attribute(amit2_room, attr_coed, session)
add_house_attribute(amit2_room, attr_lgbtq, session)
add_house_attribute(keenan2_room, attr_pets, session)
add_house_attribute(keenan2_room, attr_furnished, session)
add_house_attribute(keenan2_room, attr_coed, session)
add_house_attribute(keenan2_room, attr_lgbtq, session)
add_house_attribute(adam2_room, attr_female, session)
add_house_attribute(adam2_room, attr_common, session)
add_house_attribute(adam2_room, attr_furnished, session)
add_house_attribute(adam2_room, attr_coed, session)

# Create Mock Images
file_dir = "../assets/room_mock_images/"
file_name1 = "beauty.jpg"
file_name2 = "beauty2.png"
file_name3 = "evening1.jpg"
file_name4 = "evening2.jpg"
file_name5 = "evening3.jpg"
file_name6 = "tower.jpg"

users = [adam, cris, amit, keenan]
rooms_mapping = {adam: [adam_room, adam2_room],
                 cris: [cris_room, cris2_room],
                 amit: [amit_room, amit2_room],
                 keenan: [keenan_room, keenan2_room]
                 }
files = [file_name1, file_name2, file_name3,
         file_name4, file_name5, file_name6]

for user in users:
    # create icons
    icon_path = '../assets/profile_default_icons/'
    selected_icon = random.choice(
        os.listdir(icon_path))
    path_name = "/".join([user.email,
                          'profile', selected_icon])
    upload_file_wname(icon_path+selected_icon, 'houseit', path_name)
    for room in rooms_mapping[user]:
        path_name = "/".join([user.email, 'housing',
                              str(room.id)])
        random_files = random.sample(files, 4)
        for file_name in random_files:
            upload_file_wname(file_dir+file_name, 'houseit',
                              path_name+"/"+file_name)


print("created Mock Database!")
