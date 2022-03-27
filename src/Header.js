import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import firebase from "./firebase";

function Header(props) {
	const routeChange = () => {
		let path = `/`;
		navigate(path);
	};

	let navigate = useNavigate();

	if (props.user == null) {
		return (
			<div className="header">
				<Link to="/">
					<img
						src={process.env.PUBLIC_URL + "logo.png"}
						alt="Logo"
						className="logo"
					/>
				</Link>
				<div className="search">
					<input
						type={"search"}
						placeholder="Search"
						className="search__bar"
					></input>
					<SearchIcon className="search__icon" />
				</div>

				<div className="user">
					<Link to={"/login"}>
						<button className="header__button user__button" type="button">
							Log In
						</button>
					</Link>
				</div>

				<div className="github">
					<a
						href="https://github.com/prerak-123/vestigia"
						className="github__link"
					>
						GitHub
					</a>
				</div>
			</div>
		);
	}
	return (
		<div className="header">
			<Link to="/">
				<img
					src={process.env.PUBLIC_URL + "logo.png"}
					alt="Logo"
					className="logo"
				/>
			</Link>
			<Link to="/library">
				<button className="header__button">Library</button>
			</Link>
			<Link to="/add">
				<button className="header__button">Add Book</button>
			</Link>
			<div className="search">
				<input
					type={"search"}
					placeholder="Search"
					className="search__bar"
				></input>
				<SearchIcon className="search__icon" />
			</div>

			<div className="user">
				<button
					className="header__button user__button"
					type="button"
					onClick={() => {
						firebase.auth().signOut();
						alert("Logged Out Successfully");
						routeChange();
					}}
				>
					Log Out
				</button>
			</div>

			<div className="github">
				<a
					href="https://github.com/prerak-123/vestigia"
					className="github__link"
				>
					GitHub
				</a>
			</div>
		</div>
	);
}

export default Header;
