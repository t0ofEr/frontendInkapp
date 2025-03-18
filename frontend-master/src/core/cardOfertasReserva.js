import { isAuthenticated } from '../auth';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import ShowImage from './showImage';
import { AccessTime, Done } from '@material-ui/icons';
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginTop: 12,
        marginBottom: 12,
    },
});

export default function SimpleCard({ reserva }) {
    const classes = useStyles();
    return (
        <Grid container spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
        >
            {reserva.oferta.map((data, i) => (
                (data.estado.nombre === 'Aceptado' && reserva.estado.nombre === 'Agendada') ? (
                    data.proyecto ? (
                        <Grid item xs={4}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" align="center">
                                        Contactate con:
                                        <Link to={`/profile/${data.ofertante._id}`}>
                                            <Button color="primary" size="medium">
                                                {data.ofertante.userName}
                                            </Button>
                                        </Link>
                                        <Done fontSize="medium" style={{ color: 'green' }} />
                                    </Typography>
                                    <ShowImage image={data.proyecto} url="proyecto" h={'350px'} w={'100%'} />
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Proyecto: {data.proyecto.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {data.descripcion}
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary" component="p" align="center">
                                        {reserva.estado.nombre}
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary" component="p" align="center">
                                        <AccessTime />{moment(data.createdAt).fromNow()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                    ) : (
                        <Grid item xs={4}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" align="center">
                                        Contactate con
                                        <Link to={`/profile/${data.ofertante._id}`}>
                                            <Button color="primary" size="medium">
                                                {data.ofertante.userName}
                                            </Button>
                                        </Link>
                                        <Done fontSize="medium" style={{ color: 'green' }} />
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {data.descripcion}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                                        {data.estado.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                                        <AccessTime />{moment(data.createdAt).fromNow()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                ) : (
                    data.estado.nombre === 'En espera' && reserva.estado.nombre === 'En espera' ? (
                        data.proyecto ? (
                            <Grid item xs={3}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" align="center">
                                            {data.proyecto.nombre}
                                        </Typography>
                                        <ShowImage image={data.proyecto} url="proyecto" h={'250px'} w={'100%'} />
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Oferta de
                                            <Link to={`/profile/${data.ofertante._id}`}>
                                                <Button color="primary" size="medium">
                                                    {data.ofertante.userName}
                                                </Button>
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {data.descripcion}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {data.estado.nombre}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" align="center">
                                            <AccessTime />{moment(data.createdAt).fromNow()}
                                        </Typography>
                                        <Link to={`/profile/agenda/offers/${reserva._id}/${data._id}/agendar`}>
                                            <Button>
                                                Agendar
                                            </Button>
                                        </Link>
                                        <Link to={`/profile/agenda/offers/${reserva._id}/${data._id}/rechazar`}>
                                            <Button>
                                                Rechazar
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ) : (
                            <Grid item xs={3}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" align="center">
                                            Oferta de
                                            <Link to={`/profile/${data.ofertante._id}`}>
                                                <Button color="primary" size="medium">
                                                    {data.ofertante.userName}
                                                </Button>
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {data.descripcion}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" align="center">
                                            {data.estado.nombre}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" align="center">
                                            <AccessTime />{moment(data.createdAt).fromNow()}
                                        </Typography>

                                        <Link to={`/profile/agenda/offers/${reserva._id}/${data._id}/agendar`}>
                                            <Button>
                                                Agendar
                                            </Button>
                                        </Link>
                                        <Link to={`/profile/agenda/offers/${reserva._id}/${data._id}/rechazar`}>
                                            <Button>
                                                Rechazar
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    ) : (
                        <p></p>
                    )
                )
            ))}
        </Grid>
    );
}