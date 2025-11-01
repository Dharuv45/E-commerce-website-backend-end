import Category from "../model/category-model.js";
import slugify from "slugify";

export const addcategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const payload = {
      name,
      slug: slugify(name, { lower: true }),
      image: req.file.path,
    };

    const newCategory = new Category(payload);
    const savedCategory = await newCategory.save();

    res.status(200).json(savedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add category" });
  }
};
export const getallCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const getoneCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({error: "failed to fetch categories"})
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findByIdAndDelete(id);
        res.status(200).json({ message: "Category deleted successfully" })
        } catch (error) {
        res.status(500).json({error : "Failed to delete category" })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findByIdAndUpdate(id, req.body);
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({error : "Failed to update category" })
    }
}