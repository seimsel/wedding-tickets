import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        waitingNumbers: [],
        hasMore: false
    },
    mutations: {
        waitingNumbersChanged(state, payload) {
            state.waitingNumbers = payload.waitingNumbers;
            state.hasMore = payload.hasMore;
        },
    }
});