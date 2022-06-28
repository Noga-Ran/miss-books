import bookPreview from "../cmps/book-preview.cmp.js";

export default {
  props: ["books"],
  template: `
 <section class="book-list">
        <ul>
            <li v-for="(book) in books" :key="book.id" class="book-preview-container">
                <book-preview :book="book"/>
                <div class="actions">
                    <button @click="remove(book.id)">X</button>
                    <router-link :to="'/books/'+book.id">Details</router-link>
                </div>
            </li>
        </ul>
    </section>
`,
  components: {
    bookPreview,
  },

  data() {
    return {};
  },
  methods: {
    remove(bookId) {
      this.$emit("removed", bookId);
    },
    select(book) {
      this.$emit("selected", book);
    },
  },
  computed: {},
};
