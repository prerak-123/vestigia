// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,

	authDomain: process.env.REACT_APP_AUTH_DOMAIN,

	projectId: process.env.REACT_APP_PROJECT_ID,

	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,

	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,

	appId: process.env.REACT_APP_APP_ID,

	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
