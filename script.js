let username, userStatus
let msg = document.querySelector('.container-msg')
let historicoMsg = ''

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
    setInterval(buscaMsg, 3000)
}
function buscaMsg() {
    let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(historico)
}
function historico(lista) {
    historicoMsg = ''
    for (let i = 0; i < 100; i++) {
        if ((lista.data[i].text === 'sai da sala...') || (lista.data[i].text === "entra na sala...")) {
            historicoMsg +=
                `<div class="msg entrou">
            (${lista.data[i].time}) <strong>${lista.data[i].from}</strong> ${lista.data[i].text}
        </div>`;
        }
        else {
            historicoMsg +=
                `<div class="msg">
            (${lista.data[i].time}) <strong>${lista.data[i].from}:</strong> ${lista.data[i].text}
            </div>`;
        }
    }
    document.querySelector('.container-msg').innerHTML = historicoMsg
    let ultimaMsg = document.querySelector('.msg:last-of-type')
    ultimaMsg.scrollIntoView()
}
function enviar() {
    let texto = document.querySelector('.bottom input').value
    const mensagem =
    {
        from: input.value,
        to: "Todos",
        text: texto,
        type: "message"
    };
    console.log(mensagem, texto, input.value)

    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem)
}