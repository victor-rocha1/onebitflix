import { Course } from '../database/Course'
import { Category } from './Category'
import { Episode } from './Episode'
import { User } from './User'
Category.hasMany(Course)

Course.belongsTo(Category)
Course.hasMany(Episode)

Episode.belongsTo(Course)

export {
  Course,
  Category,
  Episode,
  User
}