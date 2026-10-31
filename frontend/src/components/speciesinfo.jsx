const SpeciesInfo = ({tick_name, description, image}) => {
    return (
        <div>   
            <h3>{tick_name}</h3>
            <div>
                <img src={`/assets/${image}`} style={{height:'200px',width:'200px'}} />
                <p>{description}</p>
            </div>

        </div>
    )
}
export default SpeciesInfo