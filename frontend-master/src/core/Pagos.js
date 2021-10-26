import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { isAuthenticated } from '../auth';
import Layout from './Layout';
import { pagoMembresia } from './apiCore';
import makeToast from '../Toaster/Toaster'
const Pagos = () => {
const {dataUser, accessToken} = isAuthenticated()
const [loading, setLoading] = useState(false)
const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  }
}));
    const realizarPago = event => {
        event.preventDefault()
        setLoading(true)
        if(dataUser.tipo === 1){
            pagoMembresia('Membresía tatuador', 6990).then(data => {
                if(data.error){
                  makeToast('error', 'Ha ocurrido un error')
                } else {
                  window.location.href = data
                }
            })
        } else {
            pagoMembresia('Membresía usuario', 3990).then(data => {
              if(data.error){
                  makeToast('error', 'Ha ocurrido un error')
              } else {
                window.location.href = data
              }
          })
        }
         
        
    }
  const classes = useStyles();

  return (
    <React.Fragment>
    <Layout title="Home Page" description="Aplicacion Inkapp para tatuadores." className="container-fluid" jumbotron={false}>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Precio membresía
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Adquiere la membresía de {dataUser.tipo === 1 ? 'tatuadores' : 'usuario premium'} para poder 
          utilizar todas las funcionalidades de Inkapp y {dataUser.tipo === 1 ? 
          'potenciar tu negocio con nuevos clientes!' : 
          'encontrar tu tatuador más conveniente!'
          }
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} justify="center">
            <Grid item xs={12} sm={12} md={4} align="center">
              <Card>
                <CardHeader
                  title="Pro"
                  subheader="Más comprado"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={<StarIcon />}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {dataUser.tipo === 1 ? '$6.990' : '$3.990'}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /CLP
                    </Typography>
                  </div>
                  <ul>
                      <Typography component="li" variant="subtitle1" align="center">
                        Chat Online
                      </Typography>
                      <Typography component="li" variant="subtitle1" align="center">
                        Publicar proyectos
                      </Typography>
                      <Typography component="li" variant="subtitle1" align="center">
                        {dataUser.tipo === 1 ? 'Publicar y administrar agenda' : 'Reservar horas'}
                      </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" color="primary" onClick={realizarPago} disabled={loading}>
                    Hazte miembro
                  </Button>
                </CardActions>
              </Card>
              
            </Grid>
        </Grid>
      </Container>
      </Layout>
    </React.Fragment>
  );
}

export default Pagos