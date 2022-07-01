import { useDispatch, useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { deleteUrl } from '../../redux/slice/urlSlice'

interface IProps {
  id: number
  shorterURL: string
  originalURL: string
}

const UrlCard = ({ id, shorterURL, originalURL }: IProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { auth } = useSelector((state: RootState) => state)

  return (
    <div className='p-5 rounded-md shadow-xl border border-gray-100'>
      <div className='mb-5'>
        <p className='text-gray-500 text-xs mb-2'>Original URL</p>
        <a href={originalURL} target='_blank' rel='noreferrer' className='text-gray-800 text-sm break-words'>{originalURL}</a>
      </div>
      <div className='mb-5'>
        <p className='text-gray-500 text-xs mb-2'>Shorter URL</p>
        <Link to={`/${shorterURL}`} target='_blank' className='text-gray-800 text-sm break-words'>{shorterURL}</Link>
      </div>
      <FaTrash onClick={() => dispatch(deleteUrl({id, token: `${auth.token}`}))} className='text-red-500 cursor-pointer' />
    </div>
  )
}

export default UrlCard