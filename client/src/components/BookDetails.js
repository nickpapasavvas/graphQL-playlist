import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getBookQuery= gql`
    query($id:ID){
        book(id:$id){
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id

                }
            }
        }

    }
`

class BookDetails extends Component {
    displayBookDetails(){
        const {book}=this.props.data;
        if (book){
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                </div>
            )
        } else {
            return(
                <div>No book selected</div>
            )
        }

    }
    
  render() {

    return (
      <div id="book-details">
      <p>Output book details here</p>


      </div>
    );
  }
}

export default graphql(getBookQuery,{
    options:(props)=>{
        return {
            variables:{
                id:props.bookId
            }
        }
    }
})(BookDetails)