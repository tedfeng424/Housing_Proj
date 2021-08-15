import unittest
import boto3
from app.filter.filter_json import JSONFilter
import json


class TestJsonFilterOperations(unittest.TestCase):

    def setUp(self):
        f = open('tests/unit/json_filter_test_data.json', )
        self.data = json.load(f)

    def test_rent(self):
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
