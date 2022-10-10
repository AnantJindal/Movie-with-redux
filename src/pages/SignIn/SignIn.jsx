import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Form from '../../components/Form/Form'

const SignIn = () => {
    const navigate = useNavigate()

    
    useEffect(() => {
        localStorage.removeItem('token')
        navigate('/')
    }, [])

    return (
        <>
            <Form />
        </>
    )
}

export default SignIn