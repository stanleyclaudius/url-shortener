import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='grid place-items-center h-screen'>
      <div>
        <img src='/images/logo.png' alt='URL Shortify' className='m-auto' />
        <h1 className='text-3xl font-medium mt-7'>Oops! Are you lost?</h1>
        <Link to='/' className='m-auto bg-primary hover:bg-primaryHover transition-all text-white rounded-md px-4 py-3 mt-9 text-sm block w-fit'>Back to Home</Link>
      </div>
    </div>
  )
}

export default NotFound