import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import makeToast from '../Toaster/Toaster';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { isAuthenticated } from './../auth/index';
import { getRegiones } from './../admin/apiAdmin';
import { Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

//ESTILOS A UTILIZAR
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
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

const UpdateUser = () => {
    const classes = useStyles();

    const { dataUser, accessToken } = isAuthenticated();

    //CONSTANTES A LLENAR EN EL FORMULARIO
    const [values, setValues] = useState({
        userName: "",
        nombre: "",
        apellido: "",
        sexo: "",
        email: "",
        password: "",
        confirmPassword: "",
        tipo: "",
        edad: "",
        Regiones: [],
        region: "",
        redirectToDashboard: false,
        formData: ""
    });

    const { 
        userName, 
        nombre, 
        apellido, 
        sexo, 
        email,
        tipo, 
        edad,
        Regiones,
        region,
        redirectToDashboard,
        formData 
    } = values;

    const init = (userId) => {
        read(userId, accessToken).then(data => {
            if (data.error) {
                makeToast("error", data.error);
            } else {
                setValues({
                    ...values,
                    userName: data.user.userName,
                    nombre: data.user.nombre,
                    apellido: data.user.apellido,
                    sexo: data.user.sexo,
                    email: data.user.email,
                    tipo: data.user.tipo,
                    edad: data.user.edad,
                    region: data.user.region,
                    formData: new FormData()
                })
                initRegiones();
            }
        })
    }

    const initRegiones = () => {
        getRegiones().then(data => {
            if (data.error) {
                makeToast("error", data.error);
            } else {
                setValues({ Regiones: data.data, formData: new FormData() })
            }
        })
    }

    useEffect(() => {
        init(dataUser.id)
    }, []);

    //HANDLECHANGE
    const handleChange = name => event => {
        const value = event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    //LLAMADO A FUNCIONALIDAD DE CREAR USUARIO
    const clickSubmit = e => {
        e.preventDefault()
        update(dataUser.id, accessToken, formData)
            .then(data => {
                if (data.error) {
                    makeToast("error", data.error);
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            userName: data.userName,
                            nombre: data.nombre,
                            apellido: data.apellido,
                            sexo: data.sexo,
                            email: data.email,
                            tipo: data.tipo,
                            edad: data.edad,
                            region: data.region,
                            redirectToDashboard: true
                        })
                    })
                }
            })
    }

    //REDIRIGIR DESPUES DE CREAR EL USUARIO
    const redirectUser = () => {
        if (redirectToDashboard) {
            return <Redirect to="/" />
        }
    }

    //FORMULARIO DE REGISTRO
    const UpdateForm = () => (
        <Container component="main" maxWidth="s">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <Typography>Nombre de usuario</Typography>
                            <TextField
                                variant="standard"
                                required
                                fullWidth
                                id="userName"
                                name="userName"
                                autoFocus
                                onChange={handleChange('userName')}
                                value={userName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <Typography>Nombre</Typography>
                            <TextField
                                name="nombre"
                                variant="standard"
                                required
                                fullWidth
                                id="nombre"
                                onChange={handleChange('nombre')}
                                value={nombre}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <Typography>Apellido</Typography>
                            <TextField
                                variant="standard"
                                required
                                fullWidth
                                id="apellido"
                                name="apellido"
                                onChange={handleChange('apellido')}
                                value={apellido}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <Typography>Email</Typography>
                            <TextField
                                variant="standard"
                                required
                                fullWidth
                                id="email"
                                name="email"
                                onChange={handleChange('email')}
                                value={email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <Typography>Sexo</Typography>
                            <FormControl className={classes.formControl}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sexo}
                                    onChange={handleChange('sexo')}
                                >
                                    <MenuItem>Seleccione su sexo...</MenuItem>
                                    <MenuItem value={"F"}>Femenino</MenuItem>
                                    <MenuItem value={"M"}>Masculino</MenuItem>
                                    <MenuItem value={"NO"}>Prefiero no responder</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <Typography>Edad</Typography>
                            <TextField
                                variant="standard"
                                type="number"
                                required
                                fullWidth
                                id="edad"
                                name="edad"
                                onChange={handleChange('edad')}
                                value={edad}
                                min="18"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <Typography>Región</Typography>
                            <FormControl className={classes.formControl}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={region}
                                    onChange={handleChange('region')}
                                >
                                    <MenuItem>Seleccione una región...</MenuItem>
                                    {Regiones.map((data, i) => (
                                        <MenuItem key={i} value={data._id}>{data.nombre}</MenuItem>
                                    ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography>¿Que tipo de usuario quieres ser?</Typography>
                            <FormControl className={classes.formControl}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tipo}
                                    onChange={handleChange('tipo')}
                                >
                                    <MenuItem>Seleccione un tipo de usuario...</MenuItem>
                                    <MenuItem value={"1"}>Quiero registrarme como tatuador</MenuItem>
                                    <MenuItem value={"2"}>Quiero registrarme como usuario</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={clickSubmit}
                    >
                        Actualizar mi cuenta
                    </Button>
                </form>
            </div>
        </Container>
    )

    return (
        <div>
            {UpdateForm()}
            {redirectUser()}
        </div>
    );
}

export default UpdateUser;