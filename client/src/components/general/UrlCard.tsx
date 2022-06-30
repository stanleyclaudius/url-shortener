import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface IProps {
  shorterURL: string
  originalURL: string
}

const UrlCard = ({ shorterURL, originalURL }: IProps) => {
  return (
    <div className='p-5 rounded-md shadow-xl border border-gray-100'>
      <div className='mb-5'>
        <p className='text-gray-500 text-xs mb-2'>Shorter URL</p>
        <Link to='/' target='_blank' className='text-gray-800 text-sm break-words'>{shorterURL}</Link>
      </div>
      <div className='mb-5'>
        <p className='text-gray-500 text-xs mb-2'>Original URL</p>
        <Link to='/' target='_blank' className='text-gray-800 text-sm break-words'>{originalURL}</Link>
      </div>
      <FaTrash className='text-red-500 cursor-pointer' />
    </div>
  )
}

export default UrlCard