<template>
  <div class="features-container">
    <h1 class="title">Características</h1>

    <div class="features-grid">
      <div class="feature-card">
        <i class="fas fa-clock"></i>
        <h3>Monitoreo en tiempo real</h3>
        <p>Observa el consumo de recursos de tus dispositivos y máquinas en tiempo real.</p>
      </div>

      <div class="feature-card">
        <i class="fas fa-chart-pie"></i>
        <h3>Análisis detallado</h3>
        <p>Obtén informes exhaustivos sobre el consumo y los costos asociados, ayudándote a optimizar el uso.</p>
      </div>

      <div class="feature-card">
        <i class="fas fa-bell"></i>
        <h3>Alertas inteligentes</h3>
        <p>Recibe notificaciones instantáneas cuando se detecten anomalías o picos en el consumo.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "caracteristicas",
  title: "Características"
}
</script>

<style scoped>
.features-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
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
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: scale(1.05);
}

.feature-card i {
  font-size: 3rem;
  color: #4caf50;
}

.feature-card h3 {
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.feature-card p {
  color: #777;
  margin-top: 0.5rem;
  font-size: 1.1rem;
}
</style>
