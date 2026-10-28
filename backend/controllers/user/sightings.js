const sightingRouter = require('express').Router();
const con = require('../database');


//will return sightings by location
sightingRouter.get('/counts', async(request, response) => {
    try {
        const [rows] = await con.execute("SELECT * FROM Sighting_Counts");
        response.json(rows);

    }catch (e){
        console.error("failed to fetch sighting counts");
        response.status(500).json({error: "Error Fetching"});
    }
    
})

sightingRouter.get('/species', async (request, response) => {
    
})

sightingRouter.post('/', async (request, response) =>{
    const body = request.body;
    console.log(body);
    console.log('content-type:', request.headers['content-type']);
    if(!body.sighting_time ){
        return response.status(400).json({error:"Must include time"});
    }else if(!body.sighting_date){
       return  response.status(400).json({error:"Must include date"});
    }else if(!body.location_id){
        return response.status(400).json({error:"Must include location"});
    }else if(!body.species_id){
        return response.status(400).json({error:"Must include species"});
    }
    let d = new Date(body.sighting_date);
    if(!isNaN(d) ){
        return response.status(400).json({error:"Enter a valid date"});
    }



    const [result] = await con.execute("INSERT INTO Sighting (sighting_date,sighting_time,location_id,species_id) VALUES (?,?,?,?)", [body.sighting_date,body.sighting_time,body.location_id,body.species_id]);
    response.status(201).json(result);
})


const updateCount = () => {};

module.exports = sightingRouter;