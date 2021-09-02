from sqlalchemy.util.langhelpers import hybridmethod
from app.filter.filter import DEFAULT_AVAILABILITY_MONTH, DEFAULT_AVAILABILITY_YEAR, Filter
import app.filter.filter as filter 
from sqlalchemy.orm import session
from attr import attrs, attrib
import app.db.crud as crud
import app.db.database_setup as database_setup
from datetime import datetime
import re

MONTHS = {"January" : 1, "February" : 2, "March" : 3, "April" : 4, "May" : 5, "June" : 6,
    "July" : 7, "August" : 8, "September" : 9, "October" : 10, "November" : 11, "December" : 12}

@attrs
class DBFilter(Filter):
   session = attrib()
   
   def filter(self):
       self.filter_json = self.criterias

       results = self.session.query(database_setup.Room).join(database_setup.Stay_Period, database_setup.Address).filter(self.beds_criteria(), self.baths_criteria(), self.availability_criteria(),
            self.price_criteria_lower(), self.price_criteria_higher(), self.distance_criteria()).all()
       

       return results
   

   @hybridmethod
   def beds_criteria(self):
        try:
           self.filter_json['room_type']
        except KeyError:
           return database_setup.Room.num_beds > 0

        if not self.verify_room_type(self.filter_json['room_type']):
            return database_setup.Room.num_beds > 0

        if self.filter_json['room_type']['Bedrooms'][-1] == "+" :
            return database_setup.Room.num_beds >= 3
        else:
            return database_setup.Room.num_beds == int(self.filter_json['room_type']['Bedrooms'])
   
   @hybridmethod
   def baths_criteria(self):
        try:
           self.filter_json['room_type']
        except KeyError:
           return database_setup.Room.num_baths > 0

        if not self.verify_room_type(self.filter_json['room_type']):
            return database_setup.Room.num_baths > 0

        if self.filter_json['room_type']['Bathrooms'][-1] == "+" :
            return database_setup.Room.num_baths >= 3
        else:
            return database_setup.Room.num_baths == int(self.filter_json['room_type']['Bathrooms'])

       
   @hybridmethod
   def availability_criteria(self):
       try:
           self.filter_json['availability']
       except KeyError:
           return database_setup.Stay_Period.from_month < datetime(int(filter.DEFAULT_AVAILABILITY_YEAR), MONTHS[filter.DEFAULT_AVAILABILITY_MONTH], 1) 

       if not self.verify_availability(self.filter_json['availability']):
           return database_setup.Stay_Period.from_month < datetime(int(filter.DEFAULT_AVAILABILITY_YEAR), MONTHS[filter.DEFAULT_AVAILABILITY_MONTH], 1) 

       if (MONTHS[self.filter_json['availability']["Month"]] == 12):
           try:
               availability = datetime(int(self.filter_json['availability']["Year"]) + 1, 1, 1)
           except TypeError:
               return database_setup.Stay_Period.from_month < datetime(int(filter.DEFAULT_AVAILABILITY_YEAR), MONTHS[filter.DEFAULT_AVAILABILITY_MONTH], 1) 
       else:
           try:
               availability = datetime(int(self.filter_json['availability']["Year"]), MONTHS[self.filter_json['availability']["Month"]] + 1, 1)
           except TypeError:
               return database_setup.Stay_Period.from_month < datetime(int(filter.DEFAULT_AVAILABILITY_YEAR), MONTHS[filter.DEFAULT_AVAILABILITY_MONTH], 1) 

       return database_setup.Stay_Period.from_month < availability
   
   
   def distance_criteria(self):
       try:
           self.filter_json['distance']
       except KeyError:
           return database_setup.Address.distance_int > 0

       if not self.verify_distance(self.filter_json['distance']):
           return database_setup.Address.distance_int > 0

       distance = self.filter_json['distance']

       dist = int(distance[1:-5])
       if distance[0] == '<':
           return database_setup.Address.distance_int <= dist
       else:
           return database_setup.Address.distance_int >= dist

   @hybridmethod
   def price_criteria_lower(self):
       try:
           self.filter_json['rent']
       except KeyError:
           return database_setup.Room.price_per_month >= filter.DEFAULT_RENT_MIN

       if not self.verify_price_range(self.filter_json['rent']):
           return database_setup.Room.price_per_month >= filter.DEFAULT_RENT_MIN

       lower_price_range = self.filter_json['rent'][0]
       return database_setup.Room.price_per_month >= lower_price_range

   @hybridmethod
   def price_criteria_higher(self):
       try:
           self.filter_json['rent']
       except KeyError:
           return database_setup.Room.price_per_month <= filter.DEFAULT_RENT_MAX

       if not self.verify_price_range(self.filter_json['rent']):
           return database_setup.Room.price_per_month <= filter.DEFAULT_RENT_MAX

       upper_price_range = self.filter_json['rent'][1]
       return database_setup.Room.price_per_month <= upper_price_range


      



