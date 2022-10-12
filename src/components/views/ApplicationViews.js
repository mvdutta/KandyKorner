import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../Locations/LocationList"



export const ApplicationViews = () => {
	return (<>
	 <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <div>Biggest Selection of Sweets in the South!</div>
                    <Outlet />
                </>
            }>
                <Route path="Locations" element={ <LocationList /> } />
            </Route>
        </Routes>
    

	</>
	)
}

