<template>
  <div class="login-container">
    <pv-card class="login-card p-shadow-5">
      <template #title>
        <h2 class="p-text-center" style="text-align: center;">
          {{ isLoggedIn ? 'Bienvenido' : (isRegistering ? 'Registrar Usuario' : 'Iniciar Sesión') }}
        </h2>
      </template>
      <template #content>
        <div v-if="!isLoggedIn">
          <form @submit.prevent="isRegistering ? handleRegister() : handleLogin()" class="p-fluid">
            <div class="p-field p-mb-3">
              <pv-float-label>
                <pv-input-text id="username" v-model="username" required />
                <label for="username">Nombre de Usuario</label>
              </pv-float-label>
              <br><br>
            </div>
            <div v-if="isRegistering" class="p-field p-mb-3">
              <pv-float-label>
                <pv-input-text id="email" v-model="email" required type="email" />
                <label for="email">Email</label>
              </pv-float-label><br><br>

            </div>
            <div class="p-field p-mb-3">
              <pv-float-label>
                <pv-input-text id="password" v-model="password" required type="password" />
                <label for="password">Contraseña</label>
              </pv-float-label>
              <br><br>
            </div>
            <pv-button :label="isRegistering ? 'Registrar' : 'Iniciar Sesión'" type="submit" class="p-mt-3" />
          </form>
          <small v-if="errorMessage" class="p-error p-d-block p-mt-2">{{ errorMessage }}</small>
          <p @click="toggleRegister" class="p-text-center p-mt-3 p-clickable" style="text-align: center;">
            <br>
            {{ isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate aquí' }}
          </p>
        </div>
        <div v-else>
          <p class="p-text-center p-mb-3">Has iniciado sesión como {{ loggedInUser }}</p>
          <pv-button label="Cerrar Sesión" @click="handleLogout" class="p-button-danger p-mt-3" />
        </div>
      </template>
    </pv-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isRegistering = ref(false)
const users = ref([])
const isLoggedIn = ref(false)
const loggedInUser = ref('')

const handleLogin = () => {
  const userExists = users.value.find(user => user.username === username.value && user.password === password.value)
  if (userExists) {
    isLoggedIn.value = true
    loggedInUser.value = username.value
    clearForm()
  } else {
    errorMessage.value = 'Nombre de usuario o contraseña incorrectos.'
  }
}

const handleRegister = () => {
  if (username.value && email.value && password.value) {
    const userExists = users.value.find(user => user.username === username.value)
    if (userExists) {
      errorMessage.value = 'El nombre de usuario ya está registrado.'
    } else {
      users.value.push({ username: username.value, email: email.value, password: password.value })
      alert('Registro exitoso!')
      toggleRegister()
    }
  } else {
    errorMessage.value = 'Por favor, completa todos los campos.'
  }
}

const toggleRegister = () => {
  isRegistering.value = !isRegistering.value
  clearForm()
}

const handleLogout = () => {
  isLoggedIn.value = false
  loggedInUser.value = ''
  clearForm()
}

const clearForm = () => {
  username.value = ''
  email.value = ''
  password.value = ''
  errorMessage.value = ''
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--surface-ground);
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.p-clickable {
  cursor: pointer;
  color: var(--primary-color);
}

.p-clickable:hover {
  text-decoration: underline;
}
</style>