let username, hora, userStatus
let mensagens = []
let msg = document.querySelector('.container-msg')

msg = 'lorem impsum teste porcaria do teste caramba loucura loucura'
hora = '(09:21:45)'
let input = document.querySelector('input')

function userName() {
    username = input.value
    const texto = document.querySelector('.bottom input').value
    const login = { name: username };



    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", login);
    promise.then(seguir)
    promise.catch(tratarErro)
}
function verificaOnline() {
    username = input.value
    const login = { name: username }
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", login)
    console.log(`${username} está online.`)
}

function tratarErro(erro) {
    erro = erro.response.status;
    if (erro === 400) {
        alert(`Erro ${erro}, nome ${input.value} já em uso...`)
        input.value = ''
        Location.reload
    }
    else {
        alert(`Erro ${erro}, tente novamente mais tarde.`)
        Location.reload
    }
}
function logOn_Off() {
    let entrada = document.querySelector('.entrada')
    let chat = document.querySelector('.page')
    entrada.classList.toggle('escondido')
    chat.classList.toggle('escondido')
}
function seguir(teste) {
    userStatus = true
    logOn_Off();
    setInterval(verificaOnline, 5000)
    setInterval(buscaMsg, 1000)


    //     <div class="msg">
    //         ${hora} <strong>${username}</strong> entrou na sala...
    //     </div>
}
function buscaMsg() {
    let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(historico)
}
function historico(lista) {
    if (mensagens.includes(lista.data)){
        return;
    }
    else {
        mensagens.push(lista.data)
    }

    console.log(mensagens)
}