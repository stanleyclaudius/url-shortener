import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { AppDispatch, RootState } from './../../redux/store'
import UrlCard from './../general/UrlCard'
import { getUrls } from '../../redux/slice/urlSlice'

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const UrlsModal = ({ openModal, setOpenModal }: IProps) => {
  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch<AppDispatch>()
  const { url, auth } = useSelector((state: RootState) => state)

  useEffect(() => {
    if (auth.token)
      dispatch(getUrls(auth.token))
  }, [dispatch, auth.token])

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
        className={`${openModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[750px] max-h-[80%] bg-white rounded-md overflow-auto hide-scrollbar`}
      >
        <div className='flex items-center justify-between border-b border-gray-200 px-7 py-5'>
          <h2 className='text-lg'>URLs List</h2>
          <AiOutlineClose className='text-xl cursor-pointer' onClick={() => setOpenModal(false)} />
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 px-7 py-5 gap-10'>
          {
            url.map(item => (
              <UrlCard
                key={item.id}
                shorterURL={item.shorterUrl}
                originalURL={item.originalUrl}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default UrlsModal