import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {  isAuthenticated } from './../auth/index';
import { Redirect } from 'react-router-dom';
import makeToast from '../Toaster/Toaster';
import { listarAgenda } from '../user/apiUser';
import CardAgenda from './CardAgenda';
import { Grid, LinearProgress, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import CardSkeletonReservas from './CardSkeletonReservas';
const AgendaTatuadores = ({match}) => {
   
    const { dataUser, accessToken } = isAuthenticated();
    const [horas, setHoras] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const init = (userId) => {
        listarAgenda(dataUser.id, accessToken, userId).then(data => {
            if(data.error){
                setError(data.error)
                setTimeout( function () {setLoading(true)}, 2000)
            } else {
                setHoras(data.data)
                setTimeout( function () {setLoading(true)}, 2000)
            }
        })
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
              marginTop: theme.spacing(2),
            },
          },
          cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8)
          },
      }));
    useEffect(() => {
      init(match.params.userId)
    }, []);

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    const classes = useStyles()
    return (
        <Layout
            title="Agenda"
            description="Estás revisando la agenda de un tatuador"
            className="container col-md-8 offset-md-2"
        >
            
            <Grid container spacing={3} direction="row" justify="center" alignContent="center" alignItems="center" style= {{marginTop: '5%'}}>

                    {horas && loading ? (
                            horas.map((horas, i) => (
                                <CardAgenda key={i} horas={horas} />
                            ))
                        ) : (
                            !error ? (
                                horas.map(() => (
                                    <CardSkeletonReservas/>
                                ))
                            ) : (
                                <div className={classes.root}>
                                    <LinearProgress color="secondary"/>
                                </div>
                            )
                        )
                    }
                {
                    loading ? showError() : null
                }
                <Grid item xs={12} align="center">
                    <Link className="btn btn-primary" to={`/profile/${match.params.userId}`}><ArrowBack />Volver</Link>
                </Grid> 
            </Grid>

            
        </Layout>
    );

};

export default AgendaTatuadores;