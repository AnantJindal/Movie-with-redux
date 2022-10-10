import React from 'react'
import style from './Pagenation.module.css'
import NextIcon from '../../assests/next.svg'
import PrevIcon from '../../assests/previcon.png'


const Pagenation = ({ goToCurrentPage, prevPage, nextPage, page, totalPage, pageLimit }) => {


    const getPaginationGroup = () => {
        let start = Math.floor((page - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, index) => start + index + 1);
    };

    return (
        <>
            <div className={style.buttons}>
                <button id={style.prev} onClick={prevPage} disabled={page === 1}>
                    <img src={PrevIcon} alt="PreviousIcon" />
                </button>
                {getPaginationGroup().map((ele, i) => {
                    return (
                        <button className={style.button} key={i} id={page === ele ? style.active : ""}
                            onClick={() => goToCurrentPage(ele)}>
                            {ele}
                        </button>
                    )
                })}
                <button id={style.next} onClick={nextPage} disabled={page === totalPage}>
                    <img src={NextIcon} alt="NextIcon" />
                </button>
            </div>
        </>
    )
}

export default Pagenation