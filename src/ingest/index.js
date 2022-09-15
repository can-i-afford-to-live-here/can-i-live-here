
const { Pool, Client } = require("pg");
const { credentials } = require("../../dbCredentials.js");
const { apiKeys } = require("../../apiKeys.js");
const axios = require('axios');
const fs = require('fs');

// Connect with a connection pool.
const pool = new Pool(credentials);
const client = new Client(credentials);
client.connect();

// Insert location_indexes

async function insertLocationIndexes(location) {
    const text = `
      INSERT INTO location_indexes (cost_of_living_index, cost_of_living_plus_rent_index, groceries_index, last_updated_timestamp, local_purchasing_power_index, rent_index, restaurant_price_index)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING location_index_id
    `;
    const values = [location.cost_of_living_index, location.cost_of_living_plus_rent_index, location.groceries_index, location.last_updated_timestamp, location.local_purchasing_power_index, location.rent_index, location.restaurant_price_index];
    return pool.query(text, values);
}

// Insert location

async function insertLocation(location) {
    const text = `
      INSERT INTO location (country, city, region, lat, lng, north_vp, south_vp, east_vp, west_vp, location_index_key)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING location_id
    `;
    const values = [location.country, location.city, location.region, location.lat, location.lng, location.north_vp, location.south_vp, location.east_vp, location.west_vp, location.location_index_key];
    return pool.query(text, values);
}

// Insert location_indexes and location

async function insertLocationWithIndexes(location) {
    const locationIndexesResult = await insertLocationIndexes(location);
    location.location_index_key = locationIndexesResult.rows[0]["location_index_id"];
    await insertLocation(location);
}

// Delete all values in location and location_indexes

async function deleteAll() {
    pool.query(`DELETE FROM location`);
    pool.query(`DELETE from location_indexes`) 
}



// Use a self-calling function so we can use async / await.

(async () => {
/*
  const options = {
    method: 'GET',
    url: 'https://cities-cost-of-living1.p.rapidapi.com/get_cities_list',
    headers: {
      'X-RapidAPI-Key': apiKeys.rapidKey,
      'X-RapidAPI-Host': 'cities-cost-of-living1.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });//*/



  /*
  let res = await axios({
    method: 'GET',
    url: 'https://cities-cost-of-living1.p.rapidapi.com/get_cities_list',
    headers: {
      'X-RapidAPI-Key': apiKeys.rapidKey',
      'X-RapidAPI-Host': 'cities-cost-of-living1.p.rapidapi.com'
    }
  });
  fs.writeFile("citiesList.txt", JSON.stringify(res.data), function(err) {
  if(err) {
      return console.log(err);
  }
  console.log("The file was saved!")});
  //let res={data:{}};
  //res.data = JSON.parse(fs.readFileSync("citiesList.json"));res.data.cities = res.data.cities.filter(e=>e.country=="United States");
  console.log(JSON.stringify(res.data.cities ));

  const encodedParams = new URLSearchParams();
  encodedParams.append("cities", JSON.stringify(res.data.cities));
  encodedParams.append("currencies", "[\"USD\"]");
  let response
  try{
    response = await axios({
      method: 'POST',
      url: 'https://cities-cost-of-living1.p.rapidapi.com/get_cities_details_by_name',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '0f4ce3e1e6mshaff459d9d82a93bp1ced3ejsn016b233852c6',
        'X-RapidAPI-Host': 'cities-cost-of-living1.p.rapidapi.com'
      },
      data: encodedParams
    });
  }catch(error){
    console.log(Object.keys(error), error.message);
  }
  //console.log(await response.data);
  fs.writeFile("cities.json", JSON.stringify(response.data), function(err) {
    if(err) {
        return console.log(err);
    }
  });//*/
  let response={data:{data:{}}};
  response.data = JSON.parse(fs.readFileSync("cities.json"));console.log(response.data.data);
  await response.data.data.forEach(async city => {
    if(city.us_state === "N/A") 
      city.us_state='';
    const url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+encodeURIComponent(city.name+" "+city.us_state+" "+city.country)+'&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Cgeometry&key='+apiKeys.googleKey;
    console.log(url);
    let locationData = await axios({
      method: 'get',
      url: url,
    });
    locationData = locationData.data.candidates[0].geometry;
    //console.log(locationData);

    insertLocationWithIndexes({
      cost_of_living_index: city.cost_of_living_index,
      cost_of_living_plus_rent_index: city.cost_of_living_plus_rent_index,
      groceries_index: city.groceries_index,
      last_updated_timestamp: city.last_updated_timestamp,
      local_purchasing_power_index: city.local_purchasing_power_index,
      rent_index: city.rent_index,
      restaurant_price_index: city.restaurant_price_index,
      country: city.country,
      city: city.name,
      region: city.us_state,
      lat: locationData.location.lat, 
      lng: locationData.location.lng,
      north_vp: locationData.viewport.northeast.lat,
      south_vp: locationData.viewport.northeast.lng,
      east_vp: locationData.viewport.southwest.lat,
      west_vp: locationData.viewport.southwest.lng,
      location_index_key: 0
    });
  })//*/




  /*await insertLocationWithIndexes({
    cost_of_living_index: 123.1,
    cost_of_living_plus_rent_index: 1234.1,
    groceries_index: 1234.12,
    last_updated_timestamp: '2021-02-18 21:53:08.542704+00:00',
    local_purchasing_power_index: 1234.123,
    rent_index: 1234.1234,
    restaurant_price_index: 12345.1,
    country: "USA",
    city: "Denver",
    region: "Colorado",
    lat: 39.7392, 
    lng: 104.9903,
    north_vp: 12.3,
    south_vp: 123.4,
    east_vp: 1234.5,
    west_vp: 12345.6,
    location_index_key: 0
  });//*/
  //await deleteAll();
  await pool.end
})();
