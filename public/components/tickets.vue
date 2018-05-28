<template>
    <div class="content">
        <div class="waitingNumbers vcentered">
            <h2>Warten</h2>
            <ul class="hcentered">
                <li class="number" v-for="number in waitingNumbers" :key="number">{{ number }}</li>
                <li v-if="hasMore">vvv</li>
            </ul>
        </div>

        <div class="nextNumber vcentered">
            <h2>Bereitstellen</h2>
            <span class="hcentered">{{ nextNumber }}</span>
        </div>

        <div class="currentNumber vcentered">
            <h2>Gratulieren</h2>
            <span class="hcentered">{{ currentNumber }}</span>
        </div>
    </div>
</template>

<script>
    import store from '../store/store';

    export default {
        computed: {
            waitingNumbers() {
                return store.state.waitingNumbers.slice(2, store.state.waitingNumbers.length);
            },

            nextNumber() {
                return store.state.waitingNumbers[1];
            },

            currentNumber() {
                return store.state.waitingNumbers[0];
            },

            hasMore() {
                return store.state.hasMore;
            }
        }
    };
</script>

<style lang="css">
    h2 {
        font-size: 4vmin;
        font-weight: normal;
    }

    li, span {
        font-size: 5vmin;
    }

    div.content {
        display: flex;
        flex-grow: 1;
        justify-content: space-around;
    }

    .vcentered {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .hcentered {
        display: flex;
        flex-direction: column;
        margin: auto;
    }

    .waitingNumbers ul {
        padding: 0;
    }

    .waitingNumbers li {
        list-style-type: none;
    }

    .nextNumber span {
        font-size: 30vmin;
    }

    .currentNumber span {
        font-size: 15vmin;
    }
</style>
