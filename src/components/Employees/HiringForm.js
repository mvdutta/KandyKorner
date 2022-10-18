import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const HiringForm = () => {
    const [employee, setEmployee] = useState({
        startDate: "",
        payRate: "",
        locationId: 0,
        userId: ""
    })
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        isStaff: true
    })
    const [currentUsers, setCurrentUsers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=location&_expand=user`)
                .then(res => res.json())
                .then((data) => {
                    setCurrentUsers(data) 
                    console.log(data)     
                })

        }, []
    )
    
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newUserToSendToAPI = {
            fullName: user.fullName,
            email: user.email,
            isStaff: true
        }

        // fetch(`http://localhost: 8088/users`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(newUserToSendToAPI)
        // })
        //     .then(res => res.json())
        //     .then((data) =>)



    }





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

                    />
            </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
                <label htmlFor="price" className="form-text">Start Date:</label>
                <input
                    required 
                    type="text"
                    className="form-input"
                    placeholder="Enter start date"
                 />
            </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
                <label htmlFor="type" className="form-text">Pay Rate</label>
                <input
                    required 
                    type="text"
                    className="form-input"
                    placeholder="Enter pay rate"
                    />
            </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
                <label htmlFor="type" className="form-text">Email:</label>
                <input
                    type="email"
                    className="form-input"
                    placeholder="Enter email"
                    />
            </div>
        </fieldset>
        <fieldset>
                <div className="form-group">
                <div className="location-label">
                <label htmlFor="locations">Choose a Location:</label>
                </div>
                    <select name="locations" id="locations">
                        <option key={0} value="" >Choose a Location</option>

                    </select>
                </div>


            </fieldset>
       
        <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="button-form">
            Enroll
        </button>
    </form>
)
}