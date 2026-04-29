//-----------------------
// frontem.js
// Parte de Frontend
// Interacción con el DOM y renderizado del panel
//-----------------------


//------------------------------
// Selección de opciones
//------------------------------

function sel(campo, val, btn) {
  const idx = campo === 'sueno' ? 0 : campo === 'energia' ? 1 : 2;
  datos[idx] = val;
  document.getElementById('opts-' + campo).querySelectorAll('.option-btn').forEach(b => b.className = 'option-btn');
  btn.className = 'option-btn selected-' + val;
  
  // Habilita el botón de analizar solo cuando las 3 variables tienen valor
  document.getElementById('btn-analizar').disabled = datos.filter(d => d !== null).length < 3;
}


//------------------------------
// Landing — scroll hacia la app
//------------------------------

function empezar() {
  document.getElementById('app-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}


//--------------------
// Renderizado del Panel
//--------------------

function renderizarPanel(estado, suma, pct, recomendacion, alternativa, explicacion) {

   document.getElementById('panel-content').innerHTML = `
    <div class="estado-card">
      <div class="score-circle" style="background:${estado.bg};color:${estado.color};">${suma}/5</div>
      <div class="estado-info">
        <div class="estado-label">Estado de recuperación</div>
        <div class="estado-text" style="color:${estado.color};">${estado.texto}</div>
        <div class="score-bar-wrap"><div class="score-bar" id="sbar" style="width:0%;background:${estado.barColor};"></div></div>
      </div>
    </div>
    <div class="rec-card">
      <div class="rec-label">Recomendación Blueprint</div>
      <div class="rec-text">${recomendacion}</div>
    </div>
    <div class="rec-card">
      <div class="rec-label">Si no puedes aplicarlo - alternativa</div>
      <div class="rec-text">${alternativa}</div>
    </div>
    <div class="section-title" style="margin-bottom:0.75rem;">Análisis por variable</div>
    <div class="exp-grid">
      <div class="exp-item exp-sueno"><div class="exp-item-label">Sueño</div><div class="exp-item-text">${explicacion.sueno}</div></div>
      <div class="exp-item exp-energia"><div class="exp-item-label">Energía</div><div class="exp-item-text">${explicacion.energia}</div></div>
      <div class="exp-item exp-cena"><div class="exp-item-label">Cena</div><div class="exp-item-text">${explicacion.cena}</div></div>
    </div>
  `;

  // Muestra el panel superpuesto
  document.getElementById('overlay').classList.add('open');
  
  // Anima la barra de progreso después de un breve retraso
  setTimeout(() => { const b = document.getElementById('sbar'); if (b) b.style.width = pct + '%'; }, 400);

}

//----------------------
// Funcion Principal (Puente)
//-----------------------

function analizar() {
  // 1. Llamada a funciones de Physion.js (Backend)
  const suma = sumaDatos();
  const estado = obtenerEstadoscore(suma);
  const { recomendacion, alternativa } = obtenerRecomendacion();
  const explicacion = obtenerexplicacion();

  // Aquí guardamos los resultados en variables, listos para 
  // el siguiente paso que será el cálculo de porcentaje y renderizado.

  // 2. Cálculo necesario para la interfaz (barra de progreso)
  const pct = (suma / 5) * 100;

  // 3. Renderizado y apertura del panel
  // Llamamos a la función que ya tienes escrita en este mismo archivo
  renderizarPanel(estado, suma, pct, recomendacion, alternativa, explicacion);
  
}

  


//------------------------------
// Panel - Control de Cierre (UI)
//------------------------------

function cerrar() {
  document.getElementById('overlay').classList.remove('open');
}

function handleOverlayClick(e) {
  // Cierra el panel únicamente si se hace clic fuera del contenido principal (en el fondo oscuro)
  if (e.target === document.getElementById('overlay')) cerrar();
}