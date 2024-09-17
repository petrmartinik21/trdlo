
<template>
    <form @submit.prevent="handleSubmit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      <div>
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text" required class="border-2 border-stone-700 bg-stone-500 hover:text-slate-700 hover:cursor-pointer hover:bg-stone-400 hover:border-stone-800 hover:border-double hover:borde-2 rounded-full px-4 m-2"/>
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required class="border-2 border-stone-700 bg-stone-500 hover:text-slate-700 hover:cursor-pointer hover:bg-stone-400 hover:border-stone-800 hover:border-double hover:borde-2 rounded-full px-4 m-2"/>
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required class="border-2 border-stone-700 bg-stone-500 hover:text-slate-700 hover:cursor-pointer hover:bg-stone-400 hover:border-stone-800 hover:border-double hover:borde-2 rounded-full px-4 m-2"/>
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" v-model="confirmPassword" type="password" required class="border-2 border-stone-700 bg-stone-500 hover:text-slate-700 hover:cursor-pointer hover:bg-stone-400 hover:border-stone-800 hover:border-double hover:borde-2 rounded-full px-4 m-2"/>
      </div>
      <button type="submit">Register</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const emit = defineEmits(['registration-submitted']) 

  const username = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  
  const handleSubmit = () => {
    if (password.value !== confirmPassword.value) {
      alert('Passwords do not match')
      return
    }
    
    // Here you would typically send the registration data to your backend
    emit('registration-submitted', {
      username: username.value,
      email: email.value,
      password: password.value
    })
    
    // Clear the form
    username.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
  }



  </script>
  
  <!-- <style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
    margin: 0 auto;
  }
  
  div {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 0.5rem;
  }
  
  input {
    padding: 0.5rem;
  }
  
  button {
    padding: 0.5rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style> -->








