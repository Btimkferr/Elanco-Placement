import {  useEffect, useState } from 'react';
import Map from './components/map.jsx';
import LocationGraph  from './components/LocationGraph.jsx';
import SpeciesGraph from './components/SpeciesGraph.jsx';
import SightingInfo from './components/sightingInfo.jsx';
import SightingForm from './components/sightingForm.jsx';
import './App.css'

function App() {
  const [selectedLocation ,setSelectedLocation] = useState(null);

  useEffect(()=>{
    console.log("current Location: " + selectedLocation);

  },[selectedLocation])


  return (
    <div>
      <div class="map-info">
        <div class="map-box">
          <Map setSelectedLocation={setSelectedLocation}></Map>
        </div>
        <div class="side-charts">
          <div>
          <SightingInfo></SightingInfo>
          </div>
          <div>
            <LocationGraph ></LocationGraph>
            <SpeciesGraph locationID={selectedLocation}></SpeciesGraph>
          </div>
        </div>
      
      
<div><SightingForm></SightingForm></div>
      </div>
      
      
    </div>

  )
}

export default App
