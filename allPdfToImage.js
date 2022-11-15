//Converte a primeira página de um pdf em imagem e mova ela para a pasta images

const PDFImage = require("pdf-image").PDFImage;
const pdf_folder = './livros/';
const img_folder = './images_literature/';
const fs = require('fs'); 
const l = l => console.log(l)

const options = {
  outputDirectory:img_folder,
  convertExtension:"jpg"
}

let books = fs.readdirSync(pdf_folder).map(item => item.replace(".pdf",""))

let data = JSON.parse(fs.readFileSync("./json/literatura_format.json","utf8"))
let size = 200;
let skip = 900;

(async ()=>{
  data.slice(skip, skip+size).forEach(file=>{
    let filename = pdf_folder+file.uid+".pdf"
 let lala = new PDFImage(filename, options)
 
 lala.convertPage(0).then(path =>{
    fs.existsSync(path)
     let obj = {
  ...file,
  img: path,
  pageCount: lala.numberOfPages()
}
  fs.appendFile("./json/literatura_final.json",JSON.stringify(obj)+",\n", ()=>{
  l("Sucesso :D")
})

  })
  .catch(err=>{
    l({err})
    fs.rename(filename,"./trash/"+file.uid+".lixo")
    return
  });

})
})()
