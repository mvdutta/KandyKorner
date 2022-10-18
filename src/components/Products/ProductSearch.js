import "./Product.css"


export const ProductSearch = ({setterFunction}) => {//this function now has access to the function setSearchTerms via the parent function ProductContainer
    return (
        <div className="product-search">
        <input className="product-input"
            onChange={//invoke setterFunction onChange
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
        type="text" placeholder="What candy are you looking for?"/>
        </div>
    )
}