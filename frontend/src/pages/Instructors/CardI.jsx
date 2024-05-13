import React from 'react'

export const CardI = ({item}) => {
    const{_id,name,email,phoneNo,qualification,experience,specialities}=item;
  return (
    <div className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4'>
        <div className='p-4'>
            <h2 className='text-xl font-semibold mb-20 text-black dark:text-white text-center'>{name}</h2>
            <p className='text-black mb-2 text-center'><span className='font-bold'>Email: </span>{email}</p>
            <p className='text-black mb-2 text-center'><span className='font-bold'>Contact Number: </span>{phoneNo}</p>
            <p className='text-black mb-2 text-center'><span className='font-bold'>Qualifications: </span>{qualification}</p>
            <p className='text-black mb-2 text-center'><span className='font-bold'>Experiences: </span>{experience}</p>
            <p className='text-black mb-2 text-center'><span className='font-bold'>Specialities: </span>{specialities}</p>
            <div className='text-center'>
                <button className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                    Request
                </button>
            </div>
        </div>
    </div>
  )
}
export default CardI