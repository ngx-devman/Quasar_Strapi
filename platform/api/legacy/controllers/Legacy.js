"use strict";

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
  importLegacy: async ctx => {
    if(ctx.request.body.authKey !== "platform-legacy") {
      return {
        success: false,
        message: "AuthKey required!"
      }
    } 

    
    if (
      !ctx.request.body.settings ||
      !ctx.request.body.settings.distributionId
      ) {
        let coverUrl = ctx.request.body.settings.mainImageUrl || "";
        let mediaSourceLocation = ctx.request.body.settings.mediaSourceLocation;
        let facebookVideoId = ctx.request.body.settings.facebookVideoId;
        let youTubeVideoId = ctx.request.body.settings.youTubeVideoId;
        let vimeoVideoId = ctx.request.body.settings.vimeoVideoId;
        
        const media =
        mediaSourceLocation ||
        facebookVideoId ||
        youTubeVideoId ||
        vimeoVideoId;
        
        const distribution = {
          ...ctx.request.body,
          name: ctx.request.body.settings.title,
          cover: coverUrl,
          type: ctx.request.body.settings.type,
          media,
          creator: ctx.request.body.settings.publisher
        };
        let entity = await strapi.query("distribution").create(distribution);
        return {
          success: true,
          data: entity
        };
      } else {
        const result = await strapi.query("distribution").findOne({
          id: ctx.request.body.settings.distributionId
        });
        
        if (result) {
          const title = ctx.request.body.settings.title;
          let coverUrl = ctx.request.body.settings.mainImageUrl || "";
          
          let mediaSourceLocation = ctx.request.body.settings.mediaSourceLocation;
          let facebookVideoId = ctx.request.body.settings.facebookVideoId;
          let youTubeVideoId = ctx.request.body.settings.youTubeVideoId;
          let vimeoVideoId = ctx.request.body.settings.vimeoVideoId;
          
          const media =
          mediaSourceLocation ||
          facebookVideoId ||
          youTubeVideoId ||
          vimeoVideoId;
          
          const updateDistributionon = await strapi.query("distribution").update(
            { id: ctx.request.body.settings.distributionId },
            {
              name: title,
              cover: coverUrl,
              type: ctx.request.body.settings.type,
              media,
              creator: ctx.request.body.settings.publisher,
              settings: ctx.request.body.settings,
              data: ctx.request.body.data
            }
            );
            return {
              success: true,
              data: updateDistributionon
            };
          }
        }
      }
};