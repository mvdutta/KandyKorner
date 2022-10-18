import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Product.css"


export const ProductList = ({ searchTermState }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])//This is the display list
    const [topPriced, setTopPriced] = useState([false])
    const navigate = useNavigate()//useNavigate is a hook that gives us a function to help with navigation. All we have to do is give it a path and it will navigate to that path

    const localKandyUser = localStorage.getItem("kandy_user");
    // //this is a string, so needs to be converted to an object using JSON.parse:
    const kandyUserObject = JSON.parse(localKandyUser); //this will now be an object with two keys on it: id and staff

  
    useEffect (() => {
        fetch(`http://localhost:8088/products?_sort=name&_order=asc&_expand=productType`)
        .then((res) => res.json())
        .then((productsArr) => {//once the products have been retrieved...
            setProducts(productsArr)//store them in the products state variable
            setFilteredProducts(productsArr)//And also store them in filteredProducts
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
                <h3 className="product-name">{product.name}</h3>
                <p className="product-text">Price: ${product.price}</p>
                { searchTermState === ""?
                <p className="product-text">Type: {product.productType.productType}</p>
                :""
                }
                </section> )
            } )
        }

     
        </div>
    }

    </>)

}