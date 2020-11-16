from flask import jsonify, make_response


def generateResponse(elem={}, status=200):
    response = make_response(jsonify(elem), status)
    return response
