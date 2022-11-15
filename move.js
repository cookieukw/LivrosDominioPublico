//A pasta pdf é ignorada para o git, então esse script move alguns arquivos para a pasta que será upada para o github. Isso faz com que eu possa enviar aos  e impedir o lotamento de armazenamento da máquina 

const fs= require("fs")
const pdf = "./livros/"
const frame = "./literature/"
const list = fs.readdirSync(pdf)
let size = 200
let skip = 0
let value = 0
list.slice(skip, skip+size).forEach(item=>{
  value++
  fs.rename(pdf+item,frame+item,()=>{
    console.log(`${value} de ${list.length}`)
  })
})