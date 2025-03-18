import React from 'react'
import makeToast from '../Toaster/Toaster'
import { io } from 'socket.io-client'
import { withRouter } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { API } from '../config'
import Layout from '../core/Layout'
import {
    Card, Grid, Button, Select, MenuItem,
    FormControl, InputLabel, makeStyles, Typography, CardContent, TextField
} from '@material-ui/core'


const DashboardPage = (props) => {

    const [chatrooms, setChatrooms] = React.useState([])
    const [chatroomsId, setChatroomsId] = React.useState('')
    const [chatroomName, setChatroomName] = React.useState('')
    const { accessToken, dataUser } = isAuthenticated()
    const [socket, setSocket] = React.useState('')

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        root: {
            ...theme.typography.button,
            backgroundColor: "black",
            padding: theme.spacing(1),
            color: 'white',
            textAlign: 'center'
        },

    }));
    const classes = useStyles();
    const setupSocket = () => {


        if (accessToken && !socket) {
            const newSocket = io('http://localhost:8000', {

                query: {
                    token: accessToken
                }
            })


            newSocket.on('disconnect', () => {
                setSocket(null)
                setTimeout(setupSocket, 3000)
                makeToast('error', 'Socket Disconnected!')
            })

            newSocket.on('connect', () => {


                setSocket(newSocket)

                makeToast('success', 'Socket Connected!')
            })

        }
    }

    const getChatrooms = () => {
        fetch(`${API}/chatroom/${dataUser.id}`, {
            headers: {
                Authorization: `${accessToken}`

            }
        }).then(response => response.json())
            .then(data => {

                setChatrooms(data)
            })
            .catch(err => {
                makeToast('error', err.data.error)

                setTimeout(getChatrooms, 3000)
            })

    }

    const crearChatroom = (chatroomName) => {
        const nombre = chatroomName

        if (!nombre) {
            makeToast('error', 'Debe ingresar un nombre para crear sala')
        } else {
            fetch(`${API}/chatroom/crear/${dataUser.id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: ` ${accessToken}`,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ name: nombre })
            }).then(response => response.json())
                .then(data => {
                    makeToast('success', data.mensaje)

                    getChatrooms()

                }).catch(error => {
                    makeToast('error', error.error)


                })
        }
    }

    const eliminarSala = () => {
        const id = chatroomsId
        if (id === null) {
            makeToast('error', 'Debe seleccionar chatroom')
        } else {
            fetch(`${API}/chatroom/eliminar/${id}/${dataUser.id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: ` ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }).then(response => {
                makeToast('success', 'Se ha eliminado sala con éxito')
                getChatrooms()
                setChatroomsId(null)
            }).catch(error => {
                makeToast('error', 'Ha ocurrido un error')

            })
        }
    }

    const clickSubmit = () => {
        crearChatroom(chatroomName)
    }

    React.useEffect(() => {

        getChatrooms()
        setChatroomsId(null)
        setupSocket()

        //eslint-disable-next-line
    }, [])
    const ingresarSala = () => {

        props.history.push("/chatroom/" + chatroomsId)
        props.setupSocket();
    }
    const handleChangeChatroom = name => event => {
        const value = event.target.value
        setChatroomName(value)
    }

    const handleChange = name => event => {
        const value = event.target.value
        if (value === 'nulo') {
            setChatroomsId(null)
        } else {
            setChatroomsId(value)
        }
    }

    const mostrarMensajeError = () => {
        makeToast('error', 'Seleccione una sala')
    }


    const verificarId = () => {
        return chatroomsId != null ? (
            <div align="center">
                <Button variant="contained" color="primary" onClick={ingresarSala}> Ingresar
                </Button>
            </div>
        ) : (
            <div align="center">
                <Button variant="contained" color="primary" className="join" onClick={mostrarMensajeError}>Seleccionar sala</Button>
            </div>
        );
    };

    const verificarTipo = () => {
        if (dataUser.tipo === 0) {
            return (
                <Grid containter spacing={3} justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography className={classes.root}>{"CHATROOMS DE INKAPP"}</Typography>
                                <TextField
                                    name="chatroomName"
                                    id="chatroomName"
                                    label="Nombre de la sala"
                                    style={{ margin: 8 }}
                                    placeholder="Agrege un nombre para crear una nueva sala"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleChangeChatroom('chatroomName')}
                                />
                                <Grid item xs={12} className="center">
                                    <div align="center" >
                                        <Button variant="contained" color="primary" onClick={clickSubmit}>Crear nueva sala</Button>
                                    </div>
                                </Grid>
                                <div align="center" >
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-filled-label">Salas</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            onChange={handleChange('chatroom')}
                                        >
                                            {chatrooms.map((chatroom) => (
                                                <MenuItem key={chatroom._id} className="chatroom" value={chatroom._id}>
                                                    {chatroom.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {verificarId()}
                                    <Button variant="contained" color="secondary" className="join" onClick={eliminarSala}>
                                        Eliminar sala
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <Grid container spacing={3} alignItems="center" justifiy="center" alignContent="center" style={{ marginTop: 50 }}>
                    <Grid item xs={12}>
                        <Card>
                            <Typography className={classes.root}>{"CHATROOMS DE INKAPP"}</Typography>
                            <CardContent className="cardBody">
                                <div align="center">
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-filled-label">Salas</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            onChange={handleChange('chatroom')}
                                        >
                                            <MenuItem>
                                                <em>Seleccione sala</em>
                                            </MenuItem>
                                            {chatrooms.map((chatroom) => (
                                                <MenuItem key={chatroom._id} className="chatroom" value={chatroom._id}>
                                                    {chatroom.name}
                                                </MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </div>
                                {verificarId()}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )
        }
    }

    return (
        <Layout
            title="Chatrooms de inkapp"
            description="Sientete libre de chatear con los demás usuarios"
            className="container col-md-8 offset-md-2"
        >
            {verificarTipo()}

        </Layout>

    )
}
export default withRouter(DashboardPage)