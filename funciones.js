let int = 0;
let openChatBtn = document.getElementById('boton');
let chatContainer = document.getElementById('text_box1');
let chatInput = document.getElementById('chat1');
let title = document.getElementById('titulo1');
let sendBtn = document.getElementById('enviar');
let deleteBtn = document.getElementById('eliminar'); // Agregar botón de eliminar
let messagesContainer = document.createElement('div'); // Crear contenedor dinámicamente
messagesContainer.id = 'messagesContainer';
document.body.appendChild(messagesContainer); // Agregar contenedor al DOM
let messagesArray = JSON.parse(localStorage.getItem('messages')) || [];

// Mostrar el contenedor de chat
openChatBtn.addEventListener('click', () => {
  chatContainer.style.display = 'block';
});

// Enviar mensaje y guardarlo en localStorage
sendBtn.addEventListener('click', () => {
  let texto = chatInput.value.trim();
  let titulo = title.value.trim();
  
  if (texto !== '' && titulo !== '') {
    // Guardar en localStorage
    let messageData = {
      id: int, // Agregar un identificador único
      title: titulo,
      message: texto
    };
    messagesArray.push(messageData);
    localStorage.setItem('messages', JSON.stringify(messagesArray));
    int++;

    // Crear nuevo elemento y agregarlo al DOM
    let newMessageElement = document.createElement('section');
    newMessageElement.className = 'box2';
    newMessageElement.setAttribute('data-id', messageData.id); // Establecer atributo de ID

    newMessageElement.innerHTML = `
      <div class="titulo2">
        <h2>${titulo}</h2>
      </div>

      <div class="subox">
        <div class="text1" >
            <input  class="check" type="checkbox" id="${titulo}">
        </div>

        <div class="text1">
            <label for="${titulo}">${texto}</label>
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

// Ocultar el contenedor de chat al hacer clic fuera de él
if (chatContainer) {
  chatContainer.addEventListener('click', (e) => {
    if (e.target === chatContainer) {
      chatContainer.style.display = 'none';
    }
  });
}

// Cargar mensajes guardados en localStorage al cargar la página
window.addEventListener('load', () => {
  messagesArray.forEach((messageData) => {
    let newMessageElement = document.createElement('section');
    newMessageElement.className = 'box2';
    newMessageElement.setAttribute('data-id', messageData.id); // Establecer atributo de ID

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

  // Actualizar el contador de IDs
  int = messagesArray.length > 0 ? Math.max(...messagesArray.map(msg => msg.id)) + 1 : 0;
});

// Eliminar mensajes seleccionados
deleteBtn.addEventListener('click', () => {
  let checkboxes = document.querySelectorAll('.check:checked');
  checkboxes.forEach((checkbox) => {
    let messageElement = checkbox.closest('.box2');
    let messageId = parseInt(messageElement.getAttribute('data-id'));

    // Eliminar del array y del localStorage
    messagesArray = messagesArray.filter((message) => message.id !== messageId);
    localStorage.setItem('messages', JSON.stringify(messagesArray));

    // Eliminar del DOM
    messagesContainer.removeChild(messageElement);
  });
});

