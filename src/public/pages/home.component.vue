<template>
  <div class="home-container">
    <div class="intro-section">
      <h1>Bienvenido a SmartFlow</h1>
      <p class="intro-text">
        SmartFlow te ayuda a controlar el consumo de electricidad y agua desde una plataforma única. Monitorea en tiempo real y reduce el uso excesivo, mejorando la eficiencia y ahorrando en costos.
      </p>
    </div>

    <div class="features-section">
      <h2>Características Clave</h2>
      <div class="features-grid">
        <div class="feature-card">
          <i class="fas fa-bolt"></i>
          <h3>Monitoreo de Electricidad</h3>
          <p>Controla el uso eléctrico en tiempo real y recibe alertas cuando el consumo sea elevado.</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-tint"></i>
          <h3>Monitoreo de Agua</h3>
          <p>Supervisa el consumo de agua para evitar el desperdicio y promover la sostenibilidad.</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-chart-line"></i>
          <h3>Optimización de Recursos</h3>
          <p>Analiza tu consumo para encontrar oportunidades de ahorro energético y económico.</p>
        </div>
      </div>
    </div>

    <div class="cta-section">
      <h2>Comienza a ahorrar con SmartFlow</h2>
      <button class="cta-button">Descubre más</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  title: "Home"
}
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.intro-section {
  margin-bottom: 2rem;
}

.intro-text {
  font-size: 1.2rem;
  color: #555;
  margin: 0 auto;
  max-width: 800px;
}

.features-section {
  margin: 2rem 0;
}

.features-grid {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.feature-card {
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  width: 300px;
  margin: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  margin-top: 1rem;
  font-size: 1.3rem;
}

.feature-card p {
  color: #777;
}

.feature-card i {
  font-size: 2.5rem;
  color: #4caf50;
}

.cta-section {
  margin-top: 3rem;
}

.cta-button {
  padding: 0.8rem 2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #388e3c;
}
</style>
