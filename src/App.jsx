import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AuthContext from "./context/authContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import Departments from "./components/departments/Departments";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepart from "./components/departments/EditDepart";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import ViewEmployee from "./components/employee/ViewEmployee";
import EditEmployee from "./components/employee/EditEmployee";
import AddSalary from "./components/salary/AddSalary";
import ViewSalary from "./components/salary/ViewSalary";
import EmployeeSummary from "./components/employeeDashboard/EmployeeSummary";
import LeavesList from "./components/leaves/LeavesList";
import AddLeave from "./components/leaves/AddLeave";
import Settings from "./components/employeeDashboard/Settings";
import AdminLeaves from "./components/leaves/AdminLeaves";
import LeaveDetail from "./components/leaves/LeaveDetail";
import AdminSetting from "./components/dashboard/AdminSetting";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContext>
        <Routes>
          <Route path="/" element={<Navigate to="login" />} />

          <Route path="/admin-dashboard" element={
            <PrivateRoutes >
              <RoleBasedRoutes requiredRole={["manager"]} >
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }>
            <Route index element={<AdminSummary />}></Route>

            <Route path="/admin-dashboard/employees" element={<EmployeeList />} />
            <Route path="/admin-dashboard/add-employee" element={<AddEmployee />} />
            <Route path="/admin-dashboard/employee/:id" element={<ViewEmployee />} />
            <Route path="/admin-dashboard/employee/edit/:id" element={<EditEmployee />} />
            <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />} />
            <Route path="/admin-dashboard/employees/leaves/:id" element={<LeavesList />} />

            <Route path="/admin-dashboard/leaves" element={<AdminLeaves />} />
            <Route path="/admin-dashboard/leaves/:id" element={<LeaveDetail />} />


            <Route path="/admin-dashboard/departments" element={<Departments />} />
            <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
            <Route path="/admin-dashboard/department/:id" element={<EditDepart />} />

            <Route path="/admin-dashboard/salary/add" element={<AddSalary />} />

            <Route path="/admin-dashboard/setting" element={<AdminSetting />} />

          </Route>

          <Route
            path="/employee-dashboard"
            element={
              <PrivateRoutes>
                <RoleBasedRoutes requiredRole={["employee", "manager"]} >
                  <EmployeeDashboard />
                </RoleBasedRoutes>
              </PrivateRoutes>
            } >
            <Route index element={<EmployeeSummary />} />

            <Route path="/employee-dashboard/profile/:id" element={<ViewEmployee />} />
            <Route path="/employee-dashboard/leaves/:id" element={<LeavesList />} />
            <Route path="/employee-dashboard/add-leave" element={<AddLeave />} />
            <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />} />
            <Route path="/employee-dashboard/setting" element={<Settings />} />

          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContext>
    </BrowserRouter>
  )
}

export default App;