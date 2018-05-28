<template>
    <button @click="print()">Bitte hier tippen um ein Ticket zu drucken</button>
</template>

<script>
    import tickets from '../components/tickets';
    import socket from '../socket/socket';

    export default {
        components: {
            tickets
        },
        methods: {
            print() {
                socket.emit('print');
            }
        }
    }
</script>

<style scoped>
    button {
        width: 100%;
        font-size: 10vmin;
    }
</style>
