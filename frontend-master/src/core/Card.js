import React, { useState } from "react";
import { Redirect } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from '@material-ui/core/Grid';
import { likePublicacion } from '../user/apiUser';
import { isAuthenticated } from '../auth';
import makeToast from '../Toaster/Toaster';
import ShowImage from './showImage';
import moment from "moment";
import { Link } from "react-router-dom";
import ShowAvatar from "./showAvatar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from '@material-ui/icons/MoreVert';
import Swal from 'sweetalert2';
import { deletePublicacion } from "./apiCore";

const useStyles = makeStyles((theme) => ({

    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const CardHome = ({ publicacion }) => {
    const classes = useStyles();
    const { dataUser, accessToken } = isAuthenticated()
    const [likes, setLikes] = useState(publicacion.likes.length);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [redirect, setRedirect] = useState(false);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const clickEliminar = event => {
        event.preventDefault()
        setAnchorEl(null)
        Swal.fire({
            title: `¿Estas seguro?`,
            text: `No podrás recuperar tu proyecto: ${publicacion.nombre}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
                deletePublicacion(publicacion._id, dataUser.id, accessToken).then(data => {
                    if (data.error) {
                        Swal.fire(
                            'Error!',
                            data.error,
                            'error'
                          )
                    } else {
                        setRedirect(true);
                    }
                })
            }
          })
    }

    const redirectTo = () => {
        if (redirect) {
            makeToast("success", "Publicacion eliminada correctamente.")
            return <Redirect to={`/profile/${dataUser.id}`} />
        }
    }

    const likeHandler = () => {
        likePublicacion(dataUser.id, accessToken, publicacion._id).then(data => {
            if (data.error) {
                makeToast('error', data.error)
            } else if (data.mensaje === "like") {
                setLikes(likes + 1)
            } else {
                setLikes(likes - 1)
            }
        })
    }

    return (

        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <ShowAvatar image={publicacion.creador} url="perfil" />
                }
                action={
                    dataUser && dataUser.id === publicacion.creador._id ? (
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
                                <Link to={`/profile/publication/view/${publicacion._id}`} style={{textDecoration: 'none'}}>
                                    <MenuItem onClick={handleClose} style= {{color: 'orange'}}>Ver Publicación</MenuItem>
                                </Link>
                                <Link to={`/profile/publication/update/${publicacion._id}`} style={{textDecoration: 'none'}}>
                                    <MenuItem style= {{color: 'blue'}}>Modificar</MenuItem>
                                </Link>
                                <MenuItem onClick={clickEliminar} style={{color:'red'}}>Eliminar</MenuItem>
                            </Menu>
                        </div>
                    ) : (
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
                                <Link to={`/profile/publication/view/${publicacion._id}`} style={{textDecoration: 'none'}}>
                                    <MenuItem onClick={handleClose} style= {{color: 'orange'}}>Ver Publicación</MenuItem>
                                </Link>
                            </Menu>
                        </div>
                    )
                }
                title={
                    dataUser ? (
                        <Link to={`/profile/${publicacion.creador._id}`}>
                            {publicacion.creador.userName}
                        </Link>
                    ) : (
                        publicacion.creador.userName
                    )

                }
                subheader={moment(publicacion.createdAt).fromNow()}
            />
            <Link to={`/profile/publication/view/${publicacion._id}`}>
                <ShowImage image={publicacion} url="publicacion" w="100%" h="350px" />
            </Link>
            
            <CardContent className={classes.cardContent}>
                <Typography variant="body1" color="textSecondary" component="p">
                    {publicacion.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {publicacion.descripcion}
                </Typography>
                <Typography variant="body3" color="textSecondary" component="p">
                    Estilo del tatuaje/diseño: {publicacion.estiloTatuaje.nombre}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {dataUser ? (
                    <Grid>
                        <IconButton fontSize="small" aria-label="add to favorites" style={{ color: 'red' }} onClick={likeHandler}>
                            <FavoriteIcon />
                        </IconButton>
                        {likes}
                    </Grid>
                ) : (
                    <Grid>
                        <IconButton fontSize="small" aria-label="add to favorites" style={{ color: 'red' }} onClick={() => { makeToast('error', 'Necesitas logearte') }}>
                            <FavoriteIcon />
                        </IconButton>
                        {likes}
                    </Grid>
                )
                }


            </CardActions>
        </Card>
    );
}

export default CardHome;