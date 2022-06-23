let username, hora, mensagens

let msg = document.querySelector('.container-msg')

msg = 'lorem impsum teste porcaria do teste caramba loucura loucura'
hora = '(09:21:45)'
let input = document.querySelector('input')

function userName() {
    username = input.value
    const texto = document.querySelector('.bottom input').value
    const login = { name: username };

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", login);

    const mensagem =
    {
        from: userName,
        to: "Todos",
        text: texto,
        type: "message" // ou "private_message" para o bônus
    };

    let postagemMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem);

    postagemMensagem.then()
    postagemMensagem.catch()

    promise.then(seguir)
    promise.catch(tratarErro)
}

function tratarErro(erro) {
    erro = erro.response.status;
    if (erro === 400){
        alert(`Erro ${erro}, nome ${input.value} já em uso...`)
        input.value = ''
        Location.reload
    }
    else {
        alert(`Erro ${erro}, tente novamente mais tarde.`)
        Location.reload
    }
}
function logon_off() {
    let entrada = document.querySelector('.entrada')
    let chat = document.querySelector('.page')
    entrada.classList.toggle('escondido')
    chat.classList.toggle('escondido')
}
function seguir(teste) {
    logon_off();
    let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(processarResposta)


    //     <div class="msg">
    //         ${hora} <strong>${username}</strong> entrou na sala...
    //     </div>
}
function processarResposta(resposta) {
    console.log(resposta.data)
    mensagens = resposta.data
}