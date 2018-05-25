const sass = require('node-sass');
const fs = require('fs');

sass.render({
    file: 'src/bootstrap4/bootstrap.scss'
}, (err, result) => {
    if (err) {
        console.error(err);
    } else {
        fs.createWriteStream('src/bootstrap4/bootstrap.css', {
            autoClose: true,
        }).write(result.css);
        console.log('done');
    }
});
