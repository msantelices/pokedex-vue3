<template>
    <Modal v-model="isShow" :close="closeModal">
    <div class="modal">
        <button class="close-btn" @click="closeModal"><i class="fa-solid fa-xmark"></i></button>

        <div class="pkmn-info">
            <img :src="pkmn.sprite" :alt="pkmn.name">
            <h3>{{ formatNumber(pkmn.number) }} - {{ formatName(pkmn.name) }}</h3>
            <div class="types">
                <p 
                    v-for="pkmnType in data.types" 
                    :key="pkmnType.type.name"
                    :style="{background: typeColors[pkmnType.type.name]}">
                    {{ formatName(pkmnType.type.name) }}
                </p>
            </div>
        </div>

        <div class="pkmn-stats">
            <Chart v-if="render" :series="series"></Chart>
        </div>

        <div class="weight-height">
            <p>
                Peso: {{ data.weight }} Kg.
            </p>
            <p>
                Altura: {{ data.height }} m.
            </p>
        </div>

        <div class="abilities">
            <p>Habilidades</p>
            <div class="abilities-list">
                <p 
                    v-for="pkmnAbility in data.abilities" 
                    :key="pkmnAbility.ability.name">
                    {{ formatName(pkmnAbility.ability.name) }}
                </p>
            </div>
        </div>
    </div>
  </Modal>
</template> 

<script setup>
import { ref, watch, toRef, reactive } from 'vue'
import { formatNumber, formatName } from '../utils/utils.js'
import typeColors from '../utils/types.js'
import Chart from './Chart.vue'
const props = defineProps({
    show: Boolean,
    pkmn: Object
})

const show = toRef(props, 'show')
const isShow = ref(false)
const render = ref(false)
let data = reactive({
    abilities: [],
    types: [],
    weight: 0,
    height: 0
})

const series = [{
    name: 'Stats',
    data: [],
}]


watch(show, (curr, prev)=> {
    if(curr) {
        isShow.value = true
        getData()
    }
})

const closeModal = ()=> isShow.value = false

const getStats = (data)=> {
    series[0].data = data.map((stat)=> stat.base_stat)
    render.value = true
}

const getData = ()=> {
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.pkmn.name}`)
        .then((response)=> response.json())
        .then((json)=> {
            // data = json
            console.log(json)
            getStats(json.stats)
            data.types = json.types
            data.abilities = json.abilities
            data.weight = json.weight / 10
            data.height = json.height / 10
        })
        .catch(e => console.log(e))
}
</script>

<style scoped>
.modal {
    width: 80%;
    max-width: 700px;
    padding: 2rem;
    background-color: var(--dark);
    box-shadow: var(--shadow);
    font-size: 20px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.close-btn {
    background: var(--primary);
    color: var(--text);
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -10px;
    right: -10px;
}

.pkmn-info,
.pkmn-stats {
    text-align: center;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.pkmn-info {
    margin-bottom: 2.5rem;
}

.pkmn-info img {
    width: 150px;
}

.types {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
}

.types p {
    margin: 0 0.5rem;
    font-size: 16px;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-weight: 700;
    width: 95px;
}

.weight-height {
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: center;
    align-items: center;
}

.weight-height p {
    font-size: 15px;
}

.weight-height p:nth-child(1) {
    margin-bottom: 1rem;
}

.abilities {
    width: 50%;
    text-align: center;
}

.abilities-list {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
}

.abilities-list p {
    font-size: 16px;
    margin: 0 0.5rem;
}

@media (max-width: 700px) {
    .modal {
        flex-direction: column;
        align-items: center;
    }

    .pkmn-info {
        width: 100%;
        order: 1
    }

    .weight-height {
        width: 100%;
        order: 2;
    }

    .abilities {
        width: 100%;
        order: 3;
        margin: 3rem 0 1rem 0;
    }

    .pkmn-stats {
        width: 100%;
        order: 4
    }

    .abilities-list {
        flex-direction: column;
    }

    .abilities-list p {
        margin-bottom: 0.5rem;
    }
}
</style>