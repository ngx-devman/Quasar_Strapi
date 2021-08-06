module.exports = async (id, model, data, entity) => {
  const updatedByUser = data.updatedByUser || `admin_${data.updated_by}`;
  try {
    if (!entity) {
      entity = await strapi.query(model).findOne({ id });
    }
    await strapi.query("backup").create({
      resource: entity.name,
      resourceID: entity.id,
      data: entity,
      type: model,
      user: updatedByUser,
    });
  } catch (e) {
    console.log({
      error: e
    })
  }
};
