<template>
  <div class="benefits-container">
    <h1 class="title">Testimonios</h1>

    <div class="benefits-grid">
      <div class="benefit-card">
        <i class="fas fa-dollar-sign"></i>
        <h3>María García</h3>
        <p>"SmartFlow ha revolucionado la forma en que gestionamos nuestros recursos. Hemos reducido nuestros costos energéticos en un 30% en solo seis meses."
          María García, Directora de Operaciones en TechInnovate</p>
      </div>

      <div class="benefit-card">
        <i class="fas fa-leaf"></i>
        <h3>Carlos Rodríguez</h3>
        <p>"La facilidad de uso y la precisión de los datos que proporciona SmartFlow nos han permitido optimizar nuestros procesos de manera significativa."
          Carlos Rodríguez, Gerente de Producción en EcoManufactura</p>
      </div>

      <div class="benefit-card">
        <i class="fas fa-cogs"></i>
        <h3>Ana Martínez</h3>
        <p>"Desde que implementamos SmartFlow, hemos logrado una reducción del 25% en nuestro consumo energético. Es una herramienta indispensable para cualquier empresa consciente del medio ambiente."
          Ana Martínez, CEO de GreenSolutions</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "testimonios",
  title: "Testimonios"
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