import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'lista', component: () => import('@/views/ClienteListaView.vue'), meta: { title: 'Clientes' } },
    { path: '/cliente/novo', name: 'cliente-novo', component: () => import('@/views/ClienteFormView.vue'), meta: { title: 'Novo Cliente' } },
    { path: '/cliente/:id', name: 'cliente-editar', component: () => import('@/views/ClienteFormView.vue'), meta: { title: 'Editar Cliente' }, props: true },
    { path: '/consulta-final-placa', name: 'consulta-final-placa', component: () => import('@/views/ConsultaFinalPlacaView.vue'), meta: { title: 'Consulta por Final da Placa' } },
  ],
})

router.afterEach((to) => {
  const title = (to.meta.title as string) || 'Sistema de Clientes e Placas'
  document.title = `${title} | Sistema de Clientes e Placas`
})

export default router
