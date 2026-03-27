//------------------------------
// animacion.js
// Secuencia animada de la Landing Page
// Controlada por el usuario con botón Siguiente
//------------------------------


//------------------------------
// Mostrar y ocultar fases
//------------------------------

function mostrarFase(id) {
  document.querySelectorAll('.fase').forEach(f => {
    f.classList.remove('entrando', 'saliendo');
    f.classList.add('oculto');
  });
  const fase = document.getElementById(id);
  fase.classList.remove('oculto');
  fase.classList.add('entrando');
}

function ocultarFase(id, callback) {
  const fase = document.getElementById(id);
  fase.classList.remove('entrando');
  fase.classList.add('saliendo');
  setTimeout(() => {
    fase.classList.add('oculto');
    fase.classList.remove('saliendo');
    if (callback) callback();
  }, 500);
}

// Transición entre fases al presionar Siguiente
function irFase(faseSalida, faseEntrada) {
  ocultarFase(faseSalida, () => {
    mostrarFase(faseEntrada);
  });
}


//------------------------------
// Efecto Typewriter
//------------------------------

function typewriter(elementId, texto, velocidad, callback) {
  const el = document.getElementById(elementId);
  el.textContent = '';
  let i = 0;
  const intervalo = setInterval(() => {
    el.textContent += texto[i];
    i++;
    if (i >= texto.length) {
      clearInterval(intervalo);
      if (callback) setTimeout(callback, 400);
    }
  }, velocidad);
}


//------------------------------
// Arranque inicial
//------------------------------

window.addEventListener('load', () => {

  // Mostrar fase 1 y arrancar el typewriter
  mostrarFase('fase-titulo');
  setTimeout(() => {
    typewriter('typewriter', 'Este sistema la escucha.', 50);
  }, 500);

});