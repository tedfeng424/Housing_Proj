import unittest
import boto3
from app.filter.filter_json import JSONFilter
import json
from datetime import datetime


class TestJsonFilterOperations(unittest.TestCase):

    def setUp(self):
        f = open('tests/unit/json_filter_test_data.json', )
        self.data = json.load(f)

    def test_no_criteria(self):
        # No criteias has been specified
        criteria = {'rent': None, 'room_type': None,
                    'distance': None, 'availability': None}
        # creating a JSONFilter object with criterias and data as attributes
        json_filter_rent = JSONFilter(criterias=criteria, data=self.data)
        # adjusted indexed for json file
        listing_ids = json_filter_rent.filter()-1
        # go through all the output indexes
        for index in listing_ids:
            listing_room_type = json_filter_rent.process_room_type(
                self.data[index]['roomType'])
            distance = int(self.data[index]['distance'][0:-5])
            listing_availability = self.data[index]['availability'].lower()
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
            self.assertTrue(listing_room_type['Bedrooms'] >= 0)
            self.assertTrue(listing_room_type['Bathrooms'] >= 0)
            self.assertTrue(distance <= 1000)
            if((listing_availability == "now") or (listing_availability == "today")):
                continue
            else:
                listing_availability = datetime.strptime(
                    listing_availability, "%m/%d/%Y")
                self.assertTrue(listing_availability <= datetime(2121, 8, 1))

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
            listing_room_type = json_filter_rent.process_room_type(
                self.data[index]['roomType'])
            distance = int(self.data[index]['distance'][0:-5])
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
            self.assertTrue(listing_room_type['Bedrooms'] >= 0)
            self.assertTrue(listing_room_type['Bathrooms'] >= 0)
            self.assertTrue(distance <= 1000)

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
            listing_room_type = json_filter_rent.process_room_type(
                self.data[index]['roomType'])
            distance = int(self.data[index]['distance'][0:-5])
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
            self.assertTrue(listing_room_type['Bedrooms'] >= 0)
            self.assertTrue(listing_room_type['Bathrooms'] >= 0)
            self.assertTrue(distance <= 1000)

    def test_rent_no_max(self):
        # when min rent is not specified
        criteria = {'rent': [1000, None], 'room_type': None,
                    'distance': None, 'availability': None}
        # creating a JSONFilter object with criterias and data as attributes
        json_filter_rent = JSONFilter(criterias=criteria, data=self.data)
        # adjusted indexed for json file
        listing_ids = json_filter_rent.filter()-1
        # go through all the output indexes
        for index in listing_ids:
            listing_room_type = json_filter_rent.process_room_type(
                self.data[index]['roomType'])
            distance = int(self.data[index]['distance'][0:-5])
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
            self.assertTrue(listing_room_type['Bedrooms'] >= 0)
            self.assertTrue(listing_room_type['Bathrooms'] >= 0)
            self.assertTrue(distance <= 1000)

    def test_room_type_no_sign(self):
        # both number of bedrooms and bathrooms are specified with no signs
        criteria = {'rent': None, 'room_type': {'Bedrooms': '1', 'Bathrooms': '1'},
                    'distance': None, 'availability': None}
        # creating a JSONFilter object with criterias and data as attributes
        json_filter_room_type = JSONFilter(criterias=criteria, data=self.data)
        # adjusted indexed for json file
        listing_ids = json_filter_room_type.filter()-1
        # go through all the output indexes
        for index in listing_ids:
            # convert the format of room type from json files
            listing_room_type = json_filter_room_type.process_room_type(
                self.data[index]['roomType'])
            self.assertTrue(listing_room_type['Bedrooms'] == 1)
            self.assertTrue(listing_room_type['Bathrooms'] == 1)

    def test_room_type_with_sign(self):
        # both number of bedrooms and bathrooms are specified without signs
        criteria = {'rent': None, 'room_type': {'Bedrooms': '3+', 'Bathrooms': '2'},
                    'distance': None, 'availability': None}
        # creating a JSONFilter object with criterias and data as attributes
        json_filter_room_type = JSONFilter(criterias=criteria, data=self.data)
        # adjusted indexed for json file
        listing_ids = json_filter_room_type.filter()-1
        # go through all the output indexes
        for index in listing_ids:
            # convert the format of room type from json files
            listing_room_type = json_filter_room_type.process_room_type(
                self.data[index]['roomType'])
            self.assertTrue(listing_room_type['Bedrooms'] >= 3)
            self.assertTrue(listing_room_type['Bathrooms'] == 2)

    def test_room_type_with_bed(self):
        # Number of bedrooms is not specified
        criteria = {'rent': None, 'room_type': {'Bedrooms': None, 'Bathrooms': '2'},
                    'distance': None, 'availability': None}
        # creating a JSONFilter object with criterias and data as attributes
        json_filter_room_type = JSONFilter(criterias=criteria, data=self.data)
        # adjusted indexed for json file
        listing_ids = json_filter_room_type.filter()-1
        # go through all the output indexes
        for index in listing_ids:
            # convert the format of room type from json files
            listing_room_type = json_filter_room_type.process_room_type(
                self.data[index]['roomType'])
            self.assertTrue(listing_room_type['Bedrooms'] >= 0)
            self.assertTrue(listing_room_type['Bathrooms'] == 2)

    def test_room_type_with_bath(self):
        # Number of bathrooms is not specified
        criteria = {'rent': None, 'room_type': {'Bedrooms': '2', 'Bathrooms': None},
                    'distance': None, 'availability': None}
        # creating a JSONFilter object with criterias and data as attributes
        json_filter_room_type = JSONFilter(criterias=criteria, data=self.data)
        # adjusted indexed for json file
        listing_ids = json_filter_room_type.filter()-1
        # go through all the output indexes
        for index in listing_ids:
            # convert the format of room type from json files
            listing_room_type = json_filter_room_type.process_room_type(
                self.data[index]['roomType'])
            self.assertTrue(listing_room_type['Bedrooms'] == 2)
            self.assertTrue(listing_room_type['Bathrooms'] >= 0)
