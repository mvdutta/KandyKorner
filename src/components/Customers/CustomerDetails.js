import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Customer.css"

//component to capture all details of an individual customer. this component should only be displayed when the route matches customer/customerId and this is where we will capture that customerId, using the hook in react router DOM called useParams
export const CustomerDetails = () => {
    const {customerId} = useParams()//pulls in that object created from route parameters and then can extract any variable that you define. 
    //we want to display all the details about customer so need a new state variable:
    const [customer, setCustomers] = useState([])
    const [loyalty, setLoyalty] = useState(0)

    const [feedback, setFeedback] = useState("")

    useEffect(() => {
    if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
    }
    }, [feedback])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)//getting customerId from the route parameter
            .then(res => res.json())
            .then((data) => {
                const singleCustomer = data[0]
                setCustomers(singleCustomer)
                setLoyalty(singleCustomer.loyaltyNum)
            })
        },
        [customerId]
    )


    const handleSaveButtonClick = (clickEvent) => {
        clickEvent.preventDefault()

       const newLoyaltyNum = {
        loyaltyNum: +loyalty,
        userId: +customer.userId

       }

          return fetch(`http://localhost:8088/customers/${customer.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newLoyaltyNum)
            })
            .then(res => res.json()) 
            .then(() => {
                setFeedback("Loyalty number successfully saved")
            })
            }


    return <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
        </div>
    <section className="customer customer-section">
    <header className="customer__header">{customer?.user?.fullName}</header>
    <div className="customer-text">Email: {customer?.user?.email}</div>
    <label className="customer-text" htmlFor="loyaltyNum">Loyalty Number:</label>
    <input type="Number" className="loyalty-input"  value= {loyalty} 
    onChange={
        (evt) => {
            setLoyalty(evt.target.value)
        }
    }/>
    <div>
        <button 
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="loyalty-button"
        >Update</button>
    </div>
    </section>
    </>

}