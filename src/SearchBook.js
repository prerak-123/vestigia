import React from 'react'
import Login from './Login'
import axios from 'axios'
import "./SearchBook.css"
import firebase from './firebase'

const db = firebase.firestore();

class SearchBook extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          book: "",
          result: []
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.displayBook = this.displayBook.bind(this);
  }

  displayBook(props) {

    function handleClick(event){
      event.preventDefault();
      const id = props.id;
      const userid = props.user.uid;
      const authors = props.author !== undefined ? props.author:['Author Not Found']; 

      db.collection('users').doc(userid).collection("books").doc(id).set({
        title: props.title,
        authors: authors
      }, {merge: true}).then(alert("Book Added Successfully!")) 
    }

    return(
      <div className='book__container'>
              <div className='image'>
                <img src={props.image !== undefined ? props.image.thumbnail : ''} alt={props.title}/>
              </div>
              <div className='book__name'>
                <h3>{props.title}</h3>
              </div>
              <div className='book__author'>
                <p>Authors:</p>
                <p> {props.author!== undefined ? props.author.filter((item, idx) => idx < 3).map(author => <li>{author}</li>):'Author Not Found'}</p>
              </div>
              <div className='add__button'>
                <button onClick={handleClick}>Add to Library</button>
              </div>
            </div>
    )
  }

  handleChange(event) {  
    const book = event.target.value; 
    this.setState(
        {book: book}
    ) 
  }

  handleSubmit(event) {  
    event.preventDefault(); 
    try{
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.book + "&maxResults=30")  
        .then(data => {  
            this.setState({result: data.data.items}) 
            console.log(this.state.result)  
        }) 
    }
    catch(err){
        alert(err);
    } 
     
}

  render(){
    if(this.props.user==null){
        alert("Please Log In");
        return(
          <Login/>
        )
      }
    
    return(
        <div className='SearchBook'>
            <div className='searchbar__container'>
                <form onSubmit={this.handleSubmit} >
                    <input placeholder='Search' type="text" onChange={this.handleChange} className='searchbar'></input>
                </form>
                
            </div>

            <div className='results'>

            
            {this.state.result.map(book=>
              <this.displayBook user={this.props.user} image={book.volumeInfo.imageLinks} title={book.volumeInfo.title} author={book.volumeInfo.authors} id={book.id}/>
              )}

            </div>
        </div>
    )
  }
}



export default SearchBook