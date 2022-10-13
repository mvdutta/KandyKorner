import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../Locations/LocationList"
import { ProductForm } from "../Products/ProductForm"
import { ProductList } from "../Products/ProductList"

//all routes are stored here. Default route path is /

export const ApplicationViews = () => {
	return (<>
	 <Routes>
            <Route path="/" element={
                <>
                    <h1 className="kandy-header">Kandy Korner</h1>
                    <div className="kandy-subheader">Biggest Selection of Sweets in the South!</div>
                    <Outlet />
                </>
            }>
                <Route path="locations" element={ <LocationList /> } />
				<Route path="products" element={ <ProductList /> } />
				<Route path="addproduct" element={ <ProductForm /> } />
            </Route>
        </Routes>
    

	</>
	)
}

