import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

//component to capture all details of an individual customer. this component should only be displayed when the route matches customer/customerId and this is where we will capture that employeeId, using the hook in react router DOM called useParams
export const CustomerDetails = () => {
    const {customerId} = useParams()//pulls in that object created from route parameters and then can extract any variable that you define. 
    //we want to display all the details about customer so need a new state variable:
    const [customer, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)//getting customerId from the route parameter
            .then(res => res.json())
            .then((data) => {//response that we get back will be an array with a simgle customer's details
                const singleCustomer = data[0]//only going to be one customer each time
                //state variable now needs to be updated with the value of the variable singleEmployee, which is an object
                setCustomers(singleCustomer)
            })
        },
        [customerId]
    )


    return <section className="customer customer-section">
    <header className="customer__header">{customer?.user?.fullName}</header>
    <div className="cusotmer-text">Email: {customer?.user?.email}</div>
    <div className="customer-text">Loyalty Number: {customer.loyaltyNum}</div>
    </section>
}