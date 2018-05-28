<template>
    <div class="col">
        <tickets />
        <footer>
            <button @click="needABreak()">Pause</button>
            <button @click="next()">Nächste</button>
        </footer>

    </div>
</template>

<script>
    import tickets from '../components/tickets';
    import socket from '../socket/socket';

    export default {
        components: {
            tickets
        },
        methods: {
            next() {
                socket.emit('next');
            },

            needABreak() {
                socket.emit('needABreak');
            }
        }
    }
</script>

<style scoped>
    div.col {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    footer {
        display: flex;
    }

    footer button {
        display: flex;
        flex-grow: 1;
        justify-content: space-around;
        height: 30vmin;
    }
</style>
