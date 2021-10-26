import React from 'react'
import { API } from '../config'

const ShowImage = ({image, url, w, h}) => (
    <div className = "product-img">
        <img
            src={`${API}/${url}/imagen/${image._id}`}
            alt={image.name}
            className="mb-3"
            style={{ height: h, width: w, objectFit: "cover", objectPosition: "center center" }}
        />
    </div>
)

export default ShowImage 