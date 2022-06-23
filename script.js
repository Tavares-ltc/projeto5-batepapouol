let username, hora

let msg = document.querySelector('.container-msg')

msg = 'lorem impsum teste porcaria do teste caramba loucura loucura'
hora = '(09:21:45)'

function userName() {
    let input = document.querySelector('input')
    username = input.value
    let entrada = document.querySelector('.entrada')
    entrada.classList.add('escondido')
    let chat = document.querySelector('.page')
    chat.classList.remove('escondido')
    msg.innerHTML +=
        `

        <div class="msg">
            ${hora} <strong>${username}</strong> entrou na sala...
        </div>

    `
}