import {  useEffect, useState } from 'react';
import sightingService from '../services/sightings';


const SightingInfo = () =>{
    const [curSighting ,setCurSighting] = useState(null);
    useEffect(() =>{
        sightingService.getLatestSighting().then(latest =>{
            
            setCurSighting(latest);
            console.log(latest);
            console.log(latest.sighting_time);
        }
        ).catch(e => {
            console.error("Failed to get Latest Sighting :", e);
            
        })
    }, []) 
    return(
        <div>
        {curSighting && (<div>
            <h3>Latest Sighting:</h3>
            <p>Last reported Sighting was a {curSighting.tick_name} at {curSighting.sighting_time} on  {curSighting.sighting_date} </p>
        </div>)}
        {!curSighting && (<div>
            <h3>Sighting:</h3>
            <p>Getting Sighting Info</p>
        </div>)}
        </div>
    )
}

export default SightingInfo