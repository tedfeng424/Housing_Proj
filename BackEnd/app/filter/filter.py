from attr import attrs, attrib
from app.assets import options
import datetime

# default values for criterias that will always return True in the filter
# same as ignoring these criterias
DEFAULT_RENT_MIN = 0
DEFAULT_RENT_MAX = 99999
DEFAULT_BED = '0+'
DEFAULT_BATH = '0+'
DEFAULT_DISTANCE = "<1000 mins"
DEFAULT_AVAILABILITY_YEAR = str(datetime.datetime.now().year+100)
DEFAULT_AVAILABILITY_MONTH = datetime.datetime.now().strftime("%B")


@attrs
class Filter(object):
    #input_json = attrib()
    criterias = attrib()

    def verify_price_range(self, price_range: list) -> bool:
        # asserting that the input is a list of 2 items
        if((type(price_range) != list) or (len(price_range) != 2)):
            return False
        min_price = price_range[0]
        max_price = price_range[1]
        # if the min or max are not specified, set them to the default values
        if min_price == None:
            self.criterias['rent'][0] = DEFAULT_RENT_MIN
            min_price = DEFAULT_RENT_MIN
        if max_price == None:
            self.criterias['rent'][1] = DEFAULT_RENT_MAX
            max_price = DEFAULT_RENT_MAX
        # asserting that both price inputs are integers
        if((type(min_price) != int) or (type(max_price) != int)):
            return False
        # asserting that both prices are positive and min price is less than max
        if((min_price > max_price) or (min_price < 0) or (max_price < 0)):
            return False

        return True

    def verify_room_type(self, room_type: dict) -> bool:
        # asserting input is a dictionary with 2 key,value pairs
        if((type(room_type) != dict) or (len(room_type) != 2)):
            return False

        # if the number of bedrooms/bathrooms are not specified, set them to the default values
        if room_type['Bedrooms'] == None:
            self.criterias['room_type']['Bedrooms'] = DEFAULT_BED
            room_type['Bedrooms'] = DEFAULT_BED
        if room_type['Bathrooms'] == None:
            self.criterias['room_type']['Bathrooms'] = DEFAULT_BATH
            room_type['Bathrooms'] = DEFAULT_BATH

        # asserting that all values of dictionary are strings
        for value in room_type.values():
            if type(value) != str:
                return False
        # asserting valid keys
        if((room_type.get("Bedrooms") is None) or (room_type.get("Bathrooms") is None)):
            return False

        # assign correct counts to variables
        if(room_type["Bedrooms"][-1] == "+"):
            bed_count = room_type["Bedrooms"][:-1]
        else:
            bed_count = room_type["Bedrooms"]
        if(room_type["Bathrooms"][-1] == "+"):
            bath_count = room_type["Bathrooms"][:-1]
        else:
            bath_count = room_type["Bathrooms"]

        # asserting that all bedroom counts are positive ints
        if((not bed_count.isdigit())):
            return False
        # asserting that all bathroom counts are positive floats
        if((not bath_count.replace(".", "", 1).isdigit())):
            return False

        return True

    def verify_distance(self, distance: str) -> bool:
        # if the distance is not specified, set them to the default values
        if distance == None:
            self.criterias['distance'] = DEFAULT_DISTANCE
            distance = DEFAULT_DISTANCE

        # asserting that input is given as 3 character string like "<20"
        if(type(distance) != str):
            return False
        try:
            distance_op = distance[0]
            time_per = distance[1:-5]
            valid_operators = ["<", ">"]
        except IndexError:
            return False

        # asserting that distance is given as positive numbers and operators are either > or <
        if((not time_per.isdigit()) or (distance_op not in valid_operators)):
            return False

        return True

    def verify_availability(self, availability: dict) -> bool:
        # asserting input is a dictionary with 2 key,value pairs
        if((type(availability) != dict) or (len(availability) != 2)):
            return False

        # if the availability is not specified, set them to the default values
        if availability['Month'] == None:
            self.criterias['availablity']['Month'] = DEFAULT_AVAILABILITY_MONTH
            availability['Month'] = DEFAULT_AVAILABILITY_MONTH
        if availability['Year'] == None:
            self.criterias['availablity']['Year'] = DEFAULT_AVAILABILITY_YEAR
            availability['YEAR'] = DEFAULT_AVAILABILITY_MONTH

        # asserting that all values of dictionary are strings
        for key, value in availability.items():
            if ((type(key) != str) or (type(value) != str)):
                return False
        # asserting valid keys
        if((availability.get("Month") is None) or (availability.get("Year") is None)):
            return False

        month = availability["Month"]
        year = availability["Year"]
        valid_months = options.months
        # assert month and year are valid inputs
        if((month not in valid_months)):
            return False
        if((len(year) != 4) or (not year.isdigit())):
            return False
        return True
