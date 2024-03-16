import React, { useState, useCallback } from 'react';
import { InputField, Button } from '../../components';
import { apiRegister, apiLogin, apiForgotPassword } from '../../apis/user';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
import { register } from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate()
  const dispath = useDispatch()

  const [payload, setPayload] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: ''
  })

  const resetPayload = () => {
    setPayload({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      mobile: ''
    })
  }

  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  const [email, setEmail] = useState('')
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email })
    console.log(response)
    if (response.success) {
      setIsForgotPassword(false)
      setEmail('')
      toast.success(response.mes)
    } else {
      toast.error(response.mes)
    }
  }

  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload
    if (isRegister) {
      const response = await apiRegister(payload)
      if (response.success) {
        Swal.fire('Congratulation', response.mes, 'success').then(() => {
          setIsRegister(false)
          resetPayload()
        })
      } else Swal.fire('Opps !', response.mes, 'error')

    } else {
      const response = await apiLogin(data)
      if (response.success) {
        dispath(register({ isLoggedIn: true, token: response.accessToken, userData: response.userdata }))
        navigate(`/${path.HOME}`)
      } else Swal.fire('Opps !', response.mes, 'error')
    }
  }, [payload, isRegister, navigate, dispath])

  return (
    <div className='w-screen h-screen relative'>
      {isForgotPassword && <div className='absolute top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50 animate-slide-top'>
        <div className='flex flex-col'>
          <label htmlFor='email'>Enter your email</label>
          <input
            type='text'
            id='email'
            className='w-[800px] p-4 border-b outline-none placeholder:text-sm'
            placeholder='Exp: email@gmail.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className='flex items-center justify-end mt-4 w-full '>
            <Button
              name='Submit'
              handleOnClick={handleForgotPassword}
              style='bg-blue-600 px-4 py-2 rounded-md text-white '
            />
            <Button
              name='Back'
              handleOnClick={() => setIsForgotPassword(false)}
            />
          </div>
        </div>
      </div>}
      <img src='https://img.pikbest.com/backgrounds/20220119/beauty-cosmetic-skin-care-pink-moisturizing-whitening-background_6238632.jpg!bw700'
        alt=''
        className='w-full h-full object-cover' />
      <div className='absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex'>
        <div className='p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]'>
          <h1 className='text-[28px] font-semibold text-pink-300 mb-8'>{isRegister ? 'Register' : 'Login'}</h1>
          {isRegister &&
            <div className='flex items-center gap-2'>
              <InputField
                value={payload.firstname}
                setValue={setPayload}
                nameKey='firstname'
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey='lastname'
              />
            </div>}

          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey='email'
          />
          {isRegister && <InputField
            value={payload.mobile}
            setValue={setPayload}
            nameKey='mobile'
          />}
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey='password'
            type='password'
          />
          <Button
            name={isRegister ? 'Register' : 'Login'}
            handleOnClick={handleSubmit}
            fw
          />
          <div className='flex items-center justify-between w-full my-2 text-sm'>
            {!isRegister && <>
              <span
                className='text-blue-500 hover:underline cursor-pointer capitalize'
                onClick={() => setIsForgotPassword(true)}
              >
                forgot your account?
              </span>
              <span
                className='text-blue-500 hover:underline cursor-pointer capitalize'
                onClick={() => setIsRegister(true)}
              >
                create account
              </span> </>}
          </div>
          {isRegister && <Button
            name='Cancel'
            handleOnClick={() => { setIsRegister(false); console.log(isRegister) }}
          />}
        </div>
      </div>
    </div>
  );
}

export default Login;
