import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { setError, setRemoveError } from '../../actions/ui';
import { startRegisterWhithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {


    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );


    const [ formValues, handleInputChange ] = useForm({
        name:'Jhonatan',
        email: 'javalencia7900@gmail.com',
        password: '123456',
        confirm: '123456'
    });

    const { name, email, password, confirm } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        console.log( password, confirm )

        if( isFormValid() ){
            dispatch( startRegisterWhithEmailPasswordName( email, password, name ) )
        }

    }

    const isFormValid = () => {

        if( name.trim().length === 0 ){
            dispatch( setError( 'Name is required') );
            return false;
        } else if ( !validator.isEmail( email )) {
            dispatch( setError( 'Email is not valid') );
            return false;
        } else if ( password !== confirm || password.length < 5 ){
            dispatch( setError( 'Password should be at least 6 characters and match each other') );
            return false;
        }

        dispatch( setRemoveError() )
        
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form 
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >

               {
                   msgError && 
                   (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                   )
               }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    defaultValue={ name }
                    onChange={ handleInputChange }
                />
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    defaultValue={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    defaultValue={ password }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm"
                    className="auth__input"
                    defaultValue={ confirm }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                >
                    Register
                </button>

                <hr />

                <Link 
                    to="auth/login"
                    className="link"
                    >
                    Already Registered ?
                </Link>

            </form>
        </>
    )
}

