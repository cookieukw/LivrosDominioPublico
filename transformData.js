
//Converte o json bagunçado gerado em um json limpo e organizado

const fs = require("fs")
const path = "./json/"

const data = JSON.parse(fs.readFileSync(path+"literatura.json","utf8"))
const newData = []
data.forEach(obj=>{
let o = {
  authors: obj.autor,
  categories: obj.categoria,
  date: obj["ano da tese"] || "?",
  img: "?",
  size:obj.size,
  language: obj.idioma,
  description: obj.resumo,
  title: obj["título"],
  uid: obj.id,
  pageCount: 0,
  download_url: obj.url,
}
newData.push(o)
})

fs.writeFileSync(path+"newLiteratura.json",JSON.stringify(newData))