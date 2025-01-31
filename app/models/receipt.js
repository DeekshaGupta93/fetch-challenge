import { sequelize } from "#fetch-challenge/config/db-config";
import { DataTypes } from "sequelize";
import { Item } from "#fetch-challenge/app/models/item";

const ReceiptModel = sequelize.define("receipts", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  retailer: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[\w\s\-&]+$/,
    },
  },
  purchaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  purchaseTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  total: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^\d+\.\d{2}$/,
    },
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export { ReceiptModel };
