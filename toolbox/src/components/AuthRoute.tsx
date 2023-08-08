import React, { useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Snack, SnackbarContext } from '../context/Context';

export interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const { setSnack } = useContext(SnackbarContext);

    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (!user) {
                console.log('unauthorized');
                setSnack(new Snack({ message: 'Du må være logget inn!', color: 'warning', autoHideDuration: 5000, open: true }));
                navigate('/');
            }
        });
        return () => AuthCheck(); // avoid memory leaks
    }, [auth]);

    return <>{children}</>;
};

export default AuthRoute;

// fetched from: https://github.com/joeythelantern/React-Firebase-9/blob/main/src/components/AuthRoute.tsx