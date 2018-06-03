<template>
    <div class="col">
        <tickets />
        <footer>
            <div class="button" @click="needABreak()">Pause</div>
            <div class="button" @click="next()">Nächste</div>
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

    footer .button {
        color: black;
        background-color: white;
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
        height: 30vmin;
        border: black 1px solid;
    }
</style>
