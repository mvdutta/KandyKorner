import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

//all routes are stored here. Default route path is /

export const ApplicationViews = () => {
		const localKandyUser = localStorage.getItem("kandy_user");
   		const kandyUserObject = JSON.parse(localKandyUser);
		if(kandyUserObject.staff) {
			return <EmployeeViews />
		} else {
			return <CustomerViews />
		}
}

