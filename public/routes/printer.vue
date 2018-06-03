<template>
    <div class="button" @click="print()"><div>Bitte hier tippen um ein Ticket zu drucken</div></div>
</template>

<script>
    import socket from '../socket/socket';

    export default {
        methods: {
            print() {
                socket.emit('print');
            }
        }
    }
</script>

<style scoped>
    div.button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        text-align: center;
    }

    div.button div {
        font-size: 10vmin;
    }
</style>
