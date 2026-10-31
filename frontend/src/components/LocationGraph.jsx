import {  useEffect, useState } from 'react';
import {Bar} from 'react-chartjs-2';
import sightingService from '../services/sightings';
import { Chart, BarController, BarElement } from 'chart.js/auto';
Chart.register(BarController, BarElement);

//ref https://dev.to/emmanueloloke/building-charts-with-react-and-chartjs-4mlo

const LocationGraph = ({locationID}) => {
    const [locData, setLocData] = useState(null);
    useEffect(()=> {
        
        if(locationID){
            sightingService.getLocationSpecies(locationID).then(location=>{
            
            const seperatedData = location.map(({tick_name,sightings}) =>[tick_name,sightings]);
          
            const formattedData= {
                labels:seperatedData.map(l => l[0]),
                datasets:[{
                    label:"species",
                    data: seperatedData.map(l=>l[1]),
                    borderwidth:1

                }]

            };
            setLocData(formattedData)

        }).catch(e=>{
            console.error("Failed to  get location data", e);
        })
        }else{
        sightingService.getSightingCount()
        .then(location=>{
            
            const seperatedData = location.map(({place_name,sightings}) =>[place_name,sightings]);
            console.log(seperatedData);
            const formattedData= {
                labels:seperatedData.map(l => l[0]),
                datasets:[{
                    label:"City",
                    data: seperatedData.map(l=>l[1]),
                    borderwidth:1

                }]

            };
            setLocData(formattedData)

        }).catch(e=>{
            console.error("Failed to  get location data", e);
        })
    }
    }, [locationID])

    return (<div>
        {!locData && (<div>Fetching Graph..</div>)}
        {locData && (<div>
            <h2>Sightings by city</h2>
            <Bar data={locData}/>

        </div>)
        }
        




    </div>)
}

export default LocationGraph