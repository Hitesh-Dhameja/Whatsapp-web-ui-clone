import mongoose from 'mongoose'

const wpcloneSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
})

export default mongoose.model('messagecontents', wpcloneSchema)