const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class CategoryService {
  constructor() {}
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }
  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }
  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    try {
      await category.update(changes);
      return category;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}
module.exports = CategoryService;
