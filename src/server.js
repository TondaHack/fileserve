import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;
const root =  path.resolve(__dirname);
console.log(root);

app.set('view engine', 'ejs');
app.set('views',`${root}/views`);


app.get('/', (req, res) => {
    res.render('pages/index');
});

app.listen(port, () => {
    console.info(`Server is running on port ${port}.`);
});
