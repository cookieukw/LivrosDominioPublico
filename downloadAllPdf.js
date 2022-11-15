//Baixa os pdfs usando o json organizado
const l = l => console.log(l)
const fs = require("fs")
const http = require('http');
const books = JSON.parse(fs.readFileSync("./json/literatura_format.json","utf8"))
const path = "./books/"
const size = 40
const skip = 1000
const options = { 
  headers: { 
    'User-Agent': 'Mozilla/5.0 (Linux; Android 11; SM-A107M Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/107.0.5304.91 Mobile Safari/537.36', 
    "Cookie":"JSESSIONID=61D57D0C629DBCD3C6C767F21AC8D301",
    'Accept': '/',
    'Connection': 'keep-alive'
  } 
}; 


let downloadPdf = (link, dest)=> {
  
  let request = http.get(link, options, (response)=> {
    
    let file = fs.createWriteStream(dest);
  
    response.pipe(file);
    
    file.on('finish', ()=>{
      file.close()
      l("baixado")
    });
    
  
  }).on('error',(err)=>{
    l({err,link})
  })
};

(async ()=>{
books.slice(skip, skip+size).forEach((book, index)=>{
  l(book)
  let file = book.uid+".pdf"
  l(`${index} de ${books.length-1}`)
  
  downloadPdf(book.download_url, `${path}${file}`)
})
})()