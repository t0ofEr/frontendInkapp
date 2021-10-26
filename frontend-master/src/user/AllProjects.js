import React, { useState, useEffect } from 'react';
import { getProyectosFiltrado, getProjects } from '../core/apiCore';
import { isAuthenticated } from '../auth';
import CardProject from '../core/cardProjects';
import Layout from '../core/Layout';
import makeToast from '../Toaster/Toaster';
import Container from '@material-ui/core/Container';
import { LinearProgress } from '@material-ui/core';
import { Grid, makeStyles} from '@material-ui/core';
import CardSkeletonProyectos from '../core/CardSkeletonProyectos';
import { getEstilosTatuajes, getPartes } from '../admin/apiAdmin';
import { Alert } from 'react-bootstrap';
const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const AllProjects = () => {
    const classes = useStyles();

    const [projects, setProjects] = useState([]);
    const { dataUser, accessToken } = isAuthenticated();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [estilos, setEstilos] = useState([]);
    const [partes, setPartes] = useState([]);
    const [checked, setChecked] = useState([]);
    const [checkedParte, setCheckedParte] = useState([]);
    const [myFilters, setMyFilters] = useState({
        filters: { estiloTatuaje: [], parteCuerpo: [] }
    });
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResult] = useState([]);
    const [filteredResultsSize, setFilteredResultSize] = useState([]);

    const loadProjects = () => {
        getProjects(dataUser.id, accessToken).then(data => {
            if (data.error) {
                setError(data.error)
                setTimeout( function () { setLoading(true) } , 2000) 
            } else {
                setProjects(data.data)
                setTimeout( function () { setLoading(true) } , 2000) 
            }
        })
    }
    useEffect(() =>{
        loadProjects()
    },[])

    const init = () => {
        getEstilosTatuajes(dataUser.id, accessToken).then(data => {
            if (data.error) {
                makeToast("error", data.error)
            } else {
                setEstilos(data.data);
            }
        })
        getPartes().then(data => {
            if (data.error) {
                makeToast("error", data.error)
            } else {
                setPartes(data.data);
            }
        })
    }

    useEffect(() => {
        loadProjects();
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, [])

    


    const handleTogle = estilo => () => {
        const currentCategoryId = checked.indexOf(estilo);
        const newCheckedCategoryId = [...checked]

        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(estilo)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        //console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilter(newCheckedCategoryId, "estiloTatuaje")
    }

    const handleTogleParte = parte => () => {
        const currentCategoryId = checkedParte.indexOf(parte);
        const newCheckedCategoryId = [...checkedParte]

        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(parte)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        //console.log(newCheckedCategoryId);
        setCheckedParte(newCheckedCategoryId);
        handleFilter(newCheckedCategoryId, "parteCuerpo")
    }

    const handleFilter = (filters, filterBy) => {
        //console.log(filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    }

    const loadFilteredResults = newFilter => {
        getProyectosFiltrado(dataUser.id, accessToken, skip, limit, newFilter).then(data => {
            if (data.error) {
                makeToast('error', data.error)
            } else {
                
                setFilteredResult(data.data);
                setFilteredResultSize(data.size);
                setTimeout( function () { setLoading(true) } , 2000) 
            }
        })
    }

    return (
        <Layout title="Proyectos" description="Estás viendo los proyectos de inkapp"  className="container-fluid" jumbotron="true" >
            <Container className={classes.cardGrid} maxWidth="100%">
                <Grid container>
                    <Grid item xs={2}>
                        <h4>Estilos de tatuaje</h4>
                        <ul>
                            {
                                estilos.map((data, i) => (
                                    <li key={i} className="list-unstyled">
                                        <input type="checkbox" onChange={handleTogle(data._id)} value={checked.indexOf(data._id === -1)} className="form-check-input" />
                                        <label className="form-check-label">{data.nombre}</label>
                                    </li>
                                ))
                            }
                        </ul>
                        <h4>Partes del cuerpo</h4>
                        <ul>
                            {
                                partes.map((parte, i) => (
                                    <li key={i} className="list-unstyled">
                                        <input type="checkbox" onChange={handleTogleParte(parte._id)} value={checkedParte.indexOf(parte._id === -1)} className="form-check-input" />
                                        <label className="form-check-label">{parte.nombre}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container spacing={4}>
                            {projects && loading ? (
                                filteredResultsSize === 0 ? (
                                    <Grid item xs={12}>
                                        <Alert variant={"warning"}>
                                            Aún no hay proyectos de este estilo.
                                        </Alert>
                                    </Grid>

                                ) : 
                                filteredResults.map((project, id) => (
                                    <Grid item key={project._id} xs={12} md={4}>
                                        <CardProject key={id} project={project} />
                                    </Grid>
                                ))
                            ) : (
                                !error ? (
                                    projects.map(() => 
                                    <CardSkeletonProyectos/>
                                    
                                ) ) : (
                                    <div className={classes.root}>
                                        <LinearProgress color="secondary"/>
                                    </div>
                                )
                            )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default AllProjects;