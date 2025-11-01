import product from "../model/product-model.js"

export const createproduct = async (req, res) => {
  try {
    const { name, description, totalprice, discountedprice, quantity, category, specifications, additionalDetails } = req.body;

    const payload = {
      name,
      image: req.file?.path,
      description,
      totalprice,
      discountedprice,
      quantity,
      category,
      specifications,
      additionalDetails,
    };

    const newProduct = new product(payload);
    const savedProduct = await newProduct.save();

    return res.status(201).json(savedProduct);
  } catch (error) {
    console.log(`Error uploading image: ${error.message}`);
    return res.status(500).json({ error: "Failed to create product" });
  }
};



export const getallProduct = async (req, res) => {
  try {
    const limitValue = parseInt(req.query.limit) || 8;
    const offsetValue = parseInt(req.query.offset) || 0;

    const { minPrice, maxPrice, categoryId, title } = req.query;

    const filter = {}; 

   
    if (categoryId) {
      filter.category = categoryId; 
    }


    if (title) {
      filter.$or = [
        { name: { $regex: title, $options: "i" } },
        { description: { $regex: title, $options: "i" } },
      ];
    }

   
    let priceFilter = {}; 

    if (minPrice !== undefined && minPrice !== null && minPrice !== '') {
      priceFilter.$gte = Number(minPrice);
    }

    if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') {
      priceFilter.$lte = Number(maxPrice);
    }

 
    if (Object.keys(priceFilter).length > 0) {
      filter.totalprice = priceFilter; 
    }
   
    const totalProducts = await product.countDocuments(filter);

    const products = await product
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(limitValue)
      .skip(offsetValue);

    return res.status(200).json({
      data: products,
      message: "Products fetched successfully with filters",
      pagination: {
        limit: limitValue,
        offset: offsetValue,
        total: totalProducts,
      },
    });

  } catch (error) {
    console.error("Error in getallProduct:", error);
    res.status(500).json({ error: "Failed to fetch product", details: error.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await product.findById(id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const deleteproduct = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await product.findByIdAndDelete(id);
        if (!products) {
            return res.status(404).json({ message: "Product not found" });
        }
        else{
            return res.status(200).json({ message: "Product deleted successfully" });
        }
    } catch (error) {
      console.log(`Error deleting product: ${error.message}`);
        return res.status(500).json({message : "server error"});
    }
}


export const updateproduct = async (req, res)=> {
    try {
        const id = req.params.id;
        const products = await product.findByIdAndUpdate(id, req.body);
        if (!products) {
            return res.status(404).json({ message: "Product not found" });
        } else {
            return res.status(200).json(products)
        }
    } catch (error) {
      console.log(`Error udating product: ${error.message}`);
        return res.status(500).json({message: "server error"});
    }
}