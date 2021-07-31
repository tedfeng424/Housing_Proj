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
        self.assertFalse(filter.verify_room_type({"Bedrooms": "not an int", "Bathrooms": 9}))
        self.assertFalse(filter.verify_room_type({"Bedrooms": 4, "Bathrooms": {"not":"a float"}}))

        # testing false for invalid bounds
        self.assertFalse(filter.verify_room_type({"Inavlid Key Name 1": 1, "Invalid Key Name 2": 1.0}))
        self.assertFalse(filter.verify_room_type({"Bedrooms": 2.5, "Bathrooms": 3.0}))
        self.assertFalse(filter.verify_room_type({"Bedrooms": 2, "Bathrooms": 2}))
        self.assertFalse(filter.verify_room_type({"Bedrooms": -3, "Bathrooms": 1.5}))
        self.assertFalse(filter.verify_room_type({"Bedrooms": 4, "Bathrooms": -2.0}))
        

        # testing true for valid inputs
        self.assertTrue(filter.verify_room_type({"Bedrooms": 1, "Bathrooms": 1.0}))
        self.assertTrue(filter.verify_room_type({"Bedrooms": 2, "Bathrooms": 2.5}))
        self.assertTrue(filter.verify_room_type({"Bedrooms": 3, "Bathrooms": 3.0}))

    def test_verify_distance(self):
        # testing false for invalid types
        self.assertFalse(filter.verify_distance(20))
        self.assertFalse(filter.verify_distance("long string"))

        # testing false for invalid bounds
        self.assertFalse(filter.verify_distance("=20"))
        self.assertFalse(filter.verify_distance("<2o"))
        self.assertFalse(filter.verify_distance(">-2"))

        # testing true for valid inputs
        self.assertTrue(filter.verify_distance("<20"))
        self.assertTrue(filter.verify_distance("<60"))
        self.assertTrue(filter.verify_distance(">60"))

    def test_verify_availability(self):
        # testing false for invalid types
        self.assertFalse(filter.verify_availability(["not a dictionary"]))
        self.assertFalse(filter.verify_availability({}))
        self.assertFalse(filter.verify_availability({"Just one key": "value pair"}))
        
        # testing false for invalid bounds
        self.assertFalse(filter.verify_availability({1:"key not str", "Year": "2020"}))
        self.assertFalse(filter.verify_availability({"Month":"January", "Year": 2020}))
        self.assertFalse(filter.verify_availability({"Not Month": "January", "Year": "1999"}))
        self.assertFalse(filter.verify_availability({"Month": "December", "year": "2020"}))
        self.assertFalse(filter.verify_availability({"Month": "Jason Derulo", "Year": "2020"}))
        self.assertFalse(filter.verify_availability({"Month": "December", "Year": "twenty twenty"}))
        self.assertFalse(filter.verify_availability({"Month": "December", "Year": "5"}))

        # testing true for valid inputs
        self.assertTrue(filter.verify_availability({"Month": "March", "Year": "2013"}))
        self.assertTrue(filter.verify_availability({"Month": "February", "Year": "2019"}))
        self.assertTrue(filter.verify_availability({"Month": "October", "Year": "2015"}))

    if __name__ == "__main__":
        unittest.main()
