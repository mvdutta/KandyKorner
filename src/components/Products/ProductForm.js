import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Product.css"

export const ProductForm = () => {
    //Add default properties to the initial state object: holds user input
    const [product, setProduct] = useState({//automatically gets updated as the user types into the form
        name: "",
        price: "",
        type: "",
        location:""
    })
    const [locations, setLocations] = useState([])
    const [productList, setProductList] = useState([])
    //get productTypes from database
    const [productTypes, setProductTypes] = useState([])//make new useState variable to store productTypes
    useEffect(()=>{
        fetch('http://localhost:8088/productTypes')
        .then(res=>res.json())
        .then(data=>{
            setProductTypes(data)
        }).then(() => {
            fetch(`http://localhost:8088/locations`)
            .then(res=>res.json())
            .then(data=>{
              setLocations(data)
          })
        }).then(()=>{
            fetch(`http://localhost:8088/products`)
            .then(res=>res.json())
            .then((data)=>{
                setProductList(data)
            })
        })
        
        
    }, [])
  //Use the useNavigation() hook to redirect the user to the product list
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        //need productTypeID:
        let productTypeId = 0//creating new variable that will hold productTypeId when new product is entered
        let newProductType ={} //this will be used for creating a new productType if user enters a product type that is not in the database
       

        // //search among productTypes where productTypes are stored in DB. check whether the entered product type exists in the database
        const matchedProductType = productTypes.find((type)=>type.productType===product.type) ////product.type is the info the user typed into the type field. matchedProductType will be the existing productType that matches what the user entered, and will be "undefined" if the user entered something new

        if (matchedProductType){//if matchedProductType is not undefined:
            productTypeId = matchedProductType.id //use the id of the matching productType
        } else {
            //create a new ProductTypeId, since the entered ProductType doesn't exist
            productTypeId = productTypes.length+1 
            //also create a new productType object with same properties as productType in DB for sending via fetch post and will be stored in newProductType.
            newProductType.id = productTypeId
            newProductType.productType = product.type
        }

        //create the new locationProduct
        let newProductLocation ={
            locationId: product.location,
            productId: productList.length+1
        }
        // console.log(newProductLocation)

        //create the object to be saved to the API
       const productToSendToAPI = {
            name: product.name,
            price: product.price,
            productTypeId: productTypeId
       }
        //Perform the fetch() to POST the object to the API
        fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        }).then(()=>{
            fetch(`http://localhost:8088/productLocation`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newProductLocation)
        })

        })
        .then(()=>{
            //make another post request for a new productType (i.e. send "newProductType ") ONLY if the user entereed a product type that doesn't exist in the database, i.e. matchedProductType is "undefined"
            if (!matchedProductType) {
                fetch(`http://localhost:8088/productTypes`, {
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(newProductType)
                })
            }
        }) 
        .then(() => {
            navigate("/products")
        })
    }

    const locationOptions =   locations.map((location) => {
            return  <option key={location.id} value={location.id}>{location.name}</option>
        })

    return (
        <form className="productForm">
            <h2 className="product-form-title">Add New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name" className="form-text">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-input"
                        placeholder="Enter product name"
                        value={product.name}
                        onChange={
                            (evt) => {
                                const copy = {...product}//making a copy of product (state)
                                copy.name = evt.target.value//here we are changing just the name property of that in the copy only from the user input
                                setProduct(copy)//makes sure that the product is updated to the latest version
                            }
                        } />
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
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = {...product}//making a copy of product (state)
                                copy.price = evt.target.value//here we are changing just the name property of that in the copy only from the user input
                                setProduct(copy)//makes sure that the product is updated to the latest version
                            }
                        } />
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
                        value={product.type}
                        onChange={
                            (evt) => {
                                const copy = {...product}//making a copy of product (state)
                                copy.type = evt.target.value//here we are changing just the name property of that in the copy only from the user input
                                setProduct(copy)//makes sure that the product is updated to the latest version
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <div className="location-label">
                <label className="location-option"htmlFor="locations">Choose a Location:</label>
                </div>
                    <div>
                    <select className="location-select form-input"name="locations" id="locations" onChange={(evt)=>{
                        const copy = {...product}
                        copy.location = evt.target.value
                        setProduct(copy)
                    }}>
                        <option key={0} value="" >Choose a Location</option>
                        {locationOptions}
                    </select>
                </div>
                </div>


            </fieldset>
            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="button-form">
                Submit Product
            </button>
        </form>
    )
}

