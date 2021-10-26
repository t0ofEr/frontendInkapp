import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../assets/images/InkappLogo.jpeg';
import { hacerVip } from '../core/apiCore';
import { isAuthenticated } from '../auth';
import makeToast from '../Toaster/Toaster';
import { Redirect } from 'react-router-dom';
const UserVip = () => {
    const {dataUser, accessToken} = isAuthenticated()
    const [redirect, setRedirect] = useState(false)
    const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    background: {
        backgroundColor: 'black',
        color: 'white'
    }
    }));
    const redirectToReferer = () =>{
        if(redirect){
           return <Redirect to={`/profile/${dataUser.id}`}/>
        }
    }
    
    const vipClick = event => {
        event.preventDefault()
        hacerVip(dataUser.id, accessToken).then(data => {
            if(data.erro) {
                makeToast('error', data.error)
            } else {
                makeToast('success', data.mensaje)
                setRedirect(true)
            }
        })
    }

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" className={classes.background}>
        <Toolbar>
          <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            style={{marginLeft: 10}}
            />
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Felicidades!
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Ahora tan solo estás a un paso de ser miembro VIP de Inkapp. 
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" className={classes.background} onClick={vipClick}>
                    Hazme V.I.P.
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        
      </main>
      {redirectToReferer()}
    </React.Fragment>
  );

}

export default UserVip