import Address from "../model/address-model.js";

export const fetch = async (req, res) => {
    try {
        const userId = req.userId;
        const address = await Address.find( { userId: userId } );
        res.status(200).json({message: "Address fetched successfully",data: address});
    } catch (error) {
        res.staus(500).json({error: "Failed to fetch ADDRESS"});
    }
} 





export const addAddress = async (req, res) => {
  try {
    const userId = req.userId;

    const {firstName,lastName,billing,shipping,zip} = req.body;
    const addressCount = await Address.countDocuments({ userId });

    const newAddress = new Address({
      userId,
      firstName,
      lastName,
      billing,
      shipping,
      zip,
      isDefault: addressCount === 0,
    });

    const savedAddress = await newAddress.save();
    res.status(200).json(savedAddress);
  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).json({ error: "Failed to add address" });
  }
};

export const updateDefaultAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addressID = req.params.id;
        await Address.updateMany(
            { userId: userId },
            { isDefault: false }
        );
        const updatedAddress = await Address.findByIdAndUpdate(
            {_id: addressID, userId: userId},
            {isDefault: true},
            {new: true}
        );
        res.status(200).json(updatedAddress);
    } catch (error) {
        console.log("Error updating default address:", error);
        res.status(500).json({erroe: "Failed to update default address"});
    }
}


export const updateAddress = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const updateData = req.body;

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: id },            
      updateData,             
      { new: true }           
    );

    if (!updatedAddress) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.status(200).json({
      message: "Address updated successfully",
      data: updatedAddress
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update address" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    const address = await Address.findOne({ _id: id, userId });

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    if (address.isDefault) {
      return res.status(400).json({ error: "Cannot delete default address. Please set another address as default first." });
    }
    await Address.deleteOne({ _id: id, userId });

    res.status(200).json({ message: "Address deleted successfully" });

  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ error: "Failed to delete address" });
  }
};
