import {  useEffect, useState } from 'react';
import Map from './components/map.jsx';
import LocationGraph  from './components/LocationGraph.jsx';
import SpeciesGraph from './components/SpeciesGraph.jsx';
import SightingInfo from './components/sightingInfo.jsx';
import SightingForm from './components/sightingForm.jsx';
import SpeciesInfo from './components/speciesinfo.jsx';
import './App.css'
import LocationChart from './components/LocationChart.jsx';

function App() {
  const [selectedLocation ,setSelectedLocation] = useState(null);

  useEffect(()=>{
    console.log("current Location: " + selectedLocation);

  },[selectedLocation])


  return (
    <div class="app">
      <h1 style={{paddingLeft:'200px'}}>Uk tick sightings insights</h1>
      <div class="map-info">
        <div class="map-box">
          <Map setSelectedLocation={setSelectedLocation}></Map>
        </div>
        <div class="side-charts">
          <div>
          <SightingInfo></SightingInfo>
          </div>
          <div>
            {selectedLocation && (<LocationChart location_id={selectedLocation} style={{height:'50%'}}></LocationChart>)}
            {!selectedLocation && (<LocationGraph style={{height:'45%'}} ></LocationGraph>)}
            <SpeciesGraph locationID={selectedLocation} style={{height:'45%'}}></SpeciesGraph>
          </div>
        </div>
      
      

      </div>
      <div class="form-container"><SightingForm></SightingForm></div>

      <div class="identifying-container">
        <h1>About the species!</h1>
        <div style={{display:'grid',gridTemplateColumns:'33% 33% 33%'}}>
        <SpeciesInfo  tick_name={"Marsh Tick"} image={"MarshTick.png"} description={"Ornately coloured Tick with unfed size being around 3.9-4.8mm"}></SpeciesInfo>
        <SpeciesInfo tick_name={"Southern Rodent Tick"} image={"SouthernRodentTick.png"} description={"Small and flat with unfed size being between 2.2-2.5mm"}/>
        <SpeciesInfo tick_name={"Passerine Tick"} image={"PasserineTick.png"} description={"Males between 2.1mm-2.3, Females range 2.8mm-3.2mm"}/>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'50% 50%'}}>
        <SpeciesInfo tick_name={"Tree-Hole Tick"} image={"TreeholeTick.png"} description={"Between 2.4-2.7mm unfed, Mostly feeds off birds that nest in boxes or holes eg Great Tit"}/>
        <SpeciesInfo tick_name={"Fox/Badger Tick"} image={"FoxBadgerTick.png"} description={"Males between 2-2.2mm, Females range between 2.8-3.2mm unfed"}/>
        </div>
        
      </div>

      <div style={{width:'80%',padding:' 0 200px 0 200px',}}>
        <h1 style= {{textAlign:'center'}}>How to prevent getting bitten</h1>
        <ul>
          <li>Avoid going in tall grass by sticking to paths when walking.</li>
          <li>Try and wearlonger clothing to completely cover yourself.</li>
          <li>Check yourself fully after coming back from the outdoors.</li>
          <li>For your pets get a tick treatment, which either kills ticks before infection, or repels them</li>
        </ul>
      </div>
      
      
    </div>

  )
}

export default App
