import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const Protected = () => {
    const auth = useSelector(state => state.auth);
    if(!auth.token) return <Navigate to="/login"/>
    return <Outlet />
}

export default Protected