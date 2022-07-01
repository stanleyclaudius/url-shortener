import { useSelector } from 'react-redux'
import { RootState } from './../../redux/store'
import Loader from './Loader'

interface IProps {
  text: string
}

const Button = ({ text }: IProps) => {
  const { alert } = useSelector((state: RootState) => state)

  return (
    <button disabled={alert.loading ? true : false} className={`text-sm text-white ${alert.loading ? 'bg-gray-200 hover:bg-gray-200 cursor-auto' : 'bg-primary hover:bg-primaryHover cursor-pointer'} transition-all rounded-md px-3 py-2 outline-0`}>
      {
        alert.loading
        ? <Loader />
        : `${text}`
      }
    </button>
  )
}

export default Button