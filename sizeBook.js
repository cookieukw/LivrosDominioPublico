//Código para mostrar o tamanho de itens da pasta books
const path = "./books"
const fs = require("fs")

console.log(fs.readdirSync(path).length)