import unittest
import boto3
from app.filter.filter_json import JSONFilter
import json
from datetime import datetime


class TestJsonFilterOperations(unittest.TestCase):

    def setUp(self):
        f = open('tests/unit/json_filter_test_data.json', )
        self.data = json.load(f)

    # test one criteria
    def test_rent(self):
        # when both max and min rent are specified
        criteria = {'rent': [1000, 2500], 'room_type': None,
                    'distance': None, 'availability': None}
        # creating a JSONFilter object with criterias and data as attributes
        json_filter_rent = JSONFilter(criterias=criteria, data=self.data)
        # adjusted indexed for json file
        listing_ids = json_filter_rent.filter()-1
        # go through all the output indexes
        for index in listing_ids:
            # convert the format of rent from json files
            rent = self.data[index]['rent'].split('-')
            arr_rent = []
            if len(rent) == 2:
                arr_rent.append(json_filter_rent.clean_rent(rent[0]))
                arr_rent.append(json_filter_rent.clean_rent(rent[1]))
            else:
                arr_rent.append(json_filter_rent.clean_rent(rent[0]))
                arr_rent.append(json_filter_rent.clean_rent(rent[0]))

            # check whether all the filtered listings satisfies the criteria
            self.assertTrue(arr_rent[0] >= 1000)
            self.assertTrue(arr_rent[1] <= 2500)

    def test_rent_no_min(self):
        # when min rent is not specified
        criteria = {'rent': [None, 2500], 'room_type': None,
                    'distance': None, 'availability': None}
        # creating a JSONFilter object with criterias and data as attributes
        json_filter_rent = JSONFilter(criterias=criteria, data=self.data)
        # adjusted indexed for json file
        listing_ids = json_filter_rent.filter()-1
        # go through all the output indexes
        for index in listing_ids:
            # convert the format of rent from json files
            rent = self.data[index]['rent'].split('-')
            arr_rent = []
            if len(rent) == 2:
                arr_rent.append(json_filter_rent.clean_rent(rent[0]))
                arr_rent.append(json_filter_rent.clean_rent(rent[1]))
            else:
                arr_rent.append(json_filter_rent.clean_rent(rent[0]))
                arr_rent.append(json_filter_rent.clean_rent(rent[0]))

            # check whether all the filtered listings satisfies the criteria
            self.assertTrue(arr_rent[0] >= 0)
            self.assertTrue(arr_rent[1] <= 2500)

    def test_rent_no_max(self):
        # when max rent is not specified
        criteria = {'rent': [1000, None], 'room_type': None,
                    'distance': None, 'availability': None}
        # creating a JSONFilter object with criterias and data as attributes
        json_filter_rent = JSONFilter(criterias=criteria, data=self.data)
        # adjusted indexed for json file
        listing_ids = json_filter_rent.filter()-1
        # go through all the output indexes
        for index in listing_ids:
            # convert the format of rent from json files
            rent = self.data[index]['rent'].split('-')
            arr_rent = []
            if len(rent) == 2:
                arr_rent.append(json_filter_rent.clean_rent(rent[0]))
                arr_rent.append(json_filter_rent.clean_rent(rent[1]))
            else:
                arr_rent.append(json_filter_rent.clean_rent(rent[0]))
                arr_rent.append(json_filter_rent.clean_rent(rent[0]))

            # check whether all the filtered listings satisfies the criteria
            self.assertTrue(arr_rent[0] >= 1000)
            self.assertTrue(arr_rent[1] <= 99999)

    def test_no_rent(self):
        # when rent is not specified
        criteria = {'rent': None, 'room_type': None,
                    'distance': None, 'availability': None}
        # creating a JSONFilter object with criterias and data as attributes
        json_filter_rent = JSONFilter(criterias=criteria, data=self.data)
        # adjusted indexed for json file
        listing_ids = json_filter_rent.filter()-1
        # go through all the output indexes
        for index in listing_ids:
            # convert the format of rent from json files
            rent = self.data[index]['rent'].split('-')
            arr_rent = []
            if len(rent) == 2:
                arr_rent.append(json_filter_rent.clean_rent(rent[0]))
                arr_rent.append(json_filter_rent.clean_rent(rent[1]))
            else:
                arr_rent.append(json_filter_rent.clean_rent(rent[0]))
                arr_rent.append(json_filter_rent.clean_rent(rent[0]))

            # check whether all the filtered listings satisfies the criteria
            self.assertTrue(arr_rent[0] >= 0)
            self.assertTrue(arr_rent[1] <= 99999)

    def test_distance(self):
        # checking with a valid input of distance
        criteria = {'rent': None, 'room_type': None,
                'distance': "<20 mins", 'availability': None}
        #creating a JSONFilter object with criterias and data as attributes
        json_filter_distance = JSONFilter(criterias=criteria, data=self.data)
        # adjusted indexed for json file
        listing_ids = json_filter_distance.filter()-1
        # go through all the output indexes
        for index in listing_ids:
            arr_distance = []
            # convert the format of distance from json files
            distance = int(self.data[index]['distance'][1:-5])
            arr_distance.append(distance)
        # check whether all the filtered listings satisfies the criteria
        self.assertTrue(arr_distance>= 0)
        self.assertTrue(arr_distance<= 20)

    def test_no_distance(self):
        # checking with no input of distance to verify default value works
        criteria = {'rent': None, 'room_type': None,
                'distance': None, 'availability': None}
        #creating a JSONFilter object with criterias and data as attributes
        json_filter_distance = JSONFilter(criterias=criteria, data=self.data)
        # adjusted indexed for json file
        listing_ids = json_filter_distance.filter()-1
        # go through all the output indexes
        for index in listing_ids:
            arr_distance = []
            # convert the format of distance from json files
            distance = int(self.data[index]['distance'][0:-5])
            arr_distance.append(distance)
            self.assertTrue(distance>0)
            self.assertTrue(distance<=1000)


    def test_availability(self):
        # checking with a valid input of availability
        criteria = {'rent': None, 'room_type': None,
                'distance': None, 'availability': {"Month": "January", "Year": "2022"}}
        
        #creating a JSONFilter object with criterias and data as attributes
        json_filter_availability = JSONFilter(criterias=criteria, data=self.data)
        # adjusted indexed for json file
        listing_ids = json_filter_availability.filter()-1
        # go through all the output indexes
        for index in listing_ids:
            arr_availability = []
            # convert the format of availability from json files
            availability = self.data[index]['availability']
            if((availability.lower() == 'now') or (availability.lower() == 'today')):
                availability = datetime.now
            else:
                availability = datetime.strptime(availability, "%m/%d/%Y")
            arr_availability.append(availability)
        # check whether all the filtered listings satisfies the criteria
        avail_crit = json_filter_availability.convert_availability_input(criteria.get('availability'))
        self.assertTrue(arr_availability<=avail_crit)

    def test_no_availability(self):
        # checking with no input of availability to verify default value works
        criteria = {'rent': None, 'room_type': None,
                'distance': None, 'availability': None}
        
        #creating a JSONFilter object with criterias and data as attributes
        json_filter_availability = JSONFilter(criterias=criteria, data=self.data)
        # adjusted indexed for json file
        listing_ids = json_filter_availability.filter()-1
        # go through all the output indexes
        for index in listing_ids:
            arr_availability = []
            # convert the format of availability from json files
            availability = self.data[index]['availability']
            if((availability.lower() == 'now') or (availability.lower() == 'today')):
                availability = datetime.now
            else:
                availability = datetime.strptime(availability, "%m/%d/%Y")
            arr_availability.append(availability)
        # check whether all the filtered listings satisfies the criteria
        avail_crit = json_filter_availability.convert_availability_input(
            {"Month": datetime.now().strftime("%B"), "Year": str(datetime.now().year+100)})
        self.assertTrue(arr_availability<=avail_crit)

    


