from app.db.database_setup import User, Room, Photo, Move_In,\
    House_Attribute, Attribute
from app.util.aws.s3 import get_images

# Create


def add_and_commit(db_row, session):
    session.add(db_row)
    session.commit()


def add_user(name, email, date_created, phone, description, school_year, major,
             session):
    User_to_add = User(name=name, email=email, date_created=date_created,
                       phone=phone, description=description,
                       school_year=school_year,
                       major=major)
    add_and_commit(User_to_add, session)
    return User_to_add


def add_room(date_created, room_type, price, description, stay_period,
             distance, address, user, move_in, session):
    Room_to_add = Room(date_created=date_created, room_type=room_type,
                       price=price,
                       description=description, stay_period=stay_period,
                       distance=distance, address=address,
                       user=user, move_in=move_in)
    add_and_commit(Room_to_add, session)
    return Room_to_add


def add_photo(url, user, session):
    Photo_to_add = Photo(url=url, user=user)
    add_and_commit(Photo_to_add, session)
    return Photo_to_add


def add_move_in(early_interval, early_month, late_interval,
                late_month, session):
    Move_In_to_add = Move_In(early_interval=early_interval,
                             early_month=early_month,
                             late_interval=late_interval,
                             late_month=late_month)
    add_and_commit(Move_In_to_add, session)
    return Move_In_to_add


def add_house_attribute(room, house_attribute, session):
    House_Attribute_to_add = House_Attribute(
        room=room, house_attribute=house_attribute)
    add_and_commit(House_Attribute_to_add, session)
    return House_Attribute_to_add


def add_attribute(name, category, session):
    Attribute_to_add = Attribute(name=name, category=category)
    add_and_commit(Attribute_to_add, session)
    return Attribute_to_add

# Read


def read_user(email, session):
    return session.query(User).filter_by(email=email).one()


def read_rooms(session):
    return session.query(Room).all()


def room_json(room, session):
    other_map = {'other': [], 'facilities': []}
    for ha in room.house_attribute:
        other_map[ha.house_attribute.category].append(ha.house_attribute.name)
    r_json = room.serialize
    return_json = {
        'name': r_json['address'].split(",")[0],
        'location': r_json['address'],
        'distance': r_json['distance'],
        'pricePerMonth': r_json['price'],
        'stayPeriod': r_json['stay_period'],
        'early': room.move_in.early_interval + " " + room.move_in.early_month,
        'late': room.move_in.late_interval + " " + room.move_in.late_month,
        'roomType': r_json['room_type'],
        'other': other_map['other'],
        'facilities': other_map['facilities'],
        'leaserName': room.user.name,
        'leaserEmail': room.user.email,
        'leaserPhone': room.user.phone,
        'leaserSchoolYear': room.user.school_year,
        'leaserMajor': room.user.major,
        'leaserIntro': room.user.description,
        'photo': [p.url for p in room.user.photo],
        'profilePhoto': 'https://houseit.s3.us-east-2.amazonaws.com/' +
        get_images(room.user.name, category="profile")[0]
    }
    return return_json
