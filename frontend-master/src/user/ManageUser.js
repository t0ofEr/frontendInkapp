import React from 'react';
import Layout from '../core/Layout';
import { Tab, Row, Col, Nav, Sonnet } from 'react-bootstrap';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Profile from './editProfile';
import ChangePhoto from './changePhoto';
import UpdateUser from './UpdateUser';
import ChangePass from './changePass';

const ManageUser = ({match}) => {
    return (
        <Layout title="Edita tu cuenta" description="Selecciona una de las pestañas inferiores, para actualizar tus datos fácilmente." className="container-fluid" jumbotron="true" slide="false">
            <br />
            <Grid container spacing={3} justify="center">
                <Grid item xs={12}>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="one">Editar mi información</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="two">Cambiar foto de perfil</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="three">Cambiar mi contraseña</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="one">
                                        <h2>Editar mi información</h2>
                                        {UpdateUser()}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="two">
                                        <h2>Cambiar mi foto de perfil</h2>
                                        {ChangePhoto()}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="three">
                                        <h2>Cambiar mi contraseña</h2>
                                        {ChangePass()}
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Grid>

            </Grid>

        </Layout>


    );
};

export default ManageUser;