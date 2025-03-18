import { isAuthenticated } from '../auth';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import ShowImage from './showImage';
import Swal from 'sweetalert2';
import { deleteOfferReserve } from '../user/apiUser';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

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

export default function SimpleCard({ offer }) {
    const classes = useStyles();
    const { dataUser, accessToken } = isAuthenticated()

    const clickSubmit = (offerId) => event => {
        event.preventDefault()
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podrás revertir este cambio",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminala!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteOfferReserve(dataUser.id, accessToken, offerId).then((data) => {
                    if (data.error) {
                        Swal.fire(
                            'Error!',
                            data.error,
                            'error'
                        )
                    } else {
                        window.location.reload();
                    }
                })

            }
        })
    }

    return (
        offer.proyecto ? (
            <Grid item xs={3} align="center">
                <Card className={classes.root}>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" align="center">
                            {offer.proyecto.nombre}
                        </Typography>
                        <ShowImage image={offer.proyecto} url="proyecto" h={'250px'} w={'100%'} />
                        <Typography variant="body2" color="textSecondary" component="p">
                            {offer.descripcion}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {offer.estado.nombre}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <AccessTimeIcon color="action" fontSize="small" /> {moment(offer.createdAt).fromNow()}
                        </Typography>
                        <Button size="small" variant="contained" color="primary" onClick={clickSubmit(offer._id)} align="center">
                            Eliminar
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        ) : (
            <Grid item xs={3} align="center">
                <Card className={classes.root}>
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="h2" align="center">
                            <AccessTimeIcon color="action" fontSize="small" /> {moment(offer.createdAt).fromNow()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {offer.descripcion}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {offer.estado.nombre}
                        </Typography>
                        <Button variant="contained" color="primary" size="small" onClick={clickSubmit(offer._id)}>
                            Eliminar
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        )
    );
}
