import { ReceiptService } from "../services/receipt-service";

describe("receipt-service", () => {
  describe("calculatePointsForItems", () => {
    it("should process a valid receipt", () => {
      const receipt = {
        retailer: "Target",
        purchaseDate: "2022-01-02",
        purchaseTime: "13:13",
        total: "1.25",
        items: [{ shortDescription: "Pepsi - 12-oz", price: "1.25" }],
      };

      const points = ReceiptService.calculatePointsForItems(receipt);
      expect(points).toBe(31);
    });

    it("should calculate points for a valid receipt", () => {
      const receipt = {
        retailer: "Walgreens",
        purchaseDate: "2022-01-02",
        purchaseTime: "08:13",
        total: "2.65",
        items: [
          { shortDescription: "Pepsi - 12-oz", price: "1.25" },
          { shortDescription: "Dasani", price: "1.40" },
        ],
      };

      const points = ReceiptService.calculatePointsForItems(receipt);
      expect(points).toBe(15);
    });
  });
});
