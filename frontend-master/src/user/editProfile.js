import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import {Redirect} from 'react-router-dom';
import { getRegiones } from './../admin/apiAdmin';
import { read, update, updateUser} from '../user/apiUser';
import makeToast from '../Toaster/Toaster';

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        userName: "",
        nombre: "",
        apellido: "",
        sexo: "",
        email: "",
        password: "",
        confirmPassword: "",
        tipo: "",
        img: "",
        edad: "",
        Regiones: [],
        region: "",
        loading: false,
        error: "",
        redirectToDashboard: false,
        formData: ""
    });

    const { 
        userName, 
        nombre, 
        apellido, 
        sexo, 
        email, 
        password, 
        confirmPassword, 
        tipo, 
        edad,
        Regiones,
        region, 
        loading, 
        error,
        redirectToDashboard,
        formData 
    } = values;

    const { accessToken, dataUser } = isAuthenticated()

    //Cargar regiones y setear formData
    const init = (userId) =>{
        read(userId, accessToken ).then(data => {
            if(data.error) {
                setValues({...values, error: true, })
            } else{
                setValues({
                    ...values,
                    userName: data.user.userName,
                    nombre: data.user.nombre,
                    apellido: data.user.apellido,
                    sexo: data.user.sexo,
                    email: data.user.email,
                    tipo: data.user.tipo,
                    edad: data.user.edad,
                    region: data.user.region,
                    formData: new FormData()
                })
                initRegiones();
            }
        })
        
    }

    const initRegiones = () => {
        getRegiones().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else {
                setValues({ Regiones: data.data, formData: new FormData()}) 
            }
        })
    }

    useEffect (() => {
        init(match.params.userId);
    }, []); 

    const handleChange = name => event => {
        const value = 
            name === "img" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const clickSubmit = e => {
        e.preventDefault()
        setValues({...values, error: "", loading: true});

        if(password === confirmPassword){
            update(dataUser.id, accessToken, formData )
            .then( data => {
                if(data.error) {
                    makeToast("error", data.error);
                } else{
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            userName: data.userName,
                            nombre: data.nombre,
                            apellido: data.apellido,
                            sexo: data.sexo,
                            email: data.email,
                            tipo: data.tipo,
                            edad: data.edad,
                            region: data.region,
                            redirectToDashboard: true
                        })
                        console.log(values);
                    })
                }
            })
        }else{
            makeToast('error', 'Contraseñas no coinciden')
        }
        
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const redirectUser = () => {
        if(redirectToDashboard) {
            return <Redirect to="/user/dashboard" />
        }
    }

    const profileUpdate = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input
                    onChange={handleChange('userName')}
                    type="text"
                    className="form-control"
                    value={userName}
                    required
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input 
                    onChange={handleChange('nombre')} 
                    type="text" 
                    className="form-control" 
                    value={nombre}
                    required
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Apellido</label>
                <input 
                    onChange={handleChange('apellido')} 
                    type="text" 
                    className="form-control" 
                    value={apellido}
                    required
                />
            </div>
            
            <div className="form-group">
                <label className="text-muted">Sexo</label>
                <select 
                    onChange={handleChange("sexo")}
                    className="form-control"
                    required
                >
                    <option >Seleccione sexo...</option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    onChange={handleChange('email')} 
                    type="email" 
                    className="form-control" 
                    value={email}
                    required
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Contraseña</label>
                <input 
                    onChange={handleChange('password')} 
                    type="password" 
                    className="form-control" 
                    value={password}
                    required
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Confirmar contraseña</label>
                <input 
                    onChange={handleChange('confirmPassword')} 
                    type="password" 
                    className="form-control" 
                    value={confirmPassword}
                    required
                />
            </div>

            <div className="form-group">
                <label className="text-muted">¿Que tipo de usuario quieres ser?</label>
                <select 
                    onChange={handleChange("tipo")}
                    className="form-control"
                    required
                >
                    <option >Seleccione un tipo de usuario...</option>
                    <option value="1">Soy tatuador</option>
                    <option value="2">Soy cliente</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Edad</label>
                <input 
                    onChange={handleChange('edad')} 
                    type="number" 
                    className="form-control" 
                    value={edad}
                    min="18"
                    max="100"
                    required
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Region</label>
                <select 
                    onChange={handleChange("region")}
                    className="form-control"
                    required
                >
                    <option >Seleccione una región...</option>
                    {Regiones.map((data, i) => (
                            <option key={i} value={data._id}>{data.nombre}</option>
                        )) 
                    }
                </select>

            </div>

            <h5>Foto de perfil</h5>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input 
                        onChange={handleChange('img')}
                        type="file" 
                        name="img" 
                        accept="image/*" 
                        required
                    />
                </label>
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Modificar perfil!</button>
        </form>
    )

    return(
        <Layout title="Perfil" description="Actualiza tu perfil">
            {showError()}
            {profileUpdate()}
            {redirectUser()}
           
        </Layout>
    )
}

export default Profile;