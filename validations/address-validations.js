import { body, validationResult } from "express-validator";

export const validateAddress = [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("state").notEmpty().withMessage("State is required"),
    body("zip")
        .notEmpty()
        .withMessage("Zip Code is required")
        .isLength({ min: 5 })
        .withMessage("Zip Code must be at least 5 characters long"),

    (req, res, next) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }   
]