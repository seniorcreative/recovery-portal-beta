import { createRouter, createWebHistory } from 'vue-router' 
import Dashboard from './components/Dashboard'
import HelpCentreDashboard from './components/HelpCentreDashboard'
import BasicPage from './components/BasicPage'
// import ProviderPage from './components/ProviderPage'
import RecoveryPage from './components/RecoveryPage'
import RecoveryGetTreatment from './components/recovery/RecoveryGetTreatment'
import RecoveryResources from './components/recovery/RecoveryResources'
import SearchPage from './components/search/SearchPage'
// import CalcPage from './components/calculators/payments.vue'
import HelpArticleFaqPage from './components/HelpArticleFaqPage'
import HelpArticleGeneralPage from './components/HelpArticleGeneralPage'
import axios from 'axios'
import store from './store/index'
 
let contentData

let routes =[
    {path:'/', name: 'home', component:Dashboard, meta: { requiredAuth: false, title: 'WorkSafe Recovery Centre' }, props: { pageName: 'home'}},
    {path:'/help', name: 'help', component:HelpCentreDashboard, meta: { requiredAuth: false, title: 'Help Centre' }, props: { pageName: 'help'}},
    // {path:'/provider', name: 'provider', component:ProviderPage, meta: { requiredAuth: false, title: 'Find a Provider' }, props: { pageName: 'provider'}},
    // {path:'/payments', name: 'Payments', component:CalcPage, meta: { requiredAuth: false, title: 'Calculate Payments' }, props: { pageName: 'provider'}},
    {path:'/recovery', name: 'recovery', component:RecoveryPage, meta: { requiredAuth: false, title: 'Manage my recovery' }, props: { pageName: 'recovery' }, children: [
      {
        path: 'get-treatment',
        component: RecoveryGetTreatment
      },
      {
        path: 'recovery-resources',
        component: RecoveryResources
      }
    ]
    },
    {path:'/privacy', name: 'privacy', component:BasicPage, meta: { requiredAuth: false, title: 'privacy' }, props: { pageName: 'privacy'}},
    {path:'/search', name: 'help-search', component:SearchPage, meta: { requiredAuth: false, title: 'Help Centre' }, props: { pageName: 'search'}},
    {path:'/general/:articleId', name: 'general', component:HelpArticleGeneralPage, meta: { requiredAuth: false, title: 'Help Centre' }},
    {
      path: "/:catchAll(.*)",
      component: Dashboard,
    }
  ]

async function getRoutes () {
  try {
    // Data needs to be retrieved in two parts - the content / navigation / data categories is from static JSON
    const axiosInstanceLocal = axios.create({
      baseURL: ''
    })
    const resp = await axiosInstanceLocal.get(`/data/content.en.json`)
    contentData = resp.data

    // Dynamically add the routes if they are not existing and pass through their pages content
    for (let c in contentData.dataCategories.Workers.Guided) {
      let parentRoute = c
      const routeName = parentRoute.split(' ').join('-').toLowerCase()
      let routePath = `/${routeName}/:opened`
      let route = { path: routePath, name: routeName, component: HelpArticleFaqPage , meta: { requiredAuth: false }, props: { categoryTitle: c }}
      routes.push(route)
    }

     // Then the knowledge comes from CMS articles
     const KNOWLEDGE_API = '/data/'
     const knowledge = await axios.get(KNOWLEDGE_API);
     //const axiosInstance = axios.create()
     //const knowledge = await axiosInstance.get(`/content`)
     contentData.knowledge = knowledge.data.data

     // Load and stash any stored personalisation before committing new content Store
     const contentGetter = store.getters['content/getContentData']()
     if (contentGetter && contentGetter.personalisation) {
       contentData.personalisation = contentGetter.personalisation
     }

    store.commit('content/setContentData', contentData )
    store.commit('feedback/setFeedbackData', JSON.parse(localStorage.getItem('feedbackData')) || {} )

    const routeConfig = createRouter({
      history: createWebHistory(),
      routes
    })

    routeConfig.beforeEach(async (to,from, next) => {
      var matomoSiteId = window.location.host.split('.')[0] === 'wsv-innovation-centre' ? '3' : '5'
      if (matomoSiteId !== '5') {
        window._paq.push(['setCustomUrl', '/' + to.fullPath])
        window._paq.push(['trackPageView'])
      }
      window.scrollTo(0,0)
      next()
    })
    
    window.dispatchEvent(new CustomEvent('routesReady', { detail: routeConfig}))

  } catch (error) {
    console.error(error)
  }
}

export default getRoutes
