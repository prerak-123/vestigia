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
      books_info: []
    }
    this.listBooks = this.listBooks.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidMount(){
    if(this.props.user !== null){
      this.listBooks().then(this.getInfo);
    }
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
    for (let i = 0; i < this.state.books_list.length; i++) {
      const element = this.state.books_list[i];
      const dataRef = await db.collection("users").doc(this.props.user.uid).collection("books").doc(element).get();
      const data = dataRef.data();
      this.setState({
        books_info: [...this.state.books_info, data]
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
          
    return (
      <div className='library'>
        <p className='title'>Your Library</p>
        <hr className='horizontal__line'/>
        {this.state.books_info.length>0 && <div className='library__books'>
          {this.state.books_info.map(book=><RenderBooks book={book}/>)}
        </div>}
      </div>
    )
  }
}

//prop is an object book with title, authors and thumbnail
function RenderBooks(props){
  return(
    <div className='library__container'>
      <div className='library__image'>
        <img src={props.book.thumbnail} alt={props.book.title}></img>
      </div>
      <div className='library__title'>
        <h2>{props.book.title}</h2>
      </div>
    </div>
  )
}

export default Library
