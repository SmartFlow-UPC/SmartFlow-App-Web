<template>
  <div class="benefits-container">
    <h1 class="title">Beneficios</h1>

    <div class="benefits-grid">
      <div class="benefit-card">
        <i class="fas fa-dollar-sign"></i>
        <h3>Reduce costos operativos</h3>
        <p>Optimiza el uso de recursos y reduce gastos innecesarios, ayudando a que tu negocio sea más rentable.</p>
      </div>

      <div class="benefit-card">
        <i class="fas fa-leaf"></i>
        <h3>Mejora la eficiencia energética</h3>
        <p>Identifica áreas de mejora para reducir el consumo de energía y aumentar la sostenibilidad.</p>
      </div>

      <div class="benefit-card">
        <i class="fas fa-cogs"></i>
        <h3>Optimiza el rendimiento de tus máquinas</h3>
        <p>Mantén tus equipos funcionando en su punto óptimo para evitar tiempos de inactividad y fallas.</p>
      </div>

      <div class="benefit-card">
        <i class="fas fa-chart-bar"></i>
        <h3>Toma decisiones basadas en datos reales</h3>
        <p>Utiliza información precisa para optimizar procesos y mejorar la gestión de tu negocio.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "beneficios",
  title: "Beneficios"
}
</script>

<style scoped>
.benefits-container {
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

.benefits-grid {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.benefit-card {
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  width: 300px;
  margin: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.benefit-card:hover {
  transform: scale(1.05);
}

.benefit-card i {
  font-size: 3rem;
  color: #4caf50;
}

.benefit-card h3 {
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.benefit-card p {
  color: #777;
  margin-top: 0.5rem;
  font-size: 1.1rem;
}
</style>
