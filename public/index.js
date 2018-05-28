
import Vue from 'vue';

import store from './store/store';
import socket from './socket/socket';

import app from './components/app';

window.onload = () => {
    socket.on('waitingNumbersChanged', (payload) => {
        store.commit('waitingNumbersChanged', payload);
    });

    new Vue({
      el: '#app',
      render: h => h(app),
    });
};
