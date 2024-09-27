<template>
  <section id="contact" class="contact-container">
    <h2>¿Listo para optimizar tus recursos?</h2>
    <p>Contáctanos hoy mismo para una demostración personalizada.</p>
    <form @submit.prevent="handleSubmit">
      <input
          type="text"
          v-model="form.name"
          placeholder="Nombre"
          required
      >
      <input
          type="email"
          v-model="form.email"
          placeholder="Correo electrónico"
          required
      >
      <input
          type="tel"
          v-model="form.phone"
          placeholder="Teléfono"
      >
      <textarea
          v-model="form.message"
          placeholder="Mensaje"
          required
      ></textarea>
      <button type="submit" class="cta-button">Enviar</button>
    </form>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Formulario enviado:', form)
  // Aquí iría la lógica para enviar el formulario
  alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.')
  // Resetear el formulario después del envío
  form.name = ''
  form.email = ''
  form.phone = ''
  form.message = ''
}
</script>

<style scoped>
.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
}

p {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #666;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
}

input, textarea {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  min-height: 150px;
  resize: vertical;
}

.cta-button {
  background-color: #3f51b5;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #007acc;
}

@media (max-width: 768px) {
  h2 {
    font-size: 2rem;
  }

  p {
    font-size: 1.2rem;
  }
}
</style>