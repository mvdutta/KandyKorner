import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./Employee.css"

//function to set initial state, and in initial state useEffect, will fetch all of the employees from the API, pull them in, and in the JSX, will render (display) the name and email address of employees
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/users?isStaff=true`)
                .then(res => res.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },[]
    )
//will display all employees
    return <>
      <h2 className="employeeHeader">Current Employees</h2>
    <article className="employees">
        
        {//employee needs 3 props here: id, fullName, and email 
            employees.map(employee => <Employee key={`employee--${employee.id}`}
            id={employee.id} 
            fullName={employee.fullName} 
            email={employee.email} />)
        }       
    </article>
    </>
}
