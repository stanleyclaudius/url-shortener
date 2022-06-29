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
      <div className='flex flex-col h-screen'>
        <Navbar />
        <div className='flex flex-col justify-center flex-1'>
          <div className='text-center'>
            <h1 className='text-3xl font-semibold text-primaryHover mb-4'>Create Short Links!</h1>
            <p className='text-sm text-gray-700 w-full max-w-[600px] leading-7 m-auto'>URL Shortify is a custom link personalization tool that enables you to target, engage, and drive more customers. Get started for free.</p>
            <div className='m-auto bg-white shadow-xl w-full max-w-[700px] rounded-lg border border-gray-100 p-7 mt-7'>
              <div className='bg-gray-100 p-4 rounded-md flex items-center gap-4'>
                <BsLink45Deg className='text-3xl text-gray-500' />
                <input type='text' value={url} onChange={e => setUrl(e.target.value)} placeholder='Paste a link to shorten it' className='w-full bg-transparent text-sm outline-0 text-gray-500' />
                <button onClick={() => setOpenModal(true)} className='text-sm bg-primary hover:bg-primaryHover transition-all rounded-md outline-0 shadow-xl text-white px-4 py-3'>Shorten</button>
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