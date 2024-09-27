<template>
  <div class="login-container">
    <h2>{{ isRegistering ? 'Registrar Usuario' : 'Iniciar Sesión' }}</h2>
    <form @submit.prevent="isRegistering ? handleRegister() : handleLogin()">
      <div class="form-group">
        <label for="username">Nombre de Usuario:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group" v-if="isRegistering">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">{{ isRegistering ? 'Registrar' : 'Iniciar Sesión' }}</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p @click="toggleRegister" class="toggle-register">{{ isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate aquí' }}</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: '',
      isRegistering: false,
      users: [] // Array para almacenar usuarios registrados
    };
  },
  methods: {
    handleLogin() {
      const userExists = this.users.find(user => user.username === this.username && user.password === this.password);
      if (userExists) {
        alert('Inicio de sesión exitoso!');
      } else {
        this.errorMessage = 'Nombre de usuario o contraseña incorrectos.';
      }
    },
    handleRegister() {
      if (this.username && this.email && this.password) {
        const userExists = this.users.find(user => user.username === this.username);
        if (userExists) {
          this.errorMessage = 'El nombre de usuario ya está registrado.';
        } else {
          this.users.push({ username: this.username, email: this.email, password: this.password });
          alert('Registro exitoso!');
          this.toggleRegister(); // Cambiar a modo de inicio de sesión
        }
      } else {
        this.errorMessage = 'Por favor, completa todos los campos.';
      }
    },
    toggleRegister() {
      this.isRegistering = !this.isRegistering;
      this.errorMessage = ''; // Limpia el mensaje de error al cambiar
      // Limpiar los campos al cambiar
      this.username = '';
      this.email = '';
      this.password = '';
    },
  },
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.error {
  color: red;
}

.toggle-register {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;
}
</style>
