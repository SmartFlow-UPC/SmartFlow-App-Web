/**
 * Vue Router
 * @description: Vue Router configuration
 * @docs: https://router.vuejs.org/
 */

import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import AboutComponent from "../public/pages/about.component.vue";
// TutorialManagementComponent from "../learning/pages/tutorial-management.component.vue";
import CaracteristicasComponent from "../public/pages/caracteristicas.component.vue";
import BeneficiosComponent from "../public/pages/beneficios.component.vue";
import TestimoniosComponent from "../public/pages/testimonios.component.vue";
import RegistroManagementComponent from "../registros/pages/registro-management.component.vue";
import HistorialAlarmas from "../alarmas/pages/HistorialAlarmas.component.vue";
import ProduccionMonitoreo from "../Produccion/pages/ProduccionMonitoreo.vue";
import Login from "../components/login.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home',    component: HomeComponent, meta: { title: 'Home' } },
        //{ path: '/tutorials', component: TutorialManagementComponent, meta: { title: 'Tutorials' } },
        { path: '/registros', component: RegistroManagementComponent, meta: { title: 'Registros' } },
        { path: '/alarmas', component: HistorialAlarmas, meta: { title: 'Alarmas' } },
        { path: '/login', component: Login, meta: { title: 'Login' } },
        { path: '/contacto', component: CaracteristicasComponent, meta: { title: 'Contactos' } },
        { path: '/planes', component: BeneficiosComponent, meta: { title: 'Planes' } },
        { path: '/testimonios', component: TestimoniosComponent, meta: { title: 'Testimonios' } },
        { path: '/produccion', component: ProduccionMonitoreo, meta: { title: 'Produccion' } },
        { path: '/about',   component: AboutComponent, meta: { title: 'About us' } },
        { path: '/',        redirect: '/home' },
    ],
});

/**
 * Set Business name as prefix for each page title
 */
router.beforeEach((to, from, next) => {
    let baseTitle = 'Smart Flow';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;

