import React from 'react'
import image from "../../assets/empty.webp"

const Empty = ({title="Malumotlar topilmadi", w="100px", h="300px"}) => {
  return (
    <div style={{height:h}} className='flex flex-col justify-center items-center gap-3 p-3'>
        <img style={{width: w}} src={image} alt="" />
        <p className='text-slate-500 text-sm'>{title}</p>
    </div>
  )
}

export default Empty