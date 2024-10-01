<script setup>
import InputForm from './components/InputForm.vue'
import DisplayForm from './components/DisplayForm.vue'
import { ref, onMounted, computed } from 'vue'
import { supabase } from './components/lib/supabaseClient'
import registerForm from './components/registerForm.vue'
import loginForm from './components/loginForm.vue'



const selectedPriority = ref('');

const receivedData = ref([])

// This function is called when the form is submitted or onMounted
// ****************************************************************
async function fetchData() {
  try {
    const { data, error } = await supabase.from('trdlotwo').select('*')
    // console.log( data[2])
    if (error) {
      console.error('Error fetching data:', error)
    } else {
      receivedData.value = data
    }
  } catch (error) {
    console.error('Error during Supabase operation:', error)
  }
}

onMounted(() => {
  fetchData()
})
// ***********************************************************

// This function insert and return data from supabase
// ************************************************************
async function handleDataSubmitted(data) {
  try {
    const { data: insertedData, error } = await supabase.from('trdlotwo').insert(data).select()

    if (error) {
      console.error('Error inserting data:', error)
    } else {
      receivedData.value.push(...insertedData)
    }
  } catch (error) {
    console.error('Error during Supabase operation:', error)
  }
}
// ************************************************************

// This function check if all required data are inserted
// ************************************************************
const isFormValid = ref(false)
const updateFormValidity = (isValid) => {
  isFormValid.value = isValid
}
// ************************************************************

//  This function update the data in supabase
// ************************************************************
async function updatedData(update) {
  try {
    const { error } = await supabase
      .from('trdlotwo')
      .update({
        name: update.name,
        station: update.station,
        description: update.description,
        solution: update.solution,
        importance: update.importance,
        progress: update.progress
      })
      .eq('id', update.id)

    if (error) {
      console.error('Error updating data:', error)
      // this else update the data in the array receivedData
    } else {
      const itemIndex = receivedData.value.findIndex((item) => item.id === update.id)
      if (itemIndex !== -1) {
        receivedData.value[itemIndex] = update
      }
    }
  } catch (error) {
    console.error('Error during Supabase operation:', error)
  }
}
// **************************************************************

// This function delete data from supabase
// **************************************************************
async function deleteData(id) {
  try {
    const { error } = await supabase.from('trdlotwo').delete().eq('id', id)

    if (error) {
      console.error('Error deleting data:', error)
    } else {
      console.log(`Block id:${id} deleted successfully`)
      // this else delete the data in the array receivedData
      const index = receivedData.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        receivedData.value.splice(index, 1)
      }
    }
  } catch (error) {
    console.error('Error during Supabase operation:', error)
  }
}
// ****************************************************************
// Filtering for Display
const filteredData = computed(() => {
  if (selectedPriority.value === '') {
    return receivedData.value; // No filter, return all data
  } else if (selectedPriority.value === 'finished') {
    return receivedData.value.filter(item => item.progress === 4); // Filter by finished
  } else {
    return receivedData.value.filter(item => item.importance === selectedPriority.value); // Filter by importance
  }
});


// // Register
// const 
// console.log(Registration-submitted)
// const { data, error } = await supabase.auth.signUp({
//   username: 'example',
//   email: 'example@email.com',
//   password: 'example-password',
// })



// const register = async (formData) => {

//   console.log(formData)
      // // //   const { data, error } = await supabase.auth.signUp({
      // // //     username: formData.username,
      // // //     // email: formData.email,
      // // //     // password: formData.password,
      // // // })


// } 




</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>
  
  <registerForm ></registerForm>
  <loginForm></loginForm>
  <!-- Filter by priority -->
  
  <!-- <div class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Button
  </div> -->

  <InputForm @data-submitted="handleDataSubmitted" @formValidityChanged="updateFormValidity">
    <template v-slot:icon>
      <span v-if="!isFormValid.value">✍️</span> <span v-else>👏</span>
      Save:
    </template>

    <template #fill-the-form
      ><h2>
        Fill all the fields to submit the form:
        <strong>{{ isFormValid.value ? '✅' : '❌' }}</strong>
      </h2></template
    >
  </InputForm>

<!-- Display filtered Data -->
  <div>
    <label for="priorityFilter">Filter by Priority:</label>
    <select id="priorityFilter" v-model="selectedPriority">
      <option value="">All</option>
      <option value="high">High</option>
      <option value="middle">Middle</option>
      <option value="low">Low</option>
      <option value="finished">Finished</option> 
    </select>
  </div>

  <DisplayForm :data="filteredData" @delete-data="deleteData" @save-changes="updatedData" />
  <!-- <display-form :data="receivedData" @delete-data="deleteData" @save-changes="updatedData" /> -->
  
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
