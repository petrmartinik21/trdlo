<script setup>
import InputForm from './components/InputForm.vue';
import DisplayForm from './components/DisplayForm.vue';
import {ref, reactive} from 'vue'


const receivedData = ref([ ]);

function handleDataSubmitted(data) {
    receivedData.value.push(reactive(data));
    console.log(data); 
}

function saveChanges(index) {

}


const isFormValid = ref(false);
const updateFormValidity = (isValid) => {
    isFormValid.value = isValid;
 
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

  </header>

<InputForm @data-submitted="handleDataSubmitted" @formValidityChanged="updateFormValidity">
    <template v-slot:icon >
      <span v-if="!isFormValid.value" >✍️</span> <span v-else>👏</span>
      Save:
    </template>

    <template #fill-the-form><h2>Fill all the fields to submit the form: <strong>{{ isFormValid.value ? '✅' : '❌' }}</strong></h2></template>
    
</InputForm>

<display-form :data="receivedData" ></display-form>

</template>






<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
