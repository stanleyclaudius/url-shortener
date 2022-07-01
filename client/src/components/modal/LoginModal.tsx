import { useState, useEffect, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { FormSubmit, InputChange } from './../../utils/Interface'
import { login } from './../../redux/slice/authSlice'
import { AppDispatch } from './../../redux/store'
import { isEmailValid } from './../../utils/helper'
import Button from './../general/Button'

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal = ({ openModal, setOpenModal }: IProps) => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()

    if (!userData.email) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide your email to login.' }
      })
    } else if (!isEmailValid(userData.email)) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide valid email address to login.' }
      })
    }

    if (!userData.password) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide your password to login.' }
      })
    }

    await dispatch(login(userData))
    setUserData({
      email: '',
      password: ''
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
          <h2 className='text-lg'>Sign In</h2>
          <AiOutlineClose className='text-xl cursor-pointer' onClick={() => setOpenModal(false)} />
        </div>
        <form className='px-7 py-5' onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label htmlFor='email' className='text-sm'>Email</label>
            <input type='text' name='email' id='email' value={userData.email} onChange={handleChange} autoComplete='off' className='w-full border border-gray-300 rounded-md outline-0 mt-3 indent-3 h-10 text-sm' />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='text-sm'>Password</label>
            <input type='password' name='password' id='password' value={userData.password} onChange={handleChange} autoComplete='off' className='w-full border border-gray-300 rounded-md outline-0 mt-3 indent-3 h-10 text-sm' />
          </div>
          <div className='text-right'>
            <Button text='Sign In' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginModal