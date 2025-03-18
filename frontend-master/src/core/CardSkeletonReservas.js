import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from '@material-ui/core';
const CardSkeletonReservas = () => {
  const useStyles = makeStyles((theme) => ({
    media: {
      height: 190,
    },
  }));


  const classes = useStyles();

  return (
    <Grid item xs={4}>
      <Card>
        <CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <div align="center">
              <Skeleton animation="wave" height={10} width="80%" />
            </div>
            <div align="center">
              <Skeleton animation="wave" height={10} width="50%" />
            </div>
            <div align="center">
              <Skeleton animation="wave" height={10} width="80%" />
            </div>
            <div align="center">
              <Skeleton animation="wave" height={10} width="50%" />
            </div>
          </React.Fragment>
        </CardContent>
      </Card>
    </Grid>
  );
}


export default CardSkeletonReservas;