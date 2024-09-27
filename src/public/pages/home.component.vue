<template>
  <div class="home-container">
    <section id="hero">
      <div class="hero-content">
        <h1>Optimiza el consumo de recursos de tu empresa</h1>
        <p>SmartFlow te ayuda a monitorear y reducir el consumo de energía, aumentando la eficiencia y reduciendo costos.</p>
        <a href="./caracteristicas" class="cta-button">Solicitar demo</a>
      </div>
      <div class="hero-image">
        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80" alt="Dashboard de SmartFlow">
      </div>
    </section>

    <section id="features">
      <h2>Características principales</h2>
      <div class="feature-grid">
        <div class="feature-card" v-for="feature in features" :key="feature.title">
          <img :src="feature.image" :alt="feature.title">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section id="benefits" class="benefits-container">
      <h2 class="title">Beneficios</h2>
      <div class="benefits-grid">
        <div class="benefit-item" v-for="(benefit, index) in benefits" :key="index">
          <img :src="benefit.image" :alt="benefit.alt">
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const features = [
  {
    title: "Monitoreo en tiempo real",
    description: "Observa el consumo de recursos de tus máquinas en tiempo real.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Análisis detallado",
    description: "Obtén informes detallados sobre el consumo y costos asociados.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Alertas inteligentes",
    description: "Recibe notificaciones cuando se detecten anomalías en el consumo.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
]

const benefits = [
  {
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Reduce costos",
    title: "Reduce costos operativos",
    description: "Optimiza el uso de recursos y reduce gastos innecesarios."
  },
  {
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    alt: "Mejora la eficiencia",
    title: "Mejora la eficiencia energética",
    description: "Identifica áreas de mejora y optimiza el consumo de energía."
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    alt: "Optimiza el rendimiento",
    title: "Optimiza el rendimiento de tus máquinas",
    description: "Mantén tus equipos funcionando en su punto óptimo."
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Toma decisiones informadas",
    title: "Toma decisiones basadas en datos reales",
    description: "Utiliza información precisa para mejorar tu negocio."
  }
]
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

#hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
}

.hero-content {
  flex: 1;
  padding-right: 2rem;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
}

.hero-image {
  flex: 1;
}

.hero-image img {
  width: 100%;
  border-radius: 8px;
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 2rem;
  background-color: #3f51b5;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.1rem;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #007acc;
}

#features, #benefits {
  text-align: center;
  margin-bottom: 4rem;
}

#features h2, #benefits h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.feature-grid, .benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card, .benefit-item {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover, .benefit-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.feature-card img, .benefit-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.feature-card h3, .benefit-item h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.feature-card p, .benefit-item p {
  color: #666;
  font-size: 1rem;
}

@media (max-width: 768px) {
  #hero {
    flex-direction: column;
  }

  .hero-content {
    padding-right: 0;
    margin-bottom: 2rem;
  }

  .feature-grid, .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>