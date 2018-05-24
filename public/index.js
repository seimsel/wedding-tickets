window.onload = () => {
    const socket = io.connect('http://localhost:9000')

    const store = new Vuex.Store({
        state: {
            waitingNumbers: []
        },
        mutations: {
            waitingNumbersChanged(state, payload) {
                state.waitingNumbers = payload;
            },
        }
    });

    socket.on('waitingNumbersChanged', (payload) => {
        store.commit('waitingNumbersChanged', payload);
    });

    const newlywedsRoute = {
        template: '<div><button @click="needABreak()">Pause</button><button @click="next()">Nächste</button></div>',
        methods: {
            next() {
                socket.emit('next');
            },

            needABreak() {
                socket.emit('needABreak');
            }
        }
    }

    const app = new Vue({
        el: '#app',
        computed: {
            waitingNumbers() {
                return store.state.waitingNumbers.slice(2, store.state.waitingNumbers.length);
            },

            nextNumber() {
                return store.state.waitingNumbers[1];
            },

            currentNumber() {
                return store.state.waitingNumbers[0];
            }
        },
        router: new VueRouter({
            routes: [
                { path: '/newlyweds', component: newlywedsRoute }
            ]
        }),
    });
};