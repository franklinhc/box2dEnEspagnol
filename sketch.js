let mostPopulatedCities;
let backgroundImage;
let myCities = [];
let numOfCities;

function preload(){
    mostPopulatedCities = loadJSON ("25mostPopulatedCities.json");
    backgroundImage = loadImage ('mapaMundi1800x600.png');
}


function setup() {
    createCanvas(1600, 800);

    numOfCities = mostPopulatedCities.cities.length;
    for (let r = 0; r < numOfCities; r++) {
        let currentCountry = new Cities();
        currentCountry.myLongitude = mostPopulatedCities.cities[r].longitude;
        currentCountry.myLatitude = mostPopulatedCities.cities[r].latitude;
        currentCountry.myX = map (currentCountry.myLongitude, -180,180, 0,width );
        currentCountry.myY = map (currentCountry.myLatitude, 90,-90, 0,height );
        currentCountry.mySize = map( mostPopulatedCities.cities[r].population, 35000000,500000,  100,5) ;
        currentCountry.myPopulation = mostPopulatedCities.cities[r].population;
        currentCountry.myName = mostPopulatedCities.cities[r].city_ascii;
        currentCountry.myCountry = mostPopulatedCities.cities[r].country;
        currentCountry.myCountryISO = mostPopulatedCities.cities[r].iso3;
        myCities [r] = currentCountry;
    } // end for
}

function draw() {
    image(backgroundImage, 0, 0);
    for (let i = 0; i < numOfCities; i++) {
        myCities[i].display();
    }
}