<script setup>
import InputForm from './components/InputForm.vue';
import DisplayForm from './components/DisplayForm.vue';
import { ref, onMounted } from 'vue'
import { supabase } from './components/lib/supabaseClient'


const receivedData = ref([ ]);

// This function is called when the form is submitted or onMounted
// ****************************************************************
async function fetchData() {
  try {
    const { data, error } = await supabase
      .from('trdlotwo') 
      .select('*'); 

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      receivedData.value = data; 
    }
  } catch (error) {
    console.error('Error during Supabase operation:', error);
  }
}

onMounted(() => {
  fetchData(); 
});
// ***********************************************************

// This function insert and return data from supabase
// ************************************************************
async function handleDataSubmitted(data) {
    try {
      const { data: insertedData, error } = await supabase
      .from('trdlotwo')
      .insert(data) 
      .select()
      
    if (error) {
        console.error('Error inserting data:', error);
    } else {
      receivedData.value.push(...insertedData);
    }
  } catch (error) {
    console.error('Error during Supabase operation:', error);
  }
}
// ************************************************************
    

// This function check if all required data are inserted
// ************************************************************
const isFormValid = ref(false);
const updateFormValidity = (isValid) => {
    isFormValid.value = isValid;
}
// ************************************************************

//  text

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
