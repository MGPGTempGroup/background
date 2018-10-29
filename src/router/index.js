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
      title: 'customerMGT',
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
    path: '/content-management',
    component: Layout,
    redirect: '/content-management/index',
    alwaysShow: true,
    meta: {
      title: 'contentMGT',
      icon: 'content_mgt',
      roles: ['admin']
    },
    children: [
      {
        path: 'landlord-support',
        component: () => import('@/views/contentManagement/landlordSupport'),
        name: 'landlordSupport',
        meta: {
          title: 'landlordSupport',
          roles: ['admin']
        }
      },
      {
        path: 'prospective-tenants',
        component: () => import('@/views/contentManagement/prospectiveTenants'),
        name: 'prospectiveTenants',
        meta: {
          title: 'prospectiveTenants',
          roles: ['admin']
        }
      },
      {
        path: 'current-tenants',
        component: () => import('@/views/contentManagement/currentTenants'),
        name: 'currentTenants',
        meta: {
          title: 'currentTenants',
          roles: ['admin']
        }
      },
      {
        path: 'areas-we-serve',
        component: () => import('@/views/contentManagement/areasWeServe'),
        name: 'areasWeServe',
        meta: {
          title: 'areasWeServe',
          roles: ['admin']
        }
      },
      {
        path: 'project-marketing',
        component: () => import('@/views/contentManagement/projectMarketing'),
        name: 'projectMarketing',
        meta: {
          title: 'projectMarketing',
          roles: ['admin']
        }
      },
      {
        path: 'project-leasing',
        component: () => import('@/views/contentManagement/projectLeasing'),
        name: 'projectLeasing',
        meta: {
          title: 'projectLeasing',
          roles: ['admin']
        }
      },
      {
        path: 'commercial',
        component: () => import('@/views/contentManagement/commercial'),
        name: 'commercial',
        meta: {
          title: 'commercial',
          roles: ['admin']
        }
      },
      {
        path: 'sell',
        component: () => import('@/views/contentManagement/sell'),
        name: 'sell',
        meta: {
          title: 'sell',
          roles: ['admin']
        }
      },
      {
        path: '/careers',
        component: () => import('@/views/contentManagement/careers'),
        name: 'careers',
        meta: {
          title: 'careers',
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
      title: 'companyInfoMGT',
      icon: 'company',
      roles: ['admin']
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
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
        name: 'industryUpdates',
        meta: {
          title: 'articleList',
          roles: ['admin'] // or you can only set roles in sub nav
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
      title: 'housingMGT',
      icon: 'rental_housing',
      roles: ['admin']
    },
    children: [
      {
        path: 'lease',
        component: () => import('@/views/housing/lease'),
        name: 'house-lease',
        meta: {
          title: 'lease',
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
  { path: '*', redirect: '/404', hidden: true }
]
