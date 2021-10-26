import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {  isAuthenticated } from '../auth/index';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import { Badge, Button} from '@material-ui/core';
import { createHora, deleteAgenda, readAgenda } from './apiUser';
import makeToast from '../Toaster/Toaster'
import moment from 'moment';
import { AccessTime, Edit, CalendarToday, Done} from '@material-ui/icons';
import { IconButton, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { LinearProgress } from '@material-ui/core';
const DoReserve = ({match}) => {
  moment.locale('es')
    const [selectedDate, handleDateChange] = useState()
    const [selectedTermino, handleTerminoChange] = useState()
    const [agenda, setAgenda] = useState([])
    const { dataUser, accessToken } = isAuthenticated();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
        loadHoras()
    }, []);
    const showError = () => (
      <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
          {error}
      </div>
  )
    const  clickSubmit = event => {
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
          createHora(dataUser.id, accessToken, fechaInicio, fechaTermino).then((data) =>{
            if(data.error){
              makeToast('error', data.error)
              setTimeout( function () {setLoading(true)}, 2000)
            } else {
              makeToast('success', data.mensaje)
              loadHoras()
              setTimeout( function () {setLoading(true)}, 2000)
            }
          })
        }
      }else {
        makeToast('error', 'Seleccione día y horas correspondientes')
      } 
    }

    const loadHoras = () => {
        readAgenda(dataUser.id, accessToken).then(data => {
          if(data.error){
            makeToast('error', data.error)
            setTimeout( function () {setLoading(true)}, 2000)
            setError(data.error)
          }else{
            setAgenda(data.data)
            setTimeout( function () {setLoading(true)}, 2000)
          }
        })
    }

    const deleteHora = idHora => event => {
      event.preventDefault()
      deleteAgenda(dataUser.id, accessToken, idHora).then(data =>{
        if(data.error){
          makeToast('error', data.error)
        }else {
          makeToast('success', data.mensaje)
          loadHoras()
          setTimeout( function () {setLoading(true)}, 2000)
        }
      })
    }
    const useStyles = makeStyles((theme) => ({
      table: {
        minWidth: 650,
      },
      root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      }
    }));
    
    const classes = useStyles();

    const createOfferForm = () => (
        <React.Fragment>
      <Typography variant="h4" gutterBottom align="center">
        Calendario 
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
          <Grid item xs={12} align="center">
            <button onClick={clickSubmit} className="btn btn-primary"><SaveIcon />Agendar hora</button>
          </Grid>
          </Grid >
          <Grid item xs={12} direction="row"
              justify="center"
              alignItems="center">
          <Typography variant="h6" gutterBottom align="center">
            Horas agendadas
          </Typography>
          </Grid>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha de inicio</TableCell>
            <TableCell align="center">Fecha de termino</TableCell>
            <TableCell align="right">Ofertas</TableCell>
            <TableCell align="right">Modificar</TableCell>
            <TableCell align="right">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        { agenda && loading ? (
            <TableBody>
              {agenda.map((data, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    <AccessTime fontSize="small"/>
                    {moment(data.fecha).format('MMMM Do YYYY, h:mm a')}
                  </TableCell>
                  <TableCell align="right">
                    <AccessTime fontSize="small"/>
                    {moment(data.fechaFin).format('MMMM Do YYYY, h:mm a')}</TableCell>
                  <TableCell align="right">{
                      data.estado.nombre === 'Agendada' ? (
                        <Link to={`/profile/agenda/offers/${data._id}`}>
                          <Button>
                            <Done fontSize="small" style={{color: 'green'}}/> 
                          </Button>
                        </Link>
                      ) : (
                        data.oferta.length > 0 ? (
                          <Link to={`/profile/agenda/offers/${data._id}`}>
                            <Button>
                              <Badge color="secondary" badgeContent={data.oferta.length}>
                                <CalendarToday fontSize="small"/>
                              </Badge>
                            </Button>
                          </Link>
                        ) : (
                          <Button onClick={ () => makeToast('error', 'Aún no tienes ofertas')}>
                            <Badge color="secondary" badgeContent={0} showZero>
                              <CalendarToday fontSize="small"/>
                            </Badge>
                          </Button>
                        ) 
                      )
                    }
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/profile/agenda/modificar/${data._id}`}>
                      <IconButton aria-label="delete">
                        <Edit fontSize="small" color="primary"/>
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="delete" onClick={deleteHora(data._id)}>
                      <DeleteIcon fontSize="small" color="error"/>
                    </IconButton>
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
      </Grid>
    </React.Fragment>
    );

    return (
        <Layout
          title="Mi agenda"
          description="Estás creando tu agenda." 
          className="container col-md-8 offset-md-2"
        >
            {createOfferForm()}
            <br/>
            {
              loading && agenda.length === 0 ? showError() : null
            }
        </Layout>
    );

};

export default DoReserve;