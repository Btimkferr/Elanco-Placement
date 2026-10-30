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
/*
sightingRouter.get('/location/:id', async (request,response) => {
   try{ const id = request.params.id;
     const statement ="SELECT Sp.tick_name,Count(Si.sighting_id) as amount, L.place_name "+
            "FROM Sighting Si "+
            "INNER JOIN Species Sp ON (Si.species_id = Sp.species_id) "+
            "INNER JOIN Location L ON (Si.location_id = L.location_id) "+
            "WHERE Si.location_id = ? "+
            "GROUP BY Si.species_id ";
    const[rows] = await con.execute(statement, id);
    response.json(rows);
   }catch (e){
        console.error("Failed to fetch by location Id");
        response.status(500).json({error:"Error fetching location sightings"});
       }
})
*/

sightingRouter.get('/latest', async (request, response) => {
    try {
        const [rows] =await con.execute("SELECT Si.*, Sp.tick_name FROM Sighting Si INNER JOIN Species Sp ON (Si.species_id = Sp.species_id) Order by sighting_date desc, sighting_time desc limit 1");
        response.json(rows[0]);
    }catch(e){
        console.error("failed to fetch latest sighting");
        response.status(500).json({error:"Error fetching sighting"});
    }
})

sightingRouter.get('/species', async (request, response) => {
    try{
        const query = "SELECT Sp.tick_name,Count(Si.sighting_id) as amount "+
            "FROM Sighting Si "+
            "INNER JOIN Species Sp ON (Si.species_id = Sp.species_id) "+
            "INNER JOIN Location L ON (Si.location_id = L.location_id) "+
            "GROUP BY Si.species_id "
        const [rows] =await con.execute(query);
        response.json(rows)
        
    }catch(e){
        console.error("failed to fetch species sightings");
        response.status(500).json({error:"Error fetching species sightings"});
    }
})

sightingRouter.get('/species/:id', async (request, response) => {
    try{
        const query = "SELECT Sp.tick_name,Count(Si.sighting_id) as amount, L.place_name "+
            "FROM Sighting Si "+
            "INNER JOIN Species Sp ON (Si.species_id = Sp.species_id) "+
            "INNER JOIN Location L ON (Si.location_id = L.location_id) "+
            "WHERE Si.location_id = ? "+
            "GROUP BY Si.species_id";
        const [rows] =await con.query(query, [request.params.id]);
        response.json(rows);
        
    }catch(e){
        console.error("failed to fetch species sightings");
        response.status(500).json({error:"Error fetching species sightings"});
    }
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