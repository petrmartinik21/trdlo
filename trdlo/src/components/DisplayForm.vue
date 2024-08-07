<template>
    <div v-if="data">
    <div v-for="(item, index) in data" :key="index">
        <p >Name: {{ item.name }}</p>
        <p >Station: {{ item.station }}</p>
        <p>Description: {{ item.description }}</p>
        <p>Solution: {{ item.solution }}</p>
    </div>
    </div>
        <p v-else>No data submitted yet.</p>
  
</template>

<script setup>
import { ref } from 'vue'   

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    
    }
});

</script>

<style lang="scss" scoped>

</style>