import { location } from '../db/models/location'

export async function getLocations() {
    console.log("Getting locations")
    return await location.findAll();
}
