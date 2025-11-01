import Product from "../model/product-model.js";


export const fetch = async (req, res) => {
  try {
  res.status(200).json({message: "product controller is working fine"});
  } catch (error){
    res.status(500).json({error: "product controller is not working"});
  }
}


export const randomproduct = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) return res.status(404).json({ error: "No products in database" });

    const randomProducts = await Product.aggregate([{ $sample: { size: 5 } }]);
    res.status(200).json(randomProducts);
  } catch (err) {
    console.error("Error getting random product:", err);
    res.status(500).json({ error: "Failed to get random product" });
  }
};
 



