const mongoose = require('mongoose');
const pessoaSchema = new mongoose.Schema({
    nome: String,
    tamanho: Number,
    cintura: Number,
    quadril: Number,
    sexo: String
});

module.exports = mongoose.model('Pessoa', pessoaSchema);