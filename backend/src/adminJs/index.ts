import { dashboardOptions } from './dashboard'
import { brandingOptions } from './branding'
import { authtenticationOptions } from './authentication'
import { adminJsResources } from './resources'
import { database } from '../database'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import AdminJSSequelize from '@adminjs/sequelize'
import { locale } from './locale'

AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
    databases: [database],
    resources: adminJsResources,
    rootPath: '/admin',
    dashboard: dashboardOptions,
    locale: locale,
    branding: brandingOptions
})

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    authtenticationOptions,
    null,
    { resave: false, saveUninitialized: false }
)