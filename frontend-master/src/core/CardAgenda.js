import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { isAuthenticated } from '../auth';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import makeToast from '../Toaster/Toaster';


const CardProject = ({ horas }) => {
  const { dataUser } = isAuthenticated()
  const useStyles = makeStyles({
    root: {
      minWidth: 190,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginTop: 12,
      marginBottom: 12,
    },
  });
  const classes = useStyles();

  return (

    horas ? (
      horas.estado.nombre !== 'Agendada' ? (
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" align="center">
                {moment(horas.fecha).format('Do MMMM')}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {horas.estado.nombre}
              </Typography>
              <Typography variant="body2" component="p">
                Desde: {moment(horas.fecha).format('h:mm a')}
              </Typography>
              <Typography variant="body2" component="p">
                Hasta: {moment(horas.fechaFin).format('h:mm a')}
              </Typography>
            </CardContent>
            <CardActions>
              {
                dataUser.membresia === true ? (
                  <Link to={`/profile/do-reserve-hour/${horas._id}`}>
                    <Button size="small" >Agendar</Button>
                  </Link>
                ) : (
                  <Link onClick={() => { makeToast('error', 'Debes adquirir una membresía') }}>
                    <Button size="small" >Agendar</Button>
                  </Link>
                )
              }

            </CardActions>
          </Card>
        </Grid>
      ) : (
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" align="center">
                {moment(horas.fecha).format('Do MMMM')}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {horas.estado.nombre}
              </Typography>
              <Typography variant="body2" component="p">
                Desde: {moment(horas.fecha).format('h:mm a')}
              </Typography>
              <Typography variant="body2" component="p">
                Hasta: {moment(horas.fechaFin).format('h:mm a')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )
    ) : null

  );
}
export default CardProject