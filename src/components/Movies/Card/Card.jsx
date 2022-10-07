import React from 'react'
import style from './Card.module.css'
import MoviePlayer from '../../../assests/moviePlayer.svg'
import { useNavigate } from 'react-router'
import StarRating from '../../StarRating/StarRating'

const Card = ({ ele }) => {
    const navigate = useNavigate()

    const detailsHandeler = (i) => {
        navigate(`/details/${i}`)
    }

    return (
        <>
            <div className={style.card} key={ele.vote_count} onClick={() => detailsHandeler(ele.id)}>
                <div className={style.cardImg}>
                    <img src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`} alt="MovieBanner" />
                </div>
                <div className={style.about}>
                    <ul>
                        <li>{ele.title.length <= 20 ? ele.title : ele.title.slice(0, 20)}</li>
                        <li>
                            <StarRating rating={Math.round((ele.vote_average * 10) / 10) / 2} />
                        </li>
                    </ul>

                    <div className={style.moviePlayer}>
                        <img src={MoviePlayer} alt="MoviePlayer" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card