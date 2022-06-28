export default {
  props: ["filters"],
  template: `
  <section class="book-filter">
    <label for="filter-ops">Choose a filter:</label>
    <select id="filter-ops" @change="setFilter($event)">
      <option value="title">Title</option>
      <option value="min">Min Price</option>
      <option value="max">Max Price</option>
      <option value="all">All</option>
    </select>

    <div v-show="filters[0]">
      <input id="book-title" type="text" v-model="filterBy.title" @input="filter">
      <label for="book-title">Title</label>
    </div>
    <div v-show="filters[1]">
      <input id="max" type="number" v-model="filterBy.maxPrice" min="0" step="1" @change="filter" />
      <label for="max">Max Price</label>
    </div>
    <div v-show="filters[2]">
      <input id="from-price" type="number" v-model="filterBy.minPrice" min="0" step="1" @change="filter"/>
      <label for="from-price">Min Price</label>
    </div>
  </section>
  `,

    data() {
      return {
        filterBy: {
          title: "",
          minPrice:0,
          maxPrice:0,
          selectOps:'title',
        },
      };
    },
    methods: {
      filter() {
        this.$emit("filtered", this.filterBy);
      },
      setFilter(e){
        this.selectOps = e.target.value
        if(this.selectOps==='title'){
          this.$emit("changed", 'title')
        }
        if(this.selectOps==='max'){
          this.$emit("changed", 'max')
        }
        if(this.selectOps==='min'){
          this.$emit("changed", 'min')
        }
        if(this.selectOps==='all'){
          this.$emit("changed", 'all')
        }
      }
    },
    computed: {},

  };
  