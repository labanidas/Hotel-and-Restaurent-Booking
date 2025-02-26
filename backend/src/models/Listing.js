import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    vendor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    type: { 
        type: String, 
        enum: ['Hotel', 'Restaurant'], 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true }
    },
    description: String,
    facilities: [String],
    pricing: Number,  // This might be a base price or an average
    images: [String],
}, { timestamps: true });

export default mongoose.model('Listing', listingSchema);