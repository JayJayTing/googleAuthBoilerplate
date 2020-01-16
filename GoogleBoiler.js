import React, { useEffect, useState } from 'react';
import env from 'dotenv';

function GoogleAuth() {
	const [isSignedIn, setIsSignedIn] = useState(null);
	var auth;

	useEffect(() => {
		env.config();
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: process.env.REACT_APP_CLIENT_ID,
					scope: 'email'
				})
				.then(() => {
					auth = window.gapi.auth2.getAuthInstance();
					auth.signIn(); //this is async
					setIsSignedIn(auth.isSignedIn.get());
					auth.isSignedIn.listen(() => {
						setIsSignedIn(auth.isSignedIn.get());
					});
				});
		});
	}, []);

	const onSignIn = () => {
		window.gapi.auth2.getAuthInstance().signIn();
	};

	const onSignOut = () => {
		window.gapi.auth2.getAuthInstance().signOut();
	};

	function renderAuthButton() {
		if (isSignedIn === null) {
			return null;
		} else if (isSignedIn) {
			return (
				<button onClick={onSignOut} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else {
			return (
				<button onClick={onSignIn} className="ui green google button">
					<i className="google icon" />
					Sign In with Google
				</button>
			);
		}
	}

	return <div>{renderAuthButton()}</div>;
}

export default GoogleAuth;
