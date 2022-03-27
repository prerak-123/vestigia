import React from "react";
import "./Home.css";

function Home(props) {
	return (
		<div className="home">
			{props.user == null ? (
				<h1>Hello Guest</h1>
			) : (
				<h1>Hello, {props.user.displayName}</h1>
			)}
		</div>
	);
}

export default Home;
