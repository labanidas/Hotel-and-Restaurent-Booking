import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
    },
    bookingDates: {
        start: Date,
        end: Date
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
        default: 'Pending'
    },
    paymentDetails: {
        method: String,
        amountPaid: { type: Number, default: 0 },
        rzp_payment_id: {type: String, default: ""},
        status: { type: String, default: 'Pending' }
    }
}, { timestamps: true });


export default mongoose.model('Booking', bookingSchema);