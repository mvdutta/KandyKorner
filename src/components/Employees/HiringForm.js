import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const HiringForm = () => {
    const [userInput, setUserInput] = useState({
        fullName:"",
        startDate: "",
        payRate: 0,
        email: "",
        locationId: 0,
    })
    const [currentUsers, setCurrentUsers] = useState([])
    const [locations, setLocations] = useState([])


    useEffect(
        () => {
            const fetches = [fetch(`http://localhost:8088/employees?_expand=location&_expand=user`)
            .then(res => res.json()),
            fetch(`http://localhost:8088/locations`)
            .then(res => res.json())]

            Promise.all(fetches).then((data) => {
                    setCurrentUsers(data[0]) 
                    setLocations(data[1])
                })

        }, []
    )
    
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const userObject = {
            fullName: userInput.fullName,
            email: userInput.email,
            isStaff: true
        }

        fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(userObject)
        }).then(res => res.json()).then((data) => {
            const employeeObject = {
                startDate: userInput.startDate,
                payRate: +userInput.payRate,
                userId: data.id,
                locationId: +userInput.locationId
            }
            fetch(`http://localhost:8088/employees`, {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(employeeObject)
            })
        }).then(() => {
            navigate("/employees")
        })
    }

const locationOptions = locations.map((location) => {
    return <option key={location.id} value={location.id}>{location.name}</option>
})



return (
    <form className="productForm">
        <h2 className="product-form-title">Add New Employee</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name" className="form-text">Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-input"
                    placeholder="Enter name"
                        onChange={(evt) => {
                            const userInputCopy = {...userInput}
                            userInputCopy.fullName = evt.target.value
                            setUserInput(userInputCopy)
                        }}
                    />
            </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
                <label htmlFor="date" className="form-text">Start Date:</label>
                <input
                    required 
                    type="text"
                    className="form-input"
                    placeholder="Enter start date"
                        onChange={(evt) => {
                            setUserInput({...userInput, startDate : evt.target.value})
                        }}
                 />
            </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
                <label htmlFor="payRate" className="form-text">Pay Rate</label>
                <input
                    required 
                    type="number"
                    className="form-input"
                    placeholder="Enter pay rate"
                    onChange={(evt) => {
                        setUserInput({...userInput, payRate : evt.target.value})
                    }}
                    />
            </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
                <label htmlFor="email" className="form-text">Email:</label>
                <input
                    type="email"
                    className="form-input"
                    placeholder="Enter email"
                    onChange={(evt) => {
                        setUserInput({...userInput, email : evt.target.value})
                    }}
                    />
            </div>
        </fieldset>
        <fieldset>
                <div className="form-group">
                <div className="location-label">
                <label className="location-option" htmlFor="locations">Choose a Location:</label>
                </div>
                <div>
                    <select className="location-select form-input" name="locations" id="locations" onChange={(evt) => {
                            setUserInput({...userInput, locationId : evt.target.value})
                        }}>
                        <option key={0} value="" >Choose a Location</option>
                        {locationOptions}
                    </select>
                </div>
                </div>


            </fieldset>
       
        <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="button-form">
            Enroll
        </button>
    </form>
)
}