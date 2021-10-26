import { API } from '../config';

export const read = (id, accessToken) => {
    return fetch(`${API}/perfil/buscar/${id}`, {
        method: "GET",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        }
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const update = (id, accessToken, user) => {
    return fetch(`${API}/perfil/modificar/${id}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`
        },
        body: user
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const updateUser = (user, next) => {
    if(typeof window !== 'undefined') {
        if(sessionStorage.getItem("jwt")) {
            let auth = JSON.parse(sessionStorage.getItem("jwt"));
            auth.dataUser = user.dataUser;
            sessionStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};

export const createPublication = (id, accessToken, publication) => {
    return fetch(`${API}/publicacion/crear/${id}`, {
        method: "POST",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`
        },
        body: publication
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });

};

export const search = (user) => {
    return fetch(`${API}/perfil/buscar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({user: user})
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};


export const createProject = (id, accessToken, project) => {
    return fetch(`${API}/proyecto/crear/${id}`, {
        method: "POST",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`
        },
        body: project
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
    
};

export const readProject = (id, accessToken, project) => {
    return fetch(`${API}/proyecto/buscar/${project}/${id}`, {
        method: "GET",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        }
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const updateProject = (id, accessToken, projectId, project) => {
    return fetch(`${API}/proyecto/modificar/${projectId}/${id}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`
        },
        body: project
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const resOferta = (idUser, accessToken, projectId, offerId, response) => {
    return fetch(`${API}/oferta/respuesta/${projectId}/${offerId}/${idUser}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({respuesta: response})
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};


export const createOffer = (idUser, accessToken, projectId, valor, descripcion) => {
    return fetch(`${API}/oferta/crear/${projectId}/${idUser}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({valor: valor.valor,
        descripcion: descripcion.descripcion
    })
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
    
};

export const deleteProject = (idUser, accessToken, projectId) => {
    return fetch(`${API}/proyecto/eliminar/${projectId}/${idUser}`, {
        
        method: "DELETE",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        }
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
    
}



export const addComentario = (idU, idUP, accessToken, comentario) => {
    return fetch(`${API}/perfil/comentario/${idU}/${idUP}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(comentario)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const addRespuesta = (idU, idUC, accessToken, respuesta) => {
    return fetch(`${API}/perfil/comentario/respuesta/${idU}/${idUC}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(respuesta)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const deleteComentario = (idU, idUC, accessToken, body) => {
    return fetch(`${API}/perfil/comentario/eliminar/${idU}/${idUC}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(body)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const deleteRespuesta = (idU, idUP, accessToken, body) => {
    return fetch(`${API}/perfil/comentario/respuesta/eliminar/${idU}/${idUP}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(body)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
    
};

export const likePerfil = (idUser, accessToken, perfilId) => {
    
        return fetch(`${API}/perfil/like/${idUser}`, {
            method: "PUT",
            headers: {
                Accept: 'aplication/json',
                Authorization: `${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idUser: perfilId  })
        })
        .then( response => {
            
            return response.json(); 
        })
        .catch( err => {
            
            return err
        });
        
}

export const likePublicacion = (idUser, accessToken, publicacionId) => {
    
    return fetch(`${API}/publicacion/like/${idUser}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ idPublicacion: publicacionId  })
    })
    .then( response => {
        
        return response.json(); 
    })
    .catch( err => {
        
        return err
    });
    
};

export const createHora = (id, accessToken, fecha, fechaFin) => {
    return fetch(`${API}/reserva/crear/${id}`, {
        method: "POST",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fecha: fecha,
            fechaFin: fechaFin
        })
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
    
};

export const readAgenda = (id, accessToken) => {
    return fetch(`${API}/reserva/miagenda/${id}`, {
        method: "GET",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        }
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const deleteAgenda = (idUser, accessToken, projectId) => {
    return fetch(`${API}/reserva/eliminar/${idUser}/${projectId}`, {
        
        method: "DELETE",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        }
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
    
}

export const modificarAgenda = (idUser, accessToken, agendaId, fecha, fechaFin) => {
    
    return fetch(`${API}/reserva/modificar/${idUser}/${agendaId}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ fecha: fecha ,
        fechaFin: fechaFin})
    })
    .then( response => {
        
        return response.json(); 
    })
    .catch( err => {
        
        return err
    });
    
};

export const buscarFecha = (idUser, accessToken, idReserva) => {
    return fetch(`${API}/reserva/buscar/${idUser}/${idReserva} `, {
        method: "GET",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        }
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
}

export const listarAgenda = (idUser, accessToken, idPerfil) => {

    return fetch(`${API}/reserva/agenda/${idUser}`, {
        method: "POST",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify({idPerfil: idPerfil}) 
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
}

export const enviarOfertaReserva = (idUser, accessToken, descripcion, idReserva, proyecto) => {
    if(proyecto == null){
        return fetch(`${API}/oferta-hora/crear/${idUser}`, {
            method: "PUT",
            headers: {
                Accept: 'aplication/json',
                Authorization: `${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                descripcion: descripcion, 
                reservaId: idReserva 
            })
        })
        .then( response => {
            
            return response.json(); 
        })
        .catch( err => {
            
            return err
        });
    } else {
        return fetch(`${API}/oferta-hora/crear/${idUser}`, {
            method: "PUT",
            headers: {
                Accept: 'aplication/json',
                Authorization: `${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                descripcion: descripcion, 
                reservaId: idReserva,
                idProyecto: proyecto._id 
            })
        })
        .then( response => {
            
            return response.json(); 
        })
        .catch( err => {
            
            return err
        });
    }
    
    
};

export const readReserve = (idUser, accessToken, idReserva) => {
    return fetch(`${API}/reserva/listado/ofertas/${idUser} `, {
        method: "POST",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify({idReserva: idReserva})
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
}

export const resOfertaReserva = (idUser, accessToken, reservaId, offerId, response) => {
    return fetch(`${API}/oferta-hora/respuesta/${reservaId}/${offerId}/${idUser}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({respuesta: response})
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const deleteOfferReserve = (idUser, accessToken, offerId) => {
    return fetch(`${API}/oferta-hora/eliminar/${offerId}/${idUser}`, {
        
        method: "DELETE",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        }
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
    
}