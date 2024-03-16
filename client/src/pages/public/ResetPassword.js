import React, { useState } from 'react';
import { Button } from '../../components';
import { useParams, useNavigate } from 'react-router-dom';
import { apiResetPassword } from '../../apis/user';
import { toast } from 'react-toastify';
import path from '../../ultils/path';

const ResetPassword = () => {

  const [password, setPassword] = useState('')
  const { token } = useParams()
  const navigate = useNavigate()

  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token })
    if(response.success){
      toast.success(response.mes)
      navigate(`/${path.LOGIN}`)
    }else{
      toast.error(response.mes)
    }
  }

  return (
    <div className='absolute top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50 animate-slide-top'>
      <div className='flex flex-col'>
        <label htmlFor='password' className='capitalize'>Enter your new password:</label>
        <input
          type='text'
          id='password'
          className='w-[800px] p-4 border-b outline-none placeholder:text-sm'
          placeholder='New password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className='flex items-center justify-end mt-4 w-full '>
          <Button
            name='Submit'
            handleOnClick={handleResetPassword}
            style='bg-blue-600 px-4 py-2 rounded-md text-white '
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
