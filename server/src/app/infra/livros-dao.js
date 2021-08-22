// Aqui fica a comunicação com o banco de dados
class LivrosDao {
    constructor(db) {
        this._db = db;
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            console.log(livro)
            this._db.run(`
                INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) values (?,?,?)
            `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ], function (error) {
                    if (error) {
                        return reject('Nops');
                    }
                    resolve(this.lastID);
                });
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (error, results) => {
                    if (error) {
                        return reject('Nops');
                    }
                    return resolve(results);
                }
            )
        });
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(`
                SELECT * 
                FROM livros
                WHERE id = ?`,
                [
                    id
                ],
                (error, results) => {
                    if (error) {
                        return reject('NOPE');
                    }
                    console.log(results)
                    return resolve(results);
                }
            )
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                    UPDATE livros SET
                    titulo = ?,
                    preco = ?,
                    descricao = ?
                    WHERE id = ?
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                (error, results) => {
                    if (error) {
                        return reject('NOPE, im not able to do it');
                    }

                    return resolve();
                }
            )
        });
    }

    //TODO: Como saber se um recurso foi realmente removido?
    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    DELETE
                    FROM livros
                    WHERE id = ?
                `,
                [
                    id
                ],
                function (error, results) {
                    if (error) {
                        return reject();
                    }

                    return resolve();
                }
            )
        });
    }
}

module.exports = LivrosDao;