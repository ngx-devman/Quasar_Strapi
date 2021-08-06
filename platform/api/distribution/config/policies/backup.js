module.exports = async (ctx, next) => {
    if (ctx.state.user) {
        const distId = ctx.params.id || ctx.params.to
        if(!distId) return ctx.response.badRequest('Distribution ID is required.')
        const distribution = await strapi.query("distribution").findOne({ id: distId })
        if(!distribution) return ctx.response.badRequest('Distribution not found.')
        await strapi.query("backup").create({
            resource: distribution.name,
            resourceID: distribution.id,
            data: distribution,
            type: "distributions",
            user: ctx.state.user.id
        })
        return await next();
    }
    return ctx.response.unauthorized();
  };