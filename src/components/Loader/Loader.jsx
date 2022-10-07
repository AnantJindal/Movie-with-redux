import React from 'react'
import style from "./Loader.module.css"
import LoadingG from '../../assests/loading.webp'

const Loader = () => {
    return (
        <>
            <div className={style.div}>
                <img src={LoadingG} alt="Loading" />
                </div>
        </>
    )
}

export default Loader