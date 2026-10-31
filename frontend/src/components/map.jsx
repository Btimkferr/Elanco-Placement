import {MapContainer, useMap} from 'react-leaflet';

import HeatmapLayer from 'react-leaflet-heat-layer';
import {  useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-boundary-canvas';
import L from 'leaflet';    
import sightingService from '../services/sightings';


const Boundary = () =>{
    const map = useMap();

   

    //gets uk boundaries from nominatim, as to show only country on the map
    //ref this post https://stackoverflow.com/questions/70945771/how-to-show-only-one-country-using-react-leaflet
    useEffect(() => {
        if(!map){
            return;
        }
        const fetchBorders= async() => {
            const res = await fetch('https://nominatim.openstreetmap.org/search?country=uk&polygon_geojson=1&format=json');
            const getBorder = await res.json();
            const border = getBorder[0].geojson;
            const borderMap = new L.TileLayer.BoundaryCanvas("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    boundary: border,
                    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }
            )
            borderMap.addTo(map);
            
        }
        fetchBorders();
    }, [map])

}

const Heatmap = ({areas,setSelectedLocation}) => {
    const map =useMap();

    const onClickLocation =(e) =>{
       
        setSelectedLocation(e);
    }
    useEffect(() => {
        if(!map){
            return;
        }
        
        const heatAreas= areas.map(({latitude,longitude,sightings}) =>[Number(latitude),Number(longitude),Number(sightings)]);

        
        const max = Math.max(...(heatAreas.map(p =>p[2])));
       
        const min = Math.min(...(heatAreas.map(p =>p[2])));
        const range = max- min+1;
        const adjustedAreas =heatAreas.map(([latitude,longitude,count])=> [
            latitude,
            longitude,
            ((count-min)/range)
        ]
        )
        
        const heatLayer = L.heatLayer(adjustedAreas, {
            radius:25,
            blur:20,
            maxZoom:5,
            minOpacity:0.5,
            
        })

        const clickableLayer = L.layerGroup().addTo(map);
        const places = areas.map((({location_id, place_name, latitude, longitude}) => [Number(location_id),place_name,Number(latitude),Number(longitude)] ));

        places.forEach(([location_id, place_name, latitude, longitude]) =>{
            
            const marker= L.marker([latitude,longitude],
                {Icon:L.divIcon({
                    className:'invisibleMarker',
                    iconSize:[40,40]
                }),
                opacity:0
                }
            )
            marker.bindPopup(`<h3>${place_name}</h3`);
            marker.on('click', () => onClickLocation(location_id));
            marker.on('popupclose', () => {setSelectedLocation(null)});
            clickableLayer.addLayer(marker);

        })
        heatLayer.addTo(map);

        return () => {
            map.removeLayer(heatLayer);
            map.removeLayer(clickableLayer);
        }
        

    }, [areas])
}

const Map = ({setSelectedLocation}) => {
    const [points, setPoints] = useState([]);
    useEffect(() => {
        sightingService.getSightingCount().then(s=>{
            
            setPoints(s);
        }).catch(error => {
            console.error('Failed to fetch sighting counts', error);
        });

        

    }, [])
    
    

    return(
    <MapContainer center ={[54.002,-2.542]} zoom={6} style={{height:'85vh',width:'100%', alignItems:'center'}} >
        <Boundary/>
        <Heatmap areas={points} setSelectedLocation={setSelectedLocation}/>
    </MapContainer >
)}

export default Map