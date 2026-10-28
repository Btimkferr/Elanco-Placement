import {MapContainer, useMap} from 'react-leaflet';
//import HeatmapLayer from 'react-leaflet-heat-layer';
import {  useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-boundary-canvas';
import L from 'leaflet';

const Boundary = () =>{
    const map = useMap();

    //fetches the boundaries of the uk from nominatim#
    /*
    useEffect(() => {
        fetch('https://nominatim.openstreetmap.org/search?country=uk&polygon_geojson=1&format=json')
        .then(result => result.json())
        .then(r => {
            setBorder(r[0].geojson);
        }).catch(e => console.error("Failed to get Uk boundary: ", e));
    })
        */

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
            const cutLayer =L.geoJSON(border);
            
            map.fitBounds(cutLayer.getBounds());
        }
        fetchBorders();
    }, [map])

}

const Map = () => {
    
    

    return(
    <MapContainer center ={[54.002,-2.542]} zoom={5} style={{height:'500px',width:'30%'}} >
        <Boundary/>
    </MapContainer>
)}

export default Map