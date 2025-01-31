import yaml from "yaml";
import fs from "fs";
import path from "path";

const apiSpecPath = path.resolve(process.cwd(), "api.yml");
const getReceiptSchema = () => {
  const apiSpec = yaml.parse(fs.readFileSync(apiSpecPath, "utf8"));
  return apiSpec.components.schemas.Receipt;
};

const getItemSchema = () => {
  const apiSpec = yaml.parse(fs.readFileSync(apiSpecPath, "utf8"));
  return apiSpec.components.schemas.Item;
};

const validateSchema = (schema, body) => {
  const requiredAttributes = new Set(schema.required);
  const bodyFields = new Set(Object.keys(body));
  const hasAllRequiredAttributes = [...requiredAttributes].every((field) =>
    bodyFields.has(field)
  );

  if (!hasAllRequiredAttributes) {
    return false;
  }

  const isValid = Object.entries(body).every(([key, value]) => {
    const fieldSchema = schema.properties[key];

    if (!fieldSchema) {
      return false;
    }

    if (fieldSchema.type === "array") {
      if (!Array.isArray(value)) {
        return false;
      }
      if (fieldSchema.items) {
        return value.every((item) => validateSchema(getItemSchema(), item));
      }
      return true;
    } else if (fieldSchema.type === "object") {
      if (typeof value !== "object" || value === null) {
        return false;
      }
      return true;
    } else if (fieldSchema.type === "string") {
      return typeof value === "string";
    } else if (fieldSchema.type === "number") {
      return typeof value === "number";
    } else {
      return false;
    }
  });

  return isValid;
};

const receiptSchemaValidatorMiddleware = (req, res, next) => {
  const { body } = req;

  const receiptSchema = getReceiptSchema();

  const isValid = validateSchema(receiptSchema, body);

  if (!isValid) {
    return res.status(400).json({ error: "The receipt is invalid." });
  }

  next();
};

const itemSchemaValidatorMiddleware = (req, res, next) => {
  const { body } = req;

  const itemSchema = getItemSchema();

  const isValid = validateSchema(itemSchema, body);

  if (!isValid) {
    return res.status(400).json({ error: "The receipt is invalid." });
  }

  next();
};

export { receiptSchemaValidatorMiddleware, itemSchemaValidatorMiddleware };
