<template>
  <section id="testimonials" class="testimonials-container">
    <h2 class="title">Lo que dicen nuestros clientes</h2>
    <div class="testimonial-grid">
      <div v-for="testimonial in testimonials" :key="testimonial.name" class="testimonial-card">
        <img :src="testimonial.image" :alt="'Foto de ' + testimonial.name" class="testimonial-image">
        <blockquote>{{ testimonial.quote }}</blockquote>
        <cite>{{ testimonial.name }}, {{ testimonial.position }}</cite>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: "María García",
    position: "Directora de Operaciones en TechInnovate",
    quote: "SmartFlow ha revolucionado la forma en que gestionamos nuestros recursos. Hemos reducido nuestros costos energéticos en un 30% en solo seis meses.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    name: "Carlos Rodríguez",
    position: "Gerente de Producción en EcoManufactura",
    quote: "La facilidad de uso y la precisión de los datos que proporciona SmartFlow nos han permitido optimizar nuestros procesos de manera significativa.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    name: "Ana Martínez",
    position: "CEO de GreenSolutions",
    quote: "Desde que implementamos SmartFlow, hemos logrado una reducción del 25% en nuestro consumo energético. Es una herramienta indispensable para cualquier empresa consciente del medio ambiente.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80"
  }
]
</script>

<style scoped>
.testimonials-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 3rem;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.testimonial-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

blockquote {
  font-style: italic;
  color: #555;
  margin: 1rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
}

cite {
  font-style: normal;
  color: #333;
  font-weight: bold;
  display: block;
  margin-top: 1rem;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .testimonial-grid {
    grid-template-columns: 1fr;
  }
}
</style>