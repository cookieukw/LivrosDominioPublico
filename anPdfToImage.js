//Converte a primeira página de um pdf individual em uma imagem e move ela para a pasta images

const PDFImage = require("pdf-image").PDFImage;
const pdf_folder = './books/';
const img_folder = './images/';
const fs = require('fs'); 
const filename = "c775d5698fa34c388b174c89cd717b26.pdf"
const l = l => console.log(l)
const options = {
  outputDirectory:img_folder,
  convertExtension:"jpg"
}
let books = fs.readdirSync(pdf_folder).map(item => item.substring(0,item.length-4))

let data = JSON.parse(fs.readFileSync("./json/newInfo.json","utf8")).filter(item => {
  return item.uid==filename.substring(0,filename.length-4)
})

let size = data.length;
let skip = 950;


  data.forEach(file=>{

 let lala = new PDFImage(pdf_folder+filename, options)
 
 lala.convertPage(0).then(path =>{
    fs.existsSync(path)
    let obj = {
  ...file,
  img: path,
  pageCount: lala.numberOfPages()
}
fs.appendFile("./json/newInfo2.json",JSON.stringify(obj), ()=>{
  l("Sucesso :D")
})

  })
  .catch(err=>{
    l({err})
  });
})