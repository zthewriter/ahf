// Set up the map
var map = L.map('map').setView([37.8, -96], 4);

// Set up the OSM layer
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18
    }
).addTo(map);

// State abbreviations
var stateAbbreviations = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY"
};

    // Add the rest of the states here...

// Load GeoJSON from an external file
fetch('us-states.json')
.then(response => response.json())
.then(statesData => {
    L.geoJSON(statesData, {
        onEachFeature: (feature, layer) => {
            const state = feature.properties.NAME;
            const stateAbbr = stateAbbreviations[state];
            let popupText = `<div style='background-color:white; color:black; font-family:Arial;'>
                                <h2>Laws in ${state}</h2>
                                <a href='https://api.legiscan.com/?key=3e4fa14a5c301223d291776f0f4555a7&op=getSearch&state=${stateAbbr}&year=2023&query=%22same-sex%22%20OR%20%22drag%22%20OR%20%22transgender%22&page=1'>
                                    Click here for more information
                                </a>
                             </div>`;
       
            // Bind the popup text to the layer
            layer.bindPopup(popupText);
        }
    }).addTo(map);
});