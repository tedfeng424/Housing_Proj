from attr import attrs, attrib
import boto3
import json
import os
from app.util.util import *

# load the aws credentials
try:
    aws_config = json.loads(os.environ["AWS_CONFIG"])
except KeyError:
    # path not yet set
    set_aws_config()
    aws_config = json.loads(os.environ["AWS_CONFIG"])
# the scraped files are in 'houseit' bucket, and the directory is in DIR
BUCKET = 'houseit'
DIR = "data/time_series/landlord"

# connect to s3 client with boto3
client = boto3.client('s3', **aws_config)

# helper function to get the latest data


def get_latest_data(bucket, dir):
    """
    get the latest scraped json file, load the file with json and return as a list

    @type  bucket: str
    @param bucket: string contains the bucket name
    @type  dir: str
    @param dir: string contains the path to the scraped files

    @rtype  : list
    @return : list of dictionaries contains the latest listings
    """
    # get all the scraped json files in the directory in the bucket
    files = client.list_objects_v2(Bucket=BUCKET,
                                   Prefix=DIR)['Contents']
    # read the data from the object
    str_file = client.get_object(
        Bucket=BUCKET, Key=files[-1]['Key'])['Body'].read().decode('UTF-8')
    data = json.loads(str_file)
    return data


# get the latest data
data = get_latest_data(BUCKET, DIR)

# extract info from data
# data[index]['features']
# example: get rent of the 1st listing
print(data[0]['rent'])


@attrs
class JSONFilter(object):
    filter_json = attrib()

    def filter(self):
        criteria = (self)

    def clean_rent(rent):
        """
        Remove the signs from string rent and convert it to int
        """
        # assume rent is either int/float or str
        if isinstance(rent, str):
            return int(rent.replace('$', '').replace(',', ''))
        else:
            return rent

    def filter_rent(criteria, index):
        """
        Check whether the rent of the listing at index satisfy the criteria
        """
        # some rent is range
        rent = data[index]['rent'].split('-')
        arr_rent = []
        if len(rent) == 2:
            arr_rent.append(clean_rent(rent[0]))
            arr_rent.append(clean_rent(rent[1]))
        else:
            arr_rent.append(clean_rent(rent[0]))
            arr_rent.append(clean_rent(rent[0]))

        # find the intersection of the criteria and arr_rent
        intersection = range(max(arr_rent[0], criteria[0]), min(
            arr_rent[-1], criteria[-1])+1)
        if len(intersection) == 0:
            return False
        else:
            return True

    def convert_input(input_str):
        """
        Convert input of roomType Criteria to a tuple of number and operator
        """
        if input_str[-1] == '+':
            return (float(input_str[:-1]), operator.ge)
        else:
            return (float(input_str), operator.eq)

    def process_roomType(roomType):
        """
        Process roomType of listings in JSON files
        """
        bed_index = roomType.index('Bed')
        bath_index = roomType.index('Bath')
        dict_roomType = {'Bedroom': float(
            roomType[bed_index-2]), 'Bathroom': float(roomType[bath_index-2])}
        return dict_roomType

    def filter_roomType(criterias, index):
        """
        Check whether the roomType of the listing at index satisfy the criteria
        """
        criterias = {key: convert_input(val) for key, val in criterias.items()}
        listing_roomType = process_roomType(data[index]['roomType'])
        bool_bed = criterias['Bedroom'][1](
            listing_roomType['Bedroom'], criterias['Bedroom'][0])
        bool_bath = criterias['Bathroom'][1](
            listing_roomType['Bathroom'], criterias['Bathroom'][0])
        return bool_bed & bool_bath
