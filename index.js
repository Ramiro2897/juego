const modal = document.getElementById('modal');
const modalBackground = document.getElementById('modal-background');

function showModal() {
  modal.style.display = 'block';
  modalBackground.style.display = 'block';

  setTimeout(hideModal, 2000); 
}

function hideModal() {
  modal.style.display = 'none';
  modalBackground.style.display = 'none';
}


const palabraInput = document.getElementById('palabraInput'); //palabra
const guardarBtn = document.getElementById('guardarBtn'); //boton
const palabraGuardadaDiv = document.getElementById('palabraGuardada'); //donde se mostrara
const letrasAdivinadasDiv = document.getElementById('letrasAdivinadas');


// validamos la entrada al input y de caracteres especiales]}
const addLetterInput = document.getElementById('add-letter');

addLetterInput.addEventListener('input', function() {
  const inputValue = addLetterInput.value;

  if (inputValue.length !== 1 || !/^[a-zA-Z]+$/.test(inputValue)) {
    // La entrada no es válida, entonces limpiamos el input
    addLetterInput.value = '';
  }
});

//validamos los espacios en el input agregar palabra

palabraInput.addEventListener('input', function() {
  const inputValor = palabraInput.value;
  const regex = /^[a-zA-Z\s]*$/; 

  if (!regex.test(inputValor)) {
    palabraInput.value = inputValor.replace(/[^a-zA-Z\s]+/g, '');
  }
});

let palabraGuardada = '';

guardarBtn.addEventListener('click', function() {
  const palabra = palabraInput.value.trim();
  if(palabra !== ''){
    if (palabraGuardadaDiv.childElementCount > 0) {
      palabraGuardadaDiv.innerHTML = ''; 
    }
    palabraGuardada = palabra;
    palabraInput.value = '';
    console.log(palabraGuardada);

    for(let i = 0; i < palabraGuardada.length; i++){
      const letra = palabraGuardada[i];
      if (letra !== ' '){
      console.log(palabraGuardada[i])
      const cuadro = document.createElement('div');
      cuadro.textContent = letra; 
      cuadro.className = 'letra-cuadro';
      cuadro.style.color = 'transparent';
      palabraGuardadaDiv.appendChild(cuadro);
      }
    }
  } else {
    showModal();
  }
 
});

const addLetterBtn = document.getElementById('guardarBtn-two');
const messageDiv = document.querySelector('.message');
const messageAddP = document.querySelector('.message-add');
const messageGameOver = document.querySelector('.message-gameOver-two');
const wordGuess = document.querySelector('.word-guess');
let intentos = 0;

  addLetterBtn.addEventListener('click', function() {
  const letraAdivinada = document.getElementById('add-letter').value.trim().toLowerCase();

  let letraEncontrada = false;
  console.log(letraAdivinada); 
  for (let i = 0; i < palabraGuardada.length; i++) {
    if (palabraGuardada[i].toLowerCase() === letraAdivinada) {
      letraEncontrada = true;
      const cuadro = palabraGuardadaDiv.children[i];
      cuadro.textContent = letraAdivinada;
      cuadro.style.color = 'black';
    }
  }

  if (!letraEncontrada) {
    intentos++;
    messageAddP.textContent = 'La letra no coincide con ninguna letra en la palabra.';
    messageAddP.style.color = 'red';

    const animationDiv = document.querySelector('.animation');
    animationDiv.className = 'animation'; 
    if (intentos >= 3 && intentos < 5) {
    animationDiv.classList.add('frio');
    } else if (intentos >= 5 && intentos < 7) {
    animationDiv.classList.add('caliente');
    } else if (intentos >= 7) {
    animationDiv.classList.add('quemado');
      messageAddP.style.display = 'none';
      messageGameOver.textContent = '¡AHORCADO!';
      messageGameOver.style.color = 'red';
      messageGameOver.style.opacity = '1';
      wordGuess.textContent = `La palabra a adivinar es: ${palabraGuardada}`;
    }

  } else {
      // Verifica si se adivinaron todas las letras
      const letrasAdivinadasArray = Array.from(palabraGuardadaDiv.children);
      const todasAdivinadas = letrasAdivinadasArray.every(cuadro => cuadro.style.color === 'black');
  
      if (todasAdivinadas) {
        messageGameOver.textContent = '¡GANASTE!';
        messageGameOver.style.color = 'green';
        messageGameOver.style.opacity = '1';
      }
      messageAddP.textContent = '';
      messageAddP.style.color = '';
  }

  document.getElementById('add-letter').value = '';
});
// recargar pagina actual
document.querySelector('.end-game').addEventListener('click', function() {
  window.location.reload();
});
