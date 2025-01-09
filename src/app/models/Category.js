import { Model, Sequelize } from "sequelize";

class Category extends Model {
  static init(sequelize) {
    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    return this;
  }
}

export default Category;
