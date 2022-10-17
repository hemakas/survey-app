import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Redirect() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
  
    useEffect(() => {
      // redirect if user not found
      if (!user) {
        navigate('/')
      }
    }, [user, navigate])

    return (
        <></>
    )
}

export default Redirect