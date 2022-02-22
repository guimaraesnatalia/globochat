function recebeMensagem(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function adicionaMensagem(message){
    linha = document.createElement("li");
    sender = document.createElement("span");
    msg = document.createElement("p");
    breakspace = document.createElement("br")
    
    sender.innerHTML = message['sender']+': '
    msg.innerHTML = message['msg']

    linha.classList.add("container") 
    linha.classList.add("message")
    linha.setAttribute('id', "message")

    msg.setAttribute('id', "message-content")
    sender.setAttribute('id', "message-time") 
    sender.classList.add("sender")

    linha.appendChild(sender)
    linha.appendChild(breakspace)
    linha.appendChild(msg)

    return linha;
}

function adicionaUsuario(usuario){
    linha = document.createElement("li");
    username = document.createElement("p");

    username.innerHTML = usuario

    linha.classList.add("usuarioList") 

    linha.appendChild(username);
    return linha;
}

function main(){
    let data = recebeMensagem("https://run.mocky.io/v3/f1e42921-cd90-4ef5-b7ea-08f7b8544810")
    let mensagens = JSON.parse(data)
    let chat = document.getElementById("chat-content")

    let usuarios = recebeMensagem("https://run.mocky.io/v3/89f3e19f-d435-46ac-ae7a-08b4f9b6cea1")
    let usuario = JSON.parse(usuarios)
    let listaUsuarios = document.getElementById("listaUsuariosOnline")

    for (let i in usuario['senders']){
        let linha = adicionaUsuario(usuario['senders'][i].toString())
        listaUsuarios.appendChild(linha)
    }

    mensagens['messages'].forEach(element => {
        setInterval(() =>{
            let linha = adicionaMensagem(element); 
            chat.appendChild(linha)
        }, 5000);
    });
}

main()