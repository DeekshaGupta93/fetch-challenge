import express from "express";
import { ItemService } from "#fetch-challenge/app/services/item-service";

const router = express.Router();
router.get("/", async (req, res) => {
  const receipts = await ItemService.getAllItems();
  res.status(200).json(receipts);
});

export default router;
