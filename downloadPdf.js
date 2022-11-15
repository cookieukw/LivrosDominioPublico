//Baixa um único pdf 
const l = l => console.log(l)
const fs = require("fs")
const http = require('http');
const path = "./books/"
const url = "http://www.dominiopublico.gov.br/download/texto/cp038307.pdf"
const dest = "./books/c775d5698fa34c388b174c89cd717b26.pdf"
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

downloadPdf(url, dest)