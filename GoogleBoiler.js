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

	function renderAuthButton() {
		if (isSignedIn) {
			console.log(isSignedIn);
			return <div>is signed in</div>;
		} else if (isSignedIn === null) {
			console.log(isSignedIn);
			return <div>don't know if sigend in</div>;
		} else {
			console.log(isSignedIn);
			return <div>not signed in</div>;
		}
	}

	return <div>{renderAuthButton()}GoogleAuth</div>;
}

export default GoogleAuth;
