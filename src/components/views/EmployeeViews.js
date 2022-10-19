import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeDetails } from "../Employees/EmployeeDetails"
import { EmployeeList } from "../Employees/EmployeeList"
import { HiringForm } from "../Employees/HiringForm"
import { LocationList } from "../Locations/LocationList"
import { ProductContainer } from "../Products/ProductContainer"
import { ProductForm } from "../Products/ProductForm"
import { CustomerList } from "../Customers/CustomerList"
import { CustomerDetails } from "../Customers/CustomerDetails"

//all routes are stored here. Default route path is /

export const EmployeeViews = () => {
	return (<>
	 <Routes>
            <Route path="/" element={
                <>
                    <h1 className="kandy-header">Kandy Korner</h1>
                    <div className="kandy-subheader">Biggest Selection of Sweets in the South!</div>
					<div>
						<img src="/images/candy-img4.png" className="welcome-img"/>
					</div>
					<div className="page-divider"></div>
                    <Outlet />
                </>
            }>
                <Route path="locations" element={ <LocationList /> } />
				<Route path="products" element={ <ProductContainer />} />
				<Route path="addproduct" element={ <ProductForm /> } />
				<Route path="hiring-form" element={ <HiringForm /> } />
                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="employees/:employeeId" element={ <EmployeeDetails/> }/>
                <Route path="customers" element={ <CustomerList /> } />
                <Route path="customers/:customerId" element={ <CustomerDetails/> }/>
            </Route>
        </Routes>
    

	</>
	)
}

