import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: Number,
    comments: String,
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});


export default mongoose.model('Review', reviewSchema);