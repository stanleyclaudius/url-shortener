import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from './../../redux/store'
import { logout } from './../../redux/slice/authSlice'
import LoginModal from './../modal/LoginModal'
import RegisterModal from './../modal/RegisterModal'
import UrlsModal from './../modal/UrlsModal.'

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const [openUrlsModal, setOpenUrlsModal] = useState(false)
  
  const sidebarRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch<AppDispatch>()
  const { auth } = useSelector((state: RootState) => state)

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
    <>
      <div className='flex items-center justify-between md:px-20 md:py-5 px-6 py-6 w-full'>
        <Link to='/' className='outline-0 flex items-center gap-4'>
          <img src='/images/logo.png' width={20} alt='URL Shortify' />
          <h1 className='text-xl font-medium after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-[3px] after:bg-primary relative'>URL Shortify</h1>
        </Link>
        <div className='md:hidden block cursor-pointer' onClick={() => setOpenSidebar(true)}>
          <GiHamburgerMenu />
        </div>
        <div ref={sidebarRef} className={`md:p-0 p-6 flex md:flex-row flex-col md:items-center md:gap-10 gap-6 text-sm md:static fixed top-0 ${openSidebar ? 'right-0' : '-right-[2000px]'} md:h-auto h-screen md:shadow-none shadow-xl md:border-none border border-gray-200 md:w-auto w-[200px] md:bg-transparent bg-white transition-all`}>
          <div className='md:hidden block cursor-pointer' onClick={() => setOpenSidebar(false)}>
            <AiOutlineClose className='float-right' />
          </div>
          <div className='clear-both' />
          {
            auth.token
            ? (
              <>
                <p className='md:text-white text-black'>Hi, {auth.user?.name}</p>
                <p onClick={() => setOpenUrlsModal(true)} className='md:text-white text-black cursor-pointer'>My URLs</p>
                <p onClick={() => dispatch(logout(`${auth.token}`))} className='bg-primary cursor-pointer hover:bg-primaryHover text-white rounded-md px-3 py-2 transition-all w-fit'>Logout</p>
              </>
            )
            : (
              <>
                <p onClick={() => setOpenLoginModal(true)} className='w-fit cursor-pointer md:text-white text-black'>Sign In</p>
                <p onClick={() => setOpenRegisterModal(true)} className='bg-primary cursor-pointer hover:bg-primaryHover text-white rounded-md px-3 py-2 transition-all w-fit'>Sign Up</p>
              </>
            )
          }
        </div>
      </div>

      <LoginModal
        openModal={openLoginModal}
        setOpenModal={setOpenLoginModal}
      />

      <RegisterModal
        openModal={openRegisterModal}
        setOpenModal={setOpenRegisterModal}
      />

      <UrlsModal
        openModal={openUrlsModal}
        setOpenModal={setOpenUrlsModal}
      />
    </>
  )
}

export default Navbar