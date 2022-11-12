const fs = require("fs")
const json_path = "./json/"

let images = fs.readdirSync("./images").map(item=> item.substring(0, item.length-6))

let books = JSON.parse(fs.readFileSync("./json/newInfo.json"))

const l = l => console.log(l)
l({size:books.length})
books = books.filter(item=>{
  l(item)
  if(images.includes(item.uid)){
    return true
  }
  
  return false
})
/*fs.writeFileSync(json_path+"newInfo.json", JSON.stringify(books),()=>{
  l("lixo uwu")
})*/

l({size:books.length})