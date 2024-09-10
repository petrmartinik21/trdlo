<script setup>
import InputForm from './components/InputForm.vue'
import DisplayForm from './components/DisplayForm.vue'
import { ref, onMounted } from 'vue'
import { supabase } from './components/lib/supabaseClient'

const receivedData = ref([])

// This function is called when the form is submitted or onMounted
// ****************************************************************
async function fetchData() {
  try {
    const { data, error } = await supabase.from('trdlotwo').select('*')
    console.log( data[2])
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
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <div class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Button
  </div>

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

  <display-form :data="receivedData" @delete-data="deleteData" @save-changes="updatedData">
  </display-form>
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
