from attr import attrs, attrib


@attrs
class Filter(object):
    input_json = attrib()

    def verify_price_range(self, price_range: list) -> bool:
        return True

    def verify_room_type(self, room_type: dict) -> bool:
        return True

    def verify_distance(self, distance: str) -> bool:
        return True

    def verify_availability(self, availability: dict) -> bool:
        return True
