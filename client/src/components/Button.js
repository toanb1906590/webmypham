import React, {memo} from 'react';

const Button = ({name, handleOnClick, iconsBefore, iconsAfter, style, fw}) => {
  return (
    <button
        type='button'
        className={style ? style : `px-4 py-2 rounded-md text-white bg-main text-semibold my-2 ${fw? `w-full` : `w-fit`}`}
        onClick={() => {handleOnClick && handleOnClick()}}
    >
        {iconsBefore}
        <span>{name}</span>
        {iconsAfter}
    </button>
  );
}

export default memo(Button);
