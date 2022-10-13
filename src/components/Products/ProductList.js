import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Product.css"


export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const localHoneyUser = localStorage.getItem("honey_user");
    // //this is a string, so needs to be converted to an object using JSON.parse:
    const honeyUserObject = JSON.parse(localHoneyUser); //this will now be an object with two keys on it: id and staff


    useEffect (() => {
        fetch(`http://localhost:8088/products?_sort=name&_order=asc&_expand=productType`)
        .then((res) => res.json())
        .then((productsArr) => {
            setProducts(productsArr)
    })
        
    },[]
    )

    return (
    <>
        <h2>List of Products</h2>
        {<div className="product-area">
        {
            products.map((product) => {
                return (
                <section className="product-list" key={product.id}>
                <h3 className="product-name">{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Type: {product.productType.productType}</p>
                </section> )
            } )
        }
        </div>
    }

    </>)

}