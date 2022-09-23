<template>
    <header>
        <div class="logo">
            <img src="../assets/pokeball.png" alt="Pokeball">
            <h1>Pokedex</h1>
        </div>
        <div class="toggle" @click="toggleMenu">
            <i class="fa-solid fa-bars"></i>
        </div>
        <div class="search" :class="{show}">
            <span>Buscar</span>
            <div class="input-container">
                <input type="text" placeholder="Pokémon" v-model="search" @keydown.enter="searchPkmn">
                <i class="fa-solid fa-magnifying-glass" @click="searchPkmn"></i>
                <i class="fa-solid fa-arrows-rotate" @click="resetList"></i>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['search', 'reset'])

const search = ref("")
const show = ref(false)

watch(search, (curr, prev)=> {
    if(!curr) {
        resetList()
    }
})

const searchPkmn = ()=> {
    if(!search.value) return
    emit('search', search.value)
}

const resetList = ()=> {
    search.value = ""
    emit('reset')
}

const toggleMenu = ()=> show.value = !show.value

</script>

<style scoped>
header {
    background: var(--primary);
    color: var(--text);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 3rem;
    box-shadow: var(--shadow);
}

.logo {
    display: flex;
    align-items: center;
}

h1 {
    font-size: 1.5rem;
}

.logo img {
    width: 30px;
    margin-right: 0.5rem;
    transform: rotate(45deg)
}

.search {
    display: flex;
    align-items: center;
}

.search span {
    font-weight: 700;
    display: inline-block;
    margin-right: 0.5rem;
}

.search input {
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    border: 1px solid #6b6b6b;
    margin-right: 0.25rem;
}

.search input:active,
.search input:focus {
    outline: none;
}

.search i {
    font-size: 1.25rem;
    cursor: pointer;
}

.input-container {
    display: flex;
    align-items: center;
}

.search .fa-magnifying-glass {
    margin-right: 1rem;
}

.toggle {
    display: none;
}

@media (max-width: 700px) {
    header {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
    }

    .toggle {
        display: block;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .search {
        position: fixed;
        background: var(--dark);
        top: 62px;
        bottom: 0;
        z-index: 500;
        right: 0;
        width: 50%;
        display: flex;
        flex-direction: column;
        padding: 3rem;
        align-items: flex-start;
        transition: all 0.2s ease;
        transform: translateX(100%);
    }

    .search.show {
        transform: translateX(0);
    }

    .search span {
        margin-bottom: 1rem;
    }
}

@media (max-width: 600px) {
    .search {
        width: 70%;
    }
}

@media (max-width: 500px) {
    .search {
        width: 100%;
    }
}


</style>