
const { Pool, Client } = require("pg");

const credentials = {
  user: "gyiqtoylsqblqc",
  host: "ec2-3-223-213-207.compute-1.amazonaws.com",
  database: "d7nhp04n5jvm88",
  password: "5a7e393c053367539aec280fa6c82d50c1d4d2727d6e087fc7e89f19db59cbe1",
  port: 5432,
  ssl: true
};

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
      INSERT INTO location (country, city, region, location_index_key)
      VALUES ($1, $2, $3, $4)
      RETURNING location_id
    `;
    const values = [location.country, location.city, location.region, location.location_index_key];
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

  await insertLocationWithIndexes({
    cost_of_living_index: 123.1,
    cost_of_living_plus_rent_index: 1234.1,
    groceries_index: 1234.12,
    last_updated_timestamp: '2021-02-18 21:53:08.542704+00:00',
    local_purchasing_power_index: 1234.123,
    rent_index: 1234.1234,
    restaurant_price_index: 12345.1,
    country: "testCountry",
    city: "testCity",
    region: "testRegion",
    location_index_key: 0
  });
  await deleteAll();
  await pool.end
})();