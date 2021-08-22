const url = 'http://localhost:3000';



function buscarLivros() {
    var requestOptions = {
        method: 'GET'
    };

    fetch(`${url}/livros`, requestOptions)
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(result => mostrarLivros(result))
        .catch(error => console.log('error', error));
}

function deletarLivro(id) {
    var requestOptions = {
        method: 'DELETE'
    };

    fetch(`${url}/livros/${id}`, requestOptions)
        .then(response => deletarLivroDoHTML(id))
        .catch(error => console.log('error', error));
}

function mostrarLivros(livros) {
    const livrosHTML = livros.map((livro) => {
        return `
            <div class="col-4 pb-2" id="livro${livro.id}">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${livro.titulo}</h5>
                        <p class="card-text">${livro.descricao}</p>
                        <p class="card-text">${livro.preco}</p>
                        <a href="editar.html?id=${livro.id}" class="btn btn-primary">Editar</a>
                        <a href="#" onclick="deletarLivro(${livro.id})" class="btn btn-danger">Deletar</a>
                    </div>
                </div>
            </div>
        `
    }).join('');

    const livrosDiv = document.getElementById('livrosDiv');
    livrosDiv.innerHTML = livrosHTML;
}

function deletarLivroDoHTML(id) {
    document.getElementById(`livro${id}`).remove();
}