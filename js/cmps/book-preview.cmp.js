
export default {
    props: ["book"],
    template: `
    <img :src="book.thumbnail">
    <p>Title: {{book.title}}</p>
    <p>price: {{book.listPrice.amount}}{{currency}}</p>
  `,
    data() {
      return {
       currency: this.getIcon(),
      }
    },
    methods: {
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

        this.currency = currencySymbols[this.book.listPrice.currencyCode]
        return this.currency
      }
    },
    computed: {
    },
  };
  