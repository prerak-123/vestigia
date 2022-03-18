import React from 'react'
import Login from './Login'
import './Library.css'
import firebase from './firebase';

const db = firebase.firestore();


class Library extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      books: [],
      show_library: true,
      edit_book: [false, ""],
      edit_character: false,

    }
    this.getInfo = this.getInfo.bind(this);
    this.RenderBooks = this.RenderBooks.bind(this);
    this.RenderEditPage = this.RenderEditPage.bind(this);
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

  //props.book is an object book with title, authors, thumbnail, chapters
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
                edit_character: false
              })
            }}>Back To Library</button>
          </div>
          <div className='book__title'>
            <p>{props.book.title}</p>
          </div>
        </div>
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
        <Login/>
        )
      }
    
    if(this.state.show_library){
      return (
        <div className='library'>
          <p className='title'>Your Library</p>
          <hr className='horizontal__line'/>
          {this.state.books.length>0 && <div className='library__books'>
            {this.state.books.map(book=><this.RenderBooks book={book}/>)}
          </div>}
        </div>
      )
    }

    if(this.state.edit_book[0]){
      for (let i = 0; i < this.state.books.length; i++){
        if(this.state.books[i].id == this.state.edit_book[1]){
          return(
            <this.RenderEditPage book = {this.state.books[i]}/>
          )
        }
      }
    }
  }
}



export default Library

//RenderBooks
//RenderEditPage
