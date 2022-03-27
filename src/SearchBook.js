import React from "react";
import Login from "./Login";
import axios from "axios";
import "./SearchBook.css";
import firebase from "./firebase";

const db = firebase.firestore();

class SearchBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			book: "",
			result: [],
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.displayBook = this.displayBook.bind(this);
	}

	displayBook(props) {
		async function handleClick(event) {
			event.preventDefault();
			const id = props.id;
			const userid = props.user.uid;
			const authors =
				props.author !== undefined ? props.author : ["Author Not Found"];
			const thumbnail = props.image !== undefined ? props.image.thumbnail : "";

			const dataRef = await db.collection("users").doc(userid).get();
			const data = dataRef.data();
			if (data.books == null) {
				let temp = {
					id: id,
					title: props.title,
					authors: authors,
					thumbnail: thumbnail,
					chapters: [],
				};

				db.collection("users")
					.doc(userid)
					.set(
						{
							books: [temp],
						},
						{ merge: true }
					)
					.then(alert("Book Added Successfully"));
			} else {
				for (let i = 0; i < data.books.length; i++) {
					if (data.books[i].id === id) {
						alert("Book Already Present in Library!");
						return;
					}
				}

				let temp = {
					id: id,
					title: props.title,
					authors: authors,
					thumbnail: thumbnail,
					chapters: [],
				};

				db.collection("users")
					.doc(userid)
					.update({
						books: firebase.firestore.FieldValue.arrayUnion(temp),
					})
					.then(alert("Book Added Successfully"));
			}
		}

		return (
			<div className="book__container">
				<div className="image">
					<img
						src={props.image !== undefined ? props.image.thumbnail : ""}
						alt={props.title}
					/>
				</div>
				<div className="book__name">
					<h3>{props.title}</h3>
				</div>
				<div className="book__author">
					<p>Authors:</p>
					<p>
						{" "}
						{props.author !== undefined
							? props.author
									.filter((item, idx) => idx < 3)
									.map((author) => <li>{author}</li>)
							: "Author Not Found"}
					</p>
				</div>
				<div className="add__button">
					<button onClick={handleClick}>Add to Library</button>
				</div>
			</div>
		);
	}

	handleChange(event) {
		const book = event.target.value;
		this.setState({ book: book });
	}

	handleSubmit(event) {
		event.preventDefault();
		try {
			axios
				.get(
					"https://www.googleapis.com/books/v1/volumes?q=" +
						this.state.book +
						"&maxResults=30"
				)
				.then((data) => {
					this.setState({ result: data.data.items });
				});
		} catch (err) {
			alert(err);
		}
	}

	render() {
		if (this.props.user == null) {
			alert("Please Log In");
			return <Login />;
		}

		return (
			<div className="SearchBook">
				<div className="searchbar__container">
					<form onSubmit={this.handleSubmit}>
						<input
							placeholder="Search"
							type="text"
							onChange={this.handleChange}
							className="searchbar"
						></input>
					</form>
				</div>

				<div className="results">
					{this.state.result.map((book) => (
						<this.displayBook
							key={book.id}
							user={this.props.user}
							image={book.volumeInfo.imageLinks}
							title={book.volumeInfo.title}
							author={book.volumeInfo.authors}
							id={book.id}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default SearchBook;
