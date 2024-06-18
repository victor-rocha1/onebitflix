import { Favorite } from "../models"

export const favoriteService = {
    findByUserId: async (userId: number) => {
        const favorites = await Favorite.findAll({
            attributes: [['user_id', 'userId']],
            where: { userId },
            include: {
                association: 'Course',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl']
                ]
            }
        })

        return {
            userId,
            courses: favorites.map(favorite => favorite.Course)
        }
    },
    create: async (userId: number, courseId: number) => {
        try {
            await Favorite.create({ userId, courseId })
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
}