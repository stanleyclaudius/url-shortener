import { useState } from 'react'
import { BsLink45Deg } from 'react-icons/bs'
import ShortenLinkModal from '../components/modal/ShortenLinkModal'
import Navbar from './../components/general/Navbar'
import Head from './../utils/Head'

const Home = () => {
  const [openModal, setOpenModal] = useState(false)
  const [url, setUrl] = useState('')

  return (
    <>
      <Head title='Home' />
      <div className='flex flex-col h-screen relative overflow-hidden'>
        <img src='/images/right-illustration.png' alt='URL Shortify' width={500} className='md:block hidden absolute -top-1 right-0 -z-[999]' />
        <img src='/images/left-illustration.png' alt='URL Shortify' className='md:block hidden absolute bottom-0 left-0 -z-[999]' />
        <img src='/images/bottom-illustration.png' alt='URL Shortify' className='md:block hidden absolute -bottom-36 -right-32 -z-[999]' />
        <Navbar />
        <div className='flex flex-col justify-center flex-1 px-6'>
          <div className='text-center'>
            <h1 className='text-3xl font-semibold text-primaryHover mb-4'>Create Short Links!</h1>
            <p className='text-sm text-gray-700 w-full max-w-[600px] leading-7 m-auto'>URL Shortify is a custom link personalization tool that enables you to target, engage, and drive more customers. Get started for free.</p>
            <div className='m-auto bg-white shadow-xl w-full max-w-[700px] rounded-lg border border-gray-100 p-7 mt-7'>
              <div className='md:bg-gray-100 md:p-4 rounded-md flex md:flex-row flex-col items-center gap-4'>
                <div className='md:bg-transparent md:p-0 p-4 md:rounded-none rounded-md bg-gray-100 flex items-center gap-4 flex-1 w-full'>
                  <BsLink45Deg className='text-3xl text-gray-500' />
                  <input type='text' value={url || ''} onChange={e => setUrl(e.target.value)} placeholder='Paste a link to shorten it' className='w-full bg-transparent text-sm outline-0 text-gray-500' />
                </div>
                <button onClick={() => setOpenModal(true)} className='mt-2 md:mt-0 text-sm bg-primary hover:bg-primaryHover transition-all rounded-md outline-0 shadow-xl text-white px-4 py-3'>Shorten</button>
              </div>
            </div>
            <p className='text-xs text-gray-400 mt-7'>Use it, it's Free - Fast - Secure - Long Term Link</p>
          </div>
        </div>
      </div>

      <ShortenLinkModal
        url={url}
        setUrl={setUrl}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  )
}

export default Home