const url = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', function() {
    function buscarLivro(id) {
        var requestOptions = {
            method: 'GET'
        };
    
        fetch(`${url}/livros/${id}`, requestOptions)
            .then(response => response.text())
            .then(response => JSON.parse(response))
            .then(result => mostrarLivro(result))
            .catch(error => console.log('error', error));
    }

    function mostrarLivro(livro) {
        document.getElementById('fromGroupId').value = livro.id;
        document.getElementById('fromGroupTitulo').value = livro.titulo;
        document.getElementById('formGroupDescricao').value = livro.descricao;
        document.getElementById('formGroupPreco').value = livro.preco;
    }

    function __init() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const id = params['id'];

        if(id) {
            buscarLivro(id);
        } else {
            console.error('Não foi encontrado um id na URL');
        }
    }

    __init();
});

function mostrarToastr(data) {
    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show();
}

function pegarValoresFormulario() {
    const id = document.getElementById('fromGroupId').value;
    const titulo = document.getElementById('fromGroupTitulo').value;
    const descricao = document.getElementById('formGroupDescricao').value;
    const preco = document.getElementById('formGroupPreco').value;

    const ret = {
        id,
        titulo,
        descricao,
        preco
    };

    return ret;
}

function salvarLivro() {
    const body = pegarValoresFormulario();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(body)
    };


    fetch(`${url}/livros`, requestOptions)
            .then(() => mostrarToastr())
            .catch(error => console.log('error', error));

}