<template>
  <h1>
    Login Page
  </h1>
    <form
      @submit.prevent="signin"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      
      <div>
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          class="border-2 border-stone-700 bg-stone-500 hover:text-slate-700 hover:cursor-pointer hover:bg-stone-400 hover:border-stone-800 hover:border-double hover:borde-2 rounded-full px-4 m-2"
        />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          v-model="formData.password"
          type="password"
          required
          class="border-2 border-stone-700 bg-stone-500 hover:text-slate-700 hover:cursor-pointer hover:bg-stone-400 hover:border-stone-800 hover:border-double hover:borde-2 rounded-full px-4 m-2"
        />
      </div>
      
      <div class="w-24 border-2 border-stone-700 bg-stone-500 hover:text-slate-700 hover:cursor-pointer hover:bg-stone-400 hover:border-stone-800 hover:border-double hover:borde-2 rounded-full px-4 m-2">
      <button type="submit">Login</button>
  </div>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  // const emit = defineEmits(['registration-submitted'])
  import { supabase } from './lib/supabaseClient'
  
//   import router from '@/router';

  const formData = ref({
    email: '',
    password: ''    
  })
  
//   const router = useRouter()
  
  const signin = async () => {
    
  // Login user with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.value.email,
      password: formData.value.password
    })
   
    if (error) return console.log(error)
  
    console.log(data)
  
   
   
    const newFormData = { ...formData.value };
    newFormData.email = '';
    newFormData.password = '';
       
    formData.value = newFormData;

    // router.push('/')
  }
  </script>