import { Outlet, useOutletContext } from "react-router-dom"

const Filter = () => {
  const outletData = useOutletContext();
  return (<Outlet context={outletData}/>)
}

export default Filter