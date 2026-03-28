//------------------------------
// animacion.js
// Secuencia animada de la Landing Page
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

function irFase(faseSalida, faseEntrada) {
  ocultarFase(faseSalida, () => {
    mostrarFase(faseEntrada);

    if (faseEntrada === 'fase-pasos') {
      animarPasos();
    }
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
      if (callback) setTimeout(callback, 300);
    }
  }, velocidad);
}


//------------------------------
// Pasos uno a uno
//------------------------------

function animarPasos() {
  const pasos = document.querySelectorAll('#fase-pasos .paso, #fase-pasos .paso-arrow');
  const btnSiguiente = document.getElementById('btn-siguiente-2');

  // Mostrar el botón siguiente al mismo tiempo que entra la fase
  if (btnSiguiente) {
    setTimeout(() => {
      btnSiguiente.style.transition = 'opacity 0.5s ease';
      btnSiguiente.style.opacity = '1';
      btnSiguiente.style.pointerEvents = 'all';
    }, 400);
  }

  // Mostrar cada paso con delay progresivo
  pasos.forEach((p, i) => {
    setTimeout(() => {
      p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      p.style.opacity = '1';
      p.style.transform = 'translateY(0)';
    }, i * 500 + 300);
  });
}


//------------------------------
// Arranque inicial
//------------------------------

window.addEventListener('load', () => {

  mostrarFase('fase-titulo');

  const btn1 = document.getElementById('btn-siguiente-1');

  // Typewriter línea 1
  setTimeout(() => {
    typewriter('typewriter-linea1', 'Tu biología habla.', 65, () => {

      // Typewriter línea 2
      setTimeout(() => {
        typewriter('typewriter-linea2', 'Este sistema la escucha.', 55, () => {

          // Ocultar cursor y mostrar botón siguiente
          const cursor = document.getElementById('cursor-tw');
          if (cursor) cursor.style.display = 'none';

          if (btn1) {
            btn1.style.transition = 'opacity 0.5s ease';
            btn1.style.opacity = '1';
            btn1.style.pointerEvents = 'all';
          }
        });
      }, 400);

    });
  }, 400);

});