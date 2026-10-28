import axios from 'axios';
const url = 'data/sightings';

const getSightingCount = async () => {
    const request = await axios.get(`${url}/counts`);
    return request.data;
}

export default  {getSightingCount};