//import { addBook } from '../service/add-books-service.js';
import { bookService } from "../service/books-service.js";


export default {
    template: `
    <div class="add-book-container">
        <input v-model="search" type="text" id="book-search" placeholder="search book">
        <button @click.prevent="searchBook">search</button>
        
        <ul v-if="lengthOps" v-for="book in booksOptions" :key="book.id">
            <li >{{book.volumeInfo.title}}</li>
            <button @click="sendToParent(book)">+</button>
        </ul>
    </div>
  `,
  components: {
    bookService,
  },
    data() {
      return {
            search:null,
            booksOptions:null,
            lengthOps: null,
        }
    },
    methods: {
        searchBook(){
            console.log(this.search);
            bookService.getGoogleBook(this.search)
            .then(list => this.booksOptions = list.data).
            then(this.setList)
        },
        setList(){
            this.booksOptions = this.booksOptions.items
            this.lengthOps = this.booksOptions.length
        },
        sendToParent(book){
            this.search = null,
            this.booksOptions = null,
            this.lengthOps = null
            this.$emit('bookChosen',book)
        }

    },
    computed: {},
  };
  
//  id: book.id
//  title: book.volumeInfo.title
//  subtitle: book.volumeInfo.subtitle
//  authors: book.volumeInfo.authors
//  publishedDate: book.volumeInfo.publishedDate
//  description: book.volumeInfo.description
//  pageCount: book.volumeInfo.pageCount
//  categories: book.volumeInfo.categories
//  thumbnail: book.volumeInfo.imageLinks.thumbnail
//  language: book.volumeInfo.language
//  listPrice: {
//   amount: ,
//   currencyCode: ,
//     isOnSale: 
//  }