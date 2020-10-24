from crud import read_rooms
from sqlalchemy import create_engine
from database_setup import Base
from sqlalchemy.orm import sessionmaker
engine = create_engine('sqlite:///housing.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

rooms = read_rooms(session)
for room in rooms:
    print(room.serialize)
    print(room.user.school_year)
    print([(ha.house_attribute.name, ha.house_attribute.category)
           for ha in room.house_attribute])
