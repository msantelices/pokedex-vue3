<template>
    <Header @search="searchPkmn" @reset="resetList"></Header>
    <main>
        <Loader v-if="loading"></Loader>
        <section class="gallery">
            <Carousel 
                v-if="render" 
                :itemsToShow="1" 
                :breakpoints="breakpoints" 
                :wrapAround="true"
            >
                <Slide v-for="pkmn in pokemonList" :key="pkmn.number">
                    <Card class="carousel__item" :pokemon="pkmn"></Card>
                </Slide>

                <template #addons>
                    <Navigation />
                </template>
            </Carousel>   
        </section>
    </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import Header from './components/Header.vue'
import Card from './components/Card.vue'
import Loader from './components/Loader.vue'

import data from './data/data.json'

const render = ref(true)
const loading = ref(true)
const pokemonList = ref([])

const breakpoints = {
    750: {
        itemsToShow: 3,
    },
    1024: {
        itemsToShow: 4,
    }
}

const resetList = ()=> {
    render.value = false
    loading.value = true

    pokemonList.value = data

    setTimeout(()=> {
        render.value = true
    }, 100)

    setTimeout(()=> {
        loading.value = false
    }, 1000)
}

const searchPkmn = (e)=> {
    render.value = false
    loading.value = true

    const filtered = data.filter((pkmn)=> pkmn.name.toLowerCase().includes(e.toLowerCase()))
    
    if(filtered.length > 0) {
        pokemonList.value = filtered
    }

    setTimeout(()=> {
        render.value = true
    }, 100)

    setTimeout(()=> {
        loading.value = false
    }, 1000)
}


onMounted(() => {
    pokemonList.value = data
    setTimeout(()=> {
        loading.value = false
    }, 2000)
})
</script>

<style scoped>
main {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.gallery {
    width: 80%;
}

.carousel__slide > .carousel__item {
  transform: scale(1);
  transition: 0.25s;
}
.carousel__slide--visible > .carousel__item {
  opacity: 1;
  transform: rotateY(0);
}
.carousel__slide--next > .carousel__item {
  transform: translate(-10px);
  height: 275px;
}
.carousel__slide--prev > .carousel__item {
  transform: translate(10px);
  height: 275px;
}
.carousel__slide--active > .carousel__item {
  height: 375px
}

@media (max-width: 700px) {
    main {
        margin-top: 60px;
    }
}
</style>
