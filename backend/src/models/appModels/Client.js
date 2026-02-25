const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },

  name: {
    type: String,
    required: true,
  },
  phone: String,
  country: String,
  address: String,
  email: String,
    // ... (código que já estava em cima: phone, country, address)
  email: String,

  // 1. Novos Contatos (Múltiplos telefones com nomes)
  contacts: [
    {
      name: {
        type: String,
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },
    },
  ],

  // 2. Dados para Nota Fiscal
  invoiceDetails: {
    name: {
      type: String,
      trim: true,
    },
    cnpj: {
      type: String,
      trim: true,
    },
    cep: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },

  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
  // ... (resto do código que já estava em baixo: assigned, created, updated)
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
  assigned: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Client', schema);
