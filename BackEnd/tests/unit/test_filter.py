import unittest
from app.filter.filter import Filter

class TestFilterVerification(unittest.TestCase):
    def setUp(self):
        self.filter = Filter(self)

    def test_verify_price(self):
        # testing false for invalid types
        self.assertFalse(self.filter.verify_price_range("not a list"))
        self.assertFalse(self.filter.verify_price_range([]))
        self.assertFalse(self.filter.verify_price_range([1]))
        self.assertFalse(self.filter.verify_price_range(["not an int", 0]))

        # testing false fself.or invalid bounds
        self.assertFalse(self.filter.verify_price_range([3000, 1000]))
        self.assertFalse(self.filter.verify_price_range([-1000, 1000]))
        self.assertFalse(self.filter.verify_price_range([150.50, 3500.0]))

        # testing true foself.r valid inputs
        self.assertTrue(self.filter.verify_price_range([2000, 4000]))
        self.assertTrue(self.filter.verify_price_range([1500, 5000]))

    def test_verify_room_type(self):
        # testing false for invalid types
        self.assertFalse(self.filter.verify_room_type(["not a dictionary"]))
        self.assertFalse(self.filter.verify_room_type({}))
        self.assertFalse(self.filter.verify_room_type({"Just one key": "value pair"}))
        self.assertFalse(self.filter.verify_room_type({"Bedrooms": [], "Bathrooms": 9}))
        self.assertFalse(self.filter.verify_room_type({"Bedrooms": 4, "Bathrooms": ""}))

        # testing false for invalid bounds
        self.assertFalse(self.filter.verify_room_type({"Inavlid Key Name 1": "1", "Invalid Key Name 2": "1"}))
        self.assertFalse(self.filter.verify_room_type({"Bedrooms": "2.5", "Bathrooms": "3"}))
        self.assertFalse(self.filter.verify_room_type({"Bedrooms": "-3", "Bathrooms": "1.5"}))
        self.assertFalse(self.filter.verify_room_type({"Bedrooms": "4", "Bathrooms":" -2"}))
        

        # testing true for valid inputs
        self.assertTrue(self.filter.verify_room_type({"Bedrooms": "1", "Bathrooms": "1"}))
        self.assertTrue(self.filter.verify_room_type({"Bedrooms": "2", "Bathrooms": "2.5"}))
        self.assertTrue(self.filter.verify_room_type({"Bedrooms": "3+", "Bathrooms": "3+"}))

    def test_verify_distance(self):
        # testing false for invalid types
        self.assertFalse(self.filter.verify_distance(20))
        self.assertFalse(self.filter.verify_distance("long string"))

        # testing false for invalid bounds
        self.assertFalse(self.filter.verify_distance("=20 mins"))
        self.assertFalse(self.filter.verify_distance("<2o mins"))
        self.assertFalse(self.filter.verify_distance(">60"))

        # testing true for valid inputs
        self.assertTrue(self.filter.verify_distance("<20 mins"))
        self.assertTrue(self.filter.verify_distance("<60 mins"))
        self.assertTrue(self.filter.verify_distance(">60 mins"))


    def test_verify_availability(self):
        # testing false for invalid types
        self.assertFalse(self.filter.verify_availability(["not a dictionary"]))
        self.assertFalse(self.filter.verify_availability({}))
        self.assertFalse(self.filter.verify_availability({"Just one key": "value pair"}))
        
        # testing false for invalid bounds
        self.assertFalse(self.filter.verify_availability({1:"key not str", "Year": "2020"}))
        self.assertFalse(self.filter.verify_availability({"Month":"January", "Year": 2020}))
        self.assertFalse(self.filter.verify_availability({"Not Month": "January", "Year": "1999"}))
        self.assertFalse(self.filter.verify_availability({"Month": "December", "year": "2020"}))
        self.assertFalse(self.filter.verify_availability({"Month": "Jason Derulo", "Year": "2020"}))
        self.assertFalse(self.filter.verify_availability({"Month": "December", "Year": "twenty twenty"}))
        self.assertFalse(self.filter.verify_availability({"Month": "December", "Year": "5"}))

        # testing true for valid inputs
        self.assertTrue(self.filter.verify_availability({"Month": "March", "Year": "2013"}))
        self.assertTrue(self.filter.verify_availability({"Month": "February", "Year": "2019"}))
        self.assertTrue(self.filter.verify_availability({"Month": "October", "Year": "2015"}))

    if __name__ == "__main__":
        unittest.main()
