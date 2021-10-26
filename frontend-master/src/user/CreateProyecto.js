import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {  isAuthenticated } from '../auth/index';
import { Redirect } from 'react-router-dom';
import { createProject } from './apiUser';
import {  getEstilosTatuajes, getPartes } from '../admin/apiAdmin';
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
import { Form } from 'react-bootstrap';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

const CreateProyecto = () => {
    const classes = useStyles();

    const [PartesCuerpo, setPartesCuerpo ] = useState([])
    const [values, setValues] = useState({
        nombre: "",
        descripcion: "",
        tamaño: "",
        img: "",
        EstilosTatuaje: [],
        estiloTatuaje: "",
        parteCuerpo: "",
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
        img,
        EstilosTatuaje,
        estiloTatuaje,
        parteCuerpo,
        loading, 
        error,
        redirectToReferrer,
        formData 
    } = values;

    const { dataUser, accessToken } = isAuthenticated();

    const init = () => {

        getEstilosTatuajes(dataUser.id, accessToken).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else {
                setValues({...values, EstilosTatuaje: data.data, formData: new FormData()}) 
                
            }
        })
       
    }

    const initPartesCuerpo = () => {
        getPartes().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else {
                setPartesCuerpo(data.data);
            }
        })
    } 


    useEffect(() => {
      init()
      initPartesCuerpo()
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
        createProject(dataUser.id, accessToken, formData)
        .then(data => {
            if(data.error) {
                makeToast('error', data.error)
                setValues({...values, error: data.error, redirectToReferrer: false});
            }else{
                makeToast('success', data.mensaje)
                setValues({
                    ...values, 
                    error: false,
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
    const createProjectForm = () => (

        <Container component="main" >
            <CssBaseline />
            <form className={classes.form} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Form>
                            <Typography variant="caption" display="block" gutterBottom>
                                Agregar una foto *
                            </Typography>
                            <Form.File
                                id="custom-file"    
                                custom
                                onChange={HandleChange('img')}
                                type="file"
                                name="img"
                                accept="image/*"
                            />
                        </Form>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="standard"
                            autoFocus
                            required
                            fullWidth
                            label="Título del proyecto"
                            onChange={HandleChange("nombre")}
                            value={nombre}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-multiline-static"
                            label="Describe tu proyecto"
                            multiline
                            fullWidth
                            required
                            rows={3}
                            onChange={HandleChange("descripcion")}
                            value={descripcion}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="standard"
                            autoFocus
                            required
                            fullWidth
                            label="Tamaño deseado del tatuaje"
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
                            Crear Proyecto
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>

    );

    return (
        <Layout
            title="Proyectos"
            description="Estás creando un nuevo proyecto"
            className="container col-md-8 offset-md-2"
        >
            {createProjectForm()}
            {redirectUser()}
        </Layout>
    );

};

export default CreateProyecto;