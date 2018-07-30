import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql, compose} from 'react-apollo';

const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}
`

const addBookMutation=gql`
    mutation{
        addBook(name:"", genre:"",authorId:""){
            name
            id
        }
    }
`

class AddBook extends Component {
    state={
        name:'',
        genre:'',
        authorId:''

    }

    displayAuthors(){
        var data = this.props.getAuthorsQuery;
        if(data.loading){
            return(<option disabled>loading Authors</option>)
        }else{
            return data.authors.map( author=>{
                return(<option key={author.id} value={author.id}>{author.name}</option>)
            } )
        }
    }

    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation()
    }
    
  render() {
    return (
<form id="add-book" onSubmit={this.submitForm.bind(this)}>

<div className="field">
    <label> Book name: </label>
    <input type="text" onChange={(e)=>this.setState({name:e.target.value})}/>
</div>

<div className="field">
        <label> Genre: </label>
        <input type="text" onChange={(e)=>this.setState({genre:e.target.value})}/>
</div>

<div className="field">
        <label> Author: </label>
        <select onChange={(e)=>this.setState({authorId:e.target.value})}>
            <option> Select author</option>
            {this.displayAuthors()}

        </select>
</div>
<button>+</button>


</form>
    );
  }
}

export default compose(
    graphql(getAuthorsQuery, {name:'getAuthorsQuery'}),
    graphql(addBookMutation, {name:'addBookMutation'})
)(AddBook);
