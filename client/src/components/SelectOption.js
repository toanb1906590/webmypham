import React from 'react';

const SelectOption = ({icons}) => {
  return (
    <div className='w-10 h-10 bg-white border rounded-full shadow-md flex justify-center items-center hover:bg-black hover:text-white cursor-pointer'>
      {icons}
    </div>
  );
}

export default SelectOption;
