export default {
    template: `
    <section class="home-page">
        <h3>Welcome to miss books book shop!</h3>
        <h5>To browse, click <span>'go to book'</span> link below or <span>'books'</span> in the navigator above</h5>
        <router-link to="/books">go to book</router-link>
        <img src='./imgs/hp.gif'>
    </section>
`,
    data() {
        return {
            imgUrl:'.../imgs/hp.gif'
        };
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};
