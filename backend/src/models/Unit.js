import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true
    },
    type: String,  // Could be "single room", "double room", "suite" for hotels or table types for restaurants
    capacity: Number,
    price: Number,
    availability: [{
        date: {
            type: Date,
            required: true
        },
        isAvailable: {
            type: Boolean,
            default: true  // Correct placement of default
        }
    }]
}, { timestamps: true });

export default mongoose.model('Unit', unitSchema);
