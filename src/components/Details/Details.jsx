import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import style from './Details.module.css'
import BackArrow from '../../assests/backarrow.svg'
import VideoPlayer from '../../assests/player.svg'
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Modal from '../Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { movieDetailAction, playAction } from '../../Slice/MovieSlice';

const Details = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selector = useSelector(state => state.movie)

    const { id } = useParams()

    const fetchMovieDetail = async () => {
        await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=36f92e051d1f7b92dd147302b1b51f81&language=en-US`).then((res) => {
            dispatch(movieDetailAction(res.data))
        }).catch((err) => console.log(err))
    }

    const onGoBackHandeler = () => {
        navigate('/home')
    }

    useEffect(() => {
        fetchMovieDetail()
    }, [selector.movieDetail])


    return (
        <>
            <Row className={style.detailsRow}>
                {selector.movieDetail.length === 0 ? "" : <>
                    <Col flex="0 1 450px" className={style.details}>
                        < div className={style.detailsContainer}>
                            <img src={BackArrow} alt="BackArrow" style={{ cursor: "pointer" }} id={style.backarrow} onClick={onGoBackHandeler} />
                            <h1>
                                {selector.movieDetail.title.length <= 20 ? selector.movieDetail.title : selector.movieDetail.title.slice(0, 20)}
                            </h1>

                            <p className={style.rating}>Rating:  {Math.round((selector.movieDetail.vote_average * 10) / 10) / 2} / 5</p>

                            <p className={style.description}>
                                {selector.movieDetail.overview.length <= 175 ? selector.movieDetail.overview : selector.movieDetail.overview.slice(0, 175)}
                            </p>

                            <p>Release Date <span>{selector.movieDetail.release_date}</span> </p>
                            <p className={style.language}>Orginal Language <span>English, Spanish, French</span> </p>
                        </div>
                    </Col>


                    <Col flex="1 1 200px" className={style.movieImg}>
                        <div className={style.background} style={{ backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${selector.movieDetail.backdrop_path}`})` }}>

                            <div id={style.id}></div>
                            <div className="videoPlayer">
                                <img id={style.img} src={VideoPlayer} alt="VideoPlayer"
                                    onClick={() => dispatch(playAction(true))}
                                />
                            </div>
                        </div>
                    </Col>
                </>
                }
            </Row>
            <div className={style.modal} >

                {selector.play ? <Modal id={id} onClick={() => dispatch(playAction(false))} /> : ""}
            </div>
        </>
    )
}

export default Details