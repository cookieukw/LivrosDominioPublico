
//Converte o json bagunçado gerado em um json limpo e organizado

const fs = require("fs")
const path = "./json/"

const data = JSON.parse(fs.readFileSync(path+"info.json","utf8"))
const newData = []
data.slice(0, data.length-3).forEach(obj=>{
let o = {
  authors: obj.autor,
  categories: obj.categoria,
  date: obj["ano da tese"],
  img: "",
  description: obj.resumo,
  title: obj["título"],
  uid: obj.id,
  pageCount: 0,
  original_url: obj.url,
}
newData.push(o)
})

fs.writeFileSync(path+"newInfo.json",JSON.stringify(newData))