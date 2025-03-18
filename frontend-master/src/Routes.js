import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Singup from './user/Singup';
import Singin from './user/Singin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import editProfile from './user/editProfile';
import CreatePublicacion from './user/CreatePublicacion';
import ManageRegion from './admin/ManageRegion';
import ManageParte from './admin/ManageParte';
import ManageEstado from './admin/ManageEstado';
import ManageEstilo from './admin/ManageEstilo';
import UpdateRegion from './admin/updateRegion';
import UpdateParte from './admin/updateParte';
import UpdateEstilo from './admin/updateEstilo';
import UpdateEstado from './admin/updateEstado';
import PublicacionPage from './core/PublicacionPage';
import ChatroomPage from './chat/ChatroomPage';
import ChatroomsMenuPage from './chat/ChatroomsMenuPage';
import CreateProyecto from './user/CreateProyecto'
import UpdateProject from './user/UpdateProject'
import MisProyectos from './user/Misproyectos';
import ProjectsOffers from './user/ProjectsOfferts';
import DoOffer from './user/DoOffer'
import AllProjects from './user/AllProjects'
import MyOffers from './user/MyOffers'
import { io } from 'socket.io-client';
import { isAuthenticated } from './auth';
import RespuestaOferta from './user/RespuestaOferta';
import DoReserve from './user/DoReserve';
import Profile from './core/Profile';
import modificarReserve from './user/modificarReserve'
import AgendaTatuadores from './core/AgendaTatuadores'
import DoOfferReserve from './user/DoOfferReserve';
import ReserveOffers from './user/ReserveOffers';
import RespuestaOfertaReserva from './user/RespuestaOfertaReserva';
import MyReserveOffers from './user/MyReserveOffers';
import Pagos from './core/Pagos';
import UserVip from './user/UserVip';
import ProjectPage from './core/ProjectPage';
import ManageUser from './user/ManageUser';
import Publicaciones from './core/Publicaciones';
import UpdatePublication from './user/updatePublication';

const Routes = () => {

  const [socket, setSocket] = React.useState(null)

  const setupSocket = () => {

    const { accessToken } = isAuthenticated()
    if (accessToken && !socket) {
      const newSocket = io('http://localhost:4000', {
        query: {
          token: accessToken
        }
      })

      newSocket.on('disconnect', () => {
        setSocket(null)
        setTimeout(setupSocket, 3000)

      })

      newSocket.on('connect', () => {

      })

      setSocket(newSocket)
    }
  }

  React.useEffect(() => {
    setupSocket()
    //eslint-disable-next-line
  }, [])
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Singin} />
        <Route path="/signup" exact component={Singup} />
        <Route path='/chatroomsmenu'
          render={() => <ChatroomsMenuPage setupSocket={setupSocket} exact />}
        />
        <Route path='/chatroom/:id'
          render={() => <ChatroomPage socket={socket} exact />}
        />
        <Route path="/profile/:userId" exact component={Profile} />

        <AdminRoute path="/manage/region" exact component={ManageRegion} />
        <AdminRoute path="/manage/region/update/:regionId" exact component={UpdateRegion} />
        <AdminRoute path="/manage/parte" exact component={ManageParte} />
        <AdminRoute path="/manage/parte/update/:parteId" exact component={UpdateParte} />
        <AdminRoute path="/manage/estado" exact component={ManageEstado} />
        <AdminRoute path="/manage/estado/update/:estadoId" exact component={UpdateEstado} />
        <AdminRoute path="/manage/estiloTatuaje" exact component={ManageEstilo} />
        <AdminRoute path="/manage/estiloTatuaje/update/:estiloId" exact component={UpdateEstilo} />

        <PrivateRoute path="/profile/edit/:userId" exact component={editProfile} />
        <PrivateRoute path="/myaccount/manage/:userId" exact component={ManageUser} />
        <PrivateRoute path="/profile/publication/create/:userId" exact component={CreatePublicacion} />
        <PrivateRoute path="/profile/publication/update/:publicacionId" exact component={UpdatePublication} />
        <PrivateRoute path="/profile/publication/view/:publicacionId" exact component={PublicacionPage} />
        <PrivateRoute path="/profile/project/create/:userId" exact component={CreateProyecto} />
        <PrivateRoute path="/profile/project/update/:projectId" exact component={UpdateProject} />
        <PrivateRoute path="/profile/myprojects/:userId" exact component={MisProyectos} />
        <PrivateRoute path="/profile/project/view/:proyectoId" exact component={ProjectPage} />
        <PrivateRoute path="/profile/project/offers/:projectId" exact component={ProjectsOffers} />
        <PrivateRoute path="/profile/project/projects/list" exact component={AllProjects} />
        <PrivateRoute path="/profile/project/doOffer/:projectId" exact component={DoOffer} />
        <PrivateRoute path="/profile/project/doOffer/:projectId/:offerId/:response"
          exact component={RespuestaOferta} />
        <PrivateRoute path="/profile/agenda/modificar/:idFecha" exact component={modificarReserve} />
        <PrivateRoute path="/profile/offers/myoffers/:userId" exact component={MyOffers} />
        <PrivateRoute path="/profile/do-reserve/:userId" exact component={DoReserve} />
        <PrivateRoute path="/profile/agenda/:userId" exact component={AgendaTatuadores} />
        <PrivateRoute path="/profile/do-reserve-hour/:agendaId" exact component={DoOfferReserve} />
        <PrivateRoute path="/profile/agenda/offers/:agendaId" exact component={ReserveOffers} />
        <PrivateRoute path="/profile/agenda/offers/:agendaId/:offerId/:response"
          exact component={RespuestaOfertaReserva} />
        <PrivateRoute path="/profile/reserve/myoffers/:userId" exact component={MyReserveOffers} />
        <PrivateRoute path="/profile/pagos/:userId" exact component={Pagos} />
        <PrivateRoute path="/profile/user/vip" exact component={UserVip} />
        <PrivateRoute path="/publicaciones" exact component={Publicaciones} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;