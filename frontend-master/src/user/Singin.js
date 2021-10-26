import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/images/InkappLogo.jpeg';
import { Redirect } from 'react-router-dom';
import { singin, authenticate, isAuthenticated } from './../auth/index';
import { API } from '../config';
import makeToast from '../Toaster/Toaster';

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
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/collection/94534741)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "black"
    },
}));

const SignIn = () => {
    const classes = useStyles();

    //CONSTANTES A UTILIZAR
    const [values, setValues] = useState({
        email: "",
        password: "",
        loading: false,
        redirectToReferrer: false
    });
    const { email, password, loading, redirectToReferrer } = values;

    //EXTRAER DATOS DEL USUARIO DESDE EL TOKEN
    const { dataUser } = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value });
    };

    //LLAMADO A FUNCIONALIDAD INICIAR SESIÓN
    const clickSubmit = event => {
        event.preventDefault();
        if(values.email !== "" && values.password !== ""){
            setValues({...values, loading: true})
            singin({ email, password }).then(data => {
                if(data.error) {
                    makeToast('error' , data.error)
                    setValues({...values, loading: false});
                }else {
                    authenticate (data, () => {
                        setValues({
                            ...values, 
                            redirectToReferrer: true
                        });
                        makeToast('success' , `Bienvenido`)
                    });
                }
            })
        }else{
            makeToast("warning", "Los campos son requeridos.")
        }
        
    };

    //CARGANDO
    const showLoading = () => 
        loading && (
            makeToast("","Cargando...")
        );

    //REDIRIGIR DESPUES DE LOGUEAR
    const redirectUser = () =>{
        if(redirectToReferrer) {
            if(dataUser && dataUser.tipo === 0){
                return <Redirect to="/" />
            }else{
                return <Redirect to="/" />
            }
        }
    }

    //FORMULARIO DE INICIO DE SESIÓN
    const SignInForm = () => (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} variant="square" >
                        <img
                            alt=""
                            src={logo}
                            width="100%"
                            height="100%"
                        />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Ingresa a tu cuenta...
                    </Typography>
                    <form className={classes.form}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoFocus
                            onChange={handleChange('email')}
                            value={email}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handleChange('password')}
                            value={password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={clickSubmit}
                        >
                            Iniciar sesión
                        </Button>
                        <Grid container>
                            <Grid item xs>                        
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    ¿Aún no tienes cuenta? ¡Regístrate ahora!
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5} >
                            {Copyright()}
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    )

    return (
        <div>
            {SignInForm()}
            {showLoading()}
            {redirectUser()}
        </div>
    )
}

export default SignIn;