import {factories} from '@strapi/strapi';

// export default factories.createCoreController('api::information.information');

export default factories.createCoreController('api::information.information', ({strapi}) => ({
    async find(ctx) {
        ctx.query={
            ...ctx.query,
            fields: ['id', 'title','introduction'],
            populate:{
                poster:{
                    fields:['url']
                },
                author:{
                    fields:['username']
                }
            },
            sort: [{id: 'desc'}],
        }
        return await super.find(ctx);

    },
    async findOne(ctx) {
        ctx.query={
            ...ctx.query,
            populate:{
                poster:{
                    fields:['url']
                },
                video:{
                    fields:['url']
                },
                author:{
                    fields:['username']
                }
            },
        }
        return await super.findOne(ctx);

    },
}));