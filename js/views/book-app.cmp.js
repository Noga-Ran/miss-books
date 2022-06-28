import { bookService } from "../service/books-service.js";
import bookList from "../cmps/book-list.cmp.js";
import bookFilter from "../cmps/book-filter-cmp.js";
import bookDetails from "../views/book-details.cmp.js";
import { eventBus } from '../service/eventBus-service.js';
import addBook from '../cmps/add-book-cmp.js';

export default {
    template: `
    <div class="books-container" v-if="!selectedBook">
      <add-book @bookChosen="addChosenBook"/>
    <book-filter @filtered="filterBook" @changed="changeOptions" :filters="sendFilters"/>
    <book-list @removed="removeBook" @selected="selectBook" :books="booksToDisplay"/>
    </div>
    <div class="selected-book" v-else>
      <book-details @close="selectedBook = null, filterBy = null" :book="selectedBook" />
    </div>

  `,
  components:{
    bookList,
    bookFilter,
    bookDetails,
    addBook,
  },
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null,
            selectOps:null,
            isTitle: true,
            isMax: false,
            isMin: false,
        }
    },
    created() {
      bookService.query().then(books => this.books = books)
    },
    methods: {
      addChosenBook(book){
        var newBook = bookService.addGoogleBook(book)
        this.books.push(newBook)
        eventBus.emit('show-msg', { txt: 'Book has been add', type: 'success' });

      },
      filterBook(filterBy) {
        this.filterBy = filterBy;
      },
      changeOptions(ops){
        if(ops==='title') {
            this.isTitle= true
            this.isMax= false
            this.isMin= false
        }else if(ops==='min'){
          this.isTitle= false
          this.isMax= false
          this.isMin= true
        }else if (ops==='max') {
          this.isTitle= false
          this.isMax= true
          this.isMin= false
        }else{
          console.log('all');
          this.isTitle= true
          this.isMax= true
          this.isMin= true
        }
      },
      selectBook(book) {
        this.selectedBook = book;
        console.log(this.selectedBook);
      },
      removeBook(bookId){
        bookService.remove(bookId);
        const idx = this.books.findIndex((book) => book.id === bookId);
        this.books.splice(idx, 1);
        eventBus.emit('show-msg', { txt: 'Book has been deleted', type: 'success' });
      }
    },
    computed: {
        booksToDisplay() {
          if (!this.filterBy) return this.books

          var filterBooks = []

          if(this.isTitle){
            const regex = new RegExp(this.filterBy.title, "i");
            filterBooks = this.books.filter((book) => regex.test(book.title))
          }
          if(this.isMin){
            if(filterBooks.length) filterBooks = filterBooks.filter(book => +book.listPrice.amount >= +this.filterBy.minPrice)
            else filterBooks = this.books.filter(book => +book.listPrice.amount >= +this.filterBy.minPrice)
          }
          if(this.isMax) {
            if(filterBooks.length) filterBooks = filterBooks.filter(book => +book.listPrice.amount <= +this.filterBy.maxPrice)
            else filterBooks = this.books.filter(book => +book.listPrice.amount <= +this.filterBy.maxPrice)
          }

          return filterBooks
        },
        sendFilters(){
          return [this.isTitle, this.isMax, this.isMin]
        }
    },
  };
  