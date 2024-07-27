import { Outlet, useOutletContext } from "react-router-dom"

const Filter = () => {
  const outletData = useOutletContext();
  return (
    <div>
      <Outlet context={outletData}/>
    </div>
  )
}

export default Filter