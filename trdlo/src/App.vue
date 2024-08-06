<script setup>
import InputForm from './components/InputForm.vue';
import DisplayForm from './components/DisplayForm.vue';
import {ref} from 'vue'

const displayFormRef = ref(null);
const receivedData = ref(null);

function handleDataSubmitted(data) {
    receivedData.value = data;
    // displayFormRef.value.handleDataSubmitted(data);
}

defineExpose({
    handleDataSubmitted
});



</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

  </header>

 <InputForm @data-submitted="handleDataSubmitted"></InputForm>
<display-form :data="receivedData" ref="displayForm"></display-form>

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
