import axios from 'axios';
const url = '/api/sightings';

const getSightingCount = async () => {
    const request = await axios.get(`${url}/counts`);
    return request.data;
}

const getLatestSighting = async () => {
    const request = await axios.get(`${url}/latest`);
    return request.data;
}

const getSpeciesSighting = async () => {
    const request = await axios.get(`${url}/species`);
    return request.data;
}

const getLocationSpecies = async (id) => {
    const request=  await axios.get(`${url}/species/${id}`);
    return request.data;
}

const getLocationList = async ()=> {
    const request = await axios.get(`${url}/location`);
    return request.data;
}
const getSpeciesList = async () => {
    const request = await axios.get(`${url}/species/list`);
    return request.data;
}

const postNewSighting = async (sighting) => {
    const request = await axios.post(`${url}/`,sighting);
    return request.data;

}

export default  {getSightingCount,getLatestSighting, getSpeciesSighting, getLocationSpecies, getLocationList, getSpeciesList,postNewSighting};