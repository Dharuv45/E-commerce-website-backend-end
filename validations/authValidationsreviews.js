import { body, validationResult } from "express-validator";

export const validatereviews = [
  body("rating").notEmpty().withMessage("rating is required"),
  body("productId").isMongoId().withMessage("enter  valid product id")  
  .notEmpty().withMessage("product id is required"),

  

  
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];