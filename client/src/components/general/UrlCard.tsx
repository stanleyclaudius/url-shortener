import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { BsFillExclamationTriangleFill } from 'react-icons/bs'
import { AppDispatch, RootState } from './../../redux/store'
import { deleteUrl } from './../../redux/slice/urlSlice'

interface IProps {
  shorterURL: string
  originalURL: string
}

const UrlCard = ({ shorterURL, originalURL }: IProps) => {
  const [onDelete, setOnDelete] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const { auth } = useSelector((state: RootState) => state)

  const handleLogout = () => {
    dispatch(
      deleteUrl({
        id: shorterURL,
        token: `${auth.token}`
      })
    )
  }

  return (
    <div className='p-5 rounded-md shadow-xl border border-gray-100'>
      <div className='mb-5'>
        <p className='text-gray-500 text-xs mb-2'>Original URL</p>
        <a href={originalURL} target='_blank' rel='noreferrer' className='text-gray-800 text-sm break-words'>{originalURL}</a>
      </div>
      <div className='mb-5'>
        <p className='text-gray-500 text-xs mb-2'>Shorter URL</p>
        <Link to={`/${shorterURL}`} target='_blank' className='text-gray-800 text-sm break-words'>{window.location.href + shorterURL}</Link>
      </div>
      {
        onDelete
        ? (
          <div className='flex items-center justify-between'>
            <div onClick={handleLogout} className='flex items-center text-xs gap-2 cursor-pointer'>
              <BsFillExclamationTriangleFill className='text-orange-500 ' />
              <p className='text-orange-500'>Click again to confirm</p>
            </div>
            <p onClick={() => setOnDelete(false)} className='text-xs cursor-pointer'>Cancel</p>
          </div>
        )
        : <FaTrash onClick={() => setOnDelete(true)} className='text-red-500 cursor-pointer' />
      }
    </div>
  )
}

export default UrlCard