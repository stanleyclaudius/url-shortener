import { useState, useEffect, useRef } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  
  const sidebarRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openSidebar && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setOpenSidebar(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openSidebar])

  return (
    <div className='flex items-center justify-between md:px-20 md:py-5 px-6 py-6 w-full'>
      <Link to='/'>
        <h1 className='text-xl font-medium'>URL Shortify</h1>
      </Link>
      <div className='md:hidden block cursor-pointer' onClick={() => setOpenSidebar(true)}>
        <GiHamburgerMenu />
      </div>
      <div ref={sidebarRef} className={`md:p-0 p-6 flex md:flex-row flex-col md:items-center md:gap-10 gap-6 text-sm md:static fixed top-0 ${openSidebar ? 'right-0' : '-right-[2000px]'} md:h-auto h-screen md:shadow-none shadow-xl md:border-none border border-gray-200 md:w-auto w-[200px] md:bg-transparent bg-white transition-all`}>
        <div className='md:hidden block cursor-pointer' onClick={() => setOpenSidebar(false)}>
          <AiOutlineClose className='float-right' />
        </div>
        <div className='clear-both' />
        <Link to='/login' className='w-fit'>Sign In</Link>
        <Link to='/register' className='bg-primary hover:bg-primaryHover text-white rounded-md px-3 py-2 transition-all w-fit'>Sign Up</Link>
      </div>
    </div>
  )
}

export default Navbar