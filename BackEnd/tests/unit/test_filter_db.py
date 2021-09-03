from sqlalchemy.orm import session
from app.db.database_setup import *
import app.db.crud as crud
import unittest
import os
import app.filter.filter_db as filter_db
import tests.create_test_db as mock_db
from datetime import datetime
import app.db.database_setup as database_setup


# frequently used criteria
FROM_DATE = datetime(2021, 9, 5)
TO_DATE = datetime(2021, 9, 23)
DATE = [FROM_DATE, TO_DATE]
UPPER_PRICE = 3100
LOWER_PRICE = 1500
PRICE = [LOWER_PRICE, UPPER_PRICE]
DISTANCE = '<20 mins'
INVALID_PRICE_1 = "2000"
INVALID_PRICE_2 = "3100"
INVALID_DISTANCE = "10"
NUM_BED = "2"
NUM_BATH = "2"
NO_RESULT_PRICE_1 = 0
NO_RESULT_PRICE_2 = 1999
AVAILABILITY = {"Year": '2022', "Month": "May"}

# single criterion
INPUT_TYPE_ONLY = {'room_type': {'Bedrooms': NUM_BED, 'Bathrooms': NUM_BATH}}
INPUT_PRICE_ONLY = {'rent': [LOWER_PRICE, UPPER_PRICE]}
INPUT_DIST_ONLY = {"distance": DISTANCE}
INPUT_AVAILABILITY_ONLY = {"availability": AVAILABILITY}
INPUT_LEAP_YEAR = {"availability": {'Year': '2024', 'Month': 'February'}}

# multiple criteria
INPUT_TYPE_AND_PRICE = {'room_type': {
    'Bedrooms': NUM_BED, 'Bathrooms': NUM_BATH}, 'rent': [1000, 3000]}
INPUT_PRICE_AND_DIST = {'rent': [1000, 3000], 'distance': "<25 mins"}
INPUT_TRIPLE1 = {'room_type': {'Bedrooms': '3+', 'Bathrooms': '2'},
                 'rent': [3000, 5000], 'distance': '<40 mins'}
INPUT_TRIPLE2 = {'room_type': {'Bedrooms': '3+', 'Bathrooms': '3+'},
                 'distance': '<30 miins', 'availability': {'Year': '2023', 'Month': 'September'}}
INPUT_ALL_CRITERIA = {'room_type': {'Bedrooms': NUM_BED, 'Bathrooms': NUM_BATH}, 'rent': [
    LOWER_PRICE, UPPER_PRICE], "distance": DISTANCE, "availability": {"Year": '2024', "Month": "June"}}


# Invalid/no result inputs
INPUT_INVALID_PRICE_TYPE = {'rent': [INVALID_PRICE_1, INVALID_PRICE_2]}
INPUT_INVALID_PRICE_RANGE = {'rent': [UPPER_PRICE, LOWER_PRICE]}
INPUT_INVALID_DIST = {"distance": INVALID_DISTANCE}
INPUT_INVALID_AVAILABILITY1 = {"availability": "2021/10/1"}
INPUT_INVALID_AVAILABILITY2 = {"availability": {"Year": 2022, 'Month': "June"}}
INPUT_INVALID_AVAILABILITY3 = {"availability": {"Year": 2022, 'Month': 6}}
INPUT_INVALID_AVAILABILITY4 = {"availability": {"Year": '2022', 'Month': 6}}
INPUT_INVALID_ROOM_TYPE1 = {"room_type": "abc"}
INPUT_INVALID_ROOM_TYPE2 = {"room_type": [1]}
INPUT_INVALID_ROOM_TYPE3 = {"room_type": ['a', 2]}
INPUT_NO_RESULT = {'room_type': [100, 100], 'rent': [50000000, 51000000]}


class TestFilterDb(unittest.TestCase):
    session = None

    @classmethod
    def setUpClass(self):
        self.session = mock_db.create_test_db()

    @classmethod
    def tearDownClass(self):
        mock_db.removeDB()

    def test_one_criteria(self):
        filter_obj_type = filter_db.DBFilter(INPUT_TYPE_ONLY, self.session)
        # room type
        results = filter_obj_type.filter()
        self.assertEqual(6, len(results))

        # price
        filter_obj_price = filter_db.DBFilter(INPUT_PRICE_ONLY, self.session)
        results = filter_obj_price.filter()
        self.assertEqual(14, len(results))

        # availability
        filter_obj1 = filter_db.DBFilter(INPUT_AVAILABILITY_ONLY, self.session)
        results = filter_obj1.filter()
        self.assertEqual(13, len(results))

        filter_obj2 = filter_db.DBFilter(INPUT_LEAP_YEAR, self.session)
        results = filter_obj2.filter()
        self.assertEqual(19, len(results))

        # distance
        filter_obj3 = filter_db.DBFilter(INPUT_DIST_ONLY, self.session)
        results = filter_obj3.filter()
        self.assertEqual(10, len(results))

    def test_all_criteria(self):
        filter_obj = filter_db.DBFilter(INPUT_ALL_CRITERIA, self.session)
        results = filter_obj.filter()
        self.assertEqual(2, len(results))

    def test_multiple_criteria(self):
        filter_obj1 = filter_db.DBFilter(INPUT_TYPE_AND_PRICE, self.session)
        filter_obj2 = filter_db.DBFilter(INPUT_PRICE_AND_DIST, self.session)
        filter_obj3 = filter_db.DBFilter(INPUT_TRIPLE1, self.session)
        filter_obj4 = filter_db.DBFilter(INPUT_TRIPLE2, self.session)

        results = filter_obj1.filter()
        self.assertEqual(4, len(results))

        results = filter_obj2.filter()
        self.assertEqual(7, len(results))

        results = filter_obj3.filter()
        self.assertEqual(4, len(results))

        results = filter_obj4.filter()
        self.assertEqual(2, len(results))

    def test_invalid_price(self):
        filter_range = filter_db.DBFilter(
            INPUT_INVALID_PRICE_RANGE, self.session)
        results = filter_range.filter()
        self.assertEqual(20, len(results))

        filter_type = filter_db.DBFilter(
            INPUT_INVALID_PRICE_TYPE, self.session)
        results = filter_type.filter()
        self.assertEqual(20, len(results))

    def test_invalid_availability(self):

        filter_obj = filter_db.DBFilter(
            INPUT_INVALID_AVAILABILITY1, self.session)
        results = filter_obj.filter()
        self.assertEqual(20, len(results))

        filter_obj = filter_db.DBFilter(
            INPUT_INVALID_AVAILABILITY2, self.session)
        results = filter_obj.filter()
        self.assertEqual(20, len(results))

        filter_obj = filter_db.DBFilter(
            INPUT_INVALID_AVAILABILITY3, self.session)
        results = filter_obj.filter()
        self.assertEqual(20, len(results))

        filter_obj = filter_db.DBFilter(
            INPUT_INVALID_AVAILABILITY4, self.session)
        results = filter_obj.filter()
        self.assertEqual(20, len(results))

    def test_invalid_distance(self):
        filter_obj = filter_db.DBFilter(INPUT_INVALID_DIST, self.session)
        results = filter_obj.filter()
        self.assertEqual(20, len(results))

    def test_invalid_room_type(self):

        filter_obj = filter_db.DBFilter(INPUT_INVALID_ROOM_TYPE1, self.session)
        results = filter_obj.filter()
        self.assertEqual(20, len(results))

        filter_obj = filter_db.DBFilter(INPUT_INVALID_ROOM_TYPE2, self.session)
        results = filter_obj.filter()
        self.assertEqual(20, len(results))

        filter_obj = filter_db.DBFilter(INPUT_INVALID_ROOM_TYPE3, self.session)
        results = filter_obj.filter()
        self.assertEqual(20, len(results))

    def test_no_result(self):
        filter_obj = filter_db.DBFilter(INPUT_NO_RESULT, self.session)
        results = filter_obj.filter()
        self.assertEqual(0, len(results))
