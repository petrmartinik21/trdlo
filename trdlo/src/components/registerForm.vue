<template>
  <form
    @submit.prevent="signup"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    <div>
      <label for="username">Username:</label>
      <input
        id="username"
        v-model="formData.username"
        type="text"
        required
        class="border-2 border-stone-700 bg-stone-500 hover:text-slate-700 hover:cursor-pointer hover:bg-stone-400 hover:border-stone-800 hover:border-double hover:borde-2 rounded-full px-4 m-2"
      />
    </div>
    <div>
      <label for="firstName">Firstname:</label>
      <input
        id="firstName"
        v-model="formData.firstName"
        type="text"
        required
        class="border-2 border-stone-700 bg-stone-500 hover:text-slate-700 hover:cursor-pointer hover:bg-stone-400 hover:border-stone-800 hover:border-double hover:borde-2 rounded-full px-4 m-2"
      />
    </div>
    <div>
      <label for="lastName">Lastname:</label>
      <input
        id="lastName"
        v-model="formData.lastName"
        type="text"
        required
        class="border-2 border-stone-700 bg-stone-500 hover:text-slate-700 hover:cursor-pointer hover:bg-stone-400 hover:border-stone-800 hover:border-double hover:borde-2 rounded-full px-4 m-2"
      />
    </div>
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
    <div>
      <label for="confirmPassword">Confirm Password:</label>
      <input
        id="confirmPassword"
        v-model="formData.confirmPassword"
        type="password"
        required
        class="border-2 border-stone-700 bg-stone-500 hover:text-slate-700 hover:cursor-pointer hover:bg-stone-400 hover:border-stone-800 hover:border-double hover:borde-2 rounded-full px-4 m-2"
      />
    </div>
    <button type="submit">Register</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
// const emit = defineEmits(['registration-submitted'])
import { supabase } from './lib/supabaseClient'

const formData = ref({
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// const router = useRouter()

const signup = async () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert('Passwords do not match')
    return
  }

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password
  })



  if (error) return console.log(error)

  console.log(data.user)

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.value.username,
      full_name: formData.value.firstName.concat(
        +' ' + formData.value.lastName
      )
     
    })
    if (error) console.log('Profiles err: ', error)
  }
  // router.push('/')

  // Here you would typically send the registration data to your backend
  // emit('registration-submitted', {
  //   username: username.value,
  //   email: email.value,
  //   password: password.value
  // })
 // Clear the form
 formData.value = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

 
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
