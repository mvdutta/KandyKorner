import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {
    //Add the correct default properties to the initial state object:
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        type: ""
    })
    const [productTypes, setProductTypes] = useState([])
    useEffect(()=>{
        fetch('http://localhost:8088/productTypes')
        .then(res=>res.json())
        .then(data=>{
            setProductTypes(data)
        })
        
    }, [])
  //Use the useNavigation() hook so you can redirect the user to the ticket list
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        let productTypeId=""
        let newProductType ={}
        // //check whether the entered product type exists in the database
        const matchedProductType = productTypes.find((type)=>type.productType===product.type) //matchedProductType will be the existing productType that matches what the user entered
        if (matchedProductType){
            productTypeId = matchedProductType.id //use the id of the matching productType
        } else {
            productTypeId = productTypes.length+1 //create a new ProductTypeId, since the entered ProductType doesnt exist
            newProductType.id = productTypeId
            newProductType.productType = product.type
        }

        //create the object to be saved to the API
       const productToSendToAPI = {
        //can get description and emergency from the product state variable above:
            name: product.name,
            price: product.price,
            productTypeId
       }
        //Perform the fetch() to POST the object to the API
        fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
        .then(()=>{
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






    return (
        <form className="productForm">
            <h2 className="productForm__title">Add New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter the name of the product"
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
                    <label htmlFor="price">Price Per Unit:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter the price/unit"
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
                    <label htmlFor="type">Product Type:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
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
            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="button">
                Submit Product
            </button>
        </form>
    )
}

