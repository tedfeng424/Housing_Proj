import unittest
import datetime
import pandas as pd
import numpy as np


class TestJsonFilterOperations(unittest.TestCase):

    # def setUp(self):

    def testFilterRent(self):
        min_rent = 1000
        max_rent = 2000
        output_ids = filter([min_rent, max_rent])

        # get the filtered dataframe
        test_pd = pd.read_json(test_json)
        proper_output_ids = np.array(output_ids)-1
        filtered_pd = test_pd.iloc[proper_output_ids]

        def remove_sign2(y):
            if isinstance(y, str):
                return y.replace('$', '').replace(',', '')
            else:
                return y
        # check if the rent in the filtered dataframe
        # some rent are like this: '$2,411-$6,049'
        rent_df = filtered_pd['rent'].str.split('-', expand=True)
        rent_df[0] = rent_df[0].apply(remove_sign2).astype('float')
        rent_df[1] = rent_df[1].apply(remove_sign2).astype('float')

        # if there is only one rent, second column of rent_df will be NaN
        # fill it with the the number in the first column
        for index, row in rent_df.iterrows():
            if pd.isna(row[1]):
                row[1] = row[0]

        min_bol = (rent_df[0] >= min_rent)
        max_bol = (rent_df[1] <= max_rent)

        # check whether min_bol is all True and max_bol is all True
        self.assertEqual(np.sum(min_bol), len(min_bol))
        self.assertEqual(np.sum(max_bol), len(max_bol))

        # What about rooms with NaN Rent

    def testFilterBedBath(self):
        num_beds = 2
        num_baths = 1
        output_ids = filter({"Bedrooms": num_beds, "Bathrooms": num_baths})

        # get the filtered dataframe
        test_pd = pd.read_json(test_json)
        proper_output_ids = np.array(output_ids)-1
        filtered_pd = test_pd.iloc[proper_output_ids]

        # room type are in this format: 1 Bed | 0 Bath
        # helper functions to extract number of beds and number of baths
        def find_bed(roomType):
            if pd.isna(roomType):
                return np.nan, np.nan
            else:
                room_arr = roomType.split(" ")
                bed_idx = room_arr.index('Bed')
                bed_num = room_arr[bed_idx-1]
                return bed_num

        def find_bath(roomType):
            if pd.isna(roomType):
                return np.nan, np.nan
            else:
                room_arr = roomType.split(" ")
                bath_idx = room_arr.index('Bath')
                bath_num = room_arr[bath_idx-1]
                return bath_num

        filtered_pd['Bed'] = filtered_pd['roomType'].apply(find_bed)
        filtered_pd['Bath'] = filtered_pd['roomType'].apply(find_bath)

        bed_bol = (filtered_pd['Bed'] == num_beds)
        bath_bol = (filtered_pd['Bath'] == num_baths)

        self.assertEqual(np.sum(bed_bol), len(bed_bol))
        self.assertEqual(np.sum(bath_bol), len(bath_bol))
