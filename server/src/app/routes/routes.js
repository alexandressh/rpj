const LivrosDao = require('../infra/livros-dao');
const db = require('../../config/database');

//TODO: Adicionar errorHandler
module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.send('IT WORKS');
    });

    app.get('/livros', function(req, resp) {
        const livrosDao = new LivrosDao(db);
        livrosDao.lista()
            .then(livros => {
                resp.status(200);
                resp.send(livros)
            })
            .catch(error => console.log(error));
    });

    app.post('/livros', function(req, resp) {
        const livrosDao = new LivrosDao(db);

        livrosDao.adiciona(req.body)
            .then((id) => livrosDao.buscaPorId(id))
            .then(livro => {
                resp.status(201);
                resp.send(livro);
            })
            .catch(error => console.log(error));
    });

    app.get('/livros/:id', function(req, resp) {
        const livrosDao = new LivrosDao(db);
        
        livrosDao.buscaPorId(req.params.id)
            .then(livro => {
                if(livro) {
                    resp.status(200);
                    resp.send(livro);
                } else {
                    resp.status(404);
                    resp.send({});
                }
            })
            .catch(error => console.log(error));
    });

    app.put('/livros', function(req, resp) {
        const livrosDao = new LivrosDao(db);

        livrosDao.atualiza(req.body)
            .then(() => livrosDao.buscaPorId(req.body.id))
            .then(livro => {
                resp.status(200);
                resp.send(livro);
            })
            .catch(error => console.log(error));
    });

    app.delete('/livros/:id', function(req, resp) {
        const livrosDao = new LivrosDao(db);

        livrosDao.remove(req.params.id)
            .then(() => resp.status(200).end())
            .catch(error => console.log(error));
    });
}