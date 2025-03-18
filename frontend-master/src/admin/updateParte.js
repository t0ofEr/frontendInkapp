import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { getParte, updateParte } from './apiAdmin';
import makeToast from '../Toaster/Toaster';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 3),
        backgroundColor: "black"
    },
}));

const UpdateParte = ({ match }) => {
    const classes = useStyles();

    const [values, setValues] = useState({
        nombre: "",
        succes: false
    })

    const { nombre, succes } = values;

    //Desestructurar informacion desde el sesion storage
    const { accessToken, dataUser } = isAuthenticated();

    const init = (parteId) => {
        getParte(parteId, dataUser.id, accessToken).then(data => {
            if (data.error) {
                makeToast('error', data.error)
            } else {
                setValues({ nombre: data.nombre })
            }
        })
    }

    useEffect(() => {
        init(match.params.parteId);
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        updateParte(match.params.parteId, dataUser.id, accessToken, { nombre }).then(data => {
            if (data.error) {
                makeToast('error', data.error)
            } else {
                setValues({ ...values, succes: true })
                makeToast("success", `${nombre} se ha actualizado con éxito.`)
            }
        })
    };

    const goBack = () => {
        if (succes) {
            return <Redirect to="/manage/parte" />
        }
    };

    const UpdateParteForm = () => (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <form className={classes.form} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="standard"
                            required
                            fullWidth
                            label="Nombre del estado"
                            autoFocus
                            onChange={handleChange('nombre')}
                            value={nombre}
                        />
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
                    Modificar parte del cuerpo
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={() => { setValues({ ...values, succes: true }) }}
                >
                    Volver sin modificar
                </Button>
            </form>
        </Container>
    )

    return (
        <Layout title="Modificar parte del cuerpo" description={'Modificar una parte del cuerpo de la base de datos.'} >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {UpdateParteForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )

}

export default UpdateParte;