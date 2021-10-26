import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../assets/images/InkappLogo.jpeg';
import makeToast from '../Toaster/Toaster';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { singup, authenticate, isAuthenticated } from './../auth/index';
import { getRegiones } from './../admin/apiAdmin';
import { Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { update } from './apiUser';

//ESTILOS A UTILIZAR
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
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

const ChangePass = () => {
    const classes = useStyles();

    const { dataUser, accessToken } = isAuthenticated();

    //CONSTANTES A LLENAR EN EL FORMULARIO
    const [values, setValues] = useState({
        password: "",
        confirmPassword: "",
        loading: false,
        redirectToReferrer: false,
        succes: false,
        formData: ""
    });

    const {
        password,
        confirmPassword,
        loading,
        redirectToReferrer,
        formData
    } = values;

    useEffect(() => {
        setValues({...values, formData: new FormData()})
    }, []);

    //HANDLECHANGE
    const handleChange = name => event => {
        const value = event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const clickSubmit = e => {
        e.preventDefault()
        setValues({ ...values, error: "", loading: true });
        if (password === confirmPassword) {
            update(dataUser.id, accessToken, formData)
                .then(data => {
                    if (data.error) {
                        makeToast("error", data.error);
                    } else {
                        makeToast("success", "Su contraseña ha sido actualizada correctamente.");
                    }
                })
        } else {
            makeToast('error', 'Contraseñas no coinciden')
        }

    }

    //REDIRIGIR DESPUES DE CREAR EL USUARIO
    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/" />
        }
    }

    //FORMULARIO DE REGISTRO
    const ChangePassForm = () => (
        <Container component="main" maxWidth="s">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="standard"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                onChange={handleChange('password')}
                                value={password}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="standard"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirmar contraseña"
                                type="password"
                                id="confirmPassword"
                                onChange={handleChange('confirmPassword')}
                                value={confirmPassword}
                            />
                        </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={clickSubmit}
                    >
                        Cambiar contraseña
                    </Button>
                    </Grid>
                </form>
            </div> 
        </Container>
    )

    return (
        <div>
            {ChangePassForm()}
            {redirectUser()}
        </div>
    );
}

export default ChangePass;

