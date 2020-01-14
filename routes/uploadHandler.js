const express = require('express')
const path = require("path")
const multiparty = require('multiparty')
const fs = require('fs')

const router = express.Router()
const staticPath = path.join(path.dirname(__dirname),"public")

/* GET users listing. */
router.post("/",function(req,res,next){
  const folder = path.join(staticPath,"uploads/staticResource")
  const form = new multiparty.Form({
    uploadDir: folder
  })
  form.parse(req, function(err, fields, files){
    if(err){
      res.status(200).json({result:false})
    }
    else{
      const name = Object.keys(files)[0]
      const uploadedPath = files[name][0].path;
      const localFolder = path.join(folder,files[name][0].originalFilename.substring(0,files[name][0].originalFilename.lastIndexOf('.')))
      if(!fs.existsSync(localFolder)){
        fs.mkdirSync(localFolder)
      }
      const dstPath = path.join(localFolder,files[name][0].originalFilename);
      fs.rename(uploadedPath,dstPath,err => {
        if(err){
          res.status(200).json({result:false})
        }
        else{
          res.status(200).json({result:true})
        }
      })
    }
  })
})

module.exports = router;
