import React, { useState } from 'react'
import style from './Navbar.module.css'
import Logo from '../../assests/Logo.svg'
import SearchIcon from '../../assests/search.svg'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Card } from 'antd';

const Navbar = () => {
    const navigate = useNavigate()


    const token = localStorage.getItem("token")

    const [value, setValue] = useState("")
    const [suggestion, setSuggestion] = useState([])
    const [searcheddata, setSearchedData] = useState([])



    const onChnagehandeler = (e) => {
        setValue(e.target.value)

        if (value.length !== 0) {

            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=36f92e051d1f7b92dd147302b1b51f81&language=en-US&query=${value}&include_adult=true`).then((res) => {
                setSearchedData(res.data.results)
            }).catch((err) => {

            })
        }

        let matches = searcheddata.filter((movie) => {
            const regex = RegExp(`${e.target.value}`, "gi")
            return movie.original_title.match(regex)        })
        setSuggestion(matches)
    }

    const removeUser = () => {
        localStorage.removeItem("token")
        navigate('/')
    }

    const onSearchHandeler = () => {
        console.log(value)
    }

    const detailsHandeler = (i) => {
        navigate(`/${i}`)
        setValue("")
    }


    return (
        <>
            <header>
                <div className={style.container}>
                    <div className={style.imgContainer}>
                        <img src={Logo} alt="Logo" />
                    </div>
                    {token ? <div className={style.userThings}>
                        <div className={style.searchBox}>
                            <input type="text" placeholder='Search movies' value={value} onChange={onChnagehandeler} />
                            <button onClick={onSearchHandeler}><img src={SearchIcon} alt="searchIcon" /></button>
                        </div>

                        <div className={style.card} style={{ zIndex: 1 }}>
                            {value.length > 0 && suggestion && suggestion.map((ele, i) => {
                                return (
                                    <Card bordered={true} key={i} onClick={() => detailsHandeler(ele.id)}>
                                        {ele.title}
                                    </Card>
                                )
                            })}
                        </div>

                        <button onClick={removeUser}>Logout</button>
                    </div> : ""}

                </div>
            </header>
        </>
    )
}

export default Navbar