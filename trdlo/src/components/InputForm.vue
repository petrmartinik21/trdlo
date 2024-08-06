<template>
  
<form @submit.prevent="formSubmit" id="form">
    <header>{{ formTitle }}</header>
   
    <div>
    <label for="name" id="name-label" >Insert your name: <br> </label>
    <input type="text" v-model="name" id="name" placeholder="Name"> <br>
    </div>

    <div>
    <label for="description" id="description-label" >Insert your description: <br></label>
    <textarea type="text" v-model="description" id="description" placeholder="Description"></textarea><br>
    </div>

    <div>
    <label for="solution" id="solution-label" >Insert your solution: <br></label>
    <textarea type="text" v-model="solution" id="solution" placeholder="Solution"></textarea>
    </div>
    <Button type="submit" id="submit-button" >Submit</Button>
</form> 
    
    
</template>

<script setup>
import {ref} from 'vue'
const emit = defineEmits(['dataSubmitted']);

const formTitle = ref('Data Analysis')
const name = ref('');
const description = ref('');
const solution = ref('');

function formSubmit() {
emit('dataSubmitted', {
    name: name.value,
    description: description.value,
    solution: solution.value
});

name.value = '';
description.value = '';
solution.value = '';
}

</script>

<style lang="scss" scoped>

</style>