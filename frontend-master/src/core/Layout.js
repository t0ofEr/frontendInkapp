import React, { Fragment, useState } from "react";
import Menu from "./Menu";
import styles from '../styles/styles.css';
import { Carousel } from 'react-bootstrap';
import ShowSlide from "./showSlide";
import Footer from "./Footer";

const Layout = ({ title = "Title", description = "Description", jumbotron = "true", slide = "false", className, children }) => (
    <div>
        <Menu />  
        {
            jumbotron === "true" ? (
                <Fragment>
                    <div className="jumbotron">
                        <h2 className="jumbotronText">{title}</h2>
                        <p className="lead">{description}</p>
                    </div>
                    <div className={className}>{children}</div>
                </Fragment>

            ) : slide === "true" ?
                (
                    <Fragment>
                        <Carousel fade>
                            <Carousel.Item>
                                {ShowSlide("1")}
                                <Carousel.Caption>
                                    <h3>Bienvenido a INKAPP</h3>
                                    <p>La nueva plataforma para los amantes de la tinta.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                {ShowSlide("2")}
                                <Carousel.Caption>
                                    <h3>Un espacio para todos</h3>
                                    <p>Comparte tus tatuajes, ideas o diseños con el resto de usuarios y conectate con tatuadores.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                {ShowSlide("3")}
                                <Carousel.Caption>
                                    <h3>Si eres tatuador, encuentra personas</h3>
                                    <p>Conectate con posibles clientes a través de INKAPP y gestiona tus horas de trabajo.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>

                        <div className={className}>{children}</div>
                    </Fragment>
                ) : (
                    <div>
                        <div className={className}>{children}</div>
                    </div>
                )
        }

        <br/>
        <Footer/>

    </div>
);

export default Layout;
