import { Course } from '../database/Course'
import { Category } from './Category'
import { Episode } from './Episode'
import { User } from './User'

Category.hasMany(Course, { as: 'courses' })

Course.belongsTo(Category)
Course.hasMany(Episode, { as: 'episodes' }) //Episode

Episode.belongsTo(Course)

export {
  Course,
  Category,
  Episode,
  User
}