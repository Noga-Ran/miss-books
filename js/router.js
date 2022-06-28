import homePage from './views/home-page.cmp.js';
import aboutPage from './views/about-page.cmp.js';
import bookApp from './views/book-app.cmp.js';
import bookDetails from "./views/book-details.cmp.js";

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/books',
        component: bookApp
    },
    {
        path: '/books/:bookId',
        component: bookDetails
    },
    // {
    //     path: '/book/edit/:carId?',
    //     component: bookEdit
    // },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})