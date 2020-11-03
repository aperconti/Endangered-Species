from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo
import json
from bson import json_util
from utils.utils import clean_bounds
# import scraper

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/Endangered_Species")


@app.route("/api/population")
def population():
    # Find records of data from the mongo database
    displayed_data = mongo.db.population.find()
    """
    GeoJson Format
    https://geojson.org/
    {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [125.6, 10.1]
        },
        "properties": {
            "name": "Dinagat Islands"
        }
    }
    """
    response_object = {
        "type": "FeatureCollection",
        "features": []
    }
    for state in list(displayed_data):
        json_state = json.loads(json.dumps(state, default=json_util.default))
        state_object = {
            "type": "Feature",
            "id": json_state.get("index"),
            "properties": {
                "name": json_state.get("State"),
                "density": json_state.get("density"),
            },
            "geometry": {
                "type": json_state.get("type"),
                "coordinates": clean_bounds(json_state)
            }
        }

        response_object["features"].append(state_object)
    return response_object


@app.route("/api/birds")
def birds():
    # Find one record of data from the mongo database
    displayed_birds = mongo.db.birds.find()
    birds = []
    for bird in list(displayed_birds):
        json_bird = json.loads(json.dumps(bird, default=json_util.default))
        birds.append(json_bird)
    return {"bird_data": birds}


@app.route("/api/plants")
def plants():
    # Find one record of data from the mongo database
    displayed_plants = mongo.db.plants.find()
    plants = []
    for plant in list(displayed_plants):
        json_plant = json.loads(json.dumps(plant, default=json_util.default))
        plants.append(json_plant)
    return {"plant_data": plants}


@app.route("/")
def home():
    return render_template("index.html")
