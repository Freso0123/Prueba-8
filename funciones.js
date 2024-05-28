let int = 0;
let openChatBtn = document.getElementById('boton');
let chatContainer = document.getElementById('text_box1');
let chatInput = document.getElementById('chat1');
let title = document.getElementById('titulo1');
let sendBtn = document.getElementById('enviar');
let messagesContainer = document.createElement('div'); // Crear contenedor dinámicamente
messagesContainer.id = 'messagesContainer';
document.body.appendChild(messagesContainer); // Agregar contenedor al DOM
let messagesArray = [];

openChatBtn.addEventListener('click', () => {
  chatContainer.style.display = 'block';
});

sendBtn.addEventListener('click', () => {
  let texto = chatInput.value.trim();
  let titulo = title.value.trim();
  
  if (texto !== '' && titulo !== '') {
    // Guardar en localStorage
    let messageData = {
      title: titulo,
      message: texto
    };
    messagesArray.push(messageData);
    localStorage.setItem('messages', JSON.stringify(messagesArray));
    int++;

    // Crear nuevo elemento y agregarlo al DOM
    let newMessageElement = document.createElement('section');
    newMessageElement.className = 'box2';

    newMessageElement.innerHTML = `
      <div class="titulo2">
        <h2>${titulo}</h2>
      </div>

      <div class="subox">
        <div class="text1">
            <input class="check" type="checkbox">
        </div>

        <div class="text1">
            <p>${texto}</p>
        </div>
      </div>
    `;

    messagesContainer.appendChild(newMessageElement);

    // Limpiar los inputs y ocultar el contenedor
    title.value = '';
    chatInput.value = '';
    chatContainer.style.display = 'none';
  }
});

if (chatContainer) {
  chatContainer.addEventListener('click', (e) => {
    if (e.target === chatContainer) {
      chatContainer.style.display = 'none';
    }
  });
}

// Cargar mensajes guardados en localStorage al cargar la página
window.addEventListener('load', () => {
  if (localStorage.getItem('messages')) {
    messagesArray = JSON.parse(localStorage.getItem('messages'));
    messagesArray.forEach((messageData) => {
      let newMessageElement = document.createElement('section');
      newMessageElement.className = 'box2';

      newMessageElement.innerHTML = `
        <div class="titulo2">
          <h2>${messageData.title}</h2>
        </div>

        <div class="subox">

            <div class="text1">
            <input class="check" type="checkbox">
            </div>

            <div class="text1">
            <p>${messageData.message}</p>
            </div>
            
        </div>
      `;

      messagesContainer.appendChild(newMessageElement);
    });
  }
});

