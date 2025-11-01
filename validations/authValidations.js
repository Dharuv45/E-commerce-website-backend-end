import { body, validationResult } from "express-validator";

export const validateSignup = [
  body("firstname").notEmpty().withMessage("first name is required"),
  body("lastname").notEmpty().withMessage("last name is required"),
  body("email").isEmail().withMessage("Please enter a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  
  body("phonenumber").notEmpty().withMessage("Phone Number is required"),  
  body("phonenumber").isLength({ min: 10 }).withMessage("Phone Number mustbe at least 10 characters"),

  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
