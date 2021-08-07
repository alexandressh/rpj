const LivrosDao = require('../infra/livros-dao');
const db = require('../../config/database');

module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.send('IT WORKS');
    });

    app.get('/livros', function(req, resp) {
        const livrosDao = new LivrosDao(db);
        livrosDao.lista()
            .then(livros => {
                resp.status(200);
                resp.body(livros)
            })
            .catch(error => console.log(error));
    });
}