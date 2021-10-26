import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Logo from "../assets/images/InkappLogo.jpeg";

function Copyright() {
    return (
        <Typography variant="body2" color="white" align="left">
            {'Copyright © '}
            <Link color="inherit" href="/">
                INKAPP
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: "black",
        color: "white",
        padding: theme.spacing(6),
        position: "relative",
    },
}));

export default function Album() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Grid container spacing={4} justify="space-evenly">
                <Grid item xs={6} sm={6} >
                    <div style={{ float: "left" }}>
                        <img
                            src={Logo}
                            alt={"inkapplogo"}
                            style={{ maxHeight: "100px", maxWidth: "100px" }}
                        />
                    </div>
                    <div style={{ float: "left", marginTop: "4%" }}>
                        <Typography variant="subtitle1" align="left" color="white" component="p">
                            La nueva plataforma para los amantes de la tinta.
                        </Typography>
                        <Copyright />
                    </div>
                </Grid>
                <Grid item xs={4} sm={3}>
                    <Typography variant="h5" align="left" color="white" gutterBottom>
                        Redes sociales
                    </Typography>
                    <nav>
                        <Typography variant="subtitle1" align="left" color="white" component="p">
                            <Link href="https://www.facebook.com/Inkapp-101042588929097" variant="subtitle1" color="inherit">
                                Facebook
                            </Link>
                        </Typography>
                        <Typography variant="subtitle2" align="left" color="white" component="p">
                            <Link href="http://instagram.com/somosinkapp" variant="subtitle1" color="inherit">
                                Instagram
                            </Link>
                        </Typography>
                    </nav>
                </Grid>
                <Grid item xs={4} sm={3}>
                    <Typography variant="h5" align="left" color="white" gutterBottom>
                        Contacto
                    </Typography>
                    <Typography variant="subtitle1" align="left" color="white" component="p">
                        soporte@inkapp.cl
                    </Typography>
                    <Typography variant="subtitle1" align="left" color="white" component="p">
                        +569 90947518
                    </Typography>
                    <Typography variant="subtitle1" align="left" color="white" component="p">
                        +569 62745960
                    </Typography>
                </Grid>
            </Grid>
        </footer>

    );
}