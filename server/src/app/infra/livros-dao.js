// Aqui fica a comunicação com o banco de dados
class LivrosDao {
    constructor(db) {
        this._db = db;
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
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
                ], (error) => {
                    if (error) {
                        return reject('Nops');
                    }
                    resolve();
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
}