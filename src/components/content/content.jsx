import { Outlet } from "react-router-dom"

const Content = () => {
  return (
    <div className='h-full p-[36px] rounded-lg shadow-3xl'>
        <Outlet /> 
    </div>
  )
}

export default Content