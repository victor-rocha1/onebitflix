import { authController } from './controllers/authController'
import { categoriesController } from './controllers/categoriesController'
import { coursesController } from './controllers/courseControllers'
import { episodesController } from './controllers/episodesController'
import { favoritesController } from './controllers/favoritesController'
import { likesController } from './controllers/likesController'
import { usersController } from './controllers/userController'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'
import express from 'express'

const router = express.Router()

//Login e Registro
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

//Categoria de Cursos
router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)


//Filtro de cursos
router.get('/courses/featured', ensureAuth, coursesController.featured)
router.get('/courses/popular', ensureAuth, coursesController.popular)
router.get('/courses/search', ensureAuth, coursesController.search)
router.get('/courses/:id', ensureAuth, coursesController.show)


//Episódios dos Cursos
router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)
router.get('/episodes/:id/watchTime', ensureAuth, episodesController.getWatchTime)
router.post('/episodes/:id/watchTime', ensureAuth, episodesController.setWatchTime)


//Favoritos
router.get('/favorites', ensureAuth, favoritesController.index)
router.post('/favorites', ensureAuth, favoritesController.save)
router.delete('/favorites', ensureAuth, favoritesController.delete)


//Likes
router.post('/likes', ensureAuth, likesController.save)


//Assistidos
router.get('/users/current/watching', ensureAuth, usersController.watching)

export { router }