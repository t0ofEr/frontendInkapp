import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './showImage'
import moment from 'moment'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { isAuthenticated } from '../auth';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { CardActions } from '@material-ui/core'
import ShowAvatar from './showAvatar';

const CardProject = ({ project }) => {
    const {dataUser} = isAuthenticated()
    const useStyles = makeStyles( (theme)=> ({
          card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          cardContent: {
            flexGrow: 1,
          }
      }));
    
    const classes = useStyles();
    return ( 
            <Card className={classes.card}>
                <Link to={`/profile/project/view/${project._id}`}>
                    <ShowImage image={project} url="proyecto" w="100%" h="300px"/>
                </Link>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2" align="center">
                            {project.nombre} 
                    </Typography>
                    <div align="center">
                        <Link to={`/profile/${project.creador._id}`}>
                            <ShowAvatar image={project.creador} url="perfil"/>
                        </Link>
                    </div>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        {project.descripcion}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        Tamaño: {project.tamaño}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        Parte seleccionada: {project.parteCuerpo.nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        Estilo: {project.estiloTatuaje.nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        {project.estado.nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        <AccessTimeIcon/> {moment(project.updatedAt).fromNow()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid item xs={12} align="center">
                        <Button size="small" color="primary">
                            {
                                (project.estado.nombre === "Terminado" || project.creador._id === dataUser.id)  ? null : (
                                    <Link to={`/profile/project/doOffer/${project._id}`}>
                                        <button className="btn btn-outline-warning mt-2 mb-2">
                                            Realizar oferta
                                        </button>
                                    </Link>
                                )
                            }    
                        </Button>
                    </Grid>
                </CardActions>
            </Card>
        )
}

export default CardProject