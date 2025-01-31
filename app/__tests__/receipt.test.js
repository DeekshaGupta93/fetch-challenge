import request from "supertest";
import app from "../app.js";
import { Item, Receipt } from "../models/index.js";

describe("Receipt Processing API", () => {
  describe("/receipts/process", () => {
    it("should process a valid receipt", async () => {
      const validReceipt = {
        retailer: "some-random-retailer",
        purchaseDate: "2025-01-28",
        purchaseTime: "13:28",
        items: [
          {
            shortDescription: "Mountain Dew 12PK",
            price: "6.49",
          },
        ],
        total: "6.49",
      };

      const response = await request(app)
        .post("/receipts/process")
        .send(validReceipt);

      expect(response.status).toBe(200);

      const lastCreatedReceipt = await Receipt.findOne({
        order: [["createdAt", "DESC"]],
      });

      expect(response.body.id).toBe(lastCreatedReceipt.id);
    });

    it("raises an error on invalid request format", async () => {
      const invalidReceipt = {
        retailer: "some-random-retailer",
        items: [],
      };

      const response = await request(app)
        .post("/receipts/process")
        .send(invalidReceipt);

      expect(response.status).toBe(400);
    });

    it("persists records with valid data", async () => {
      const receipt = {
        retailer: "M&M Corner Market",
        purchaseDate: "2025-03-20",
        purchaseTime: "14:33",
        items: [
          {
            shortDescription: "Gatorade",
            price: "2.25",
          },
        ],
        total: "2.25",
      };

      const response = await request(app)
        .post("/receipts/process")
        .send(receipt);

      expect(response.status).toBe(200);

      const lastCreatedReceipt = await Receipt.findOne({
        order: [["createdAt", "DESC"]],
      });

      expect(response.body.id).toBe(lastCreatedReceipt.id);

      const lastCreatedItem = await Item.findOne({
        order: [["createdAt", "DESC"]],
      });

      expect(lastCreatedItem.shortDescription).toBe(
        receipt.items[0].shortDescription
      );
    });
  });

  describe("/receipts/{id}/points", () => {
    let receiptId;

    beforeEach(async () => {
      const receipt = {
        retailer: "some-random-retailer",
        purchaseDate: "2025-01-01",
        purchaseTime: "16:00",
        items: [
          {
            shortDescription: "Mountain Dew 12PK",
            price: "6.49",
          },
        ],
        total: "6.49",
      };

      const response = await request(app)
        .post("/receipts/process")
        .send(receipt);

      receiptId = response.body.id;
    });

    it("returns points for a valid receipt", async () => {
      const response = await request(app).get(`/receipts/${receiptId}/points`);

      expect(response.status).toBe(200);
      expect(response.body.points).toBe(34);
    });

    it("returns 404 for a non-existent receipt", async () => {
      const response = await request(app).get(
        "/receipts/some-random-receipt-id/points"
      );

      expect(response.status).toBe(404);
    });
  });
});
