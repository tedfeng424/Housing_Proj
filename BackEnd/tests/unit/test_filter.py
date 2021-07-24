import unittest
import app.filter.filter as filter
import operator

class TestFilterVerification(unittest.TestCase):
    def test_verify_price(self):
        # testing false for invalid types
        self.assertFalse(filter.verify_price_range("not a list"))
        self.assertFalse(filter.verify_price_range([]))
        self.assertFalse(filter.verify_price_range([1]))
        self.assertFalse(filter.verify_price_range(["not an int", 0]))

        # testing false for invalid bounds
        self.assertFalse(filter.verify_price_range([3000, 1000]))
        self.assertFalse(filter.verify_price_range([-1000, 1000]))
        self.assertFalse(filter.verify_price_range([150.50, 3500.0]))

        # testing true for valid inputs
        self.assertTrue(filter.verify_price_range([2000, 4000]))
        self.assertTrue(filter.verify_price_range([1500, 5000]))

    def test_verify_room_type(self):
        # testing false for invalid types
        self.assertFalse(filter.verify_room_type(["not a dictionary"]))
        self.assertFalse(filter.verify_room_type({}))
        self.assertFalse(filter.verify_room_type({"Just one key": "value pair"}))
        self.assertFalse(filter.verify_room_type({"Bedrooms": (1, operator.eq), "Bathrooms": "not a tuple"}))

        # testing false for invalid bounds
        self.assertFalse(filter.verify_room_type({"Inavlid Key Name 1": (), "Invalid Key Name 2": ()}))
        self.assertFalse(filter.verify_room_type({"Bedrooms": (1.0, operator.eq), "Bathrooms": (1.0, operator.le)}))
        self.assertFalse(filter.verify_room_type({"Bedrooms": (1, operator.eq), "Bathrooms": (2, operator.le)}))
        self.assertFalse(filter.verify_room_type({"Bedrooms": (-3, operator.eq), "Bathrooms": (1.0, operator.le)}))
        self.assertFalse(filter.verify_room_type({"Bedrooms": (2, operator.eq), "Bathrooms": (-4.0, operator.le)}))
        self.assertFalse(filter.verify_room_type({"Bedrooms": (1, operator.ge), "Bathrooms": (1.0, operator.le)}))
        self.assertFalse(filter.verify_room_type({"Bedrooms": (2, operator.eq), "Bathrooms": (2.0, operator.gt)}))

        # testing true for valid inputs
        self.assertTrue(filter.verify_room_type({"Bedrooms": (1, operator.eq), "Bathrooms": (1.0, operator.eq)}))
        self.assertTrue(filter.verify_room_type({"Bedrooms": (2, operator.eq), "Bathrooms": (2.5, operator.le)}))
        self.assertTrue(filter.verify_room_type({"Bedrooms": (3, operator.le), "Bathrooms": (3.0, operator.le)}))

    def test_verify_distance(self):
        # testing false for invalid types
        self.assertFalse(filter.verify_distance("not a tuple"))
        self.assertFalse(filter.verify_distance(()))
        self.assertFalse(filter.verify_distance(("just one thing")))

        # testing false for invalid bounds
        self.assertFalse(filter.verify_distance((1, operator.le)))
        self.assertFalse(filter.verify_distance(("", operator.le)))
        self.assertFalse(filter.verify_distance(("invalid distance", operator.le)))
        self.assertFalse(filter.verify_distance(("20 mins", operator.eq)))

        # testing true for valid inputs
        self.assertTrue(filter.verify_distance("20 mins", operator.le))
        self.assertTrue(filter.verify_distance("60 mins", operator.le))
        self.assertTrue(filter.verify_distance("60 mins", operator.ge))

    def test_verify_availability(self):
        # testing false for invalid types
        self.assertFalse(filter.verify_availability(["not a dictionary"]))
        self.assertFalse(filter.verify_availability({}))
        self.assertFalse(filter.verify_availability({"Just one key": "value pair"}))
        
        # testing false for invalid bounds
        self.assertFalse(filter.verify_availability({1:"key not str", "Year":"2020"}))
        self.assertFalse(filter.verify_availability({"Month":"January", "Year":2020}))
        self.assertFalse(filter.verify_availability({"Not Month": "January", "Year": "1999"}))
        self.assertFalse(filter.verify_availability({"Month": "December", "year": "2020"}))
        self.assertFalse(filter.verify_availability({"Month": "Jason Derulo", "Year": "2020"}))
        self.assertFalse(filter.verify_availability({"Month": "December", "Year": "twenty twenty"}))
        self.assertFalse(filter.verify_availability({"Month": "December", "Year": "5"}))

        # testing true for valid inputs
        self.assertTrue(filter.verify_availability({"Month": "march", "Year": "2013"}))
        self.assertTrue(filter.verify_availability({"Month": "February", "Year": "2019"}))
        self.assertTrue(filter.verify_availability({"Month": "OCTOBER", "Year": "2015"}))
