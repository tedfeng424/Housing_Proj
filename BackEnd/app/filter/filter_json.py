from attr import attrs, attrib
import boto3
import json
import os
from app.util.util import *
import operator
from datetime import datetime
        
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

@attrs
class JSONFilter(object):
    filter_json = attrib()
    data = get_latest_data()
    def filter(self):
        criteria = (self)

    def clean_rent(self, rent):
        """
        Remove the signs from string rent and convert it to int
        """
        # assume rent is either int/float or str
        if isinstance(rent, str):
            return int(rent.replace('$', '').replace(',', ''))
        else:
            return rent

    def filter_rent(self, criteria, index):
        """
        Check whether the rent of the listing at index satisfy the criteria
        """
        # some rent is range

        rent = self.data[index]['rent'].split('-')
        arr_rent = []
        if len(rent) == 2:
            arr_rent.append(self.clean_rent(rent[0]))
            arr_rent.append(self.clean_rent(rent[1]))
        else:
            arr_rent.append(self.clean_rent(rent[0]))
            arr_rent.append(self.clean_rent(rent[0]))

        # find the intersection of the criteria and arr_rent
        intersection = range(max(arr_rent[0], criteria[0]), min(
            arr_rent[-1], criteria[-1])+1)
        if len(intersection) == 0:
            return False
        else:
            return True

    def convert_room_type_input(input_str):
        """
        Convert input of roomType Criteria to a tuple of number and operator
        """
        if input_str[-1] == '+':
            return (float(input_str[:-1]), operator.ge)
        else:
            return (float(input_str), operator.eq)

    def process_room_type(room_type):
        """
        Process roomType of listings in JSON files
        """
        bed_index = room_type.index('Bed')
        bath_index = room_type.index('Bath')
        dict_room_type = {'Bedroom': float(
            room_type[bed_index-2]), 'Bathroom': float(room_type[bath_index-2])}
        return dict_room_type

    def filter_room_type(self, criterias, index):
        """
        Check whether the roomType of the listing at index satisfy the criteria
        """
        criterias = {key: self.convert_room_type_input(val) for key, val in criterias.items()}
        listing_room_type = self.process_room_type(self.data[index]['roomType'])
        bool_bed = criterias['Bedroom'][1](
            listing_room_type['Bedroom'], criterias['Bedroom'][0])
        bool_bath = criterias['Bathroom'][1](
            listing_room_type['Bathroom'], criterias['Bathroom'][0])
        return bool_bed & bool_bath

    def convert_distance_input(self, input_str):
        # converting string of "<20 mins" to tuple of num and operator
        if(input_str[0] == '<'):
            return (int(input_str[1:-5]), operator.le)
        else:
            return (int(input_str[1:-5]), operator.ge)

    def filter_distance(self, criteria, index):
        # comparing apartment distances to input and returning true or false
        criteria = self.convert_distance_input(criteria)
        listing_distance = int(self.data[index]['distance'][0:-5])
        bool_distance = criteria[1](listing_distance, criteria[0])
        return bool_distance

    def convert_availability_input(self, input_dict):
        # converts user input dict to datetime object
        month = input_dict["Month"]
        year = input_dict["Year"]
        date_str = month+ " 1 " + year
        return datetime.strptime(date_str, "%B %d %Y")

    def filter_availability(self, criteria, index):
        # converts both input and listing to datetime object and compares
        criteria = self.convert_availability_input(criteria)
        listing_availability = self.data[index]['availability'].lower()
        if((listing_availability == "now") or (listing_availability == "today")):
            return True
        else:
            listing_availability = datetime.strptime(listing_availability, "%m/%d/%Y")
            if(listing_availability<criteria):
                return True 
            else:
                return False
