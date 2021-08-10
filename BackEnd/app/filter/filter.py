from attr import attrs, attrib
from assets import options

@attrs
class Filter(object):
    input_json = attrib()

    def verify_price_range(self, price_range: list) -> bool:
        # asserting that the input is a list of 2 items
        if((type(price_range)!=list) or (len(price_range)!=2)):
            return False
        min_price = price_range[0]
        max_price = price_range[1]
        # asserting that both price inputs are integers
        if((type(min_price)!=int) or (type(max_price)!=int)):
            return False
        # asserting that both prices are positive and min price is less than max
        if((min_price>max_price) or (min_price<0) or (max_price<0)):
            return False

        return True

    def verify_room_type(self, room_type: dict) -> bool:
        # asserting input is a dictionary with 2 key,value pairs
        if((type(room_type)!=dict) or (len(room_type)!=2)):
            return False

        # asserting that all values of dictionary are strings
        for value in room_type.values():
            if type(value)!=str:
                return False
        # asserting valid keys
        if((room_type.get("Bedrooms") is None) or (room_type.get("Bathrooms") is None)):
            return False

        # assign correct counts to variables 
        if(room_type["Bedrooms"][-1]=="+"):
            bed_count = room_type["Bedrooms"][0:-1]
        else:
            bed_count = room_type["Bedrooms"]
        if(room_type["Bathrooms"][-1]=="+"):
            bath_count = room_type["Bathrooms"][0:-1]
        else:
            bath_count = room_type["Bathrooms"]

        # asserting that all bedroom counts are positive ints 
        if((not bed_count.isdigit())):
            return False
        # asserting that all bathroom counts are positive floats 
        if((not bath_count.replace(".","",1).isdigit())):
            return False

        return True

    def verify_distance(self, distance: str) -> bool:
        # asserting that input is given as 3 character string like "<20"
        if(type(distance)!=str):
            return False
        try:
            distance_op = distance[0]
            time_per = distance[1:-5]
            valid_operators = ["<", ">"]
        except IndexError:
            return False

        # asserting that distance is given as numbers and operators are either > or <
        if((not time_per.isdigit()) or (distance_op not in valid_operators)):
            return False

        # asserting that time is given as a positive number
        if(int(time_per)<0):
            return False 

        return True

    def verify_availability(self, availability: dict) -> bool:
        # asserting input is a dictionary with 2 key,value pairs
        if((type(availability)!=dict) or (len(availability)!=2)):
            return False
        # asserting that all values of dictionary are strings
        for key,value in availability.items():
            if ((type(key)!=str) or (type(value)!=str)):
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
        if((len(year)!=4) or (not year.isdigit())):
            return False
        return True
