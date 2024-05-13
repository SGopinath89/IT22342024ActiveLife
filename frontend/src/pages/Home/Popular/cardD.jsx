import React from 'react'

const cardD = ({item}) => {
    const{id:_id,name,benefits}=item;
  return (
    <div className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4'>
        <div className='p-4'>
            <h2 className='text-xl font-semibold mb-20 dark:text-white text-center'>{name}</h2>
            <p className='text-gray-600 mb-2 text-center'>Benefits: {benefits}</p>
        </div>
    </div>
  )
  
}
export default cardD