import React from 'react';

const InputField = ({ type, nameKey, value, setValue, invalidFields, setInvalidFields }) => {
    return (
        <div className='w-full relative'>
            {value?.trim() !== '' && <label
                className='text-[10px] absolute animate-slide-top-sm top-0 left-[12px] block bg-white px-1'
                htmlFor={nameKey}>{nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
            </label>}
            <input
                type={type || "text"}
                className='px-4 py-2 rounded-sm border w-full my-2 outline-none'
                placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
            />
        </div>
    );
}

export default InputField;
