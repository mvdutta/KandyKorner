import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerOrders } from "../Customers/CustomerOrders"
import { LocationList } from "../Locations/LocationList"
import { ProductContainer } from "../Products/ProductContainer"

//all routes are stored here. Default route path is /

export const CustomerViews = () => {
	return (<>
	 <Routes>
            <Route path="/" element={
                <>
                    <h1 className="kandy-header">Kandy Korner</h1>
                    <div className="kandy-subheader">Biggest Selection of Sweets in the South!</div>
					<div>
						<img src="images/candy-img4.png" className="welcome-img"/>
					</div>
					<div className="page-divider"></div>
                    <Outlet />
                </>
            }>
                <Route path="locations" element={ <LocationList /> } />
				<Route path="products" element={ <ProductContainer />} />
                <Route path="purchases" element={ <CustomerOrders/> }/>
            </Route>
        </Routes>
    

	</>
	)
}

