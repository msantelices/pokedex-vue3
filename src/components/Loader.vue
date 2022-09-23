<template>
    <div class="loader">
        <img src="../assets/pokeball.png" alt="">
    </div>
</template>

<style scoped>
.loader {
    background: var(--dark);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
}

.loader img {
    width: 75px;
    animation: rotate 2.5s linear infinite;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

</style>