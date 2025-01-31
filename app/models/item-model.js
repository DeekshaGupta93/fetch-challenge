import { sequelize } from "#fetch-challenge/config/db-config";
import { DataTypes } from "sequelize";

const ItemModel = sequelize.define("items", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  shortDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

export { ItemModel };
