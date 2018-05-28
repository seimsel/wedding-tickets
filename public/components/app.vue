<template>
     <router-view></router-view>
</template>

<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router';

    import guests from '../routes/guests';
    import printer from '../routes/printer';
    import newlyweds from '../routes/newlyweds';

    Vue.use(VueRouter);

    const router = new VueRouter({
        routes: [
            { path: '/', component: guests },
            { path: '/printer', component: printer },
            { path: '/newlyweds', component: newlyweds }
        ]
    });

    export default {
        router
    }
</script>
