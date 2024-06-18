import { authController } from './controllers/authController'
import { categoriesController } from './controllers/categoriesController'
import { coursesController } from './controllers/courseControllers'
import { episodesController } from './controllers/episodesController'
import { favoritesController } from './controllers/favoritesController'
import { likesController } from './controllers/likesController'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'
import express from 'express'

const router = express.Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)

router.get('/courses/featured', ensureAuth, coursesController.featured)
router.get('/courses/popular', ensureAuth, coursesController.popular)
router.get('/courses/search', ensureAuth, coursesController.search)
router.get('/courses/:id', ensureAuth, coursesController.show)

router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)

router.get('/favorites', ensureAuth, favoritesController.index)
router.post('/favorites', ensureAuth, favoritesController.save)
router.delete('/favorites', ensureAuth, favoritesController.delete)

router.post('/likes', ensureAuth, likesController.save)

export { router }