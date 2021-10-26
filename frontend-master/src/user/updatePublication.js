import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Redirect } from 'react-router-dom';
import { getEstilosTatuajes } from '../admin/apiAdmin';
import makeToast from '../Toaster/Toaster';
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
import { getPublicacion, updatePublicacion } from '../core/apiCore';
import { Typography } from '@material-ui/core';

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

const UpdatePublication = ({ match }) => {
    //LLAMADO A LOS ESITLOS
    const classes = useStyles();

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [values, setValues] = useState({
        nombre: "",
        descripcion: "",
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
        EstilosTatuaje,
        estiloTatuaje,
        loading,
        error,
        redirectToReferrer,
        formData
    } = values;

    const { dataUser, accessToken } = isAuthenticated();

    const init = (publicacionId) => {
        getPublicacion(publicacionId, dataUser.id, accessToken).then(data => {
            if (data.error) {
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
            }
        })
    }

    //Cargar estilos y setear formData
    const initEstilos = () => {
        getEstilosTatuajes(dataUser.id, accessToken).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ EstilosTatuaje: data.data, formData: new FormData() })
            }
        })
    }

    useEffect(() => {
        init(match.params.publicacionId)
    }, []);

    const HandleChange = name => event => {
        const value =
            name === "img" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true })
        updatePublicacion(dataUser.id, accessToken, match.params.publicacionId, formData)
            .then(data => {
                if (data.error) {
                    makeToast('error', data.error)
                    setValues({ ...values, error: data.error });
                } else {
                    makeToast('success', "La publicación se ha actualizado correctamente.")
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                }
            })
    }

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to={`/profile/publication/view/${match.params.publicacionId}`} />
        }
    }

    const createPublicationForm = () => (
        <Container component="main" >
            <CssBaseline />
            <form className={classes.form} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>Título de la publicación</Typography>
                        <TextField
                            variant="standard"
                            autoFocus
                            required
                            fullWidth
                            onChange={HandleChange('nombre')}
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
                            onChange={HandleChange('descripcion')}
                            value={descripcion}
                        />

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
            title="Publicación"
            description="Editar mi publicación."
            className="container col-md-8 offset-md-2"
        >
            {createPublicationForm()}
            {redirectUser()}
        </Layout>
    );

};

export default UpdatePublication;