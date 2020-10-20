import boto3
import logging
from botocore.exceptions import ClientError


def upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name in the form of
    {user_name_folder/housing/room_name}.
    If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = file_name

    # Upload the file
    s3_client = boto3.client('s3')
    result = s3_client.get_bucket_acl(Bucket='houseit')
    try:
        response = s3_client.upload_file(
            file_name, bucket, object_name, ExtraArgs={'ACL': 'public-read'})
    except ClientError as e:
        logging.error(e)
        return False
    return True


# example:
# upload_file("../../img/1.png", "houseit",
# "ali/housing/costa_verde/test2.png")
