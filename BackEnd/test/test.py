from app.util.search import search
from app.db.database_setup import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
engine = create_engine('sqlite:///../app/db/housing.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


def testSearch():
    testRoomJson = {'distance': '70 mins', 'room_type': ['livingRoom'], 'price_min': 200, 'price_max': 6000,
                    'early_interval': 'Anytime', 'early_month': 'January', 'late_interval': 'Early', 'late_month': 'September', 'stay_period': 9,
                    'other': ['female'], 'facilities': ['parking']
                    }
    return search(testRoomJson, session)


print(testSearch())
