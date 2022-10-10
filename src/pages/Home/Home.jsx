import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Movies/Card/Card'
import Wallpaper from '../../components/Movies/Wallpaper/Wallpaper'
import style from './Home.module.css'
import { Col, Row, } from 'antd';
import Loader from '../../components/Loader/Loader'
import Pagenation from '../../components/Pagenation/Pagenation'
import { useDispatch, useSelector } from 'react-redux'
import { homeloadingAction, apiDataAction, pageMinus, pagePlus, pageAction, fetchMovies } from '../../Slice/HomeSlice'


const Home = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.Home)

    const [totalPage, setTotalPage] = useState()

    useEffect(() => {
        dispatch(homeloadingAction(true))

        // dispatch(fetchMovies())

        getApidata()
    }, [selector.page])

    const getApidata = () => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=36f92e051d1f7b92dd147302b1b51f81&page=${selector.page}`)
            .then(res => {
                dispatch(apiDataAction(res.data.results))
                setTotalPage(res.data.total_pages)
                dispatch(homeloadingAction(false))
            }).catch(err => {
                dispatch(homeloadingAction(false))
            })
    }


    const nextPage = () => {
        dispatch(pagePlus())
    }

    const prevPage = () => {
        dispatch(pageMinus())
    }

    const pageNumber = (i) => {
        dispatch(pageAction(i))
    }

    return (
        <div className={style.home}>
            <Wallpaper />
            <div className={style.data}>
                <h1 className={style.heading}>Trending</h1>

                {selector.loading ? <Loader /> : ""}
                <Row gutter={[16, 24]}>
                    {selector.apiData.map((ele, i) => {
                        return (
                            <Col span={6} key={i} >
                                <Card ele={ele} i={i} />
                            </Col>
                        )
                    })}
                </Row>

                <Pagenation pageNumber={selector.page}
                    goToCurrentPage={pageNumber}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    page={selector.page}
                    totalPage={totalPage}
                    pageLimit={6} />
            </div>
        </div>
    )
}

export default Home