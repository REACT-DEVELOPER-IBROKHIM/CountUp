import { Outlet, useOutletContext } from "react-router-dom"

const Filter = () => {
  const [ query, data, tableHeaders, isLoading, isFetching, page, nextPage, limit, handleLimit, {userType}] = useOutletContext()
  return (
    <div>
      <Outlet context={[query, data, tableHeaders, isLoading, isFetching, page, nextPage, limit, handleLimit, userType]}/>
    </div>
  )
}

export default Filter