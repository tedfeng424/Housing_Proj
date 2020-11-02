from flask import Response


def handleOptions():
    resp = Response()
    resp.headers['Access-Control-Allow-Headers'] = "Content-Type"
    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    return resp
