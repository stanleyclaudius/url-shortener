import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { FormSubmit, InputChange } from './../../utils/Interface'
import { AppDispatch } from './../../redux/store'
import { isEmailValid } from './../../utils/helper'
import { register } from './../../redux/slice/authSlice'
import Button from './../general/Button'

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const RegisterModal = ({ openModal, setOpenModal }: IProps) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()

    if (!userData.name) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide your name to register.' }
      })
    }

    if (!userData.email) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide your email to register.' }
      })
    } else if (!isEmailValid(userData.email)) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide valid email address to register.' }
      })
    }

    if (!userData.password) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide your password to register.' }
      })
    }

    if (userData.password.length < 8) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Password should be at least 8 characters.' }
      })
    }

    if (userData.password !== userData.passwordConfirmation) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Password confirmation should be matched.' }
      })
    }

    await dispatch(register({
      name: userData.name,
      email: userData.email,
      password: userData.password
    }))

    setUserData({
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    })

    setOpenModal(false)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openModal && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.addEventListener('mousedown', checkIfClickedOutside)
  }, [openModal, setOpenModal])

  return (
    <div className={`${openModal ? 'opacity-100' : 'opacity-0'} ${openModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5`}>
      <div
        ref={modalRef}
        className={`${openModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[450px] bg-white rounded-md`}
      >
        <div className='flex items-center justify-between border-b border-gray-200 px-7 py-5'>
          <h2 className='text-lg'>Sign Up</h2>
          <AiOutlineClose className='text-xl cursor-pointer' onClick={() => setOpenModal(false)} />
        </div>
        <form className='px-7 py-5' onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label htmlFor='name' className='text-sm'>Name</label>
            <input type='text' name='name' id='name' value={userData.name} onChange={handleChange} autoComplete='off' className='w-full border border-gray-300 rounded-md outline-0 mt-3 indent-3 h-10 text-sm' />
          </div>
          <div className='mb-6'>
            <label htmlFor='email' className='text-sm'>Email</label>
            <input type='text' name='email' id='email' value={userData.email} onChange={handleChange} autoComplete='off' className='w-full border border-gray-300 rounded-md outline-0 mt-3 indent-3 h-10 text-sm' />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='text-sm'>Password</label>
            <input type='password' name='password' id='password' value={userData.password} onChange={handleChange} className='w-full border border-gray-300 rounded-md outline-0 mt-3 indent-3 h-10 text-sm' />
          </div>
          <div className='mb-6'>
            <label htmlFor='passwordConfirmation' className='text-sm'>Password Confirmation</label>
            <input type='password' name='passwordConfirmation' id='passwordConfirmation' value={userData.passwordConfirmation} onChange={handleChange} className='w-full border border-gray-300 rounded-md outline-0 mt-3 indent-3 h-10 text-sm' />
          </div>
          <div className='text-right'>
            <Button text='Sign Up' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterModal