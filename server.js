const express = require("express");
const app = express( );
const PORT = 3000;
const fs = require( 'fs' ) ; // require the file system module


// function setting view engine on server called portal.
// below is configuration for app.engine(callback function,content)
app.engine('portal', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
        const rendered = content
        .toString()
        .replace('#title#', '<title>' + options.title + '</title>')
        .replace('#message#', '<h1>' + options.message + '</h1>')
        .replace('#content#','<div>'+ options.content + '</div>' )
        .replace('#url#', options.url );

    return callback(null, rendered)
  })
})


app.set("views", "./views");   // set rendering for views to be at views directory ./views
app.set("view engine", "portal"); // set default view engine to portal


// created a get route, a root route with req,res function to respond to client with a fully rendered html page using the view engine.
// it knows to render template.portal b/c we created the app.set views folder and app.set the default to portal
app.get("/", (req, res) =>{
    res.render("template", {
        title:  "We the Best",
        message: "Who!",
        content: "We Taking Over, Major Key Alert, Yall know who it is, All I do is win",
    })
})
app.get("/about-me", (req, res) =>{
    res.render("template2", {
        title:  "Hey",
        message: "Rick Ross!",
        content: "The most underated Rapper in the game",
        url: "https://usatodayhss.com/wp-content/uploads/sites/96/2016/12/rick-ross-nfl-indianapolis-colts-houston-texans-590x900.jpg?w=590&h=393&crop=1"
    })
})
app.get("/another-one", (req, res) =>{
    res.render("template", {
        title:  "We the Best",
        message: "Who!",
        content: "We Taking Over, Major Key Alert, Yall know who it is, All I do is win",
    })
})

app.listen(PORT, ( ) => {
console.log(`Listening on port: ${PORT}`)
}) 