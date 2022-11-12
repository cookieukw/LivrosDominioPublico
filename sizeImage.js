//Código para mostrar o tamanho de itens da pasta images
const path = "./images"
const fs = require("fs")

console.log(fs.readdirSync(path).length)