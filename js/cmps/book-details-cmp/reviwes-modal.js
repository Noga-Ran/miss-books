import { bookService } from "../../service/books-service.js"

export default {
    template: `
    <div class="user-reviews">
        <div>
        <button @click="close">x</button>
            <ul v-if="book" v-for="rev in book.reviews" :key="rev.id">
                <label for="user-rev">At {{rev.date}} {{rev.name}} wrote:</label>
                <li id="user-rev" class="rv break-word"><span class="user-comment">{{rev.review}}</span>
                <span class='user-rate'>Rating: {{rev.rate}}</span></li>
            </ul>
        </div>
    </div>
  `
  ,components:{
    bookService
  },
    data() {
      return {
            id:this.$route.params.bookId,
            book: null,
            // deletedId: null
        }
    },
    methods: {
        close(){
            this.$emit("close")
        },
        delete(r){
            console.log('hello',r);
            // console.log(deletedId);
            //this.$emit('delete')
            return r
        },
    },
    created(){
        this.book = bookService.get(this.id).then(book => this.book = book)
    },
    computed: {},
  };
  