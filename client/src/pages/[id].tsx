import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getDataAPI } from './../utils/fetchData'

const RedirectPage = () => {
  const [error, setError] = useState('')
  const { id } = useParams()
  
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await getDataAPI(`url/${id}`)
        window.location.assign(res.data.url.originalUrl)
      } catch (err: any) {
        setError(err.response.data.error)
      }
    }

    fetchData()
  }, [id, navigate])
  
  return (
    <>
      <div>{error}</div>
    </>
  )
}

export default RedirectPage