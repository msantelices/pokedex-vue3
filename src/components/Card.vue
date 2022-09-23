<template>
    <div class="card" @click="showModal">
        <img :src="pokemon.sprite" :alt="pokemon.name">
        <h3>{{ formatNumber(pokemon.number) }} - {{ formatName(pokemon.name) }}</h3>
        <button class="show-btn">Ver</button>

        <Modal :show="show" :pkmn="pokemon"></Modal>
    </div>
</template>

<script setup>
import Modal from './Modal.vue'
import { formatNumber, formatName } from '../utils/utils.js'
import { ref } from 'vue'

defineProps({
    pokemon: Object
})

const show = ref(false)

const showModal = ()=> {
    show.value = true
    setTimeout(()=> show.value = false, 500)
}

</script>

<style scoped>
.card {
    background: var(--dark);
    border-radius: 5px;
    padding: 1rem;
    width: 90%;
    height: 325px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow);
}

img {
    width: 150px;
}

h3 {
    margin: 0;
}

.show-btn {
    background: var(--primary);
    color: var(--text);
    border: none;
    padding: 0.25rem 1rem;
    border-radius: 4px;
    margin-top: 2rem;
    cursor: pointer;
    box-shadow: var(--shadow);
}
</style>