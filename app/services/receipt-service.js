import { Item, Receipt } from "#fetch-challenge/app/models/index";
import { ItemService } from "#fetch-challenge/app/services/item-service";

class ReceiptService {
  static async createReceipt(receiptParams) {
    const receipt = await Receipt.create(receiptParams);
    const items = receiptParams?.items;

    if (items) {
      await ItemService.insertAll(items, receipt.id);
    }
    return receipt;
  }

  static async getAllReceipts() {
    const receipts = await Receipt.findAll({
      include: [{ model: Item, as: "items" }],
    });
    return receipts;
  }

  static async getPointsForReceipt(id) {
    const receipt = await Receipt.findByPk(id, {
      include: [{ model: Item, as: "items" }],
    });

    if (!receipt) {
      return null;
    }

    const items = receipt.items;
    if (!!items && items.length > 0) {
      return this.calculatePointsForItems(receipt);
    }

    return 0;
  }

  static async processReceipt(receiptParams) {
    const receipt = await ReceiptService.createReceipt(receiptParams);
    return receipt;
  }

  static calculatePointsForItems(receipt) {
    let totalPoints = 0;

    const pointsForDescription =
      receipt.retailer.replace(/[^a-zA-Z0-9]/g, "").length || 0;
    totalPoints += pointsForDescription;

    const receiptTotal = Number(receipt.total);

    const isRoundDollarTotal = Number.isSafeInteger(receiptTotal);
    totalPoints += isRoundDollarTotal ? 50 : 0;

    const isMultipleOfTwentyFiveCents =
      Number.isFinite(receiptTotal) &&
      Math.round(receiptTotal * 100) % 25 === 0;
    totalPoints += isMultipleOfTwentyFiveCents ? 25 : 0;

    const itemPairsCountPoints = Math.floor(receipt.items.length / 2) * 5;
    totalPoints += itemPairsCountPoints;

    const itemizedPoints = receipt.items.reduce((acc, curr) => {
      if (curr.shortDescription.trim().length % 3 === 0) {
        acc += Math.ceil(Number(curr.price) * 0.2);
      }
      return acc;
    }, 0);
    totalPoints += itemizedPoints;

    const [year, month, day] = receipt.purchaseDate.split("-").map(Number);
    const isPurchaseDateOdd = day % 2 !== 0;
    totalPoints += isPurchaseDateOdd ? 6 : 0;

    const [hours, mins] = receipt.purchaseTime.split(":").map(Number);

    const isBetweenTwoAndFourPM = hours <= 16 && hours >= 14;
    totalPoints += isBetweenTwoAndFourPM ? 10 : 0;

    return totalPoints;
  }
}

export { ReceiptService };
