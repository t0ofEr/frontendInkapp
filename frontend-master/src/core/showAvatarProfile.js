import React from 'react'
import { API } from '../config'
import { Avatar } from '@material-ui/core';
const ShowAvatarProfile = ({image, url}) => (
        <Avatar
            src={`${API}/${url}/imagen/${image._id}`}
            alt={image.userName}
            style={{  height: '200px', 
            width: '200px', 
            objectFit: "cover", 
            objectPosition: "center center",
            boxShadow: `-1px -1px 15px 1px rgba(0,0,0,0.45)`}}
        />
)

export default ShowAvatarProfile;