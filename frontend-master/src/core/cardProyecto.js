import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './showImage'
import moment from 'moment'
import { isAuthenticated } from '../auth';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import ShowAvatar from './showAvatar';
import MoreVert from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Swal from 'sweetalert2';
import { deleteProject } from '../user/apiUser';
const CardProyectoPage = ({ project }) => {
    const {dataUser, accessToken} = isAuthenticated()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [redirect, setRedirect] = React.useState(false)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const redirectTo = () => {
        if(redirect){
            return <Redirect to= {`/profile/myprojects/${dataUser.id}`}/>
        }
    }
    const clickEliminar = event => {
        
        event.preventDefault()
        setAnchorEl(null)
        Swal.fire({
            title: `¿Estas seguro?`,
            text: `No podrás recuperar tu proyecto: ${project.nombre}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProject(dataUser.id, accessToken, project._id).then((data)=> {
                    if(data.error){
                        Swal.fire(
                            'Error!',
                            data.error,
                            'error'
                          )
                    }else {
                        setRedirect(true)
                    }
                })
            }
          })
    }
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

    const classes = useStyles()

    return ( 
        
        <Grid item xs={6}>
            <Card className={classes.card}>
            <CardHeader
                    avatar={
                        <Link to={`/profile/${project.creador._id}`}>
                            <ShowAvatar image={project.creador} url="perfil"/>
                        </Link>
                    }
                    title={ 
                        project.creador.userName  
                    }
                    subheader={
                        moment(project.createdAt).fromNow()
                    }
                    action={
                        dataUser.id === project.creador._id ? (
                            <div>
                                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                    <MoreVert/>
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <Link to={`/profile/project/offers/${project._id}`} style={{textDecoration: 'none'}}>
                                        <MenuItem onClick={handleClose} style= {{color: 'orange'}}>Ver ofertas</MenuItem>
                                    </Link>
                                    <Link to={`/profile/project/update/${project._id}`} style={{textDecoration: 'none'}}>
                                        <MenuItem style= {{color: 'blue'}}>Modificar</MenuItem>
                                    </Link>
                                    <MenuItem onClick={clickEliminar} style={{color:'red'}}>Eliminar</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            null
                        )
                    }
                />
                <ShowImage image={project} url="proyecto" w="100%" h="100%"/>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2" align="center">
                            {project.nombre}
                        </Typography>
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
                    <Grid item xs={12} align="center">
                    <Button size="small" color="primary">
                        {
                            (project.estado.nombre === "Terminado" || project.creador._id === dataUser.id)  ? (
                                <div></div>
                            ) : (
                                <Link to={`/profile/project/doOffer/${project._id}`}>
                                    <button className="btn btn-outline-warning mt-2 mb-2">
                                        Realizar oferta
                                    </button>
                                </Link>
                            )
                        }    
                    </Button>
                    </Grid>
                </CardContent>
            </Card>
            {redirectTo()}
        </Grid>
        )
}

export default CardProyectoPage