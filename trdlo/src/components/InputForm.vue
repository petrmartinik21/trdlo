<template>
  
<form @submit.prevent="formSubmit" id="form">
    <header>{{ formTitle }}</header>
    <div><slot name="fill-the-form"></slot></div>
    
    <div>
    <label for="name" id="name-label" >Insert your name: <br> </label>
    <input type="text" v-model="name" id="name" placeholder="Name"> <br>
    </div>

    <div>
    <label for="station" id="station-label" >Insert Station/Machine: <br> </label>
    <input type="text" v-model="station" id="station" placeholder="Station"> <br>
    </div>

    <div>
    <label for="description" id="description-label" >Insert your description: <br></label>
    <textarea type="text" v-model="description" id="description" placeholder="Description"></textarea><br>
    </div>

    <div>
    <label for="solution" id="solution-label" >Insert your solution: <br></label>
    <textarea type="text" v-model="solution" id="solution" placeholder="Solution"></textarea>
    </div>
   

   
      
    <button type="submit" id="submit-button" :disabled="!isValid" >
        <slot name="icon" ></slot>
    </button>
   



</form> 
    
    
</template>

<script setup>
import {ref, computed} from 'vue'
const emit = defineEmits(['dataSubmitted','formValidityChanged']);


const formTitle = ref('Data Analysis')
const name = ref('');
const station = ref('');
const description = ref('');
const solution = ref('');

const isValid = computed(() => {
    return name.value.trim() !== '' && 
    station.value.trim() !== '' &&
    description.value.trim() !== '' &&
    solution.value.trim() !== '';
    
});

emit('formValidityChanged', isValid);

function formSubmit() {
emit('dataSubmitted', {
    name: name.value,
    station: station.value,
    description: description.value,
    solution: solution.value
});

name.value = '';
station.value = '';
description.value = '';
solution.value = '';
}



</script>

<style lang="scss" scoped>

</style>