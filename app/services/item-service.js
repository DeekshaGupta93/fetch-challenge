import { Item } from "#fetch-challenge/app/models/index";

class ItemService {
  static async getAllItems() {
    return Item.findAll();
  }

  static async getItemById(id) {
    return Item.findByPk(id);
  }

  static async insertAll(items, receiptId) {
    const itemsWithReceiptId = items.map((item) => ({
      ...item,
      receiptId,
    }));
    return Item.bulkCreate(itemsWithReceiptId);
  }
}

export { ItemService };
