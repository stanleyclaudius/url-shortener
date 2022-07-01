import { useState, useEffect,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { BsLink45Deg } from 'react-icons/bs'
import { FormSubmit } from './../../utils/Interface'
import { AppDispatch, RootState } from './../../redux/store'
import { isURLValid } from './../../utils/helper'
import { shortenUrl } from './../../redux/slice/urlSlice'
import Button from './../general/Button'

interface IProps {
  url: string
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setUrl: React.Dispatch<React.SetStateAction<string>>
}

const ShortenLinkModal = ({ url, openModal, setOpenModal, setUrl }: IProps) => {
  const [shorterUrl, setShorterUrl] = useState('')

  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch<AppDispatch>()
  const { auth } = useSelector((state: RootState) => state)

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()

    if (!auth.token) {
      setOpenModal(false)

      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Oops! You haven\'t login yet.' }
      })
    }

    if (!url) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide original URL that want to be shorten.' }
      })
    } else if (!isURLValid(url)) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide a valid URL.' }
      })
    }

    await dispatch(shortenUrl({
      body: {
        originalUrl: url,
        shorterUrl: shorterUrl
      },
      token: auth.token
    }))
    setUrl('')
    setShorterUrl('')
    setOpenModal(false)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openModal && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openModal, setOpenModal])

  return (
    <div className={`${openModal ? 'opacity-100' : 'opacity-0'} ${openModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5`}>
      <div
        ref={modalRef}
        className={`${openModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[600px] bg-white rounded-md`}
      >
        <div className='flex items-center justify-between border-b border-gray-200 px-7 py-5'>
          <h2 className='text-lg'>Shorten URL</h2>
          <AiOutlineClose className='text-xl cursor-pointer' onClick={() => setOpenModal(false)} />
        </div>
        <div className='p-7'>
          <form onSubmit={handleSubmit}>
            <div className='bg-gray-100 p-4 rounded-md flex items-center gap-4 mb-7'>
              <BsLink45Deg className='text-3xl text-gray-500' />
              <input type='text' value={url} onChange={e => setUrl(e.target.value)} placeholder='Paste a link to shorten it' className='w-full bg-transparent text-sm outline-0 text-gray-500' />
            </div>
            <div className='flex items-center gap-7 mb-7 px-12'>
              <div className='flex-1 h-[1px] border border-dashed border-gray-300' />
              <p className='text-sm text-gray-500'>To</p>
              <div className='flex-1 h-[1px] border border-dashed border-gray-300' />
            </div>
            <p className='text-xs text-red-500'>* Custom URL is automatically prefixed with {window.location.href}
            <p className='text-xs text-red-500 mb-4 mt-1'>* Input the custom URL only (e.g. cool-url)</p></p>
            <div className='bg-gray-100 p-4 rounded-md flex items-center gap-4 mb-7'>
              <BsLink45Deg className='text-3xl text-gray-500 shrink-0' />
              <input type='text' value={shorterUrl} onChange={e => setShorterUrl(e.target.value)} placeholder='Cutom shorter URL (optional)' className='w-full bg-transparent text-sm outline-0 text-gray-500' />
            </div>
            <div className='text-center'>
              <Button text='Shorten' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ShortenLinkModal