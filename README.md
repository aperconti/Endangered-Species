# Threatened and Endangered Species on National Wildlife

# Project Overview:

## Tools/Requirements
The tools used for this project are:
- [Jupyter Notebook](https://jupyter.org/)
- [MongoDB](https://www.mongodb.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Javascript](https://www.javascript.com/)
- [jQuery](https://jquery.com/)
- [Geomap](https://www.geomap.com/)
- [leaflet](https://leafletjs.com/)
- [Python 3](https://www.python.org/download/releases/3.0/)

Environment requirements:
- beautifulsoup4==4.9.1
- certifi==2020.6.20
- click==7.1.2
- Flask-PyMongo==2.3.0
- Flask==1.1.2
- gunicorn==19.9.0
- itsdangerous==1.1.0
- Jinja2==2.11.2
- MarkupSafe==1.1.1
- pandas==0.25.1
- pymongo==3.11.0
- runipy==0.1.5
- Werkzeug==1.0.1
- wincertstore==0.2


## Objectives
With this project, our group is looking to see if there is any connection between regional population density and the number of endangered species in that region. We
decided to focus on state level population densities as gathered by the United States Census Bureau
(https://www.census.gov/data/tables/time-series/demo/popest/2010s-national-total.html) and endangered and threatened species population data from the National
Wildlife Refuge Database 
(https://www.fws.gov/refuges/databases/ThreatenedEndangeredSpecies/ThreatenedEndangered_Display.cfm). This data was then combined and cleaned so it could be put into
a Mongo Database and then displayed on an interactive map using Leaflet Javascript and a bar chart displaying the top states of interest.

## Data sourcing and cleaning
The data was gathered from the above mentioned sources and relevant CSV files were downloaded. The cleaning process was done in Jupyter Notebook using Pandas to zero
in on was was needed for the project. State population figures and population density was gathered from each state and endangered/threatened species data was was
broken up by plant and bird species information to see if there was a significant difference between the two. Lat/Lng coordinates were drawn from a different CSV
file from the US Census Bureau to be used to create points on the final map. Once all the CSV files were sourced and cleaned for us, the final cleaned CSV files were 
saved into the Data folder to be pulled into the Mongo database.

## Installation and Setup
The next step of the project was to load the relevant files into a Mongo database and run the cleaning files to create the database used by the flask app. This
process can be followed with these steps:
1. [Install MongoDB & ensure it's running](https://docs.mongodb.com/manual/installation/)
2. Create and activate your preferred virtual environment (we used conda)
```bash
conda create --name myenv
conda activate myenv
```
3. Install dependencies:
```bash
pip install -r requirements.txt
```
4. Clean the population data, which outputs to `./data/cleanedPop_lat_Data.csv`
```bash
# Clean the population data with:
runipy ./data/cleaning/populationData.ipynb
```
5. Clean the Plants data, which outputs to  `./data/Endangered_Plants.csv` & `./data/Endangered_Birds.csv`
```bash
# Clean the birds and plants data with:
runipy runipy ./data/cleaning/endangered_species.ipynb
```
6. Connect to the MongoDB, and populate the fields
```bash
# WARNING: MongoDB must be running in order for it to be populated
runipy ./data/database/CSV_to_MongoDB.ipynb
```
7. Export and run the flask app
```bash
export FLASK_APP=./webpage-template/src/dbconnection.py
flask run
```
## Flask App and layers
Once run, the flask app will pull in all relevant data from the created MongoDB and load it using Javascript and the leaflet module to create an inteactive map with 
layers of population density by state, endangered bird species, and endangered plant species. These datapoints will be dropped onto the map with unique marker icons 
to differentiate when multiple layers are applied, and will be clustered using javascript marker clusters to increase readability. The website will also contain a 
bargraph (created with the plots.js file) showing the relationship between endangered or threatened plant and bird species with population density by state. All
states are not included in this barchart, because not every state includes endangered and threatened species.

## Roadblocks 
One major issue while creating the map layers for this project was getting accurate Lat/Lng coordinates for each species and how to apply that on the map. While each
state can have an easily calculated population density, it is not consistant between areas even within a state. States such as Claifornia or Florida may have large 
populations and a high density, that does not mean each part of the state is equal, and this provides a limitation for the dataset, especially when combined with 
another roadblock we encountered. While we were able to gather data for endangered/threatened bird species by state, birds do not care about state lines, and will
regularly cross them, either temporarily for migratory purposes or for longer term movement for any number of other reasons. Another significant challenge was
managerial, as the project repository was not well managed by the repository owner, and little and very avoidable mistakes often led to issues down the road, losing
time and energy for everyone else involved. This could have been a much cleaner and more streamlined process if any number of procautions had been followed. 

## Final Product and Conclusion
![Image of map](https://imgur.com/a/wRvBtaH)

![Image of barChart](https://imgur.com/a/sP2ZB82)
