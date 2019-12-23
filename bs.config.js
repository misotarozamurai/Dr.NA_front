module.exports = {
    proxy:"localhost:80",
    port:8888,
    injectChanges:false,
    files:[
        "dist/*.js",
        "public/*",
    ]
};