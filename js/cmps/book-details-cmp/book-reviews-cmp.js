import { bookService } from "../../service/books-service.js"
import rModal from "./reviwes-modal.js"
import { eventBus } from '../../service/eventBus-service.js';

export default {
    template: `
    <div class="reviews-body">
        <h1>Reviews:</h1>
        <button v-model="show" @click="show=toggleModal" v-if="!show && !add">Show Reviews</button>
        <button v-model="add" @click="add=true" @click="show=null" v-if="!add && !show">Add Review</button>
        <form class="reviews-container" v-if="add">
        <label for="rate">Rate:</label>
        <select id="rate" v-model="rate">
            <option v-for="n in 5">{{n}}</option>
        </select>
        <label for="date-read">Read Date:</label>
        <input v-model="date" type="date" id="date-read" value="2022-06-22" min="1918-01-01" @change="print" :max="dateNow">
        Name:<input v-model="userName" class="r-name" :class="{redBorder:msg}" type="text"/>
        Enter Review: <textarea v-model="review" class="r-body" :class="{redBorder:msg}"></textarea>
        <input type="submit" value="Send" @click="saveR"/>
        <button @click="add=null">Cancel</button>
    </form>
        <r-modal @close="toggleModal" v-if="show"/>

    </div>
  `,components:{
    bookService,
    rModal,
  },
    data() {
      return {
            review: null,
            userName: null,
            add:null,
            show:null,
            id:this.$route.params.bookId,
            book: null,
            rate: null,
            date: null,
            dateNow: null,
        }
    },
    methods: {
        print(){console.log(this.date, this.dateNow)},
        saveR(e){
            e.preventDefault()

            if(!this.userName) this.userName = 'Dearest Reader'
            if(!this.review) this.review = 'nothing'
            if(!this.rate) this.rate = 5
            if(!this.date) this.date = this.dateNow

            var newId = Date.now()

            this.add = null
            bookService.saveReview(this.id,{name:this.userName,review:this.review, rate:this.rate, date:this.date, id:newId})
            eventBus.emit('show-msg', { txt: 'Review was added', type: 'success' });
        },
        toggleModal(){
           this.show=!this.show
        },
    },
    created(){
        eventBus.emit('show-msg', { txt: 'Book was been Selected', type: 'success' });
        let dateObj = new Date()
        let month = ((dateObj.getUTCMonth() + 1)>9) ?  +dateObj.getUTCMonth() + 1 : '0'+ (+dateObj.getUTCMonth() + 1)
        let day = (dateObj.getUTCDate()>9) ? dateObj.getUTCDate() : '0' + dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        this.dateNow = year + "-" + month + "-" + day;

        this.book = bookService.get(this.id).then(book => this.book = book)
    },
    computed: {},
  };
  