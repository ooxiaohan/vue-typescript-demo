import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Login from '../views/Login.vue';
import Vue404 from '../views/common/Error404.vue';
import Monitor from '../views/Monitor.vue';

const fullRouter = {
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => {
                return Home;
            },
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/monitor',
            name: 'monitor',
            component: Monitor,
        },
        {
            path: '*',
            name: '404',
            component: Vue404,
            // meta: {
            //     errormassage: '404',
            // },
        },
    ],
};

export default {
    fullRouter,
};
