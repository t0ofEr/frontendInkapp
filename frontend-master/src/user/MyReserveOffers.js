import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { getMyOffersReserve } from '../core/apiCore';
import { isAuthenticated } from '../auth';
import Card from '../core/cardMyReserveOffers';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button, LinearProgress, makeStyles } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import CardSkeletonReservas from '../core/CardSkeletonReservas';

const MyReserveOffers = () => {

    const [offers, setOffers] = useState([])
    const {dataUser, accessToken} = isAuthenticated()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const loadOffers = () => {
        getMyOffersReserve(dataUser.id, accessToken).then( data => {
            if(data.error){
                setError(data.error)
                setTimeout( function () {setLoading(true)}, 2000)
            } else {
                setOffers(data.data)
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

    useEffect(() =>{
        loadOffers()
    },[])
    const classes = useStyles()

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
            <Link to={`/`}>
                <p>Buscar perfiles de Inkapp</p>
            </Link>
        </div>
    )
   return ( 
   <Layout title="Mis ofertas" description="Estás viendo las ofertas que haz realizado">
       <Grid container spacing={3} direction="row"
            justify="center"
            alignItems="center"
            className={classes.cardGrid}>
                    {
                        offers && loading ? (
                            offers.map((offer, id) => (
                                <Card key={id} offer={offer}/>
                            ))
                        ) : (
                            !error ? (
                                offers.map(() => (
                                    <CardSkeletonReservas/>
                                ))
                            ) : (
                                <div className={classes.root}>
                                    <LinearProgress color="secondary"/>
                                </div>
                            )
                            
                        )
                    }
            <Grid item xs={12} align="center"> 
            {
                loading && offers.length === 0 ? (showError()) : null
            }
                <Link to={`/`}>
                    <Button variant="contained" color="primary">
                        <ArrowBack>
                        </ArrowBack>
                        Volver
                    </Button>
                </Link>
            </Grid>
        </Grid>
       
      
    </Layout>
    )

};

export default MyReserveOffers;