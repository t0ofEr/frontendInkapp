import React, {useState, useEffect } from 'react';
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
import { singup, authenticate } from './../auth/index';
import { getRegiones } from './../admin/apiAdmin';
import { Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';

//MENSAJE COPYRIGHT
const Copyright = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <Link href="/" variant="body2">
                Volver al inicio...
            </Link>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="/">
                    {'INKAPP '}
                </Link>
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>

    );
}

//ESTILOS A UTILIZAR
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
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

const SignUp = () => {
    const classes = useStyles();

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
        img: "",
        edad: "",
        Regiones: [],
        region: "",
        loading: false,
        redirectToReferrer: false,
        succes: false,
        formData: ""
    });

    const { 
        userName, 
        nombre, 
        apellido, 
        sexo, 
        email, 
        password, 
        confirmPassword, 
        tipo, 
        edad,
        Regiones,
        region, 
        loading,
        redirectToReferrer,
        formData 
    } = values;

    //CONSTANTE CHECKBOX FOTO DE PERFIL
    const [checked, setChecked] = useState(false);

    //HANDLECHANGE PARA EL CHECKBOX
    const handleChangeCheck = (event) => {
        setChecked(event.target.checked);
    };

    //CARGAR REGIONES Y SETEAR LOS DATOS
    const init = () => {
        getRegiones().then(data => {
            if(data.error){
                makeToast("error", data.error)
            }else {
                setValues({...values, Regiones: data.data, formData: new FormData()}) 
            }
        })
    }

    useEffect(() => {
        init()
    }, []);

    //HANDLECHANGE
    const handleChange = name => event => {
        const value = 
            name === "img" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    //LLAMADO A FUNCIONALIDAD DE CREAR USUARIO
    const clickSubmit = event => {
        event.preventDefault();
        //VALIDACIÓN DE CAMPOS
        if (values.userName && values.nombre && values.apellido && values.email && values.sexo && values.edad && values.region && values.password && values.confirmPassword && values.tipo) {
            //VALIDACIONES DE REGISTRAR CON FOTO DE PERFIL
            if(checked){
                if(values.img){
                    if (password === confirmPassword) {
                        setValues({ ...values, loading: true })
                        singup(formData)
                            .then(data => {
                                if (data.error) {
                                    makeToast("error", data.error)
                                } else {
                                    authenticate(data, () => {
                                        setValues({
                                            ...values,
                                            redirectToReferrer: true
                                        });
                                    });
                                }
                            })
                    } else {
                        makeToast("warning", "Las contraseñas no coinciden")
                    }
                }else{
                    makeToast("warning", "Debe ingresar una foto de perfil o desactivar la opción")
                }
            }else{
                //REGISTRAR SIN FOTO DE PERFIL
                if (password === confirmPassword) {
                    setValues({ ...values, loading: true })
                    singup(formData)
                        .then(data => {
                            if (data.error) {
                                makeToast("error", data.error)
                            } else {
                                authenticate(data, () => {
                                    setValues({
                                        ...values,
                                        redirectToReferrer: true
                                    });
                                });
                            }
                        })
                } else {
                    makeToast("warning", "Las contraseñas no coinciden")
                }
            }
        }else{
            makeToast("warning", "Los campos son requeridos")
        }
    }

    //REDIRIGIR DESPUES DE CREAR EL USUARIO
    const redirectUser = () =>{
        if(redirectToReferrer) {
            return <Redirect to="/" />
        }
    }

    //INPUT FOTO
    const UploadPhoto = () =>{
        if(checked){
            return <Grid item xs={12}>
                <Form>
                    <Form.File 
                        id="custom-file"
                        label="Elegir una foto de perfil"
                        custom
                        onChange={handleChange('img')}
                        type="file" 
                        name="img" 
                        accept="image/*" 
                    />
                </Form>
            </Grid>        
        }
    }

    //FORMULARIO DE REGISTRO
    const SignUpForm = () => (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar} variant="square">
                <img
                            alt=""
                            src={logo}
                            width="100%"
                            height="100%"
                />
                </Avatar>
                <Typography component="h1" variant="h5">
                    ¡Crea tu cuenta!
                </Typography>
                <form className={classes.form} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                required
                                fullWidth
                                id="userName"
                                label="Nombre de usuario"
                                name="userName"
                                autoFocus
                                onChange={handleChange('userName')}
                                value={userName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="nombre"
                                variant="standard"
                                required
                                fullWidth
                                id="nombre"
                                label="Nombre"
                                onChange={handleChange('nombre')}
                                value={nombre}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="standard"
                                required
                                fullWidth
                                id="apellido"
                                label="Apellido"
                                name="apellido"
                                onChange={handleChange('apellido')}
                                value={apellido}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                onChange={handleChange('email')}
                                value={email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
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
                            <TextField
                                variant="standard"
                                type="number"
                                required
                                fullWidth
                                id="edad"
                                label="Edad"
                                name="edad"
                                onChange={handleChange('edad')}
                                value={edad}
                                min="18"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Región</InputLabel>
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
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">¿Que tipo de usuario quieres ser?</InputLabel>
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
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                checked={checked}
                                name="checked"
                                color="primary" 
                                onChange={handleChangeCheck}
                                />}
                            label="Deseo agregar una foto de perfil ahora mismo."
                        />
                    </Grid>
                    {UploadPhoto()}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={clickSubmit}
                    >
                        Registarme
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                ¿Ya estás registrado? ¡Inicia sesión ahora!
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={2}>
                {Copyright()}
            </Box>
        </Container>
    )

    return (
        <div>
            {SignUpForm()}
            {redirectUser()}
        </div>
    );
}

export default SignUp;

