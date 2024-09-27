/**
 * Vue Router
 * @description: Vue Router configuration
 * @docs: https://router.vuejs.org/
 */

import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import AboutComponent from "../public/pages/about.component.vue";
// TutorialManagementComponent from "../learning/pages/tutorial-management.component.vue";
import CaracteristicasComponent from "../public/pages/caracteristicas.component.vue";
import BeneficiosComponent from "../public/pages/beneficios.component.vue";
import TestimoniosComponent from "../public/pages/testimonios.component.vue";
import RegistroManagementComponent from "../registros/pages/registro-management.component.vue";
import ProduccionComponent from "../Produccion/pages/ProduccionMonitoreo.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', component: HomeComponent, meta: { title: 'Home' } },
        // { path: '/tutorials', component: TutorialManagementComponent, meta: { title: 'Tutorials' } },
        { path: '/registros', component: RegistroManagementComponent, meta: { title: 'Registros' } },
        { path: '/caracteristicas', component: CaracteristicasComponent, meta: { title: 'Caracteristicas' } },
        { path: '/beneficios', component: BeneficiosComponent, meta: { title: 'Beneficios' } },
        { path: '/testimonios', component: TestimoniosComponent, meta: { title: 'Testimonios' } },
        { path: '/about', component: AboutComponent, meta: { title: 'About Us' } },
        { path: '/Produccion', component: ProduccionComponent , meta: { title: 'Monitoreo' } },
        { path: '/', redirect: '/home' },
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
