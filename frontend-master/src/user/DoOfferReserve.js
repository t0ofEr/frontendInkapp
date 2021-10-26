import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {  isAuthenticated } from '../auth/index';
import { Redirect } from 'react-router-dom';
import { createOffer, enviarOfertaReserva } from './apiUser';
import makeToast from '../Toaster/Toaster';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, Modal } from '@material-ui/core';
import ShowImage from '../core/showImage';
import { getMyProjects } from '../core/apiCore';

const DoOfferReserve = ({ match }) => {
    
    const [descripcion, setDescripcion] = useState()
    const { dataUser, accessToken } = isAuthenticated();
    const [idReserva,setIdReserva] = useState('')
    const [projects, setProjects] = useState([])
    const [proyecto, setProyecto] = useState([])
    const [modal, setModal]= useState(false)
    const [oculto, setOculto] = useState(false)
    const [redirectToReferer, setRedirectToReferer] = useState(false)

    const loadProjects = () => {
        getMyProjects(dataUser.id, accessToken).then( data => {
            if(data.error){
                makeToast('error', 'No tienes proyectos para adjuntar')
            } else {
                setProjects(data.data)
            }
        })
    }
    const redirect = () => {
        if(redirectToReferer){
            return <Redirect to={`/profile/reserve/myoffers/${dataUser.id}`}/>
        }
    }
    useEffect(() => {
        setIdReserva(match.params.agendaId)
        loadProjects()
    }, []);

    const handleChange = name => event => {
        const value = event.target.value
        setDescripcion(value)
    }

    const createOffer = () => event => {
        event.preventDefault()
        enviarOfertaReserva(dataUser.id, accessToken, descripcion, idReserva, proyecto).then(data=>{
            if(data.error){
                makeToast('error', data.error)
            } else {
                makeToast('success', data.mensaje)
                setRedirectToReferer(true)
            }
        })
    }

    const useStyles = makeStyles({
    root: {
        maxWidth: 150,
    },
    media: {
        height: 140,
    },
    modal: {
        position: 'absolute',
        width: '80%',
        backgroundColor: 'white',
        padding: '16px 32px 24px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '470px',
        overflow: 'scroll'
    },
    });

    const clickProyecto = p => event => {
        event.preventDefault()
        setProyecto(p)
        setModal(!modal)
        setOculto(true)
    }

    const desajuntarProyecto = () => event => {
        event.preventDefault()
        setProyecto(null)
        setOculto(false)
        
    }
    
    const createOfferForm = () => (
        <Grid container spacing={3}>
            <Typography className="text-muted" variant="h4" style={{marginTop: 25, color:"black"}}>Describe tu oferta</Typography>
            <Grid item xs={12} className="form-group" >
                <Typography className="text-muted" >Descripción</Typography>
                    <textarea 
                        placeholder="Ej. Me gustaría agendar tu hora. Tengo esta idea de proyecto."
                        onChange={handleChange('descripcion')} 
                        type="text" 
                        className="form-control" 
                        value={descripcion}
                    />
            </Grid>
            <Grid item xs={12}>
            {
                (oculto === false && projects.length > 0) ? (
                    <Typography className="text-muted" >Aún no adjuntas ningún archivo a tu oferta (Opcional)</Typography>
                ) : (
                    (oculto === true && proyecto) ? (
                        <Typography className="text-muted" >Tu proyecto adjuntado es {proyecto.nombre}</Typography>
                    ) : (
                        <p></p>
                    )
                    
                )
            }
            </Grid>
        </Grid>      
    );
   
    function MediaCard() {
        const classes = useStyles();  
        const abrirCerrarModal = () =>{
            setModal(!modal)
        }
        const body=(
            <Grid container spacing={3} className={classes.modal} direction="row"
            justify="center"
            alignItems="center">
                <Grid xs={12} align="center">
                    <Typography variant="h5">Mis proyectos</Typography>
                </Grid>
            { projects.map((project, id) => (
                <Grid item xs= {4} style={{marginTop: 10, width: 20}}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {project.nombre}
                            </Typography>
                            <ShowImage image={project} url="proyecto" h={'200px'} w={'100%'}/>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {project.descripcion}
                                </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" onClick={clickProyecto(project)}>
                            Seleccionar
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
            </Grid>
        )
        return (
            
            <Grid container spacing={3}>
                    {
                        (oculto === false && projects.length > 0) ? (
                        <Grid item xs={12} align="center" >
                                <Button onClick={() => abrirCerrarModal()} variant="contained" color="primary">Adjuntar un proyecto</Button>
                                <Modal
                                open={modal}
                                onClose={abrirCerrarModal}
                                >
                                    {body}
                                </Modal>
                        </Grid>
                        ) : (
                            (oculto === true && projects.length > 0) ? (
                            <Grid item xs={12} align="center" >
                                <Button onClick={desajuntarProyecto()} variant="contained" color="secondary">Dejar de adjuntar proyecto</Button>
                            </Grid> 
                        ) : (
                            <Grid item xs={12} align="center" >
                                <Typography className="text-muted"> No tienes proyectos para adjuntar a tu oferta</Typography>
                            </Grid>)
                        )   
                    }
                <Grid item xs={12} align="center" >
                    <Button onClick={createOffer()} variant="contained" color="primary">Enviar oferta</Button>
                </Grid>
            </Grid>
        );
    }
    

    return (
        <Layout
            title="Ingreso de oferta"
            description="Publica tu oferta!"
            className="container col-md-8 offset-md-2"
        >
            {createOfferForm()}  
            {MediaCard()}
            {redirect()}
        </Layout>
    );

};

export default DoOfferReserve;