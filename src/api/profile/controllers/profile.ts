import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::profile.profile', ({ strapi }) => ({
    async img(ctx) {
        var blackList = ['password', 'resetPasswordToken', 'confirmationToken'];
        var id = ctx.params.id;
        var user = await strapi
            .query('plugin::users-permissions.user')
            .findOne({
                where: { documentId: id },
                populate: {
                    profile: {
                        populate: {
                            img: true,
                        },
                    },
                },
            });

        if (!user) {
            return ctx.notFound("User not found");
        }
        if (user.profile) {
            user.profile = user.profile.img.url;
        }else{
            user.profile = "";
        }
        blackList.forEach((key) => {
            delete user[key];
        });
        return {
            data: user,
        };
    },

    async me(ctx) {
        var blackList = ['password', 'resetPasswordToken', 'confirmationToken','role'];
        var user = ctx.state.user;

        // 查找当前用户的 profile 和 img 信息
        const populatedUser = await strapi
            .query('plugin::users-permissions.user')
            .findOne({
                where: { id: user.id },
                populate: {
                    profile: {
                        populate: {
                            img: true,
                        },
                    },
                },
            });

        if (populatedUser && populatedUser.profile) {
            populatedUser.profile = populatedUser.profile.img.url;
        }else{
            populatedUser.profile = "";
        }

        blackList.forEach((key) => {
            delete populatedUser[key];
        });

        return {
            data: populatedUser,
        };
    },
}));