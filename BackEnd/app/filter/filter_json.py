from attr import attrs, attrib
import boto3
import json
import os
from app.util.util import *

@attrs
class JSONFilter(object):
    filter_json = attrib()

    def filter(self):
        criteria = (self)
        
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

