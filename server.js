const express = require("express");
const app = express( );
const PORT = 3000;
const fs = require( 'fs' ) ; // require the file system module, is a library in the node system
const fans = require("./models/fans");

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

// Index Route
app.get('/fans', (req, res) => {
    res.send(fans);
})

// Show Route
app.get('/fans/:id', (req, res)=> {
    res.send(fans[req.params.id]);
})

app.set("views", "./views");   // set rendering for views to be at views directory ./views
app.set("view engine", "portal"); // set default view engine to portal


// created a get route, a root route with req,res function to respond to client with a fully rendered html page using the view engine.
// it knows to render template.portal b/c we created the app.set views folder and app.set the default to portal
app.get("/", (req, res) =>{
    res.render("template", {
        title:  "We the Best.",
        message: "Biggest Boss",
        content: "We Taking Over, Major Key Alert, Yall know who it is, All I do is win",
    })
})
app.get("/about-me", (req, res) =>{
    res.render("template2", {
        title:  "Rick Ross",
        message: "Rick Ross at NRG Stadium for Texans-Colts game",
        content: "The most underrated Rapper in the game",
        url: "https://usatodayhss.com/wp-content/uploads/sites/96/2016/12/rick-ross-nfl-indianapolis-colts-houston-texans-590x900.jpg?w=590&h=393&crop=1"
    })
})
app.get("/charities", (req, res) =>{
    res.render("template1", {
        title:  "Community",
        message: "Rick Ross and the Community",
        content: "Rick Ross Gives Out Free Haircuts",
    })
})
app.get("/homes", (req, res) =>{
    res.render("template2", {
        title:  "Rick Ross Homes",
        message: "Where Rick Ross Lives",
        content: "Miami's Star Island",
        url: "https://robbreport.com/wp-content/uploads/2023/08/rickrosstarisland.jpg?w=1000"
    })
})
app.get("/cars", (req, res) =>{
    res.render("template2", {
        title:  "Rick Ross Cars",
        message: "Rick Ross Car Collection",
        content: "100 Car Collection",
        url: "https://www.bosshunting.com.au/cdn-cgi/imagedelivery/izM8XxyLg9MD6py1ribxJw/www.bosshunting.com.au/2021/07/Rick-Ross-Car-Collection-No-Drivers-License.jpg/w=1200,h=675"
    })
})
app.get("/events", (req, res) =>{
    res.render("template", {
        title:  "Events and Tours",
        message: "All Upcoming Events",
        content: "Dates and Locations",
    })
})
app.get("/discography", (req, res) =>{
    res.render("template", {
        title:  "Discography",
        message: "Top Hits of Rick Ross",
        content: "Top Songs and Albums",
    })
})
app.get("/store", (req, res) =>{
     res.render("template2", {
         title:  "Rick Ross Store",
         message: "Merchandise",
         content: "Hurricanes: A Memoir",
         url: "https://img.thriftbooks.com/api/images/i/m/D36EB7F66EC25F9823B6FB611DAE0EF10B44B787.jpg"
     })
})
app.get("/fan-page", (req, res) =>{
     res.render("template", {
         title:  "Rick Ross Fan Club",
         message: "Fan Club",
         content: "Join Rick Ross Fan Club",
     })

})
app.get("/contact", (req, res) =>{
    res.render("template", {
        title:  "Contact",
        message: "Contact Rick Ross",
        content: "Contact Form",
    })
})

app.listen(PORT, ( ) => {
console.log(`Listening on port: ${PORT}`)
}) 

