import longText from '../cmps/book-details-cmp/long-text-cmp.js';
import { bookService } from "../service/books-service.js";
import bookReviews from '../cmps/book-details-cmp/book-reviews-cmp.js';

export default {
    template: `
        <!-- <button @click="$emit('close')" class="back-button">Go Back</button> -->
        <section v-if="book" class="book-details">
          <router-link to="/books" class="back-button">Go Back</router-link>
          <router-link :to="'/books/' + nextBookId">Next Book</router-link>
          <h4>Book Details</h4>
          <p>ID: {{book.id}}</p>
          <p>Title: {{book.title}}</p>
          <p>Subtitle: {{book.subtitle}}</p>
          <p>Authors: {{authorsList}}</p>
          <p>Published Date: {{book.publishedDate}}{{publishedMsg}}</p>
          <long-text :desc="book.description"/>
          <p>Page Count: {{book.pageCount}}{{readingMsg}}</p>
          <p>Categories: {{categories}}</p>
          <p>Language: {{book.language}}</p>
          <p :class="{red: isRed,green: isGreen}">Price: {{book.listPrice.amount}}{{currency}}</p>
          <div class="sale" v-if="isOnSale">
            <p>the book is on sale!</p>
          </div>
          <img v-bind:src="ImgUrl">
        </section>
        <book-reviews class="marginB"/>
          `,
          components: {
            longText,
            bookService,
            bookReviews,
          },
          data() {
            return {
              nextBookId: null,
              book:null,
              authorsList: null,
              categories: null,
              currency: null,
              readingMsg: null,
              publishedMsg: null,
              isRed: null,
              isGreen: null,
              isOnSale: null,
            }
        },
        created() {
              const id = this.$route.params.bookId
              bookService.get(id).then(book => this.book = book).then(this.setVars)
      },
    methods: {
        setVars(){
          this.authorsList = this.book.authors.join(', '),
              this.categories = this.book.categories.join(', '),
              this.currency = this.getIcon(),
              this.readingMsg= this.getReadingMsg(),
              this.publishedMsg = this.publishedDateMsg(),
              this.isRed = this.setPriceColor()[0],
              this.isGreen = this.setPriceColor()[1],
              this.isOnSale = this.book.listPrice.isOnSale
        },
        getIcon(){
            var currencySymbols = {
              'USD': '$', // US Dollar
              'EUR': '€', // Euro
              'CRC': '₡', // Costa Rican Colón
              'GBP': '£', // British Pound Sterling
              'ILS': '₪', // Israeli New Sheqel
              'INR': '₹', // Indian Rupee
              'JPY': '¥', // Japanese Yen
              'KRW': '₩', // South Korean Won
              'NGN': '₦', // Nigerian Naira
              'PHP': '₱', // Philippine Peso
              'PLN': 'zł', // Polish Zloty
              'PYG': '₲', // Paraguayan Guarani
              'THB': '฿', // Thai Baht
              'UAH': '₴', // Ukrainian Hryvnia
              'VND': '₫', // Vietnamese Dong
            }
            if(!this.book.listPrice.currencyCode) {
              this.book.listPrice.currencyCode = 'JPY'
            }
            this.currency = currencySymbols[this.book.listPrice.currencyCode]
            return this.currency
          },
          getReadingMsg(){
            this.readingMsg = (this.book.pageCount>500) ? ' - Long reading' : (this.book.pageCount>200) ? ' - Decent Reading' : (this.book.pageCount<100) ? ' - Light Reading' : '' 
            return this.readingMsg
          },
          publishedDateMsg(){
            var currYear = new Date().getFullYear()
            var bookAge = currYear - +this.book.publishedDate
            return this.publishedMsg = (bookAge>10) ? ' - Veteran Book' : (bookAge<1) ? ' - New!' : ''
          },
          setPriceColor(){
            this.isRed = (this.book.listPrice.amount>150) ? 'true' : null
            this.isGreen = (this.book.listPrice.amount<20) ? 'true' : null
            return [this.isRed,this.isGreen,this.isGreen]
          },
    },
    computed: {
        ImgUrl(){
          return this.book.thumbnail
      },
    },
    watch: {
      '$route.params.bookId':{
          handler() {
            const id = this.$route.params.bookId
            bookService.get(id).then(book => {
                    this.book = book
                    bookService.getNextBookId(book.id)
                        .then(nextBookId => this.nextBookId = nextBookId)
                })
          },
          immediate: true
      }
     
  },
};
