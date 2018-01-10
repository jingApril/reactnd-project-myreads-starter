import React from 'react';
import { Route } from 'react-router-dom'
//import Books from './Books'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
    state = {
        books: [],
        shelf:[],
        showSearchPage: false
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })

    }

    onChangeStatus = (book, status) => {
        const indexOfBook = this.state.books.findIndex((b) => b.id === book.id)
        this.state.books[indexOfBook].shelf = status
        this.setState({ books: this.state.books })
    }

    render() {
      // console.log(this.state.books)
      // console.log(this.state.shelf)
      return (
        <div className="app">
            {this.state.showSearchPage ?
                (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                            <div className="search-books-input-wrapper">
                                { }
                                <input type="text" placeholder="Search by title or author"/>

                            </div>
                        </div>
                        <div className="search-books-results">
                            { }
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                              <Route render={() => (
                                  <BookShelf
                                    shelf="Currently Reading"
                                    books={this.state.books.filter((book) => book.shelf === 'currentlyReading')} onChange={this.onChangeStatus}
                                  />
                                )}
                              />
                              <Route render={() => (
                                  <BookShelf
                                    shelf="Want to Read"
                                    books={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                                    onChange={this.onChangeStatus}
                                />
                                )}
                              />
                              <Route render={() => (
                                  <BookShelf
                                    shelf="Read"
                                    books={this.state.books.filter((book) => book.shelf === 'read')}
                                   onChange={this.onChangeStatus}
                                />
                                )}
                              />
                            </div>
                        </div>
                        <div className="open-search">
                            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                        </div>
                    </div>
                )}
        </div>
    )
  }
}

export default BooksApp
