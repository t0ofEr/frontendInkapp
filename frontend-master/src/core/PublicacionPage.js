import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getPublicacion } from './apiCore';
import { isAuthenticated } from '../auth';
import CardPublicacionPage from './CardPublicacion';
import makeToast from '../Toaster/Toaster';
import CardSkeleton from './CardSkeleton';
import { Grid } from '@material-ui/core';
const PublicacionPage = props => {

    const [publicacion, setPublicacion] = useState({});
    const {accessToken, dataUser} = isAuthenticated();
    const [loading, setLoading] = useState(false)
    const loadPublicacion = publicacionId => {
        getPublicacion(publicacionId, dataUser.id, accessToken).then(data => {
            if(data.error) {
                makeToast('error', data.error)
            }else{
                setPublicacion(data);
                setLoading(true)
            }
        })
    }

    useEffect(() => {
        const publicacionId = props.match.params.publicacionId
        loadPublicacion(publicacionId)
    }, [])

    return (
        <Layout 
            title={`Publicación`} 
            description={""} 
            className="container-fluid"
            jumbotron={false}
        >
            <Grid container justify="center" alignContent="center" alignItems="center">
                {
                    publicacion && loading ? (
                        <CardPublicacionPage publicacion={publicacion}/>
                    ) : (
                        <CardSkeleton/>
                    )  
                }
            </Grid>                       
        </Layout>
    );
}

export default PublicacionPage;