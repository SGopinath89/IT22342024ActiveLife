import React from 'react'

const CardW = ({item}) => {
    //console.log(item)
    const{id:_id,name,numberOfDays,howToDo}=item;
  return (
    <div className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4'>
        <div className='p-4'>
            <h2 className='text-xl font-semibold mb-20 dark:text-white text-center'>{name}</h2>
            <p className='text-black mb-2 text-center'><span className='font-bold'>Total Number of Days: </span>{numberOfDays}</p>
            <p className='text-black mb-2 text-center'><span className='font-bold'>Steps :</span>
            
            {howToDo.split(' ').map(word => {
                if (word === "Step") {
                    return (
                        <React.Fragment >
                        <br /> <span className="font-bold">{word} </span>
                        </React.Fragment>
                    );
                } else {
                return word + ' ';
                }
            })}
          
            </p><br/>
            <div className='text-center'>
                <button className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                    Add
                </button>
            </div>
        </div>
    </div>
  )
}
export default CardW