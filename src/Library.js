import React from 'react'
import './Library.css'
import firebase from './firebase';
import { Navigate } from "react-router-dom"
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: 25,
    fontFamily: [
      'Cookie',
      'cursive',
    ].join(','),
  },});
const db = firebase.firestore();

class Library extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      books: [],
      show_library: true,
      edit_book: [false, ""],
      edit_character: false,
      newchapter: true,
      edit_chapter: ["", 0]
    }
    this.getInfo = this.getInfo.bind(this);
    this.RenderBooks = this.RenderBooks.bind(this);
    this.RenderEditPage = this.RenderEditPage.bind(this);
    this.EditChapter = this.EditChapter.bind(this);
    this.CharactersList = this.CharactersList.bind(this);
  }

  componentDidMount(){
    if(this.props.user !== null){
      this.getInfo();
    }
  }
  //props.book is an object book with title, authors, thumbnail, chapters
  RenderBooks = (props) => {
    return(
      <div className='library__container'>
        <div className='library__image'>
          <img src={props.book.thumbnail} alt={props.book.title}></img>
        </div>
        <div className='library__title'>
          <h1>{props.book.title}</h1>
        </div>
        <div className='library__button'>
          <button className='button__1'>View</button>
        </div>
        <div className='library__button'>
          <button className='button__2' onClick={(event) => {
            event.preventDefault();
            this.setState({
              show_library: false,
              edit_book: [true, props.book.id],
              edit_character: false
            })
          }}>Edit</button>
        </div>
      </div>
    )
  }

  CharactersList = (props) => {
    return(
      <div style={{
        marginBottom: "15px"
      }}>
        <Button variant="outlined" size="large" style={{width: '25vw'} } onClick = {(event) => {
          event.preventDefault();
          this.setState({
            newchapter: false,
            edit_chapter: [props.Name, props.index]
          })
        }}>{props.Name}</Button>
      </div>
    )
  }

  //props.book is an object book with title, authors, thumbnail, chapters
  //props.index => this.state.books[i]
  RenderEditPage = (props) => {

    return(
      <div className='edit__page'>
        <div className='edit__page__header'>
          <div className='back__button'>
            <button onClick={(event)=>{
              event.preventDefault();
              this.setState({
                show_library: true,
                edit_book: [false, ""],
                edit_character: false,
                newchapter: true,
                edit_chapter: ["", 0]
              })
            }}>Back To Library</button>
          </div>
          <div className='book__title'>
            <p>{props.book.title}</p>
          </div>
        </div>
        <div className='main__content'>
          <div className='chapters__list'>
            {this.state.books[props.index].chapters.map((chapter, index) => <this.CharactersList index = {index} key={index} Name={chapter.Name} /> )}
            <Button  startIcon={<AddBoxIcon/>} variant="outlined" size="large" style={{width: '25vw'} } onClick = {(event)=>{
              this.setState({
                newchapter: true,
                edit_chapter: ["", 0]
              })
            }}> NEW CHAPTER</Button>
          </div>
          <this.EditChapter index = {props.index} name = {this.state.edit_chapter[0]}/>
        </div>
      </div>
    )
  }

  EditChapter = (props) => {

    function ShowCharacters(props){
      if(props.newcharacter)
      return(
        <div className='character__button'>
          <Button startIcon={<AddBoxIcon/>} variant="contained" size="large" style={{maxWidth: '55vw'} }>
            {props.name}
          </Button>
        </div>
      )

      return(
        <div className='character__button'>
          <Button variant="contained" size="large" style={{maxWidth: '55vw'} }>
            {props.name}
          </Button>
        </div>
      )
    };

    //End of showCharacters Function
    if(!this.state.newchapter){

      return(
        <div className='edit__chapter'>
          <p className='chapter__title'> {props.name} </p>
          <hr/>
          <p>Characters</p>
          <div className='characters__list'>
            <ShowCharacters name='New Character' newcharacter={true}/>
          </div>
          <hr/>
          <p>Details</p>
          <ThemeProvider theme={theme}>

          <Formik
            enableReinitialize

            initialValues = {{
              Name: this.state.books[props.index].chapters[this.state.edit_chapter[1]].Name,
              Location: this.state.books[props.index].chapters[this.state.edit_chapter[1]].Location? this.state.books[props.index].chapters[this.state.edit_chapter[1]].Location:"" ,
              Time: this.state.books[props.index].chapters[this.state.edit_chapter[1]].Time? this.state.books[props.index].chapters[this.state.edit_chapter[1]].Time:"",
              Synopsis:this.state.books[props.index].chapters[this.state.edit_chapter[1]].Synopsis? this.state.books[props.index].chapters[this.state.edit_chapter[1]].Synopsis:""         
            }}

            onSubmit={(values) => {
              this.state.books[props.index].chapters[this.state.edit_chapter[1]] = values;
              this.setState({
                books: this.state.books
              })

              db.collection('users').doc(this.props.user.uid).set({
                books: this.state.books
              }, {merge: true}).then(alert("Chapter Updated Successfully!")) 
            }}
          >

       {props => (

        <form onSubmit={props.handleSubmit}>
        <TextField
        style={{width: '40vw'} }
        variant="standard"
        label='Location'
        id="Location"
        name="Location"
        value={props.values.Location}
        onChange={props.handleChange}
        />

        <TextField
        style={{width: '40vw'} }
        variant="standard"
        label='Time'
        id="Time"
        name="Time"
        value={props.values.Time}
        onChange={props.handleChange}
        />

        <TextField
        style={{width: '40vw'} }
        multiline
        variant="standard"
        label='Synopsis'
        id="Synopsis"
        name="Synopsis"
        value={props.values.Synopsis}
        onChange={props.handleChange}
        />

        <br/>

        <Button style={{marginTop: "20px"}} type="submit" variant = 'contained'>Update</Button>
        </form>

       )}

     </Formik>
        </ThemeProvider>
        </div>
      )
    }

    return(
      <div className='edit__chapter'>

        <Formik

          initialValues= {{
            Name: ""
          }}

          onSubmit= {(values, { resetForm }) => {
            if(values.Name === ""){
              alert("Enter a name!");
              return;
            }
    
            for(let i = 0; i < this.state.books[props.index].chapters.length; i++){
              if(this.state.books[props.index].chapters[i].Name.toLowerCase() === values.Name.toLowerCase()){
                alert("Chapter Already Exists!");
                return;
              }
            }
            values.Time = '';
            values.Synopsis = '';
    
            this.state.books[props.index].chapters.push(values);
    
            this.setState({
                books: this.state.books
            })
    
            db.collection('users').doc(this.props.user.uid).set({
              books: this.state.books
            }, {merge: true}).then(alert("Chapter Added Successfully!"))
    
            resetForm();
    
          }}

     >

       {props => (

          <form onSubmit={props.handleSubmit}>
          <ThemeProvider theme={theme}>
            <TextField
            style={{
              width: '40vw',
              marginRight: '3vw'
            } }
            variant="standard"
            label='Enter Name of Chapter'
            placeholder='Unique Name to Identify Chapter'
            id='Name'
            name='Name'
            value = {props.values.Name}
            onChange={props.handleChange}
            />

            <Button onClick = {(event) => {
              event.preventDefault();
              props.handleSubmit();
            }} variant = 'contained'>
              Add Chapter
            </Button>

          </ThemeProvider>
          </form>

       )}

     </Formik>
      </div>
    )
  }

  getInfo = async() => {
  
    const dataRef = await db.collection("users").doc(this.props.user.uid).get();
    const data = dataRef.data();
    if(data.books !=null){
      this.setState({
        books: data.books
      })
    }
    
  }

  render(){

    if(this.props.user==null){
      alert("Please Log In");
      return(
       <Navigate relpace to="/login"/>
        )
      }
    
    if(this.state.show_library){
      return (
        <div className='library'>
          <p className='title'>Your Library</p>
          <hr className='horizontal__line'/>
          {this.state.books.length>0 && <div className='library__books'>
            {this.state.books.map(book=><this.RenderBooks book={book} key={book.title}/>)}
          </div>}
        </div>
      )
    }

    if(this.state.edit_book[0]){
      for (let i = 0; i < this.state.books.length; i++){
        if(this.state.books[i].id === this.state.edit_book[1]){
          return(
            <this.RenderEditPage book = {this.state.books[i]} index = {i}/>
          )
        }
      }
    }
  }
}

export default Library

//RenderBooks
//RenderEditPage
//EditChapter
