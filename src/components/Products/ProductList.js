import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Product.css"


export const ProductList = ({ searchTermState }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])//This is the display list
    const [topPriced, setTopPriced] = useState([false])
    const [productLocations, setProductLocations] = useState([])
    const [locations, setLocations] = useState([])
    const [customers, setCustomers] = useState([])
    const navigate = useNavigate()//useNavigate is a hook that gives us a function to help with navigation. All we have to do is give it a path and it will navigate to that path

    const localKandyUser = localStorage.getItem("kandy_user");
    // //this is a string, so needs to be converted to an object using JSON.parse:
    const kandyUserObject = JSON.parse(localKandyUser); //this will now be an object with two keys on it: id and staff

  
    useEffect (() => {
            const fetches = [
                fetch(`http://localhost:8088/products?_sort=name&_order=asc&_expand=productType`).then((res) => res.json()),
                fetch(`http://localhost:8088/productLocation`).then((res) => res.json()),
                fetch(`http://localhost:8088/locations`).then((res) => res.json()),
            ]
            Promise.all(fetches).then((data) => {
                setProducts(data[0])
                setFilteredProducts(data[0])
                setProductLocations(data[1])
                setLocations(data[2])       
            })
        
    },[]
    )

    useEffect(() => {
        if (topPriced) {
        const topPricedProducts = products.filter((product) => product.price > 2.00);
        setFilteredProducts(topPricedProducts);
        } else {
            setFilteredProducts(products)
        }
    }, [topPriced])

    useEffect(
        () => {
            const searchedProducts = products.filter(product => {
              return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredProducts(searchedProducts)
        }, [searchTermState]
      )

    const handleClick = (id) => {
        const locationIds = productLocations.filter((pl) => pl.productId === id).map((filteredPl => filteredPl.locationId))
        const foundLocations = locations.filter((location) => locationIds.includes(location.id))
        let locationString = ""
        for(let loc of foundLocations) {
            locationString += `Name: ${loc.name}\nAddress: ${loc.address}\n----\n`
        }
        window.alert(locationString)
    }

    useEffect(
        () => {
            fetch (`http://localhost:8088/customers`)
                .then(res => res.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
                })
        },[]
    )


    return (       
    <>
    {kandyUserObject.staff
    ?<>
    <button onClick={() => {setTopPriced(true);}}>Top Priced</button>
    <button onClick={() => {setTopPriced(false);}}>Show All</button>
    <button onClick={() => {navigate("/addproduct")}} >Add Product</button>
    </>:""
    }     
        <h2 className="product-header">List of Products</h2>
        {<div className="product-area">
        {
                filteredProducts.map((product) => {
                return (
                <section className="product-list" key={product.id}>
                <h3 className="product-name">{product.name}  { searchTermState === ""? "": <span
                className="product-link"><Link to="" onClick={() => {handleClick(product.id)}}>Show me where</Link></span>}</h3>
                <p className="product-text">Price: ${product.price}</p>
                { searchTermState === ""?<>
                <p className="product-text">Type: {product.productType.productType}</p>
                </>
                :""    
                }
                {!kandyUserObject.staff &&
                <button className= "purchase-button"
                    onClick={()=>{
                        return fetch(`http://localhost:8088/purchases`, {
                        method: "POST",
                        headers:{
                        "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                            customerId: kandyUserObject.id,
                            productId: product.id,
                            units: 0
                        })
                     })
                    .then(res => res.json())
                    .then(() => {
                    })
                }}
                >Purchase</button> }
                </section> )
            } )
        }

     
        </div>
    }

    </>)

}