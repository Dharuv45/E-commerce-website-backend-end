import productReviewModel from "../model/product-reviews-model.js";

export const createReview = async (req, res) => {
  try {
    const { productId, user, review, rating } = req.body;

    if (!productId || !user || !rating) {
      return res
        .status(400)
        .json({ message: "productId, user, and rating are required." });
    }

    const newReview = new productReviewModel({
      productId,
      user,
      review,
      rating,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await productReviewModel.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "get error" });
  }
};

export const getProductReviews = async (req, res) => {
  const { productId } = req.query;
  try {
    if(productId) {
      const reviews = await productReviewModel.find({ productId });
      return res.status(200).json(reviews);
    } else {  
      return res.status(400).json({ message: "Product ID is required" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to get reviews" });
  }
};

export const getoneReviers = async (req, res) => {
  try {
    const id = req.params.id;
    const reviews = await productReviewModel.findById(id);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

export const updatereviews = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id; 
    const review = await productReviewModel.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to update this review" });
    }
    review.review = req.body.review;
    review.rating = req.body.rating;
    const updatedReview = await review.save();

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Update review error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deletereviews = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const reviews = await productReviewModel.findByIdAndDelete(id);
    if (!reviews) {
      return res.status(400).json({ message: "reviews not found" });
    } if (reviews.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }
    else {
      res.status(200).json({ message: "reviews deleted successfully" });
    }
  } catch (error) {
    console.log(`Error deleting product: ${error.message}`);
    res.status(500).json({ message: "error" });
  }
};
