import { ItemModel as Item } from "#fetch-challenge/app/models/item-model";
import { ReceiptModel as Receipt } from "#fetch-challenge/app/models/receipt-model";
import { sequelize } from "#fetch-challenge/config/db-config";

Receipt.hasMany(Item, { foreignKey: "receiptId" });
Item.belongsTo(Receipt, { foreignKey: "receiptId" });

await sequelize.sync();

export { Item, Receipt, sequelize };
