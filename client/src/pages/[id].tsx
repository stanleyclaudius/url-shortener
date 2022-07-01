import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getDataAPI } from './../utils/fetchData'
import NotFound from './../components/general/NotFound'
import Head from './../utils/Head'

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
      <Head title={error ? 'Not Found' : 'Redirecting...'} />
      {error && <NotFound />}
    </>
  )
}

export default RedirectPage