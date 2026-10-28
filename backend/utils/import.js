const mysql = require('mysql2/promise');
const config = require('./config');
const fs = require('fs');

const url = 'https://dev-task.elancoapps.com/data/tick-sightings';


//file containing functions using to take in and sanitize data, into MySQL db

const importFunc = async (request, response) => {
    const con = mysql.createPool({
        host: process.env.DB_HOST,
        port: config.DB_PORT,
        database: config.DB_NAME,
        user: config.DB_USER,
        password: config.DB_PASS,
        ssl: { rejectUnauthorized: false, ca: fs.readFileSync('./global-bundle.pem') },
    });

    const getSightings = await fetch(url);
    const data = await getSightings.json();
    //console.log(data);

    const rows = data.map(r => ([
        r.date ?? null,
        r.location ?? null,
        r.species ?? null,
        r.latinName ?? null

    ]));
    //console.log(rows);

    

    rows.forEach(r => {
        const statement = `INSERT INTO Unformatted_data (date_time,location,species,latin_species) VALUES (?,?,?,?)`;
        con.query(statement, r);
    })

    
    console.log("inserted :)");
    


};

const updateCities=  async ( request,response) =>{
    const con = mysql.createPool({
        host: process.env.DB_HOST,
        port: config.DB_PORT,
        database: config.DB_NAME,
        user: config.DB_USER,
        password: config.DB_PASS,
        ssl: { rejectUnauthorized: false, ca: fs.readFileSync('./global-bundle.pem') },
    });

    const [rows] = await con.execute("SELECT location_id,place_name FROM Location");
    
    console.log(rows);
    
    
    rows.forEach(c => {
        console.log(c.location_id);
        const updateQuery = `UPDATE Unformatted_data SET location = ${c.location_id} WHERE location = '${c.place_name}'`;
        con.execute(updateQuery);
    })
        

    console.log("Updated cities");
    con.end();

    

}

const updateSpecies = async (request,response) => {
    const con = mysql.createPool({
        host: process.env.DB_HOST,
        port: config.DB_PORT,
        database: config.DB_NAME,
        user: config.DB_USER,
        password: config.DB_PASS,
        ssl: { rejectUnauthorized: false, ca: fs.readFileSync('./global-bundle.pem') },
    });

    const [rows] = await con.execute("SELECT species_id, tick_name FROM Species");

    rows.forEach( s => {
        const updateQuery = `UPDATE Unformatted_data SET species = ${s.species_id} WHERE species = '${s.tick_name}'`;   
        con.execute(updateQuery);
    })
    console.log(updateSpecies);
    


}

const formatTables = async( ) => {
    const con = mysql.createPool({
        host: process.env.DB_HOST,
        port: config.DB_PORT,
        database: config.DB_NAME,
        user: config.DB_USER,
        password: config.DB_PASS,
        ssl: { rejectUnauthorized: false, ca: fs.readFileSync('./global-bundle.pem') },
    });

    const res = await con.execute(`Update Unformatted_data SET date_time = REPLACE(date_time, 'T', ' ');

INSERT IGNORE INTO Sighting (sighting_id,sighting_date, sighting_time, location_id, species_ID)
SELECT id,date(date_time),DATE_FORMAT(date_time, '%H:%i:%s'), location, species
FROM Unformatted_data; 

DELETE FROM Sighting WHERE sighting_date is NULL`);

if(res){
    console.log("success");
}
}

