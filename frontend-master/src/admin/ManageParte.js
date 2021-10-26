import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from './../auth/index';
import { Link } from 'react-router-dom';
import { getPartes, deleteParte, createParte } from './apiAdmin'
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
    
const ManageParte = () => {
    //LLAMADO A LOS ESITLOS
    const classes = useStyles();

    //VARIABLES A UTILIZAR
    const [partes, setPartes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    //DESESTRUCTURAR INFORMACIÓN DEL USUARIO DESDE EL SESSION STORAGE
    const { dataUser, accessToken } = isAuthenticated();

    //FUNCION CARGAR ESTADOS
    const loadPartes = () => {
        getPartes().then(data => {
            if(data.error) {
                makeToast('error', data.error)
                setError(data.error)
                setTimeout( function () {setLoading(true)}, 2000) 
            }else{
                setPartes(data.data);
                setTimeout( function () {setLoading(true)}, 2000)
            }
        })
    }
    
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    //FUNCION DESTRUIR ESTADO
    const destroyParte = idR => {
        deleteParte(idR, dataUser.id, accessToken).then(data => {
            if(data.error){
                makeToast('error', data.error)
                setTimeout( function () {setLoading(true)}, 2000)
            }else{
                makeToast("success", data.mensaje)
                loadPartes();
                setTimeout( function () {setLoading(true)}, 2000)
            }
        })
    }

    useEffect(() =>{
        loadPartes();
    }, [])

    //HANDLE CHANGE PARA CREAR ESTADOS
    const handleChange = (e) => {
        setNombre(e.target.value);
    }

    //FUNCION DEL BOTÓN CREAR REGIÓN
    const clickSubmit = (e) => {
        e.preventDefault();
        //Request to API
        createParte( dataUser.id, accessToken, {nombre}).then(data => {
            if(data.error) {
                makeToast("error", "El estado ingresada ya existe")
            }else {
                makeToast("success", `La parte ${nombre} se ha creado con éxito.`)
                setNombre('')
                loadPartes();
                setTimeout( function () {setLoading(true)}, 2000)
            }
        });
    };

    const newParteCuerpoForm = () => (
        <Container component="main" >
            <CssBaseline />
                <form className={classes.form} >
                    <Grid container spacing={2}>    
                        <Grid item xs={6}>
                            <TextField
                                variant="standard"
                                required
                                fullWidth
                                label="Nombre de la parte"
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
                        Crear parte
                    </Button>
                        </Grid>
                    </Grid>
                    
                </form>
        </Container>
    )

    return (
        <Layout
            title="Administrar partes del cuerpo"
            description="CRUD de partes del cuerpo."
            className="container flui"
        >
            <Typography variant="h5" component="h2" align="center">
                Crear una parte del cuerpo
            </Typography>
            {newParteCuerpoForm()}
            <Typography variant="h5" component="h2" align="center">
                Administrar Partes del cuerpo
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
                        partes && loading ? (
                            <TableBody>
                                {partes.map((parte) => (
                                    <TableRow key={parte.nombre}>
                                        <TableCell component="th" scope="row">
                                            {parte.nombre}
                                        </TableCell>
                                        <TableCell align="left" >
                                        <Link to={`/manage/parte/update/${parte._id}`}>
                                            <EditIcon style={{ marginLeft: "7%", cursor:"pointer" }} />
                                        </Link>
                                            
                                            
                                        </TableCell>
                                        <TableCell align="left">
                                        <Link onClick={() => destroyParte(parte._id)}>
                                            <DeleteIcon style={{ marginLeft: "7%", cursor:"pointer" }} />
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
                        loading && partes.length === 0 ? showError() : null
                    }
        </Layout>
    );
}

export default ManageParte;