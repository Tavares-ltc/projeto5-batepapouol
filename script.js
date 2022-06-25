let username, userStatus
let msg = document.querySelector('.container-msg')
let historicoMsg = ''
let visibilidade
let destinatario
let stat = true
let input = document.querySelector('input')

function userName() {
let container = document.querySelector('.container-input')
container.remove()
let loading = document.querySelector('.loading')
let loadingMsg = document.querySelector('.loadingMsg')
loading.classList.remove('escondido')
loadingMsg.classList.remove('escondido')

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
}

function tratarErro(erro) {

    erro = erro.response.status;
    if (erro === 400) {
        alert(`Erro ${erro}, nome ${input.value} já em uso...`)
        input.value = ''
        document.location.reload(true);
    }
    else {
        alert(`Erro ${erro}, tente novamente mais tarde.`)
        document.location.reload(true);
    }
}
function logOn_Off() {
    wipe();
    let entrada = document.querySelector('.entrada')
    let chat = document.querySelector('.page')
    entrada.classList.toggle('escondido')
    chat.classList.toggle('escondido')
}
function seguir(teste) {
    userStatus = true
    logOn_Off();
    listaOnline();
    buscaMsg();
    setInterval(listaOnline, 10000)
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
        if ((lista.data[i].type === "status") && (stat === true)) {
            historicoMsg +=
                `<div class="msg entrou">
                <em>(${lista.data[i].time})</em> <strong>${lista.data[i].from}</strong> ${lista.data[i].text}
        </div>`;
        }
        if ((lista.data[i].type === "status") && (stat === false)) {
        }

        else if (lista.data[i].to !== "Todos" && lista.data[i].type === "message") {
            historicoMsg +=
                `<div class="msg">
                <em>(${lista.data[i].time})</em> <strong>${lista.data[i].from}</strong> para <strong>${lista.data[i].to}</strong>: ${lista.data[i].text}
        </div>`;
        }
        else if ((lista.data[i].type === "private_message") && (lista.data[i].to === input.value || lista.data[i].to === "Todos" || lista.data[i].from === input.value)) {
            historicoMsg +=
                `<div class="msg reservada">
                <em>(${lista.data[i].time})</em> <strong>${lista.data[i].from}</strong> para <strong>${lista.data[i].to}</strong>: ${lista.data[i].text}
        </div>`;
        }
        else {
            if (lista.data[i].to === 'Todos')
                historicoMsg +=
                    `<div class="msg">
            <em>(${lista.data[i].time})</em> <strong>${lista.data[i].from}:</strong> ${lista.data[i].text}
            </div>`;
            else {
            }
        }
    }
    document.querySelector('.container-msg').innerHTML = historicoMsg
    let ultimaMsg = document.querySelector('.msg:last-of-type')
    if (ultimaMsg !== undefined) {
        ultimaMsg.scrollIntoView()
    }
}
function enviar() {
    if (destinatario === undefined) {
        destinatario = "Todos"
    }
    if (visibilidade === undefined) {
        visibilidade = "message"
    }
    let texto = document.querySelector('.bottom input').value
    const mensagem =
    {
        from: input.value,
        to: destinatario,
        text: texto,
        type: visibilidade
    };
    console.log(mensagem, texto, input.value)

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem)
    promise.then(wipe)
}
function wipe() {
    document.querySelector('.bottom input').value = ''
}

function direcionamento() {
    let sidebar = document.querySelector('.side-bar')
    sidebar.classList.toggle('escondido')
}
function setVisibility(button) {
    let visibilidadeDiv = document.querySelector('.visibilidade')
    let listaChecks = visibilidadeDiv.querySelectorAll('.checkmark')
    limpaChecks(listaChecks);
    let checkMark = button.querySelector('.checkmark');
    checkMark.classList.remove('hidden');
    visibilidade = button.querySelector('h4').innerText
    console.log(visibilidade)
    if (visibilidade === "Público") {
        visibilidade = "message"
    }
    else {
        visibilidade = "private_message"
    }

}
function to(selecionado) {
    let listaDestinatarios = document.querySelectorAll('.direct .checkmark')
    limpaChecks(listaDestinatarios)
    selecionado.querySelector('.checkmark').classList.remove('hidden')
    destinatario = selecionado.querySelector('h4').innerText
    console.log(destinatario)
}

function limpaChecks(lista) {
    for (let i = 0; i < lista.length; i++) {
        lista[i].classList.add('hidden')
    }
}

function listaOnline() {
    let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
    promise.then(processarLista)
    promise.catch(erroLista)
}
function erroLista() {
}

function processarLista(lista) {
    let direct = document.querySelector('.direct')
    let todasPessoas = ''

    todasPessoas += `
    <div onclick="to(this)">
        <div>
            <ion-icon name="person-circle"></ion-icon>
            <h4>Todos</h4>
        </div>
        <div class="checkmark">
            <ion-icon name="checkmark-outline"></ion-icon>
        </div>
    </div>`;

    for (i = 0; i < lista.data.length; i++) {
        let nameOnline = lista.data[i].name

        todasPessoas += `<div onclick="to(this)">
    <div>
        <ion-icon name="person-circle"></ion-icon>
        <h4>${nameOnline}</h4>
    </div>
    <div class="checkmark hidden">
        <ion-icon name="checkmark-outline"></ion-icon>
    </div>
</div>
`;
    }

    direct.innerHTML = todasPessoas
}
function change(button) {
    if(button.innerHTML === "Não"){
        button.innerHTML = "Sim"
        button.style.color = "green"
        stat = false
    }
    else {
        button.innerHTML = "Não"
        button.style.color = "red"
        stat = true
    }
}