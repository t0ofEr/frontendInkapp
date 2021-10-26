import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import makeToast from '../Toaster/Toaster';
import { isAuthenticated } from './../auth/index';
import { Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import ShowAvatarProfile from '../core/showAvatarProfile';
import { read, update } from './apiUser';


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

const ChangePhoto = () => {
    const classes = useStyles();

    const { dataUser, accessToken } = isAuthenticated();

    //CONSTANTES A LLENAR EN EL FORMULARIO
    const [user, setUser] = useState('');
    const [values, setValues] = useState({
        img: "",
        loading: false,
        redirectToReferrer: false,
        succes: false,
        formData: ""
    });

    const {
        loading,
        redirectToReferrer,
        formData
    } = values;

    //BUSCAR AL USUARIO DEL PERFIL POR ID, SETEAR DATOS, COMENTARIOS Y PUBLICACIONES.
    const init = (userId) => {
        read(userId, accessToken).then(data => {
            if (data.error) {
                makeToast("error", data.error)
            } else {
                setUser(data.user);
                setValues({...values, formData: new FormData()})
            }
        })
    };

    useEffect(() => {
        init(dataUser.id);
    }, []);

    //HANDLECHANGE
    const handleChange = name => event => {
        const value = event.target.files[0];
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    //LLAMADO A FUNCIONALIDAD DE CREAR USUARIO
    const clickSubmit = e => {
        e.preventDefault()
        setValues({...values, loading: true});
            update(dataUser.id, accessToken, formData )
            .then( data => {
                if(data.error) {
                    makeToast("error", data.error);
                } else{
                    init(dataUser.id);
                    makeToast("succes", "Su foto de perfil se ha actualizado correctamente.");
                }
            })      
    }

    //REDIRIGIR DESPUES DE CREAR EL USUARIO
    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/user/dashboard" />
        }
    }

    //FORMULARIO DE REGISTRO
    const ChangePhotoForm = () => (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} align="center">
                            <ShowAvatarProfile image={user} url="perfil" />
                        </Grid>
                        <Grid item xs={12}>
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={clickSubmit}
                    >
                        Subir nueva foto
                    </Button>
                </form>
            </div>
        </Container>
    )

    return (
        <div>
            {ChangePhotoForm()}
            {redirectUser()}
        </div>
    );
}

export default ChangePhoto;