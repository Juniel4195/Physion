//-----------------------
//variable Global
let datos = [null, null, null]
//----------------------
 
 
//----------------------------
//Base de Datos
//EstadoScore y explicacion
//----------------------------
const Estadoscore = {
 
      estado:{
         5: { texto: "Condición óptima",         color: "#085041", bg: "#E1F5EE", barColor: "#1D9E75" },
         4: { texto: "Buen estado general",       color: "#27500A", bg: "#EAF3DE", barColor: "#639922" },
         3: { texto: "Recuperación moderada",     color: "#633806", bg: "#FAEEDA", barColor: "#EF9F27" },
         2: { texto: "Recuperación baja",         color: "#854F0B", bg: "#FAEEDA", barColor: "#BA7517" },
         1: { texto: "Recuperación insuficiente", color: "#501313", bg: "#FCEBEB", barColor: "#E24B4A" },
         0: { texto: "Recuperación crítica",      color: "#501313", bg: "#FCEBEB", barColor: "#E24B4A" }
         }
    }
 
    //explicacion
    const reglaexplicacion = {
 
      sueno: {
 
         2: "😴 Tu descanso ha sido adecuado. Mantener una buena calidad de sueño ayuda a que tu cuerpo se recupere correctamente y mantenga buenos niveles de energía.",
         1: "😴 La calidad de tu descanso parece haber sido baja. Un sueño insuficiente puede afectar los procesos de recuperación del cuerpo, disminuir la claridad mental y reducir el rendimiento físico durante el día.",
         0: "🚨 Tu descanso fue muy limitado. Cuando el sueño es insuficiente, el cuerpo no completa adecuadamente los procesos de recuperación, lo que puede aumentar la fatiga, afectar la concentración y reducir el rendimiento general."
      },
 
      energia: {
 
         2: "Tus niveles de energía se perciben adecuados. Esto indica que tu organismo cuenta con una buena disposición para afrontar las actividades del día.",
         1: "🔋 Tus niveles de energía se perciben bajos. Esto puede ser señal de fatiga acumulada, estrés físico o falta de recuperación completa.",
         0: "⚠️ Tus niveles de energía son muy bajos. Esto indica que tu organismo podría estar experimentando un nivel importante de fatiga o falta de recuperación adecuada."
      },
 
      cena: {
 
         2: "Cenar temprano permite que el sistema digestivo procese la comida antes de dormir. Esto reduce la probabilidad de digestiones pesadas, reflujo o interrupciones del sueño. Generalmente favorece un descanso más reparador y un mejor equilibrio metabólico durante la noche.",
         1: "Cuando se cena tarde, el organismo todavía está digiriendo mientras el cuerpo intenta entrar en estado de sueño. Esto puede hacer que el descanso sea un poco más ligero o menos profundo, aunque normalmente no causa grandes problemas si la comida es ligera",
         0: "Cenar muy tarde obliga al sistema digestivo a trabajar intensamente durante el sueño. Esto puede provocar incomodidad, digestión lenta o sueño interrumpido. A largo plazo, este hábito puede afectar negativamente la calidad del descanso."
 
      }
 
    }
 
 
//--------------------------
//Base de datos blueprint
//--------------------------
 
const blueprintReglas = [
 
  // ============================
  // PRIORIDAD 1 — Casos críticos
  // ============================
  {
    id: "critico-total",
    prioridad: 1,
    condicion: (s, e, c) => s === 0 && e === 0 && c === 0,
    recomendacion: "🚨 RECUPERACIÓN CRÍTICA: Tu cuerpo está en déficit total. Blueprint trata el sueño como el medicamento de longevidad número uno. Acción inmediata: esta noche cena al menos 2 horas antes de dormir, inicia una rutina de relajación de 30-60 minutos con lectura o respiración, y mantén tu habitación entre 15-19°C con oscuridad total."
  },
  {
    id: "critico-sueno-energia",
    prioridad: 1,
    condicion: (s, e, c) => s === 0 && e === 0,
    recomendacion: "🚨 Sueño y energía en niveles críticos. Blueprint indica que este patrón rompe el ciclo completo de recuperación biológica. Acción inmediata: establece una hora fija de sueño cada noche, elimina la cafeína al menos 8-10 horas antes de dormir y exponte a luz natural dentro de los primeros 15-30 minutos de despertar."
  },
  {
    id: "critico-sueno-cena",
    prioridad: 1,
    condicion: (s, e, c) => s === 0 && c === 0,
    recomendacion: "🚨 La cena muy tardía está destruyendo tu sueño. Blueprint explica que la digestión activa el sistema nervioso simpático manteniendo tu frecuencia cardíaca elevada, lo que impide que el cuerpo entre en recuperación profunda. Adelanta tu última comida al menos 2 horas antes de dormir esta semana y mide el impacto."
  },
 
  // ============================
  // PRIORIDAD 2 — Problemas moderados combinados
  // ============================
  {
    id: "sueno-cena-moderado",
    prioridad: 2,
    condicion: (s, e, c) => s === 1 && c === 0,
    recomendacion: "⚠️ La cena tardía está limitando la profundidad de tu sueño. Blueprint recomienda comenzar adelantando la cena al menos 2 horas antes de dormir e ir progresando hasta 8 horas. Añade también una rutina de relajación de 30-60 minutos antes de dormir: lectura, baño caliente o ejercicios de respiración."
  },
  {
    id: "energia-cena-moderado",
    prioridad: 2,
    condicion: (s, e, c) => e === 0 && c === 0,
    recomendacion: "⚠️ Cenar muy tarde sobrecarga tu sistema digestivo durante la noche, lo que se traduce directamente en baja energía al día siguiente. Blueprint sugiere cerrar la ventana de alimentación al menos 2 horas antes de dormir. Mañana al despertar, exponte a luz natural en los primeros 15-30 minutos para reactivar tu ciclo circadiano."
  },
  {
    id: "sueno-energia-moderado",
    prioridad: 2,
    condicion: (s, e, c) => s === 1 && e === 1,
    recomendacion: "🟡 Recuperación moderada en sueño y energía. Blueprint recomienda dos acciones concretas: establece una hora fija de sueño todos los días (incluyendo fines de semana) y exponte a luz natural dentro de los primeros 15-30 minutos de despertar para anclar tu ritmo circadiano y mejorar la energía matutina."
  },
  {
    id: "sueno-moderado-cena-tardia",
    prioridad: 2,
    condicion: (s, e, c) => s === 1 && e === 2 && c === 1,
    recomendacion: "🟡 Tu energía está bien pero la cena tardía está limitando la profundidad de tu sueño. Blueprint advierte que aunque tengas energía ahora, cenar tarde eleva tu frecuencia cardíaca nocturna e interrumpe los ciclos de recuperación. Adelanta la cena 45 minutos esta semana. Tu buena energía actual es la ventana para corregir este hábito antes de que te afecte."
  },


 
  // ============================
  // PRIORIDAD 3 — Un solo problema
  // ============================
  {
    id: "solo-sueno-malo",
    prioridad: 3,
    condicion: (s, e, c) => s === 0 && e >= 1 && c >= 1,
    recomendacion: "😴 El sueño es tu único punto crítico hoy. Blueprint indica que el sueño es el pilar que sostiene todos los demás hábitos. Esta noche: mantén tu habitación entre 15-19°C, oscuridad total, sin pantallas al menos 1 hora antes de dormir y usa luz tenue cálida o roja en las horas previas al sueño."
  },
  {
    id: "solo-energia-baja",
    prioridad: 3,
    condicion: (s, e, c) => e === 0 && s >= 1 && c >= 1,
    recomendacion: "⚡ Energía baja a pesar de un descanso aceptable. Blueprint recomienda exposición a luz natural dentro de los primeros 15-30 minutos de despertar para regular la producción de melatonina y activar el estado de alerta. Si no hay luz solar disponible usa un dispositivo de 10,000 lux. Añade una caminata corta para activar el metabolismo."
  },
  {
    id: "solo-cena-tarde",
    prioridad: 3,
    condicion: (s, e, c) => c === 0 && s >= 1 && e >= 1,
    recomendacion: "🍽️ Tu única área de mejora es el horario de cena. Blueprint explica que cenar tarde mantiene el sistema digestivo activo durante el sueño, elevando la frecuencia cardíaca y reduciendo la calidad de recuperación nocturna. Empieza cenando al menos 2 horas antes de dormir e intenta progresar hacia una ventana más amplia."
  },
  {
  id: "solo-sueno-moderado",
  prioridad: 3,
  condicion: (s, e, c) => s === 1 && e === 2 && c === 2,
  recomendacion: "😴 Tu cena y energía están en niveles óptimos pero tu sueño no está siendo completamente reparador. Blueprint indica que cuando la alimentación es correcta y aun así el sueño es irregular, el problema suele estar en el ambiente o la rutina previa al sueño. Acción concreta: mantén tu habitación entre 15-19°C con oscuridad total, usa luz tenue cálida en las 2 horas previas a dormir y añade una rutina de relajación de 30-60 minutos antes de acostarte."
  },
  
  // ============================
  // PRIORIDAD 4 — Estado óptimo
  // ============================
  {
    id: "optimo",
    prioridad: 4,
    condicion: (s, e, c) => s === 2 && e === 2 && c === 2,
    recomendacion: "🟢 Recuperación óptima. Estás aplicando los pilares centrales del Blueprint correctamente. Para potenciar aún más tu recuperación añade: exposición a luz natural en los primeros 15-30 minutos de despertar, una rutina de relajación de 30-60 minutos antes de dormir y mantén tu habitación entre 15-19°C. La consistencia diaria es lo que genera resultados biológicos reales."
  },
 
  // ============================
  // PRIORIDAD 5 — Fallback general
  // ============================
  {
    id: "general",
    prioridad: 5,
    condicion: (s, e, c) => true,
    recomendacion: "🟡 Hay margen de mejora en tu recuperación. Blueprint recomienda tres hábitos base: misma hora de sueño todos los días, última comida al menos 2 horas antes de dormir y exposición a luz natural al despertar. La consistencia en estos tres puntos es la base de toda recuperación biológica."
  }
 
];
 
 
//-----------------------------
//Funciones Modulares
//-----------------------------
 
 
/*function leerDatos(){
 
    datos[0] = parseInt(document.getElementById("sueno").value),
    datos[1] = parseInt(document.getElementById("energia").value),
    datos[2] = parseInt(document.getElementById("cena").value)
 
}
*/
function sumaDatos(){
 
  return Math.min(datos[0] + datos[1] + datos[2], 5)
 
}
 
function obtenerEstadoscore(suma){
 
   return Estadoscore.estado[suma]
 
}
 
function obtenerRecomendacion() {
  const s = datos[0]; // sueño
  const e = datos[1]; // energía
  const c = datos[2]; // cena
 
  // Filtra las reglas que se cumplen
  const reglasCumplidas = blueprintReglas
    .filter(regla => regla.condicion(s, e, c))
    // ordena por prioridad
    .sort((a, b) => a.prioridad - b.prioridad);
 
  // Devuelve la recomendación de mayor prioridad (la primera)
  return reglasCumplidas[0].recomendacion;
}
 
 
function obtenerexplicacion(){
 
   return{
 
      sueno: reglaexplicacion.sueno[datos[0]],
      energia: reglaexplicacion.energia[datos[1]],
      cena: reglaexplicacion.cena[datos[2]]
 
   }
 
}
 
 
//-----------------------
//parte de frontem
//------------------------
 
function sel(campo, val, btn) {
  const idx = campo === 'sueno' ? 0 : campo === 'energia' ? 1 : 2;
  datos[idx] = val;
  document.getElementById('opts-' + campo).querySelectorAll('.option-btn').forEach(b => b.className = 'option-btn');
  btn.className = 'option-btn selected-' + val;
  document.getElementById('btn-analizar').disabled = datos.filter(d => d !== null).length < 3;
}
 
//----------------------
//Funcion Principal
//-----------------------
 
function analizar(){
 
  
 
   const suma        = sumaDatos();
   const estado      = obtenerEstadoscore(suma);   
   const recomendacion = obtenerRecomendacion();
   const explicacion = obtenerexplicacion();
 
   // porcentaje para la barra
   const pct = (suma / 5) * 100;
 
   //--------------------
   //Parte de frontem
   //--------------------
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
    <div class="section-title" style="margin-bottom:0.75rem;">Análisis por variable</div>
    <div class="exp-grid">
      <div class="exp-item exp-sueno"><div class="exp-item-label">Sueño</div><div class="exp-item-text">${explicacion.sueno}</div></div>
      <div class="exp-item exp-energia"><div class="exp-item-label">Energía</div><div class="exp-item-text">${explicacion.energia}</div></div>
      <div class="exp-item exp-cena"><div class="exp-item-label">Cena</div><div class="exp-item-text">${explicacion.cena}</div></div>
    </div>
  `;
 
  document.getElementById('overlay').classList.add('open');
  setTimeout(() => { const b = document.getElementById('sbar'); if (b) b.style.width = pct + '%'; }, 400);
 
}
 
//------------------------------
// Panel - Abrir y Cerrar - Frontem
//------------------------------
 
function cerrar() {
  document.getElementById('overlay').classList.remove('open');
}
 
function handleOverlayClick(e) {
  if (e.target === document.getElementById('overlay')) cerrar();
}
