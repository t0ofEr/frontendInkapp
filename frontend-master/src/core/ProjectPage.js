import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getProyecto } from './apiCore';
import { isAuthenticated } from '../auth';
import CardProyectoPage from './cardProyecto';
import makeToast from '../Toaster/Toaster';
import { makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import CardSkeleton from './CardSkeleton';
import Container from '@material-ui/core/Container';
const ProjectPage = props => {

    const [proyecto, setProyecto] = useState({});
    const {accessToken, dataUser} = isAuthenticated();
    const [loading, setLoading] = useState(false);

    const loadProyecto = proyectoId => {
        getProyecto(proyectoId, dataUser.id, accessToken).then(data => {
            if(data.error) {
                makeToast('error', data.error)
            }else{
                setProyecto(data);
                setLoading(true)
            }
        })
    }

    useEffect(() => {
        const proyectoId = props.match.params.proyectoId
        loadProyecto(proyectoId)
    }, [])
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
    const classes = useStyles()
    return (
        <Layout 
            title={`Proyecto`} 
            description={""} 
            className="container-fluid"
            jumbotron={false}
        >
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container justify="center" style={{marginTop: '5%'}}>
                {
                    (proyecto && loading) ? (
                        <CardProyectoPage project={proyecto}/>
                    ) : (
                        <CardSkeleton/>
                    )
                }
            </Grid>
        </Container>
        </Layout>
    );
}

export default ProjectPage;