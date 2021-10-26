import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './showImage'
import { deleteProject } from '../user/apiUser'
import { isAuthenticated } from '../auth'
import Swal from 'sweetalert2'
import moment from 'moment'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Button, makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActions } from '@material-ui/core'


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

const CardMyProject = ({ project }) => {
    const { dataUser, accessToken } = isAuthenticated()
    const classes = useStyles()
    const clickSubmit = event => {

        event.preventDefault()
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
                deleteProject(dataUser.id, accessToken, project._id).then((data) => {
                    if (data.error) {
                        Swal.fire(
                            'Error!',
                            data.error,
                            'error'
                        )
                    } else {
                        window.location.reload()
                    }
                })
            }
        })
    }
    return (

        <Card className={classes.card}>
            <Link to={`/profile/project/view/${project._id}`}>
                <ShowImage image={project} url="proyecto" w="100%" h="300px"/>
            </Link>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2" align="center">
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
                <Typography variant="body2" color="textSecondary" component="p" align="center">
                    <AccessTimeIcon color="action" fontSize="small" /> {moment(project.createdAt).fromNow()}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/profile/project/update/${project._id}`}>
                    <Button variant="outlined" size="small" color="primary">
                        Modificar
                    </Button>
                </Link>
                <Button variant="outlined" size="small" color="secondary" onClick={clickSubmit}>
                    Eliminar
                </Button>
                <Link to={`/profile/project/offers/${project._id}`}>
                    <Button variant="outlined" size="small" style={{ color: 'orange' }}>
                        Ofertas
                    </Button>
                </Link>
            </CardActions>
        </Card>


    )
}
export default CardMyProject