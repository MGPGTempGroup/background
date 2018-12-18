import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/customer-management',
    component: Layout,
    redirect: '/customer-management/index',
    alwaysShow: true,
    meta: {
      title: 'customer',
      icon: 'user',
      roles: ['admin']
    },
    children: [
      {
        path: 'owners',
        component: () => import('@/views/customerManagement/propertyOwner'),
        name: 'propertyOwner',
        meta: {
          title: 'propertyOwner',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'user-comment',
        component: () => import('@/views/customerManagement/userComment'),
        name: 'userComment',
        meta: {
          title: 'userComment',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/housing-management',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'housingManagement',
    meta: {
      title: 'housing',
      icon: 'rental_housing',
      roles: ['admin']
    },
    children: [
      {
        path: 'rental-house',
        component: () => import('@/views/housing/rental'),
        name: 'rental-house',
        meta: {
          title: 'rental',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'sale-house',
        component: () => import('@/views/housing/sale'),
        name: 'sale-house',
        meta: {
          title: 'sale',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/projects',
    component: Layout,
    // redirect: 'noredirect',
    // alwaysShow: true,
    children: [
      {
        path: '',
        component: () => import('@/views/project'),
        name: 'projects',
        meta: {
          title: 'projects',
          icon: 'project'
        }
      }
    ]
  },
  {
    path: '/service-management',
    component: Layout,
    redirect: '/service-management/index',
    alwaysShow: true,
    meta: {
      title: 'service',
      icon: 'content_mgt',
      roles: ['admin']
    },
    children: [
      {
        path: 'content',
        component: () => import('@/views/serviceManagement/content'),
        name: 'contentManagement',
        meta: {
          title: 'contentManagement',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/company-info-management',
    component: Layout,
    redirect: '/company-info-management/index',
    alwaysShow: true,
    meta: {
      title: 'companyInfo',
      icon: 'company',
      roles: ['admin']
    },
    children: [
      {
        path: 'information',
        component: () => import('@/views/company/information'),
        name: 'information',
        meta: {
          title: 'information',
          roles: ['admin']
        }
      },
      {
        path: 'members',
        component: () => import('@/views/company/members/index'),
        name: 'members',
        meta: {
          title: 'members',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/industry-updates',
    component: Layout,
    redirect: '/industry-updates/article',
    alwaysShow: true,
    name: 'industryUpdates',
    meta: {
      title: 'industryUpdates',
      icon: 'up',
      roles: ['admin']
    },
    children: [
      {
        path: 'articles',
        component: () => import('@/views/industryUpdates'),
        name: 'articles',
        meta: {
          title: 'articleList',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
