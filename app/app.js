import express from "express";
import { connectDB } from "#fetch-challenge/config/db-config";
import receiptsController from "#fetch-challenge/app/routes/receipts-controller";
import itemsController from "#fetch-challenge/app/routes/items-controller";
import { CustomError } from "#fetch-challenge/app/models/api-errors";
const app = express();

await connectDB();

// Middleware
app.use(express.json());

app.use("/receipts", receiptsController);
app.use("/items", itemsController);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.toJson());
  } else {
    return res.status(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
