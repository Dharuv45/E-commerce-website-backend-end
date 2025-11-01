import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },

    billing: {
      address: {
        type: String,
        required: [true, 'Billing address is required'],
        trim: true,
      },
      city: {
        type: String,
        required: [true, 'Billing city is required'],
        trim: true,
      },
      state: {
        type: String,
        required: [true, 'Billing state is required'],
        trim: true,
      },
    },

    shipping: {
      address: {
        type: String,
        required: [true, 'Shipping address is required'],
        trim: true,
      },
      city: {
        type: String,
        required: [true, 'Shipping city is required'],
        trim: true,
      },
      state: {
        type: String,
        required: [true, 'Shipping state is required'],
        trim: true,
      },
    },

    zip: {
      type: String,
      required: [true, 'Zip code is required'],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model('Address', addressSchema);

export default Address;
