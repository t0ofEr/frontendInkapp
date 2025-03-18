import { API } from "../config";

//LISTADO DE TODOS LOS USUARIOS
export const getUsers = (idU, accesToken) => {
    return fetch(`${API}/perfil/listado/${idU}`, {
        method: "GET",
        headers: {
            Authorization: `${accesToken}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

//LISTADO MIS PUBLICACIONES
export const getPublicaciones = (idU, accesToken) => {
    return fetch(`${API}/publicacion/misPublicaciones/${idU}`, {
        method: "GET",
        headers: {
            Authorization: `${accesToken}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

//MODIFICAR PROYECTO
export const updatePublicacion = (
    id,
    accessToken,
    publicacionId,
    publicacion
) => {
    return fetch(`${API}/publicacion/modificar/${publicacionId}/${id}`, {
        method: "PUT",
        headers: {
            Accept: "aplication/json",
            Authorization: `${accessToken}`
        },
        body: publicacion
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

//LISTADO FILTRADO
export const getPublicacionesFiltrado = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${API}/inicio/busqueda`, {
        method: "POST",
        headers: {
            Accept: "aplication/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

//LISTADO TODAS LAS PUBLICACIONES
export const getAllPublicaciones = sortBy => {
    return fetch(`${API}/inicio/?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

//OBTENER/BUSCAR UNA PUBLICACION
export const getPublicacion = (idP, idU, accesToken) => {
    return fetch(`${API}/inicio/buscar/${idP}/${idU}`, {
        method: "GET",
        headers: {
            Authorization: `${accesToken}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

//ELIMINAR PUBLICACION
export const deletePublicacion = (idP, idU, accessToken) => {
    return fetch(`${API}/publicacion/eliminar/${idP}/${idU}`, {
        method: "DELETE",
        headers: {
            Accept: "aplication/json",
            Authorization: `${accessToken}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

export const getProjects = (id, accessToken) => {
    return fetch(`${API}/proyecto/listado/${id}`, {
        method: "GET",
        headers: {
            Accept: "aplication/json",
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

export const getProyecto = (idP, idU, accesToken) => {
    return fetch(`${API}/proyecto/buscar/${idP}/${idU}`, {
        method: "GET",
        headers: {
            Authorization: `${accesToken}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

//LISTADO FILTRADO
export const getProyectosFiltrado = (
    id,
    accesToken,
    skip,
    limit,
    filters = {}
) => {
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${API}/proyecto/listado/busqueda/${id}`, {
        method: "POST",
        headers: {
            Accept: "aplication/json",
            "Content-Type": "application/json",
            Authorization: `${accesToken}`
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

export const getMyProjects = (id, accessToken) => {
    return fetch(`${API}/proyecto/misProyectos/${id}`, {
        method: "GET",
        headers: {
            Accept: "aplication/json",
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

export const getMyOffers = (id, accessToken) => {
    return fetch(`${API}/oferta/misOfertas/${id}`, {
        method: "GET",
        headers: {
            Accept: "aplication/json",
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

export const addComentario = (idP, idU, accessToken, comentario) => {
    return fetch(`${API}/publicacion/comentario/${idP}/${idU}`, {
        method: "PUT",
        headers: {
            Accept: "aplication/json",
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(comentario)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

export const addRespuesta = (idP, idU, accessToken, respuesta) => {
    return fetch(`${API}/publicacion/comentario/respuesta/${idP}/${idU}`, {
        method: "PUT",
        headers: {
            Accept: "aplication/json",
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(respuesta)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

export const deleteOffer = (idOffer, idUser, accessToken) => {
    return fetch(`${API}/oferta/eliminar/${idOffer}/${idUser}`, {
        method: "DELETE",
        headers: {
            Accept: "aplication/json",
            Authorization: `${accessToken}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};
export const deleteComentario = (idP, idU, accessToken, body) => {
    return fetch(`${API}/publicacion/comentario/eliminar/${idP}/${idU}`, {
        method: "PUT",
        headers: {
            Accept: "aplication/json",
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

export const deleteRespuesta = (idP, idU, accessToken, body) => {
    return fetch(
        `${API}/publicacion/comentario/respuesta/eliminar/${idP}/${idU}`,
        {
            method: "PUT",
            headers: {
                Accept: "aplication/json",
                "Content-Type": "application/json",
                Authorization: `${accessToken}`
            },
            body: JSON.stringify(body)
        }
    )
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

export const getMyOffersReserve = (id, accessToken) => {
    return fetch(`${API}/oferta-hora/misofertas/${id}`, {
        method: "GET",
        headers: {
            Accept: "aplication/json",
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

export const pagoMembresia = (title, price) => {
    return fetch(`${API}/checkout`, {
        method: "POST",
        headers: {
            Accept: "aplication/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: title, price: price })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};

export const hacerVip = (id, accessToken) => {
    return fetch(`${API}/perfil/vip/${id}`, {
        method: "PUT",
        headers: {
            Accept: "aplication/json",
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
};
