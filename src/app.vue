<template>
  <pv-toast></pv-toast>

  <header v-if="!isLoginPage">
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
    </pv-toolbar>
  </header>

  <pv-sidebar v-if="!isLoginPage" v-model:visible="drawer" :modal="true" :dismissable="true" :showCloseIcon="true" class="p-sidebar-sm">
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
import {ref, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const drawer = ref(false)

const isLoginPage = ref(route.path === '/login')

watch(
    () => route.path,
    (newPath) => {
      isLoginPage.value = newPath === '/login'
    }
)

const navItems = [
  { label: 'Home', to: '/home' },
  { label: 'Contacto', to: '/contacto' },
  { label: 'Planes', to: '/planes' },
  { label: 'Testimonios', to: '/testimonios' },
  { label: 'About', to: '/about' },
  { label: 'Producción', to: '/produccion' },
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
  padding-top: 4rem;
  padding-left: 1rem;
}

@media (max-width: 768px) {
  .flex {
    display: none;
  }
}
</style>
