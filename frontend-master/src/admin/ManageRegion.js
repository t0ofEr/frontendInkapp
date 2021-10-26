import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from './../auth/index';
import { Link } from 'react-router-dom';
import { getRegiones, deleteRegion, createRegion } from './apiAdmin'
import makeToast from '../Toaster/Toaster';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { LinearProgress } from '@material-ui/core';

//ESTILOS A UTILIZAR
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    celda: {
        fontWeight: "bold",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 3),
        backgroundColor: "black"
    },
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    }
}));

const ManageRegion = () => {
    //LLAMADO A LOS ESITLOS
    const classes = useStyles();

    //VARIABLES A UTILIZAR
    const [regiones, setRegiones] = useState([]);
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    //DESESTRUCTURAR INFORMACIÓN DEL USUARIO DESDE EL SESSION STORAGE
    const { accessToken, dataUser } = isAuthenticated();

    //FUNCION CARGAR REGIONES
    const loadRegiones = () => {
        getRegiones().then(data => {
            if (data.error) {
                setError(data.error)
                setTimeout( function () {setLoading(true)}, 2000) 
            } else {
                setRegiones(data.data);
                setTimeout( function () {setLoading(true)}, 2000) 
            }
        })
    }
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    //FUNCION DESTRUIR REGIONES
    const destroyRegion = idR => {
        deleteRegion(idR, dataUser.id, accessToken).then(data => {
            if (data.error) {
                makeToast('error', data.error)
                setTimeout( function () {setLoading(true)}, 2000)
            } else {
                makeToast("success", "La region se ha borrado con éxito")
                loadRegiones();
                setTimeout( function () {setLoading(true)}, 2000)
            }
        })
    }

    useEffect(() => {
        loadRegiones();
    }, [])

    //HANDLE CHANGE PARA CREAR REGIONES
    const handleChange = (e) => {
        setNombre(e.target.value);
    }

    //FUNCION DEL BOTÓN CREAR REGIÓN
    const clickSubmit = (e) => {
        e.preventDefault();
        //Request to API
        createRegion( dataUser.id, accessToken, {nombre}).then(data => {
            if(data.error) {
                makeToast("error", "La región ingresada ya existe")
            }else {
                makeToast("success", `La región ${nombre} se ha creado con éxito.`)
                setNombre('')
                loadRegiones();
                setTimeout( function () {setLoading(true)}, 2000)
            }
        });
    };

    //FORMULARIO NUEVA REGIÓN
    const newRegionForm = () => (
        <Container component="main" >
            <CssBaseline />
                <form className={classes.form} >
                    <Grid container spacing={2}>    
                        <Grid item xs={6}>
                            <TextField
                                variant="standard"
                                required
                                fullWidth
                                label="Nombre de la región"
                                onChange={handleChange}
                                value={nombre}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={clickSubmit}
                    >
                        Crear región
                    </Button>
                        </Grid>
                    </Grid>
                    
                </form>
        </Container>
    )

    return (
        <Layout
            title="Administrar regiones"
            description="CRUD de regiones."
            className="container flui"
        >
            <Typography variant="h5" component="h2" align="center">
                Crea una nueva región
            </Typography>
            {newRegionForm()}
            <Typography variant="h5" component="h2" align="center">
                Administrar Regiones
            </Typography>
            <TableContainer component={Paper}>

                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell className={classes.celda} align="left">Nombre</TableCell>
                            <TableCell className={classes.celda} align="left">Modificar</TableCell>
                            <TableCell className={classes.celda} align="left">Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        regiones && loading ? (
                        <TableBody>
                            {regiones.map((region) => (
                                <TableRow key={region.nombre}>
                                    <TableCell component="th" scope="row">
                                        {region.nombre}
                                    </TableCell>
                                    <TableCell align="left" >
                                        <Link to={`/manage/region/update/${region._id}`}>
                                            <EditIcon style={{ marginLeft: "7%", cursor: "pointer" }} />
                                        </Link>


                                    </TableCell>
                                    <TableCell align="left">
                                        <Link onClick={() => destroyRegion(region._id)}>
                                            <DeleteIcon style={{ marginLeft: "7%", cursor: "pointer" }} />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                         </TableBody>
                        ) : (
                            loading ? 
                                null
                             : (
                                 <TableBody>
                                    <TableCell>
                                        <div className={classes.root}>
                                            <LinearProgress color="primary"/>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={classes.root}>
                                            <LinearProgress color="primary"/>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={classes.root}>
                                            <LinearProgress color="primary"/>
                                        </div>
                                    </TableCell>
                                </TableBody>
                            )
                        )
                    }
                    
                </Table>
            </TableContainer>
            {
                loading && regiones.length === 0 ? 
                    showError()
                :  null                
            }
        </Layout>
    );
}

export default ManageRegion;