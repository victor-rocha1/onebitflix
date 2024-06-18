import { Favorite } from '../models/Favorite'; // Corrigido caminho do modelo

export const likeService = {
    create: async (userId: number, courseId: number) => {
        try {
            const favorite = await Favorite.create({ userId, courseId });
            return favorite;
        } catch (error) {
            throw new Error('Error creating favorite');
        }
    },

    delete: async (userId: number, courseId: number) => {
        try {
            const deleted = await Favorite.destroy({
                where: { userId, courseId },
            });
            return deleted;
        } catch (error) {
            throw new Error('Error deleting favorite');
        }
    },

    findByUserId: async (userId: number) => {
        try {
            const favorites = await Favorite.findAll({
                where: { userId },
                include: ['Course'], // Supondo que você configurou a relação corretamente
            });

            const courses = favorites.map((favorite) => favorite.Course);
            return { userId, courses };
        } catch (error) {
            throw new Error('Error finding favorites');
        }
    },

    isFavorited: async (userId: number, courseId: number) => {
        try {
            const favorite = await Favorite.findOne({
                where: { userId, courseId },
            });
            return !!favorite; // Retorna true se o favorito existe, false se não existe
        } catch (error) {
            throw new Error('Error checking if favorited');
        }
    },

    isLiked: async (userId: number, courseId: number) => {
        throw new Error('Method not implemented'); // Como o método isLiked não está definido aqui, foi removido para evitar inconsistências
    },
};
