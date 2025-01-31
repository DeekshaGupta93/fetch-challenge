import express from "express";
import { ReceiptService } from "#fetch-challenge/app/services/receipt-service";
import { receiptSchemaValidatorMiddleware } from "#fetch-challenge/app/middlewares/schema-validators";
import {
  BadRequestError,
  NotFoundError,
} from "#fetch-challenge/app/models/api-errors";

const router = express.Router();
router.get("/", async (req, res) => {
  const receipts = await ReceiptService.getAllReceipts();
  return res.status(200).json(receipts);
});

router.post(
  "/process",
  receiptSchemaValidatorMiddleware,
  async (req, res, next) => {
    let receipt;
    try {
      receipt = await ReceiptService.processReceipt(req.body);
      return res.status(200).json({ id: receipt.id });
    } catch (err) {
      return next(new BadRequestError());
    }
  }
);

router.get("/:id/points", async (req, res, next) => {
  if (!req.params.id) {
    return next(new BadRequestError());
  }

  const totalPointsForReceipt = await ReceiptService.getPointsForReceipt(
    req.params.id
  );

  if (totalPointsForReceipt === null || totalPointsForReceipt === undefined) {
    return next(new NotFoundError());
  } else {
    return res.status(200).json({ points: totalPointsForReceipt });
  }
});

export default router;
