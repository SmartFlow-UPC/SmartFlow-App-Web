<template>
  <pv-toast></pv-toast>
  <header>
    <pv-toolbar class="bg-primary" fixed>
      <template #start>
        <pv-button class="p-button-text text-white" icon="pi pi-bars" @click="toggleDrawer" />
        <h3>SmartFlow</h3>
        <div class="flex-column">
          <router-link v-for="item in items" :key="item.label" :to="item.to" custom>
            <pv-button class="p-button-text text-white">{{ item.label }}</pv-button>
          </router-link>
        </div>
      </template>
    </pv-toolbar>
  </header>

  <pv-sidebar v-model:visible="drawer" />

  <router-view />
</template>

<script>
export default {
  name: 'app',
  title: 'Smart Flow',
  data() {
    return {
      drawer: false,
      items: [
        { label: 'Home', to: '/home' },
        { label: 'Caracteristicas', to: '/caracteristicas' },
        { label: 'Beneficios', to: '/beneficios' },
        { label: 'Testimonios', to: '/testimonios' },
        { label: 'About', to: '/about' },
        { label: 'Registros', to: '/registros' },
        { label: 'Login', to: '/login' }
      ]
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  },
  watch: {
    drawer(newValue) {
      console.log('Drawer state changed:', newValue);
    }
  }
}
</script>


