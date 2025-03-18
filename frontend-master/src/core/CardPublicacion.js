import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import ShowImage from './showImage';
import { isAuthenticated } from '../auth'; import moment from 'moment';
import makeToast from '../Toaster/Toaster';
import { likePublicacion } from '../user/apiUser';
import { Favorite } from '@material-ui/icons';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { deletePublicacion, addComentario, getPublicacion, addRespuesta, deleteComentario, deleteRespuesta } from './apiCore';
import { InputGroup, FormControl, ListGroup, Accordion } from 'react-bootstrap';
import { Button, CardContent, Grid, CardHeader, CardMedia } from '@material-ui/core';
import ShowAvatar from './showAvatar';
import { IconButton } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import { Card } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Swal from 'sweetalert2';

const CardPublicacionPage = ({ publicacion }) => {

    const { accessToken, dataUser } = isAuthenticated();
    const [redirect, setRedirect] = useState(false);
    const [comentario, setComentario] = useState('');
    const [respuesta, setRespuesta] = useState('');
    const [comentarios, setComentarios] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [likes, setLikes] = useState(publicacion.likes.length);
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

    const eliminarPublicacion = (idP) => {
        deletePublicacion(idP, dataUser.id, accessToken).then(data => {
            if (data.error) {
                makeToast("error", data.error)
            } else {
                setRedirect(true);
            }
        })
    }

    const eliminarComentario = (idPublicacion, idCreador, idComentario) => {
        deleteComentario(idPublicacion, dataUser.id, accessToken, { idUser: idCreador, idComentario: idComentario }).then(data => {
            if (data.error) {
                makeToast("error", data.error)
            } else {
                makeToast("success", "El comentario se ha eliminado correctamente")
                loadComentarios();
            }
        })
    }

    const eliminarRespuesta = (idPublicacion, idCreador, idComentario, idRespuesta) => {
        deleteRespuesta(idPublicacion, dataUser.id, accessToken, { idUser: idCreador, idComentario: idComentario, idRespuesta: idRespuesta }).then(data => {
            if (data.error) {
                makeToast("error", data.error)
            } else {
                makeToast("success", "La respuesta se ha eliminado correctamente")
                loadComentarios();
            }
        })
    }

    const redirectTo = () => {
        if (redirect) {
            makeToast("success", "Publicacion eliminada correctamente.")
            return <Redirect to={`/profile/${dataUser.id}`} />
        }
    }

    const handleChange = (e) => {
        setComentario(e.target.value);
    }

    const handleChange2 = (e) => {
        setRespuesta(e.target.value);
    }

    const clickSubmit = () => {
        //Request to API 
        addComentario(publicacion._id, dataUser.id, accessToken, { comentario }).then(data => {
            if (data.error) {
                makeToast("error", data.error)
            } else {
                makeToast("success", data.mensaje)
                loadComentarios();
            }
        });
    };

    const clickSubmit2 = (idC) => {
        //Request to API 
        addRespuesta(publicacion._id, dataUser.id, accessToken, { id: idC, respuesta: respuesta }).then(data => {
            if (data.error) {
                makeToast("error", data.error)
            } else {
                makeToast("success", data.mensaje)
                loadComentarios();
            }
        });
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

    const loadComentarios = () => {
        getPublicacion(publicacion._id, dataUser.id, accessToken).then(data => {
            if (data.error) {
                makeToast("error", data.error)
            } else {
                setComentarios(data.comentarios)
            }
        })
    };

    useEffect(() => {
        setComentarios(publicacion.comentarios)
        loadComentarios();
    }, []);

    return (

        <Grid item xs={6}>
            <Card>
                <CardHeader
                    avatar={
                        <Link to={`/profile/${publicacion.creador._id}`}>
                            <ShowAvatar image={publicacion.creador} url="perfil" />
                        </Link>
                    }
                    action={
                        dataUser.id === publicacion.creador._id ? (
                            <div>
                                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <Link to={`/profile/publication/update/${publicacion._id}`} style={{ textDecoration: 'none' }}>
                                        <MenuItem style={{ color: 'blue' }}>Modificar</MenuItem>
                                    </Link>
                                    <MenuItem onClick={clickEliminar} style={{ color: 'red' }}>Eliminar</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            null
                        )
                    }
                    title={
                        publicacion.creador.userName
                    }
                    subheader={moment(publicacion.createdAt).fromNow()}
                />
                <ShowImage image={publicacion} url="publicacion" w="100%" h="100%" />
                <CardContent>
                    <Typography variant="h6">{publicacion.nombre} <Favorite fontSize="small" onClick={likeHandler} color="secondary" />{likes}</Typography>
                    <Typography variant="body1" component="p">{publicacion.descripcion.substring(0, 100)}</Typography>
                    <Typography variant="body1" component="p">Estilo: {publicacion.estiloTatuaje.nombre}</Typography>
                    <Typography variant="body1" component="p" align="right">
                        <AccessTimeIcon color="action" fontSize="small" /> {moment(publicacion.updatedAt).fromNow()}
                    </Typography>

                    <h4>Comentarios</h4>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Inserte un comentario"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={comentario}
                            onChange={handleChange}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-primary" onClick={clickSubmit}>Comentar</Button>
                        </InputGroup.Append>
                    </InputGroup>

                    {
                        comentarios.map((comentario) => (

                            <div className="card-footer">
                                <div className="row">
                                    <h4>{comentario.usuario.userName}</h4>
                                </div>
                                <p>{comentario.comentario}</p>
                                <Accordion>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Responder
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder="Inserte un comentario"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    value={respuesta}
                                                    onChange={handleChange2}
                                                />
                                                <InputGroup.Append>
                                                    <Button variant="outline-primary" onClick={() => (clickSubmit2(comentario._id))}>Comentar</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </div>
                                    </Accordion.Collapse>
                                    {
                                        comentario && ((comentario.usuario._id === dataUser.id) || (publicacion.creador._id === dataUser.id)) &&
                                        <div>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                Eliminar
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="1">
                                                <button className="btn btn-outline-warning mt-2 mb-2" onClick={() => eliminarComentario(publicacion._id, comentario.usuario._id, comentario._id)}>
                                                    Eliminar comentario
                                                </button>
                                            </Accordion.Collapse>
                                        </div>
                                    }
                                </Accordion>
                                {comentario.respuesta.map((respuesta) => (
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <h4>{respuesta.usuario.userName}</h4>
                                            <p>{respuesta.respuesta}</p>
                                            {
                                                respuesta && ((respuesta.usuario._id === dataUser.id) || (publicacion.creador._id === dataUser.id)) &&
                                                <div>
                                                    <Accordion>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                            Eliminar
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="1">
                                                            <button className="btn btn-outline-warning mt-2 mb-2" onClick={() => eliminarRespuesta(publicacion._id, respuesta.usuario._id, comentario._id, respuesta._id)}>
                                                                Eliminar respuesta
                                                            </button>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                </div>
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>



                                ))}

                            </div>
                        ))
                    }

                </CardContent>
            </Card>
            {redirectTo()}
        </Grid>
    );
};

export default CardPublicacionPage;