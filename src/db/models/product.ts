import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize';

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public description!: string;
  public stock_quantity!: number;
  public category!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Product.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Product;