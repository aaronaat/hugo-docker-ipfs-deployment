const fs = require('fs');
const https = require('https');
const axios = require('axios');


let page1 = "https://images-api.nasa.gov/search?keywords=Spitzer%20Space%20Telescope%20Galaxies&media_type=image&page=1";
let cat = "Spitzer Space Telescope"

function saveImageToDisk(url, localPath) {var fullUrl = url;
    var file = fs.createWriteStream(localPath);
    var request = https.get(url, function(response) {
    response.pipe(file);
    });}

function write(apiUrl) {
    axios.get(apiUrl)
    .then(res => {

    res.data.collection.items.forEach(
        
        function(obj) { 

        let title = obj.data[0].title.replace(":", "").replace("/", "").replace(",", "");
        let content = obj.data[0].description;
        let date = obj.data[0].date_created;

        let pic = obj.links[0].href;

        let mdTitle = 'content/' + title.replace(/\s+/g, '-').toLowerCase().replace(/"/g, '').replace('?', '') + '.md';
        let picTitle = 'static/' + title.replace(/\s+/g, '-').toLowerCase().replace(/"/g, '').replace('?', '') + '.jpg';
        let picTitle2 = title.replace(/\s+/g, '-').toLowerCase().replace(/"/g, '') + '.jpg';

        saveImageToDisk(pic, picTitle);
        
        fs.writeFile(mdTitle, 
            `---\ntitle: ${title}\ndate: ${date}\ndraft: false\ncategories: ["${cat}"]\npic: "${picTitle2}"\n---\n${content}`,
             function (err) {
                        if (err) return console.log(err);
                        console.log('ok');
                      });
        
        });
    });

}

write(page1);

