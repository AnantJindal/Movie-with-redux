import React, { useEffect } from 'react'
import Form from '../../components/Form/Form'

const SignIn = () => {
    
    useEffect(() => {
        localStorage.removeItem('token')
    }, [])

    return (
        <>
            <Form />
        </>
    )
}

export default SignIn