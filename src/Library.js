import React from "react";
import "./Library.css";
import firebase from "./firebase";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./Login";
import swal from 'sweetalert';

const theme = createTheme({
  typography: {
    fontSize: 25,
    fontFamily: ["Cookie", "cursive"].join(","),
  },
});
const db = firebase.firestore();

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      show_library: true,
      edit_book: [false, ""],
      edit_character: [false,0],
      newchapter: true,
      edit_chapter: ["", 0],
    };
    this.getInfo = this.getInfo.bind(this);
    this.RenderBooks = this.RenderBooks.bind(this);
    this.RenderEditPage = this.RenderEditPage.bind(this);
    this.EditChapter = this.EditChapter.bind(this);
    this.ChaptersList = this.ChaptersList.bind(this);
    this.ShowCharacters = this.ShowCharacters.bind(this);
  }

  componentDidMount() {
    if (this.props.user !== null) {
      this.getInfo();
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    return { getInfoRequired: prevProps.user !== this.props.user };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user !== null && snapshot.getInfoRequired) {
      this.getInfo();
    }
  }
  //props.book is an object book with title, authors, thumbnail, chapters
  RenderBooks = (props) => {
    return (
      <div className="library__container">
        <div className="library__image">
          <img src={props.book.thumbnail} alt={props.book.title}></img>
        </div>
        <div className="library__title">
          <h1>{props.book.title}</h1>
        </div>
        <div className="library__button">
          <button className="button__1">View</button>
        </div>
        <div className="library__button">
          <button
            className="button__2"
            onClick={(event) => {
              event.preventDefault();
              this.setState({
                show_library: false,
                edit_book: [true, props.book.id],
                edit_character: [false,0]
              });
            }}
          >
            Edit
          </button>
        </div>

        <div className="library__button">
          <button
            className="button__3"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to remove this book?")
              ) {
                this.state.books.splice(props.index, 1);
                this.setState({
                  books: this.state.books,
                });
                db.collection("users")
                  .doc(this.props.user.uid)
                  .set(
                    {
                      books: this.state.books,
                    },
                    { merge: true }
                  )
                  .then(swal("", "Book Removed Successfully!", "success"));
              }
            }}
          >
            Remove
          </button>
        </div>
      </div>
    );
  };

  ChaptersList = (props) => {
    return (
      <div
        style={{
          marginBottom: "15px",
        }}
      >
        <Button
          variant="outlined"
          size="large"
          style={{ width: "25vw" }}
          onClick={(event) => {
            event.preventDefault();
            this.setState({
              newchapter: false,
              edit_character: [false,0],
              edit_chapter: [props.Name, props.index],
            });
          }}
        >
          {props.Name}
        </Button>
      </div>
    );
  };

  //props.book is an object book with title, authors, thumbnail, chapters
  //props.index => this.state.books[i]
  RenderEditPage = (props) => {
    return (
      <div className="edit__page">
        <div className="edit__page__header">
          <div className="back__button">
            <button
              onClick={(event) => {
                event.preventDefault();
                this.setState({
                  show_library: true,
                  edit_book: [false, ""],
                  edit_character: [false,0],
                  newchapter: true,
                  edit_chapter: ["", 0],
                });
              }}
            >
              Back To Library
            </button>
          </div>
          <div className="book__title">
            <p>{props.book.title}</p>
          </div>
        </div>
        <div className="main__content">
          <div className="chapters__list">
            {this.state.books[props.index].chapters.map((chapter, index) => (
              <this.ChaptersList
                index={index}
                key={index}
                Name={chapter.Name}
              />
            ))}
            <Button
              startIcon={<AddBoxIcon />}
              variant="outlined"
              size="large"
              style={{ width: "25vw" }}
              onClick={(event) => {
                this.setState({
                  newchapter: true,
                  edit_chapter: ["", 0],
                });
              }}
            >
              NEW CHAPTER
            </Button>
          </div>
          <this.EditChapter
            index={props.index}
            name={this.state.edit_chapter[0]}
          />
        </div>
      </div>
    );
  };

  ShowCharacters = (props) => {
    if (props.newcharacter)
      return (
        <div className="character__button">
          <Button
            startIcon={<AddBoxIcon />}
            variant="contained"
            size="large"
            style={{ maxWidth: "55vw" }}
            onClick={(event)=>{
              let temp = {
                name: "Enter Name",
                chapters: [],
              }

              for(let i = props.chapter_index; i < this.state.books[props.book_index].chapters.length ;i++){
                temp.chapters.push(this.state.books[props.book_index].chapters[i].Name)
              }

              this.state.books[props.book_index].characters.push(temp);

              this.setState({
                books: this.state.books,
              });

              db.collection("users")
                .doc(this.props.user.uid)
                .set(
                  {
                    books: this.state.books,
                  },
                  { merge: true }
                )
                .then(swal("", "Character Added Successfully!", "success"));

            }}
          >
            {props.name}
          </Button>
        </div>
      );

    return (
      <div className="character__button">
        <Button onClick={(event) => {
          this.setState({
            edit_character: [true, props.character_index],
          })
        }} variant="outlined" color="success" size="large" style={{ maxWidth: "55vw" }}>
          {props.name}
        </Button>
      </div>
    );
  }
  EditChapter = (props) => {
    if (!this.state.newchapter) {
      return (
        <div className="edit__chapter">
          <p className="chapter__title"> {props.name} </p>
          <hr />
          <p>Details</p>
          <ThemeProvider theme={theme}>
            <Formik
              enableReinitialize
              initialValues={{
                Name: this.state.books[props.index].chapters[
                  this.state.edit_chapter[1]
                ].Name,
                Location: this.state.books[props.index].chapters[
                  this.state.edit_chapter[1]
                ].Location
                  ? this.state.books[props.index].chapters[
                    this.state.edit_chapter[1]
                  ].Location
                  : "",
                Time: this.state.books[props.index].chapters[
                  this.state.edit_chapter[1]
                ].Time
                  ? this.state.books[props.index].chapters[
                    this.state.edit_chapter[1]
                  ].Time
                  : "",
                Synopsis: this.state.books[props.index].chapters[
                  this.state.edit_chapter[1]
                ].Synopsis
                  ? this.state.books[props.index].chapters[
                    this.state.edit_chapter[1]
                  ].Synopsis
                  : "",
              }}
              onSubmit={(values) => {
                this.state.books[props.index].chapters[
                  this.state.edit_chapter[1]
                ] = values;
                this.setState({
                  books: this.state.books,
                });

                db.collection("users")
                  .doc(this.props.user.uid)
                  .set(
                    {
                      books: this.state.books,
                    },
                    { merge: true }
                  )
                  .then(swal("", "Chapter Updated Successfully!", "success"));
              }}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <TextField
                    style={{ width: "40vw" }}
                    variant="standard"
                    label="Location"
                    id="Location"
                    name="Location"
                    value={props.values.Location}
                    onChange={props.handleChange}
                  />

                  <TextField
                    style={{ width: "40vw" }}
                    variant="standard"
                    label="Time"
                    id="Time"
                    name="Time"
                    value={props.values.Time}
                    onChange={props.handleChange}
                  />
                  <TextField
                    style={{ width: "40vw" }}
                    multiline
                    variant="standard"
                    label="Synopsis"
                    id="Synopsis"
                    name="Synopsis"
                    value={props.values.Synopsis}
                    onChange={props.handleChange}
                  />

                  <br />

                  <Button
                    style={{ marginTop: "20px" }}
                    type="submit"
                    variant="contained"
                  >
                    Update
                  </Button>
                </form>
              )}
            </Formik>
          </ThemeProvider>
          <hr />

          <p>Characters</p>
          {this.state.edit_character[0] && <p>{this.state.edit_character[1]}</p>}
          <div className="characters__list">
            {this.state.books[props.index].characters.map((character, index) => (
              character.chapters.includes(props.name) && <this.ShowCharacters key={index} name={character.name} newcharacter={false} chapter_index={this.state.edit_chapter[1]} book_index={props.index} character_index={index}/>
            ))}
            <this.ShowCharacters name="New Character" newcharacter={true} chapter_index={this.state.edit_chapter[1]} book_index={props.index}/>
          </div>
          <hr />

          <Button
            style={{ marginBottom: "20px", alignSelf: "center" }}
            color="error"
            variant="contained"
            onClick={(event) => {
              if (window.confirm("Are you sure you want to remove chapter?")) {
                for(let i = this.state.books[props.index].characters.length - 1; i >= 0 ;i--){
                  if(this.state.books[props.index].characters[i].chapters.includes(this.state.books[props.index].chapters[this.state.edit_chapter[1]].Name)){
                    this.state.books[props.index].characters[i].chapters.splice(this.state.books[props.index].characters[i].chapters.indexOf(this.state.books[props.index].chapters[this.state.edit_chapter[1]].Name),1);

                    if(this.state.books[props.index].characters[i].chapters.length === 0){
                      this.state.books[props.index].characters.splice(i, 1);
                    }
                  }
                }

                this.state.books[props.index].chapters.splice(
                  this.state.edit_chapter[1],
                  1
                );
                this.setState({
                  books: this.state.books,
                  newchapter: true,
                  edit_chapter: ["", 0],
                  edit_character: [false,0]
                });

                db.collection("users")
                  .doc(this.props.user.uid)
                  .set(
                    {
                      books: this.state.books,
                    },
                    { merge: true }
                  )
                  .then(swal("", "Chapter Removed Successfully!", "success"));
              }
            }}
          >
            Remove Chapter
          </Button>
        </div>
      );
    }

    return (
      <div className="edit__chapter">
        <p>New Chapter</p>
        <hr />
        <Formik
          initialValues={{
            Name: "",
          }}
          onSubmit={(values, { resetForm }) => {
            if (values.Name === "") {
              swal("", "Enter a name!", "error");
              return;
            }

            for (
              let i = 0;
              i < this.state.books[props.index].chapters.length;
              i++
            ) {
              if (
                this.state.books[props.index].chapters[i].Name.toLowerCase() ===
                values.Name.toLowerCase()
              ) {
                swal("", "Chapter Already Exists!", "error");
                return;
              }
            }
            values.Time = "";
            values.Synopsis = "";

            this.state.books[props.index].chapters.push(values);

            for(let i = 0; i < this.state.books[props.index].characters.length; i++){
              this.state.books[props.index].characters[i].chapters.push(values.Name);
            }

            this.setState({
              books: this.state.books,
            });

            db.collection("users")
              .doc(this.props.user.uid)
              .set(
                {
                  books: this.state.books,
                },
                { merge: true }
              )
              .then(swal("", "Chapter Added Successfully!", "success"));

            resetForm();
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <ThemeProvider theme={theme}>
                <TextField
                  style={{
                    width: "40vw",
                    marginRight: "3vw",
                  }}
                  variant="standard"
                  label="Enter Name of Chapter"
                  placeholder="Unique Name to Identify Chapter"
                  id="Name"
                  name="Name"
                  value={props.values.Name}
                  onChange={props.handleChange}
                />

                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    props.handleSubmit();
                  }}
                  variant="contained"
                >
                  Add Chapter
                </Button>
              </ThemeProvider>
            </form>
          )}
        </Formik>
      </div>
    );
  };

  getInfo = async () => {
    const dataRef = await db.collection("users").doc(this.props.user.uid).get();
    const data = dataRef.data();
    if (data.books != null) {
      this.setState({
        books: data.books,
      });
    }
  };

  render() {
    if (this.props.user == null) {
      swal("", "Please Log In", "warning");
      return <Login />;
    }

    if (this.state.show_library) {
      return (
        <div className="library">
          <p className="title">Your Library</p>
          <hr className="horizontal__line" />
          {this.state.books.length > 0 && (
            <div className="library__books">
              {this.state.books.map((book, index) => (
                <this.RenderBooks book={book} key={book.title} index={index} />
              ))}
            </div>
          )}
        </div>
      );
    }

    if (this.state.edit_book[0]) {
      for (let i = 0; i < this.state.books.length; i++) {
        if (this.state.books[i].id === this.state.edit_book[1]) {
          return <this.RenderEditPage book={this.state.books[i]} index={i} />;
        }
      }
    }
  }
}

export default Library;

//RenderBooks
//RenderEditPage
//EditChapter
