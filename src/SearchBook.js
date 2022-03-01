import React from 'react'
import Login from './Login'
import axios from 'axios';
import "./SearchBook.css"

class SearchBook extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          book: "",
          result: []
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {  
    const book = event.target.value; 
    this.setState(
        {book: book}
    ) 
    this.state.book = book;  
  }

  handleSubmit(event) {  
    event.preventDefault(); 
    try{
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.book + "&maxResults=40")  
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
            {this.state.result.map(book=><img src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''} alt={book.title}/>)}
        </div>
    )
  }
}



export default SearchBook