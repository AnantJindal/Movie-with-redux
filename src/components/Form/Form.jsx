import React, { useState } from 'react'
import style from './Form.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { nameErrorAction, passwordErrorAction, loadingAction } from '../../Slice/SignInSlice'

const Form = () => {
    const selector = useSelector((state) => state.signIn)
    const dispatch = useDispatch()
    const navigate = useNavigate('')

    const [value, setValue] = useState({
        username: "",
        password: ""
    })

    const fetchingToken = async () => {
        const token = await axios.get("https://api.themoviedb.org/3/authentication/token/new?api_key=36f92e051d1f7b92dd147302b1b51f81")
        localStorage.setItem('token', token.data.request_token);
    }

    const onValueChangeHandeler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
        dispatch(nameErrorAction(false))
        dispatch(passwordErrorAction(false))
    }


    const LoginHandeler = async () => {
        dispatch(loadingAction(true))

        const { username, password } = value

        if (username.trim() === "" && password.trim() === "") {
            toast.error("Enter your credintals")
            dispatch(loadingAction(false))
        }
        else if (username.trim() === "") {
            toast.error("Enter your username")
            dispatch(loadingAction(false))

        }
        else if (password.trim() === "") {
            toast.error("Enter your password")
            dispatch(loadingAction(false))
        }
        else {
            await fetchingToken();
            const checkToken = localStorage.getItem("token")

            const data = {
                "username": value.username,
                "password": value.password,
                "request_token": checkToken
            }
            await axios.post("https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=36f92e051d1f7b92dd147302b1b51f81", data)

            dispatch(loadingAction(false))
            dispatch(nameErrorAction(false))
            dispatch(passwordErrorAction(false))
            setValue({
                username: "",
                password: ""
            })

            toast.success("Login Success")
            navigate('/home')
        }

    }

    return (
        <>

            <section>
                <div className={style.formContainer} >
                    <h1>Sign in</h1>
                    <p>Sign in to your Self Service Portal</p>

                    <input type="text" className={style.input} placeholder='Username' name='username' value={value.username} onChange={onValueChangeHandeler} />
                    {selector.userNameError ? <p className={style.errorMessage}>Invalid Username</p> : ""}
                    <br />
                    <input type="password" className={style.input} placeholder='Password' name='password' value={value.password} onChange={onValueChangeHandeler} />
                    {selector.passwordError ? <p className={style.errorMessage}>Invalid Password</p> : ""}

                    <br />
                    <button disabled={selector.loading === true} className={style.button} onClick={LoginHandeler}>{selector.loading ? <Spin /> : "Log in"}</button>
                </div>
                <ToastContainer />
            </section>
        </>
    )
}

export default Form;