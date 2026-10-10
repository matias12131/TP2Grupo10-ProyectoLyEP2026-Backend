const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
    email: { type: String, required: true, trim: true, lowercase: true },
    username: { type: String, required: true, trim: true },
    password: { type: String },
    name: {
        firstname: { type: String, required: true, trim: true },
        lastname: { type: String, required: true, trim: true },
    },
    address: {
        street: { type: String, trim: true },
        number: { type: Number },
        zipcode: { type: String, trim: true },
        city: { type: String, trim: true },
    },
    phone: { type: String, trim: true },
});

// El frontend usa "id", no "_id": lo exponemos así en las respuestas JSON
clienteSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
    },
});

module.exports = mongoose.model("Cliente", clienteSchema);
