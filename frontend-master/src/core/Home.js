import React, { useState } from 'react';
import Layout from './Layout';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CreateIcon from '@material-ui/icons/Create';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ListAltIcon from '@material-ui/icons/ListAlt';
import StarIcon from '@material-ui/icons/Star';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import logo from '../assets/images/InkappLogo.jpeg'
import { Button } from '@material-ui/core';
import { Fragment } from 'react';
import makeToast from '../Toaster/Toaster';
//ESTILOS A UTILIZAR
const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(10),
        textAlign: "center",
    },
    textBox: {
        marginTop: "15px",
    },
    logo: {
        width: "100px",
        height: "100px",
        objectFit: "cover",
        objectPosition: "center center"
    },
    image: {
        width: "100%",
        height: "115px",
        objectFit: "cover",
        objectPosition: "center center"
    }

}));

const Home = () => {
    //LLAMADO A LOS ESTILOS
    const classes = useStyles();

    //EXTRAER INFORMACIÓN DEL USUARIO DESDE EL TOKEN
    const { dataUser } = isAuthenticated();

    return (
        <Layout title="Home Page" description="Aplicacion Inkapp para tatuadores." className="container-fluid" jumbotron="false" slide="true">
            <Container className={classes.cardGrid} maxWidth="md">
                {/*CONTENIDO PARA LOS USUARIOS*/}
                {
                    isAuthenticated() && (dataUser.tipo === 1 || dataUser.tipo === 2) ? (
                        <div>
                            <div className="product-img">
                                <img
                                    src={logo}
                                    alt={logo}
                                    className={classes.logo}
                                />
                                <Typography variant="h4">Bienvenido {`${dataUser.user}`}</Typography>
                                <br />
                            </div>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <br />
                                    <div className="product-img">
                                        <img
                                            src="https://source.unsplash.com/6PUGoUCxCz0"
                                            alt={"imagen"}
                                            className={classes.image}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6} className={classes.textBox}>
                                    <br />
                                    <Typography variant="h5" gutterBottom>
                                        Accede a las publicaciones...
                                    </Typography>
                                    <Button href={"/publicaciones"} >Ver publicaciones</Button> {"/"}
                                    <Button href={`/profile/publication/create/${dataUser.id}`} >crear publicación</Button>
                                </Grid>
                                <Grid item xs={6} className={classes.textBox}>
                                    <Typography variant="h5" gutterBottom>
                                        Accede a los proyectos...
                                    </Typography>
                                    <Button href={"/profile/project/projects/list"}>Ver proyectos</Button> {"/"}
                                    {
                                        dataUser.membresia === false ? (
                                            <Button onClick={() => makeToast('error', 'Necesitas adquirir membresía')}>crear proyecto</Button>
                                        ) : (
                                            <Button href={`/profile/project/create/${dataUser.id}`}>crear proyecto</Button>
                                        )
                                    }

                                </Grid>

                                <Grid item xs={6}>
                                    <div className="product-img">
                                        <img
                                            src="https://source.unsplash.com/HsQuhb9GBPM"
                                            alt={"imagen"}
                                            className={classes.image}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="product-img">
                                        <img
                                            src="https://source.unsplash.com/x1zZqFY-RL4"
                                            alt={"imagen"}
                                            className={classes.image}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6} className={classes.textBox}>
                                    <Typography variant="h5" gutterBottom>
                                        Tu cuenta...
                                    </Typography>
                                    <Button href={`/profile/${dataUser.id}`}>Mi perfil</Button> {"/"}
                                    <Button href={`/myaccount/manage/${dataUser.id}`}>Editar mi cuenta</Button>
                                </Grid>
                                {
                                    (isAuthenticated().dataUser.tipo === 1) ? (
                                        <Fragment>
                                            <Grid item xs={6} className={classes.textBox}>
                                                <Typography variant="h5" gutterBottom>
                                                    Accede a tu agenda...
                                                </Typography>
                                                <Button href={`/profile/do-reserve/${dataUser.id}`}>Administrar agenda</Button>
                                            </Grid>

                                            <Grid item xs={6}>
                                                <div className="product-img">
                                                    <img
                                                        src="https://source.unsplash.com/mO3s5xdo68Y"
                                                        alt={"imagen"}
                                                        className={classes.image}
                                                    />
                                                </div>
                                            </Grid>
                                        </Fragment>
                                    ) : (null)
                                }
                            </Grid>

                        </div>

                    ) : isAuthenticated() && (dataUser.tipo === 0) ? (
                        <div>
                            <div className="product-img">
                                <img
                                    src={logo}
                                    alt={logo}
                                    className={classes.logo}
                                />
                                <Typography variant="h4">Bienvenido {`${dataUser.user}`}</Typography>
                                <br />
                            </div>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <br />
                                    <div className="product-img">
                                        <img
                                            src="https://source.unsplash.com/DrpCTbaUmfs"
                                            alt={"imagen"}
                                            className={classes.image}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6} className={classes.textBox}>
                                    <br />
                                    <Typography variant="h5" gutterBottom>
                                        Accede a las regiones...
                                    </Typography>
                                    <Button href={"/manage/region"} >Administrar</Button>
                                </Grid>
                                <Grid item xs={6} className={classes.textBox}>
                                    <Typography variant="h5" gutterBottom>
                                        Accede a los estados...
                                    </Typography>
                                    <Button href={"/manage/estado"}>Administrar</Button>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className="product-img">
                                        <img
                                            src="https://source.unsplash.com/fMD_Cru6OTk"
                                            alt={"imagen"}
                                            className={classes.image}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="product-img">
                                        <img
                                            src="https://source.unsplash.com/Y6TOX6LnIGs"
                                            alt={"imagen"}
                                            className={classes.image}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6} className={classes.textBox}>
                                    <Typography variant="h5" gutterBottom>
                                        Accede a las partes del cuerpo
                                    </Typography>
                                    <Button href={"/manage/parte"}>Administrar</Button>
                                </Grid>
                                <Grid item xs={6} className={classes.textBox}>
                                    <Typography variant="h5" gutterBottom>
                                        Accede a las estilos de tatuaje
                                    </Typography>
                                    <Button href={"/manage/estiloTatuaje"}>Administrar</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="product-img">
                                        <img
                                            src="https://source.unsplash.com/apcYl5i5vng"
                                            alt={"imagen"}
                                            className={classes.image}
                                        />
                                    </div>
                                </Grid>
                            </Grid>

                        </div>
                    ) :
                        //CONTENIDO SIN INICIAR SESIÓN
                        (
                            <div>
                                <div className="product-img">
                                    <img
                                        src={logo}
                                        alt={logo}
                                        className={classes.logo}
                                    />
                                    <Typography variant="h4">Aprende más de Inkapp</Typography>
                                    <br />
                                </div>
                                <Grid container spacing={4}>
                                    <Grid item xs={4}>
                                        <CreateIcon fontSize="large" />
                                        <Typography variant="h5" gutterBottom>
                                            Crea tu cuenta
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Accede a las funcionalidades, creando tu cuenta. Si no tienes una, presiona <Link to={"/signup"}>AQUÍ</Link> para registrarte.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <QuestionAnswerIcon fontSize="large" />
                                        <Typography variant="h5" gutterBottom>
                                            Comparte con todos
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Visualiza fácilemente publicaciones, proyectos, perfiles y más. <Link to={"/signin"}>Inicia sesión </Link>ahora para ver lo nuevo en Inkapp.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <StarIcon fontSize="large" />
                                        <Typography variant="h5" gutterBottom>
                                            Hazte premium
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Obten el 100% de las funcionalidades, adquiriendo una membresía premium. Ve nuestros planes disponibles AQUÍ.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <ListAltIcon fontSize="large" />
                                        <Typography variant="h5" gutterBottom>
                                            Agenda para tatuadores
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Crea tu propia agenda, para que tus clientes puedan reservar tus horas disponibles.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <AccessTimeIcon fontSize="large" />
                                        <Typography variant="h5" gutterBottom>
                                            Reservas en linea
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Accede a las agendas de los tatuadores para poder reservar horas.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <EmojiEmotionsIcon fontSize="large" />
                                        <Typography variant="h5" gutterBottom>
                                            ¡Reacciona!
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Comenta y da like a las publicaciones o perfiles que te gusten.
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <br />
                                        <div className="product-img">
                                            <img
                                                src="https://source.unsplash.com/xyJZvUL4_TY"
                                                alt={"imagen"}
                                                className={classes.image}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <br />
                                        <Typography variant="h5" gutterBottom>
                                            ¿No sabes con quien tatuarte?
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Te ayudamos a encontrar el tatuador indicado, justo para lo que necesitas.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h5" gutterBottom>
                                            ¿Buscas ideas o diseños para tatuarte?
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Encuentra y comparte ideas en Inkapp con miles de usuarios.
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <div className="product-img">
                                            <img
                                                src="https://source.unsplash.com/06o01CtKjGw"
                                                alt={"imagen"}
                                                className={classes.image}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className="product-img">
                                            <img
                                                src="https://source.unsplash.com/6TIpY5KqCYo"
                                                alt={"imagen"}
                                                className={classes.image}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h5" gutterBottom>
                                            Comparte
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Conoce distintas personas, pero con algo en común.
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            ¡El amor a la tinta!
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="button" gutterBottom>
                                            Únete ahora a inkapp
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="button" gutterBottom>
                                            Solo faltas tú
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        )
                }
            </Container>
        </Layout>
    );
}
export default Home;
