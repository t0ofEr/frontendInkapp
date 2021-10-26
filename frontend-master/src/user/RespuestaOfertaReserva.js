import React, {useEffect, useState} from 'react';
import Layout from '../core/Layout'
import { Link, Redirect } from 'react-router-dom';
import { resOfertaReserva } from '../user/apiUser'
import { isAuthenticated } from '../auth';
import makeToast from '../Toaster/Toaster'

const RespuestaOfertaReserva = (props) => {
    const [reservaId, setReservaId] = useState('')
    const [offerId, setOfferId] = useState('')
    const [respuesta, setRespuesta] = useState('')
    const [redirectToReferrer, setRedirectToReferrer] = useState(false)
    const {dataUser, accessToken} = isAuthenticated()
    
    const clickSubmit = event => {
        event.preventDefault()
        resOfertaReserva(dataUser.id, accessToken, reservaId, offerId, respuesta).then((data)=> {
            console.log(dataUser.id, accessToken, reservaId, offerId, respuesta);
            if(data.error){
                makeToast('error', data.error)
            }else {
                makeToast('success', data.mensaje)
                setRedirectToReferrer(true)
            }
        })
    }

    const redirectUser = () =>{
        if(redirectToReferrer) {
            return <Redirect to={`/profile/agenda/offers/${reservaId}`} />
        }
    }

    useEffect (() => {
        setReservaId(props.match.params.agendaId)
        setOfferId(props.match.params.offerId)
        setRespuesta(props.match.params.response)
    }, [])
    return (
        <Layout title="Confirmar decisión" description="Confirme su decisión de oferta :)">
         
        
        {respuesta === 'agendar' ? 
            (<h2 className="mb4" align="center">Estas a punto de agendar una oferta</h2>) 
            : (<h2 className="mb4" align="center">Estas a punto de rechazar una oferta</h2>)}
        <div align="center"> ¿Deseas confirmar tu decisión?</div>
        <div align="center">
            <button className="btn btn-outline-primary mt-2 mb-2" onClick={clickSubmit}>
                Confirmar
            </button>
            <div></div>   
            <Link to={`/profile/agenda/offers/${reservaId}`}>                   
            <button className="btn btn-outline-warning mt-2 mb-2">
                Volver
            </button>
            </Link>  
        </div>
        
            {redirectUser()}
        </Layout>
    );
};

export default RespuestaOfertaReserva;