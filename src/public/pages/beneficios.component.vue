<template>
  <section id="subscriptions" class="subscriptions-container">
    <h2 class="title">Planes de Suscripción</h2>
    <div class="subscription-grid">
      <div v-for="plan in subscriptionPlans" :key="plan.name" :class="['subscription-card', { featured: plan.featured }]">
        <h3>{{ plan.name }}</h3>
        <p class="price">{{ plan.price }}</p>
        <ul>
          <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
        </ul>
        <a :href="plan.ctaLink" class="cta-button">{{ plan.ctaText }}</a>
      </div>
    </div>
  </section>
</template>

<script setup>
const subscriptionPlans = [
  {
    name: "Plan Básico",
    price: "$99/mes",
    features: [
      "Monitoreo de hasta 5 dispositivos",
      "Informes mensuales",
      "Soporte por correo electrónico"
    ],
    ctaLink: "#",
    ctaText: "Elegir Plan",
    featured: false
  },
  {
    name: "Plan Pro",
    price: "$199/mes",
    features: [
      "Monitoreo de hasta 20 dispositivos",
      "Informes semanales",
      "Soporte prioritario 24/7",
      "Análisis predictivo"
    ],
    ctaLink: "#",
    ctaText: "Elegir Plan",
    featured: true
  },
  {
    name: "Plan Empresarial",
    price: "Personalizado",
    features: [
      "Monitoreo ilimitado de dispositivos",
      "Informes personalizados",
      "Soporte dedicado",
      "Integración con sistemas existentes"
    ],
    ctaLink: "#",
    ctaText: "Contactar",
    featured: false
  }
]
</script>

<style scoped>
.subscriptions-container {
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

.subscription-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.subscription-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.subscription-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.subscription-card.featured {
  background-color: #e6f7ff;
  border: 2px solid #3f51b5;
}

.subscription-card h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
}

.price {
  font-size: 2rem;
  color: #3f51b5;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
  flex-grow: 1;
}

li {
  margin-bottom: 0.5rem;
  color: #555;
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
  align-self: center;
}

.cta-button:hover {
  background-color: #007acc;
}

@media (max-width: 768px) {
  .subscription-grid {
    grid-template-columns: 1fr;
  }
}
</style>