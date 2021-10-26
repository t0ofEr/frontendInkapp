import{ React, useState, useEffect }from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { readProject } from './apiUser'
import CardProject from '../core/cardOfertasProjects';
import { Grid } from '@material-ui/core';
import { Typography, makeStyles, LinearProgress } from '@material-ui/core';
import makeToast from '../Toaster/Toaster';
const ProjectsOffers = (props) => {

    const {dataUser, accessToken} = isAuthenticated()
    const [project, setProject] = useState([])
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)
    const loadProject = projectId => {
        
        readProject(dataUser.id, accessToken, projectId ).then(data => {
            if(data.error){
                setError(data.error)
            } else{
                setProject(data)
                setTimeout( function () {setLoading(true)}, 2000) 
            }

        })
    }
    
    useEffect(() => {
        const projectId = props.match.params.projectId 
        loadProject(projectId)
        
    }, [])

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
              marginTop: theme.spacing(2),
            },
        },
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8)
          },
    }));
    const classes = useStyles()

    return ( 
        <Layout title={project.nombre} 
        description="Estas viendo las ofertas de tu proyecto!" 
        className="containter-fluid">
            
            <Grid container spacing={3} direction="row" justify="center" className={classes.cardGrid}>
            <Grid item xs={12}> 
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Ofertas del proyecto: {project.nombre}
                    </Typography>
            </Grid>
                   { project.oferta && loading ? 
                    (
                        <CardProject project={project}/>
                    ) : (
                        <div className={classes.root}>
                            <LinearProgress color="primary"/>
                        </div>
                    ) }      
            </Grid>   
        </Layout>
    )  
};

export default ProjectsOffers;