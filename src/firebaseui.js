import React from 'react';
import 'firebaseui/dist/firebaseui.css';
import firebase, { ui } from './firebase';

export default class FirebaseUI extends React.Component {
    componentDidMount() {
        const uiConfig = {
            'callbacks': {
                'signInSuccess': (user) => {
                    if (this.props.onSignIn) {
                        this.props.onSignIn(user);
                    }
                    return false;
                },
            },
            'signInOptions': [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
        };
        ui.start('#firebaseui-auth', uiConfig);
    }

    componentWillUnmount() {
        ui.reset();
    }

    render() {
        return (
            <div id="firebaseui-auth" />
        );
    }
}
