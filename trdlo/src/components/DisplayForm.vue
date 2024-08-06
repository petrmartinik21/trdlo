<template>
    <div v-if="data">

        <p>Name: {{ data.name }}</p>
        <p>Station: {{ data.station }}</p>
        <p>Description: {{ data.description }}</p>
        <p>Solution: {{ data.solution }}</p>
    </div>
    
        <p v-else>No data submitted yet.</p>
  
</template>

<script setup>
import { ref } from 'vue'   

const props = defineProps({
    data: {
        type: Object,
        default: null
    
    }
});

</script>

<style lang="scss" scoped>

</style>