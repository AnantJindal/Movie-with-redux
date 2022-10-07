import React from 'react'
import ReactStars from "react-rating-stars-component";

const StarRating = ({ rating }) => {
    return (
        <>
            <ReactStars size={15}
            count={5}
                value={rating}
                edit={false}
                isHalf={false} />
        </>
    )
}

export default StarRating