import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Customer.css"

export const CustomerOrders = () => {
    const [purchases, setPurchases] = useState([])
 
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {        
        fetch (`http://localhost:8088/purchases?_expand=product&customerId=${kandyUserObject.id}`)
            .then(res => res.json())
            .then((data) => {
                    setPurchases(data)
                    console.log(data)
            })
        },[]
    )

    return <>
      <h2 className="customerHeader">Your Orders</h2>
      <article className="product-area">
        {
            purchases.map((purchase) => {
                return <>
                <section className="product-list" key={purchase.id}>
                <h3 className="product-name">{purchase?.product?.name}</h3>
                <p className="product-text">Price: ${purchase?.product?.price}</p>
                </section>
                </>
            })
        }
    </article>
    </>
}
