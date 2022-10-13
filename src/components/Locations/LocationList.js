import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Location.css"


export const LocationList = () => {
    const [locations, setLocations] = useState([])
  


    useEffect (() => {
        fetch(`http://localhost:8088/locations`)
        .then((res) => res.json())
        .then((locationArr) => {
            setLocations(locationArr)
    })
        
    },[]
    )

    return (
    <>
        <h1>List of Locations</h1>
        {<div className="location-area">
        {
            locations.map((location) => {
                return (
                <section className="location-list" key={location.id}>
                <h2 className>{location.name}</h2>
                <p>Address: {location.address}</p>
                <p>Square Footage: {location.squareFeet}</p>
                </section> )
            } )
        }
        </div>
    }

    </>
    )
}