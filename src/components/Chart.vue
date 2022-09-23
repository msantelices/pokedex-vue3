<template>
    <apexchart type="radar" height="300" :options="chartOptions" :series="series"></apexchart>
</template>

<script setup>
defineProps({
    series: Array
})

const chartOptions = {
    chart: {
        height: 300,
        type: 'radar',
        background: '#1e1e1e',
        toolbar: {
            show: false
        }
    },
    theme: {
        mode: 'dark',
        palette: 'palette7'
    },
    yaxis: {
        show: false
    },
    xaxis: {
        categories: ['HP', 'ATK', 'DEF', 'SP. ATK', 'SP. DEF', 'SPD']
    }
}
</script>