<template>
  <div class="about-container">
    <h1 class="title">Sobre nosotros</h1>

    <div class="about-content">
      <p>
        En nuestro Startup, nos dedicamos a crear soluciones que permiten el control y monitoreo en tiempo real del consumo de recursos como luz y agua mediante nuestra aplicación SmartFlow.
        Nos enfocamos en ofrecer herramientas tecnológicas accesibles para que tanto empresas como individuos optimicen sus recursos, reduzcan costos y promuevan la sostenibilidad en sus actividades diarias.
      </p>
    </div>

    <div class="about-mission-vision">
      <div class="mission-card">
        <i class="fas fa-bullseye"></i>
        <h3>Misión</h3>
        <p>
          Brindar tecnologías avanzadas que permitan a empresas y personas monitorear y controlar sus recursos de manera eficiente, reduciendo costos y operando de forma sostenible.
        </p>
      </div>

      <div class="vision-card">
        <i class="fas fa-globe"></i>
        <h3>Visión</h3>
        <p>
          Ser la plataforma líder a nivel global en la optimización del consumo de recursos, impulsando una gestión eficiente y sostenible en todos los sectores.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  title: "About Us"
}
</script>

<style scoped>
.about-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
}

.about-content p {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.8;
  text-align: justify;
}

.about-mission-vision {
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.mission-card, .vision-card {
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
  width: 45%;
  margin: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.mission-card:hover, .vision-card:hover {
  transform: scale(1.05);
}

.mission-card i, .vision-card i {
  font-size: 2.5rem;
  color: #4caf50;
  margin-bottom: 1rem;
}

.mission-card h3, .vision-card h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
}

.mission-card p, .vision-card p {
  font-size: 1.1rem;
  color: #777;
}
</style>
