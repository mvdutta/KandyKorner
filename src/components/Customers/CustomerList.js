import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./Customer.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/users?isStaff=false`)
                .then(res => res.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
                })
        },[]
    )
    return <>
      <h2 className="customerHeader">Current Customers</h2>
    <article className="customers">
        
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}
            id={customer.id} 
            fullName={customer.fullName} 
            email={customer.email} />)
        }       
    </article>
    </>
}
