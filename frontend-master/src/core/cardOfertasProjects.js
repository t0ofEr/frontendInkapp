import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Button } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActions } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import AccessTime from '@material-ui/icons/AccessTime'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const CardProject = ({ project }) => {

    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
        },
    });
    const classes = useStyles();
    return (
        project.oferta.map((data, i) => (
            data.estado.nombre === 'En espera' && project.estado.nombre === 'En espera' ? (
                <Grid item xs={3} align="center">
                    <Card>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p" align="center">
                                <AccountCircleIcon />
                                <Link to={`/profile/${data.ofertante._id}`}>
                                    <Button color="primary" size="medium">
                                        {data.ofertante.userName}
                                    </Button>
                                </Link>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" align="center">
                                {data.descripcion}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" align="center">
                                Oferta: ${data.valor}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" align="center">
                                {data.estado.nombre}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" align="center">
                                <AccessTime color="action" fontSize="small" />
                                {moment(data.createdAt).fromNow()}
                            </Typography>
                            <CardActions>
                                <Link to={`/profile/project/doOffer/${project._id}/${data._id}/${'aceptar'}`}>
                                    <Button variant="contained" color="primary">
                                        Aceptar oferta
                                    </Button>
                                </Link>
                                <Link to={`/profile/project/doOffer/${project._id}/${data._id}/${'rechazar'}`}>
                                    <Button variant="contained" color="secondary">
                                        Rechazar oferta
                                    </Button>
                                </Link>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
            ) : (
                data.estado.nombre === 'Aceptado' && project.estado.nombre === 'Terminado' ? (
                    <Grid item xs={3} align="center">
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p" align="center">
                                    Tienes una oferta aceptada, comunicate con:<AccountCircleIcon />
                                    <Link to={`/profile/${data.ofertante._id}`}>
                                        <Button color="primary" size="medium">
                                            {data.ofertante.userName}
                                        </Button>
                                    </Link>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" align="center">
                                    {data.descripcion}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" align="center">
                                    Oferta: ${data.valor}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" align="center">
                                    {data.estado.nombre}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" align="center">
                                    <AccessTime color="action" fontSize="small" />
                                    {moment(data.createdAt).fromNow()}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                ) : (
                    <Grid>

                    </Grid>
                )
            )
        ))
    )
}

export default CardProject