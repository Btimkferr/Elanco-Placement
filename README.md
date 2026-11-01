Hi there Becky/Ian/any other colleagues.
Please find attached a static web service render [Here](https://elanco-placement-1.onrender.com/) which you can use to interact with the program once it's been woken up.

Api calls can also be made to this point if they're followed with /api/sightings/ [eg. counts](https://elanco-placement-1.onrender.com/api/sightings/counts)

This website aims to provide an insight to the general public about tick sightings in the UK, provided by how common they are in different areas, the species concentration regionally, and general trends over time.

I've used Node/React for the sake of quick development given the time restraints, and ease of communication between the two. Node allows me access to a wide range of libraries that I've implemented in this program.
The major libraries used are leaflet, and dependent react versions of this, which was used to implement the heatmap, and Chart JS which was used to render the graph components.
From the initial API provided I have cloned the data into a MySQL database instance hosted using AWS, and broken the values down into respective tables, to group together reusable data. The commands used to do this are in backend/utils/import.js
The DB is then communicated with on the backend using mysql2. Any requests are handle using Express, which I have chosen due to ease of use for a simpler web application like this, whilst allowing room for scalability.
The frontend is built using vite and react, which would allow for scalability for more displays and visuals, as well as consistency of reusable components. 
The use of use states allowed me to dynamically update the single page with different information, without having to reroute the user, leading to a more streamlined user experience.

Walkthrough video is included [here](https://youtu.be/tOezGopXUGQ)

Hopefully you've enjoyed,
Beck
