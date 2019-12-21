module.exports = {
    proxy:"localhost:8080",
    port:80,
    injectChanges:false,
    files:[
        "dist/*.js",
        "public/*",
    ]
};