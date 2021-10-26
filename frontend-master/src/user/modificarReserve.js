import React, {useEffect, useState} from 'react';
import { Typography, Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { isAuthenticated } from '../auth';
import makeToast from '../Toaster/Toaster';
import { buscarFecha, modificarAgenda, readAgenda } from './apiUser';
import Layout from '../core/Layout';
import SaveIcon from '@material-ui/icons/Save';
import moment from 'moment';
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { AccessTime, ArrowBack } from '@material-ui/icons';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { LinearProgress } from '@material-ui/core';
const ModificarReserve = ({match}) => {

    const { dataUser, accessToken } = isAuthenticated();
    const [selectedDate, handleDateChange] = useState()
    const [selectedTermino, handleTerminoChange] = useState()
    const [redirectToReferrer, setRedirectToReferrer] = useState(false)
    const [agenda, setAgenda] = useState([])
    const [fechaInicio, setFechaInicio] = useState()
    const [fechaFin, setFechaFin] = useState()
    const [loading, setLoading] = useState()
    const modificarHora = idHora => event => {
      event.preventDefault();
      var existe = false   
      if(selectedDate && selectedTermino){
        const formato = 'MMMM Do YYYY HH:mm a'
        const fechaInicio = moment(selectedDate)
        const fechaTermino = moment(selectedDate)
        .set("hour", selectedTermino.getHours())
        .set("minute", selectedTermino.getMinutes())
        .set("seconds", selectedTermino.getSeconds())
        
        if(fechaInicio.hour() + fechaInicio.minutes() > fechaTermino.hour() + fechaTermino.minutes()){
          makeToast('error', 'La fecha de inicio debe ser menor a la de termino')
        } else if(fechaInicio.date() !== fechaTermino.date() && fechaInicio.month() !== fechaTermino.month()) {
            makeToast('error', 'La reserva no puede exceder 24 hrs.')
        } 
        if(agenda.length > 0 && !existe){
            agenda.map((data) => {
              const fecha = moment(data.fecha).format(formato)
              const fechaFin = moment(data.fechaFin).format(formato)
              if((fechaInicio.format(formato) >= fecha && fechaInicio.format(formato) <= fechaFin) 
              || (fechaTermino.format(formato) >= fecha && fechaTermino.format(formato) <= fechaFin)
              || (fechaInicio.format(formato) <= fecha && fechaTermino.format(formato) >= fechaFin)) {
                existe = true
                makeToast('error', 'Fecha seleccionada ya existe')
              } 
            })
        } 
        if (existe === true){
          makeToast('error', 'Hora ya ocupada')
        } else { 
          modificarAgenda(dataUser.id, accessToken, idHora, fechaInicio, fechaTermino).then((data) =>{
            if(data.error){
              makeToast('error', data.error)
            } else {
              makeToast('success', data.mensaje)
              loadHoras()
              setRedirectToReferrer(true)
            }
          })
        }
      }else {
        makeToast('error', 'Seleccione día y horas correspondientes')
      }
      
      }
    const redirectUser = () =>{
        if(redirectToReferrer) {
            return <Redirect to={`/profile/do-reserve/${dataUser.id}`}/>
        }
    }
    const rellenarFecha = () => {
        buscarFecha(dataUser.id, accessToken, match.params.idFecha).then(data => {
            if(data.error){
                makeToast('error', data.error)
            }else{
                setFechaInicio(data.fecha)
                setFechaFin(data.fechaFin)
                setTimeout( function (){setLoading(true)} , 2000) 
            }
        })
    }
    
    const loadHoras = () => {
      readAgenda(dataUser.id, accessToken).then(data => {
        if(data.error){
          makeToast('error', data.error)
        }else{
          setAgenda(data.data)
        }
      })
  }

    useEffect(()=>{
        rellenarFecha()
        loadHoras()
    }, [])
    const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });
    const classes = useStyles();
 
    const createOfferForm = () => (
      
    <React.Fragment>
      <Typography variant="h4" gutterBottom align="center">
        Estás modificando tu agenda
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={6} align="center">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          minDate={Date.now()}
          maxDate="12/31/2025"
          id="date-picker-inline"
          label="Seleccione día"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Seleccione hora de inicio"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Seleccione hora de termino"
          value={selectedTermino}
          onChange={handleTerminoChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </MuiPickersUtilsProvider>
        </Grid >
        <Grid item xs={6} >
        <Typography variant="h6" gutterBottom align="center">
            La fecha que estás modificando es:
        </Typography>
        <List>
          <ListItem>
              <ListItemAvatar>
                <AccessTime />
              </ListItemAvatar>
            <ListItemText primary="Inicio" secondary={moment(fechaInicio).format('MMMM Do YYYY, h:mm a')} />
            <ListItemText primary="Termino" secondary={moment(fechaFin).locale('es').format('MMMM Do YYYY, h:mm a')} />
          </ListItem> 
        <Typography variant="body2" gutterBottom align="center">
            (Selecciona una fecha del calendario y el rango de horas)
        </Typography>      
        </List> 
        </Grid>
  
        <Grid item xs={6} align="center">
            <Link className="btn btn-primary" to={`/profile/do-reserve/${dataUser.id}`}><ArrowBack />Volver</Link>
        </Grid>
        <Grid item xs={6} align="center">
          <button  className="btn btn-primary" onClick={modificarHora(match.params.idFecha)}><SaveIcon />Modificar Hora</button>
        </Grid>
        <Grid item xs={12} direction="row"
            justify="center"
            alignItems="center">
        <Typography variant="h6" gutterBottom align="center">
          Horas agendadas
        </Typography>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha de inicio</TableCell>
            <TableCell align="center">Fecha de termino</TableCell>
          </TableRow>
        </TableHead>
        {
          agenda && loading ? (
            <TableBody>
              {agenda.map((data, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                      <AccessTime fontSize="small"/>
                        {moment(data.fecha).format('MMMM Do YYYY, h:mm a')}
                      </TableCell>
                      
                      <TableCell component="th" scope="row" >
                        {moment(data.fechaFin).format('MMMM Do YYYY, h:mm a')}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          ) : (
            <TableBody>
              {agenda.map((data, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        <div>
                          <LinearProgress color="primary"/>
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <div>
                          <LinearProgress color="primary"/>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
            
          )
        }
        
      </Table>
    </TableContainer>  
        </Grid>
      </Grid>
      
    </React.Fragment>
        
    );

    return (
        <Layout
            title="Agenda"
            description="Modificando agenda"
            className="container col-md-8 offset-md-2"
        >
            
            {createOfferForm()}
            {redirectUser()}
            
        </Layout>
    );

};

export default ModificarReserve;