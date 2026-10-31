import { useEffect, useState } from 'react';
import sightingService from '../services/sightings';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement } from 'chart.js';
Chart.register(LineElement);

const LocationChart = ({ location_id }) => {
    const [data, setData] = useState(null);
    const [pName, setPname] = useState(null);

    useEffect(() => {
        console.log(location_id);
        sightingService.getLocationSightingsYearly(location_id)
            .then(sig => {
                
                const seperatedData = sig.map(({ year, amount }) => [year, amount]);
                setPname( sig.map(({place_name}) => [place_name])[0])

                const formattedData = {
                    labels: seperatedData.map(s => s[0]),
                    datasets: [{
                        label: "Sightings per Year",
                        data: seperatedData.map(s => s[1]),
                        tension: 0.3

                    }]
                    
                }
                setData(formattedData);
            }).catch(e => {
                console.error("Failed to get sightings for location:" + e);
            })


    }, [location_id]);

    return (
        <div>
            {!data && (<div>Fetching data...</div>)}
            {data && (<div>
                <h2>Sightings over time for {pName} </h2>
                <Line data={data}></Line>
            </div>)}
        </div>)
}

export default LocationChart