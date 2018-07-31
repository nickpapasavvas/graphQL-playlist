import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import BookDetails from './BookDetails';

export const getBooksQuery = gql`
{
    books{
        name
        id
    }
}
`


class BookList extends Component {

    state={
        selected:null
    }


    displayBooks(){
        var data = this.props.data;
        if(data.loading){
            return(<div>loading books</div>)
        }else{
            return data.books.map( book=>{
                return(<li key={book.id} onClick={(e)=>{this.setState({
                    selected:book.id
                })}}>{book.name}</li>)
            } )
        }

    }

    
  render() {
    return (
      <div >
      <ul id='book-list'>
          {this.displayBooks()}
          </ul>
          <BookDetails bookId={this.state.selected}/>

      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);