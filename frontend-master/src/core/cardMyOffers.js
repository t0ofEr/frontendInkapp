import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Swal from 'sweetalert2'
import moment from 'moment'
import { deleteOffer } from './apiCore'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Card, CardContent, Grid, Typography, Button } from '@material-ui/core'

const CardOffer = ({ offer }) => {

    const { dataUser, accessToken } = isAuthenticated()
    const [redirectToReferrer, setRedirectToReferrer] = useState(false)

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to={`/profile/offers/myoffers/${dataUser.id}`} />
        }
    }
    const clickSubmit = event => {

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
                deleteOffer(offer._id, dataUser.id, accessToken).then((data) => {
                    if (data.error) {
                        Swal.fire(
                            'Error!',
                            data.error,
                            'error'
                        )
                    } else {
                        window.location.reload()
                    }
                })
            }
        })
    }

    return (
        <Grid item xs={3}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2" align="center">
                        {offer.estado.nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        {offer.descripcion}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        ${offer.valor}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        <AccessTimeIcon color="action" fontSize="small" />
                        {moment(offer.createdAt).fromNow()}
                    </Typography>
                    <Grid item xs={12} align="center">
                        <Button variant="outlined" color="secondary" onClick={clickSubmit} >
                            Eliminar oferta
                        </Button>
                    </Grid>
                </CardContent>
            </Card>
            {redirectUser()}
        </Grid>

    )
}
export default CardOffer