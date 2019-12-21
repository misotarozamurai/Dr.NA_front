"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const mimeTypes ={
    ".html":"text/html",
    ".css":"text/css",
    ".ico":"image/x-icon",
    ".js":"text/javascript",
    ".json":"application/json",
    ".gltf":"model/gltf+json",
    ".glb":"model/gltf-binary",
};

const fileExists = (url) => {
    let isExists;
    try {
        fs.statSync(url);
        isExists = true;
    } catch (error) {
        isExists = false;
    }
    return isExists;
};

http.createServer((req,res)=>{
    const rootAccess = req.url === '/';
    const type = mimeTypes[path.extname(req.url)];
    const filePath = req.url.slice(1);
    const code = rootAccess ? 302 : type && fileExists(filePath) ? 200 : 400;

    res.statusCode = code;
    if(code !== 302){
        res.writeHead(code,{"Content-Type" : type || "text/plain" + "; charset=utf-8"});
        res.write(
            code !== 400
                ? fs.readFileSync(filePath ,{encoding:"utf-8"})
                : "file not found"
        );
    }else{
        res.writeHead(code,{"Location":"/public/index.html"});
    }
    res.end();
}).listen(8080,()=>console.log("node web server is start!"));