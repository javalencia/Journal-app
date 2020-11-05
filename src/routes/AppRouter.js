import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { firebase } from '../firebase/firebase-config';  
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';

import { login } from '../actions/auth';

import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoute } from './PublicRoute';
import { JournalScreen } from '../components/journal/JournalScreen';
import { startLoadNotes } from '../actions/notes';

export const AppRouter = () => {


    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState( true );
 
    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    useEffect(() => {

        firebase.auth().onAuthStateChanged(  ( user ) => {

            if( user?.uid ) {

                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );

                dispatch( startLoadNotes( user.uid ) );

            } else {
                setIsLoggedIn( false );

            }

            setChecking( false );

        });
       
    }, [ dispatch, setChecking ])


    if ( checking ) {

        return (
            <h1>Wait...</h1>
        )

    }
    
    return (
        <Router>
            <Switch>
                <PublicRoute
                   component={ AuthRouter }
                   isAuthenticated={ isLoggedIn }
                   path="/auth" 
                />
                <PrivateRoutes
                   component={ JournalScreen }
                   exact
                   isAuthenticated={ isLoggedIn }
                   path="/" 
                />
                <Redirect to="/auth/login" />
            </Switch>
        </Router>
           
    )
}
