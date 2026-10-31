const sightingRouter = require('express').Router();
const con = require('../database');


//will return sightings by location and amounts
sightingRouter.get('/counts', async(request, response) => {
    try {
        const [rows] = await con.execute("SELECT * FROM Sighting_Counts");
        response.json(rows);

    }catch (e){
        console.error("failed to fetch sighting counts");
        response.status(500).json({error: "Error Fetching"});
    }
    
})
sightingRouter.get('/yearly/:id', async(request, response) => {
    try {
        const query = "SELECT date_format(sighting_date, '%Y') as year, ifnull(count(Si.sighting_id),0) as amount, L.place_name " +
        "FROM Sighting Si Inner join Location L on (Si.location_id = L.location_id) WHERE Si.location_id = ? group by year order by year asc";
        const [rows] = await con.query(query,[request.params.id]);
        response.json(rows);
        
    }catch (e){
        console.error("Failed fetching by year :" + e);
    }
})
//gets a list of all locations, with place name
sightingRouter.get('/location', async (request,response) => {
   try{ 
        
        const[rows] = await con.execute("SELECT location_id, place_name FROM Location");
        response.json(rows);
   }catch (e){
        console.error("Failed to fetch by location Id");
        response.status(500).json({error:"Error fetching location sightings"});
       }
})

//returns the latests sighting
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
sightingRouter.get('/species/list', async (request, response) => {
    try{
        const query = "SELECT species_id, tick_name FROM Species"
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

    console.log("body: " ,body);
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
    if(isNaN(d) ){
        return response.status(400).json({error:"Enter a valid date"});
    }



    const [result] = await con.execute("INSERT INTO Sighting (sighting_date,sighting_time,location_id,species_id) VALUES (?,?,?,?)", [body.sighting_date,body.sighting_time,body.location_id,body.species_id]);
    if(result){
        updateCount(body.location_id);
    }
    response.status(201).json(result);
})




const updateCount =  async (location_id) => {
    const query = "Update Sighting_Counts Set sightings = sightings +1 Where location_id=?";
    await con.query(query, [location_id]);

};

module.exports = sightingRouter;