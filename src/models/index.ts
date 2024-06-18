import { Course } from '../database/Course'
import { Category } from './Category'
import { Episode } from './Episode'
import User from './User'
import { Favorite } from './Favorite'

Category.hasMany(Course)

Course.belongsTo(Category)  // Course pertence a uma Category
Course.hasMany(Episode)     // Course tem muitos Episodes
Course.belongsToMany(User, { through: Favorite })  // Course pertence a muitos Users através de Favorite
Course.hasMany(Favorite, { as: 'favoritesUsers', foreignKey: 'course_id' })  // Course tem muitos Favorites (com alias 'favoritesUsers' e chave estrangeira 'course_id')


Episode.belongsTo(Course)  // Episode pertence a um Course

Favorite.belongsTo(Course)  // Favorite pertence a um Course
Favorite.belongsTo(User)  // Favorite pertence a um User

User.belongsToMany(Course, { through: Favorite })  // User pertence a muitos Courses através de Favorite
User.hasMany(Favorite, { as: 'favoritesCourses', foreignKey: 'user_id' })  // User tem muitos Favorites (com alias 'favoritesCourses' e chave estrangeira 'user_id')


export {
  Category,
  Course,
  Episode,
  Favorite,
  User
}