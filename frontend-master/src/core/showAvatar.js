import { Avatar } from '@material-ui/core';
import React from 'react'
import { API } from '../config'

const ShowAvatar = ({ image, url }) => (
    <Avatar
        src={`${API}/${url}/imagen/${image._id}`}
        alt={image.name}
        className="mb-3"
        style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "cover",
            objectPosition: "center center"
        }}
    />

)

export default ShowAvatar;