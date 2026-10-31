import {  useEffect, useState } from 'react';
import {Bar} from 'react-chartjs-2';
import sightingService from '../services/sightings';
import { Chart, BarController, BarElement } from 'chart.js/auto';
Chart.register(BarController, BarElement);

//ref https://dev.to/emmanueloloke/building-charts-with-react-and-chartjs-4mlo

const SpeciesGraph = ({locationID}) => {
    const [speciesData, setSpeciesData] = useState(null);
    const [pName, setPName] = useState(null);
    useEffect(()=> {
        let s;
        if(locationID){
              s= sightingService.getLocationSpecies(locationID);
              
              
        }else{
             s= sightingService.getSpeciesSighting();
        }
        s.then(species=>{
            
            const seperatedData = species.map(({tick_name, amount}) =>[tick_name,amount]);
            
            //provides the placename if exists
            if(locationID){
                const tPlace= species.map(({place_name})=>[place_name]);
                setPName(tPlace[0][0]);
            }else{
                setPName(null);
            }
            
            //basic data format for all tick species
            const formattedData= {
                labels:seperatedData.map(l => l[0]),
                datasets:[{
                    label:"Tick Type",
                    data: seperatedData.map(l=>l[1]),
                    borderwidth:1

                }]

            };
            setSpeciesData(formattedData)

        }).catch(e=>{
            console.error("Failed to  get species data", e);
        })
    }, [locationID])

    return (<div>
        {!speciesData && (<div>Fetching Graph..</div>)}
        {speciesData && (<div>
            <h2>Distribution by Species {pName && (`for ${pName} `)}:</h2>
            <Bar data={speciesData}/>

        </div>)}




    </div>)
}

export default SpeciesGraph