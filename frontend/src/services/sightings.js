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

export default  {getSightingCount,getLatestSighting, getSpeciesSighting, getLocationSpecies};