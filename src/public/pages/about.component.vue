<template>
  <div class="about-container">
    <h1 class="title">Sobre nosotros</h1>

    <div class="about-content">
      <div class="about-image">
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" alt="Equipo de SmartFlow" />
      </div>
      <div class="about-text">
        <p>
          En SmartFlow, nos dedicamos a crear soluciones que permiten el control y monitoreo en tiempo real del consumo de recursos como luz y agua. Nos enfocamos en ofrecer herramientas tecnológicas accesibles para que tanto empresas como individuos optimicen sus recursos, reduzcan costos y promuevan la sostenibilidad en sus actividades diarias.
        </p>
      </div>
    </div>

    <div class="about-mission-vision">
      <div class="mission-card">
        <div class="icon-wrapper">
          <TargetIcon class="icon" />
        </div>
        <h3>Misión</h3>
        <p>
          Brindar tecnologías avanzadas que permitan a empresas y personas monitorear y controlar sus recursos de manera eficiente, reduciendo costos y operando de forma sostenible.
        </p>
      </div>

      <div class="vision-card">
        <div class="icon-wrapper">
          <GlobeIcon class="icon" />
        </div>
        <h3>Visión</h3>
        <p>
          Ser la plataforma líder a nivel global en la optimización del consumo de recursos, impulsando una gestión eficiente y sostenible en todos los sectores.
        </p>
      </div>
    </div>

    <div class="values-section">
      <h2>Nuestros Valores</h2>
      <div class="values-grid">
        <div class="value-item" v-for="value in values" :key="value.title">
          <div class="icon-wrapper">
            <component :is="value.icon" class="icon" />
          </div>
          <h4>{{ value.title }}</h4>
          <p>{{ value.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TargetIcon, GlobeIcon, LeafIcon, LightbulbIcon, UsersIcon } from 'lucide-vue-next'

const values = [
  {
    title: "Innovación",
    description: "Buscamos constantemente nuevas formas de mejorar y optimizar el uso de recursos.",
    icon: LightbulbIcon
  },
  {
    title: "Sostenibilidad",
    description: "Nos comprometemos a promover prácticas sostenibles en todas nuestras operaciones.",
    icon: LeafIcon
  },
  {
    title: "Colaboración",
    description: "Trabajamos en estrecha colaboración con nuestros clientes y socios para lograr objetivos comunes.",
    icon: UsersIcon
  }
]
</script>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.title {
  font-size: 3rem;
  margin-bottom: 3rem;
  color: #333;
  text-align: center;
}

.about-content {
  display: flex;
  gap: 4rem;
  margin-bottom: 4rem;
  align-items: center;
}

.about-image {
  flex: 1;
}

.about-image img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.about-text {
  flex: 1;
}

.about-text p {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.8;
}

.about-mission-vision {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
  gap: 2rem;
}

.mission-card, .vision-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  flex: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mission-card:hover, .vision-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.icon-wrapper {
  background-color: #e6f7ff;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1rem;
}

.icon {
  width: 32px;
  height: 32px;
  color: #0099ff;
}

h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
}

.mission-card p, .vision-card p {
  font-size: 1.1rem;
  color: #555;
}

.values-section {
  text-align: center;
}

.values-section h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-item {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.value-item h4 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.value-item p {
  font-size: 1rem;
  color: #555;
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
  }

  .about-mission-vision {
    flex-direction: column;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>