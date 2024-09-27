<template>
  <pv-toast></pv-toast>
  <header>
    <pv-toolbar class="bg-primary" fixed>
      <template #start>
        <pv-button class="p-button-text text-white" icon="pi pi-bars" @click="toggleDrawer" />
        <h3 class="ml-2">SmartFlow</h3>
      </template>
      <template #center>
        <div class="flex">
          <router-link v-for="item in navItems" :key="item.label" v-slot="{ navigate, href }" :to="item.to" custom>
            <pv-button :href="href" class="p-button-text text-white" @click="navigate">{{ item.label }}</pv-button>
          </router-link>
        </div>
      </template>
      <template #end>
        <router-link v-slot="{ navigate, href }" to="/login" custom>
          <pv-button :href="href" class="p-button-text text-white" @click="navigate">Login</pv-button>
        </router-link>
      </template>
    </pv-toolbar>
  </header>

  <pv-sidebar v-model:visible="drawer" :modal="true" :dismissable="true" :showCloseIcon="true" class="p-sidebar-sm">
    <template #header>
      <h2>Menu</h2>
    </template>
    <div class="sidebar-content">
      <pv-menu :model="menuItems" />
    </div>
  </pv-sidebar>

  <main class="main-content">
    <router-view/>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(false)

const navItems = [
  { label: 'Home', to: '/home' },
  { label: 'Contacto', to: '/contacto' },
  { label: 'Planes', to: '/planes' },
  { label: 'Testimonios', to: '/testimonios' },
  { label: 'About', to: '/about' },
  { label: 'Produccion', to: '/produccion' },
  { label: 'Registros', to: '/registros' },
  { label: 'Alarmas', to: '/alarmas' },
]

const menuItems = navItems.map(item => ({
  label: item.label,
  command: () => {
    router.push(item.to)
    drawer.value = false
  }
}))

menuItems.push({
  label: 'Login',
  command: () => {
    router.push('/login')
    drawer.value = false
  }
})

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.sidebar-content {
  padding: 1rem;
}

.main-content {
  padding-top: 4rem; /* Adjust based on your toolbar height */
}

@media (max-width: 768px) {
  .flex {
    display: none;
  }
}
</style>