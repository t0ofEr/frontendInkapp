import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {  isAuthenticated } from './../auth/index';
import { Redirect } from 'react-router-dom';
import {  updateProject , readProject} from './apiUser';
import { getEstilosTatuajes, getPartes } from '../admin/apiAdmin';
import makeToast from '../Toaster/Toaster';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


//ESTILOS A UTILIZAR
const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 3),
        backgroundColor: "black"
    },
    formControl: {
        minWidth: "100%",
    },
}));

const UpdateProject = ({match}) => {
    //LLAMADO A LOS ESITLOS
    const classes = useStyles();

    const [PartesCuerpo, setPartesCuerpo ] = useState([])
    const [values, setValues] = useState({
        nombre: "",
        descripcion: "",
        tamaño: "",
        parteCuerpo: "",
        EstilosTatuaje: [],
        estiloTatuaje: "",
        loading: false,
        error: "",
        redirectToReferrer: false,
        succes: false,
        formData: ""
    });

    const { 
        nombre,
        descripcion,
        tamaño,
        parteCuerpo,
        EstilosTatuaje,
        estiloTatuaje,
        loading, 
        error,
        redirectToReferrer,
        formData 
    } = values;

    const { dataUser, accessToken } = isAuthenticated();

    const init = (projectId) => {
        readProject(dataUser.id, accessToken, projectId).then(data => {
            if(data.error){
                makeToast('error', data.error)
            } else {
                setValues({
                    ...values, 
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    tamaño: data.tamaño,
                    formData: new FormData()     
                }
                )
                initEstilos()
                initPartesCuerpo()
            }
        })
    }
    const initEstilos = () => {
        getEstilosTatuajes(dataUser.id, accessToken).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else {
                setValues({ EstilosTatuaje: data.data, formData: new FormData()}) 
            }
        })
    }
    const initPartesCuerpo = () => {
        getPartes(dataUser.id, accessToken).then(data => {
            if(data.error){
                makeToast('error', data.error)
                setValues({...values, error: data.error})
            }else {
                setPartesCuerpo(data.data) 
            }
        })
    }

    useEffect(() => {
      init(match.params.projectId)
    }, []);

    const HandleChange = name => event => {
        const value = 
            name === "img" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values , error: '', loading:true })
        updateProject(dataUser.id, accessToken, match.params.projectId,formData)
        .then(data => {
            if(data.error) {
                makeToast('error', data.error)
                 setValues({...values, error: data.error});
            }else{
                makeToast('success', data.mensaje)
                setValues({
                    ...values, 
                    redirectToReferrer: true
                });
            }
        })
    }

    const redirectUser = () =>{
        if(redirectToReferrer) {
            if(!error){
                return <Redirect to={`/profile/myprojects/${dataUser.id}`} />
            }
        }
    }

    const updateProjectForm = () => (
         <Container component="main" >
            <CssBaseline />
            <form className={classes.form} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>Título del proyecto</Typography>
                        <TextField
                            variant="standard"
                            autoFocus
                            required
                            fullWidth
                            onChange={HandleChange("nombre")}
                            value={nombre}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Descripción</Typography>
                        <TextField
                            id="standard-multiline-static"
                            variant="filled"
                            multiline
                            fullWidth
                            required
                            rows={3}
                            onChange={HandleChange("descripcion")}
                            value={descripcion}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Tamaño</Typography>
                        <TextField
                            variant="standard"
                            autoFocus
                            required
                            fullWidth
                            onChange={HandleChange("tamaño")}
                            value={tamaño}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">¿En que parte del cuerpo te gustaría realizar este proyecto?</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={parteCuerpo}
                                onChange={HandleChange('parteCuerpo')}
                            >
                                <MenuItem>Seleccione una parte del cuerpo te gustaria realizar este proyecto...</MenuItem>
                                {PartesCuerpo.map((data, i) => (
                                    <MenuItem key={i} value={data._id}>{data.nombre}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Estilo del tatuaje/diseño/boceto</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={estiloTatuaje}
                                onChange={HandleChange('estiloTatuaje')}
                            >
                                <MenuItem>Seleccione un estilo...</MenuItem>
                                {EstilosTatuaje.map((data, i) => (
                                    <MenuItem key={i} value={data._id}>{data.nombre}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={clickSubmit}
                        >
                            modificar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );

    return (
        <Layout
            title="Proyecto"
            description="Editar tu proyecto"
            className="container col-md-8 offset-md-2"
        >
            {updateProjectForm()}
            {redirectUser()}
        </Layout>
    );

};

export default UpdateProject;