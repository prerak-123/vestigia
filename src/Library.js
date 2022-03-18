import React from 'react'
import Login from './Login'
import './Library.css'
import firebase from './firebase';

const db = firebase.firestore();


class Library extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      books_list: [],
      books_info: [],
      show_library: true,
      edit_book: [false, ""],
      edit_character: false,

    }
    this.listBooks = this.listBooks.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.RenderBooks = this.RenderBooks.bind(this);
  }

  componentDidMount(){
    if(this.props.user !== null){
      this.listBooks().then(this.getInfo);
    }
  }
  //prop is an object book with title, authors, thumbnail, chapters
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

  listBooks = async() => {
    const dataRef = await db.collection("users").doc(this.props.user.uid).get();

    const data = dataRef.data();

    if(data.books_list !== undefined){
      this.setState(
        {books_list: data.books_list}
      )
    }

  }

  getInfo = async() => {
    let temp = [];
    for (let i = 0; i < this.state.books_list.length; i++) {
      const element = this.state.books_list[i];
      const dataRef = await db.collection("users").doc(this.props.user.uid).collection("books").doc(element).get();
      const data = dataRef.data();
      temp = [...temp, data]
    }
    this.setState({
      books_info: temp
    })
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
          {this.state.books_info.length>0 && <div className='library__books'>
            {this.state.books_info.map(book=><this.RenderBooks book={book}/>)}
          </div>}
        </div>
      )
    }
  }
}



export default Library

//RenderBooks
