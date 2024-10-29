/**
 * Vue Router
 * @description: Vue Router configuration
 * @docs: https://router.vuejs.org/
 */

import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import AboutComponent from "../public/pages/about.component.vue";
import CaracteristicasComponent from "../public/pages/caracteristicas.component.vue";
import BeneficiosComponent from "../public/pages/beneficios.component.vue";
import TestimoniosComponent from "../public/pages/testimonios.component.vue";
import RegistroManagementComponent from "../registros/pages/registro-management.component.vue";
import HistorialAlarmas from "../alarmas/pages/HistorialAlarmas.component.vue";
import ProduccionMonitoreo from "../Produccion/pages/ProduccionMonitoreo.vue";
import Login from "../access/components/Login.vue";
import ControlManagementComponent from "../control/pages/control-management.component.vue";
import ConsumosManagementComponent from "../consumos/pages/consumos-management.component.vue";

const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

const routes = [
    { path: '/login', name: 'Login', component: Login, meta: { title: 'Login' } },
    { path: '/home', name: 'Home', component: HomeComponent, meta: { requiresAuth: true } },
    { path: '/registros', component: RegistroManagementComponent, meta: { title: 'Registros', requiresAuth: true } },
    { path: '/control', component: ControlManagementComponent, meta: { title: 'Control', requiresAuth: true } },
    { path: '/consumos', component: ConsumosManagementComponent, meta: { title: 'Consumos', requiresAuth: true } },
    { path: '/alarmas', component: HistorialAlarmas, meta: { title: 'Alarmas', requiresAuth: true } },
    { path: '/contacto', component: CaracteristicasComponent, meta: { title: 'Contactos' } },
    { path: '/planes', component: BeneficiosComponent, meta: { title: 'Planes' } },
    { path: '/testimonios', component: TestimoniosComponent, meta: { title: 'Testimonios' } },
    { path: '/produccion', component: ProduccionMonitoreo, meta: { title: 'Producción', requiresAuth: true } },
    { path: '/about', component: AboutComponent, meta: { title: 'About us' } },
    { path: '/', redirect: '/login' }, // Redirigir a login como ruta inicial
    { path: '/:catchAll(.*)', redirect: '/login' }, // Redirige cualquier ruta no encontrada al login
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

/**
 * Middleware de Vue Router para verificar autenticación antes de cada ruta
 */
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')  // Redirige a login si no está autenticado
    } else {
        next()  // Permite continuar si todo está bien
    }
})

export default router;
