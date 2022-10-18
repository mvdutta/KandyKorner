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
                    placeholder="Enter product name"

                    />
            </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
                <label htmlFor="price" className="form-text">Price Per Unit:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-input"
                    placeholder="Enter price/unit"
                 />
            </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
                <label htmlFor="type" className="form-text">Product Type:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-input"
                    placeholder="Enter product type"
                    />
            </div>
        </fieldset>
       
        <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="button-form">
            Enroll
        </button>
    </form>
)
}