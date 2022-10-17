import { useState } from "react"
import { ProductList } from "./ProductList"
import { ProductSearch } from "./ProductSearch"


export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    //two child components. How do we get them access to the same state? ProductSearch needs the setter function because it is the user input. So this parent component needs to pass a reference to the setter function down to ProductSearch. ProductList needs to know what the current search terms are so it can do the filtering and display the products that match, so it needs access to the state. Props can pass these values down to a child component
        return <>
            <ProductSearch setterFunction={setSearchTerms}/>
            <ProductList searchTermState={searchTerms}/>
        </>
}