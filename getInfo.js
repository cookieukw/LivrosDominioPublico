//Gera um json mas ele é bagunçado porcausa da forma que o site foi feito(impede uma boa extração)


const axios = require("axios")
const cheerio = require("cheerio")
let url = "http://www.dominiopublico.gov.br/pesquisa/ResultadoPesquisaObraForm.do?first="
const url2= "&ds_titulo=&co_autor=&no_autor=&co_categoria=&pagina=1&select_action=Submit&co_midia=2&co_obra=&co_idioma=1&colunaOrdenar=null&ordem=null"
let skip = 0
const { v4 } = require('uuid'); 
const path = "pdf/"
let download = "http://www.dominiopublico.gov.br/download"
let page = 1000
let search_url = "http://www.dominiopublico.gov.br"
const log = l => console.log(l)
let url_data = []
let result = []
const fs = require("fs")

const clear = text => {
  return text
  .trim()
  .replace(/-/g,"")
  .replace(":","")
  .replace("/"," ")
  //.replace("\\"," ")
  .toLowerCase()
  .replaceAll(/"/g, '\\"')
  .replaceAll(/\(.*\)/g, '')
  .replaceAll(/\[.*\]/g, '')
  .replace("[cp","")
  .replace("(cp","")
  .replace("[", '')
  .split(/\s/g)
  .filter(e => String(e).trim())
  .join(" ")
}
let index = 0

const loadURL = async () =>{
  let v = url+page+"&skip="+skip+url2 
  log({page, skip, url:v})
  
  await axios.get(v).then(data=>{
    let $ = cheerio.load(data.data,
    {
      decodeEntities: false
    })
    
    let table = $("#res").find("tbody")
    
    table.find("tr.odd").each((i, elem) =>url_data.push($(elem).find("a[style='cursor:hand']").last().attr("href")))
    
    table.find("tr.even").each((i, elem) =>url_data.push($(elem).find("a[style='cursor:hand']").last().attr("href")))
    
    getData()
    
  })
  .catch(err=>log(err.message))
}


const getData = async () => {
  index++
  for(let pos in url_data){
    log(`${pos} de ${url_data.length-1}`)
    await axios.get(search_url+(url_data[pos].substring(2)))
    .then(data =>{
      let $ = cheerio.load(data.data)
      
      let temp = ""
      let temp_url;
      let id = clear(v4())
      
      $("*").contents().each((index, node)=>{
        if (node.nodeType == 8) { 
          temp_url = $(node.nodeValue).find("a").attr("href")
        }
      })
      
      $("table tbody tr td table tbody tr td table tbody tr td table tbody tr td table tbody tr td table")
      .find("tr").each((index, element)=>{
        
        let tag = clear($(element).find("td.detalhe1").text())
        let value = clear($(element).find("td.detalhe2").text())
        
        if(!tag || !value) return
        
        temp = temp+`\n"${tag}":"${value}",`
      })
      temp = temp+`\n"url":"${download}${temp_url}",\n"id":"${id}"`
      
      temp = JSON.parse("{"+temp+"\n}")
      //log({temp})
      // log({jsom:JSON.parse(`\{${temp}\}`)})
      fs.appendFile("./json/info.json", JSON.stringify(temp)+",\n", ()=>{
        log("Append sucess!")
      })
      
      
    }).catch(err=>log(err.message))
    //break
  }
  
  
}
loadURL();