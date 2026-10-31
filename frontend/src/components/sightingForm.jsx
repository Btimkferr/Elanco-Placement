import {  useEffect, useState } from 'react';
import sightingRouter from '../services/sightings';
const SightingForm = () => {

    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [today, setToday] = useState(null);
    const [location, setLocation] = useState(null);
    const [locations, setLocations] = useState([]);
    const [species,setSpecies] = useState(null);
    const [allSpecies,setAllSpecies] = useState([]);


    const handleCreate = async (e) =>{
        e.preventDefault();
        try{
            //attempts to post current form input
            const formatSighting = {
                sighting_time:time,
                sighting_date:date,
                location_id:Number(location),
                species_id:Number(species)
            }
            
            const res = await sightingRouter.postNewSighting(formatSighting);
            alert("submitted",res);
            curTimes();
            
        }catch (e){
            alert("Error creating:" ,e)
            console.error(e);
        }
        console.log(e);
    }
    //console.log(((new Date()).toISOString().split("T"))[0]);
    
    //gets current time/date for form, as the default
    const curTimes = ()=> {
         const curDate = new Date();
        
        const isoDate = curDate.toISOString().split("T");
        const curDateFormatted = isoDate[0];
        const curTimeFormatted = isoDate[1].split(".")[0];  
        setDate(curDateFormatted);
        setTime(curTimeFormatted);
        setToday(curDateFormatted);
        

    }

    useEffect(() => {
        sightingRouter.getLocationList()
        .then(l=>{
            setLocations(l);
            1
        }).catch(e=>{
            console.error('Failed getting locations: ', e);
        })
        sightingRouter.getSpeciesList()
        .then(s=>{
            setAllSpecies(s);
        }).catch(e=>{
            console.error('Failed getting locations: ', e);
        })
        
        curTimes();
    }, [])

    


    return(
        <div>
            <form onSubmit={handleCreate} >
                <h2>Report a Sighting !</h2>
                <div>
                    <label>
                        Sighting Date:
                        <input type="date"  name="new-sighting-date" id="new-sighting-date"
                        value = {date}
                        max = {today}
                        onChange={({target}) => setDate(target.value)}
                                    required/>
                    </label>
                    <label>
                        Sighting Time:  
                        <input type="time"  
                        name="new-sighting-time" 
                        id="new-sighting-time"
                        
                        value = {time}
                        onChange={({target}) => setTime(target.value)}
                        required/><br></br>
                    </label>
                </div>
                <div>
                    <label>
                        Location:
                        
                        <select 
                        placeholder="Select Location"
                        required
                        value={location}
                        onChange={({target})=> setLocation(target.value)} >
                            <option value ="">Select Location</option>
                            {locations.map(l =><option key={l.location_id} value = {l.location_id}>{l.place_name}</option>)}
                        </select>
                        
                    </label>
                    <label>
                        Species:
                        <select value={species} onChange={({target})=>setSpecies(target.value)} placeholder ="Select Species" required>
                            <option value ="">Select Species</option>
                            {allSpecies.map(s=><option key ={s.species_id} value ={s.species_id}>{s.tick_name}</option>)}
                        </select>
                    </label>
                </div>
                <button type='submit'>Report Sighting</button>
            </form>
        </div>
    )

}

export default SightingForm