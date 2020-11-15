from flask import Response


def handleOptions():
    resp = Response()
    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    resp.headers['Access-Control-Allow-Headers'] = "Content-Type"
    resp.headers['Content-Type'] = 'application/json'
    return resp
