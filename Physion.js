//-----------------------
// Variable Global
//-----------------------
let datos = [null, null, null]
 
 
//----------------------------
// Base de Datos
// EstadoScore y explicacion
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
 
    // explicacion
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
// Base de datos Blueprint
//--------------------------
 
const blueprintReglas = [
 
  // ============================
  // PRIORIDAD 1 — Casos críticos
  // ============================
  {
    id: "critico-total",
    prioridad: 1,
    condicion: (s, e, c) => s === 0 && e === 0 && c === 0,
    recomendacion: "🚨 Tu cuerpo está pidiendo un descanso real. Dormiste mal, tu energía está agotada y encima cenaste tarde — esa combinación no le da ninguna oportunidad a tu cuerpo de recuperarse. Esta noche empieza diferente: cena al menos 2 horas antes de acostarte, apaga las pantallas media hora antes y procura que tu cuarto esté oscuro y fresco (entre 15 y 19°C). Pequeños cambios esta noche = mañana te levantas diferente.",
    alternativa: "No puedes cenar temprano ni controlar el cuarto: al menos deja de comer 90 minutos antes de acostarte, apaga la pantalla del móvil y pon el cuarto lo más oscuro que puedas con lo que tengas — una camiseta sobre los ojos funciona."
  },
  {
    id: "critico-sueno-energia",
    prioridad: 1,
    condicion: (s, e, c) => s === 0 && e === 0,
    recomendacion: "🚨 Sueño malo y sin energía — tu cuerpo no pudo recuperarse anoche. Cuando esto pasa seguido, el cuerpo nunca termina de recargar las pilas. Lo más importante ahora: pon una hora fija para acostarte (aunque sea hoy) y mañana sal a tomar luz natural en los primeros 30 minutos después de despertar. Ese simple hábito le dice a tu cuerpo a qué hora debe tener energía.",
    alternativa: "No puedes fijar una hora de sueño ni salir a tomar sol: pon una alarma para acostarte, aunque no tengas sueño. Y mañana, abre una ventana o siéntate cerca del vidrio los primeros 10 minutos del día — la luz del interior también cuenta, solo es menos potente."
  },
  {
    id: "critico-sueno-cena",
    prioridad: 1,
    condicion: (s, e, c) => s === 0 && c === 0,
    recomendacion: "🚨 Cenar muy tarde te arruinó el sueño. Cuando comes justo antes de dormir, tu cuerpo sigue trabajando en la digestión en vez de descansar — y eso se nota. Esta semana intenta cenar al menos 2 horas antes de irte a la cama. No tiene que ser perfecto desde el primer día, solo un poco antes que ayer.",
    alternativa: "No puedes cenar 2 horas antes: haz la cena más ligera que puedas. Una cena pesada y tardía es peor que una ligera y tardía — tu cuerpo tiene menos trabajo que hacer mientras intenta descansar."
  },
 
  // ============================
  // PRIORIDAD 2 — Problemas moderados combinados
  // ============================
  {
    id: "sueno-cena-moderado",
    prioridad: 2,
    condicion: (s, e, c) => s === 1 && c === 0,
    recomendacion: "⚠️ La cena tarde está afectando la calidad de tu sueño, aunque no te des cuenta. Tu cuerpo intenta dormir mientras todavía está digiriendo, y eso hace que el descanso sea más superficial. Prueba esta semana cenar 45 minutos antes que tu horario habitual. No tienes que cambiar todo de golpe — solo un poco, y ve viendo cómo te despiertas.",
    alternativa: "No puedes cenar más temprano por tu horario: reduce el tamaño de la cena. Menos comida = menos digestión activa mientras duermes. Evita especialmente los carbohidratos simples y el azúcar en esa comida tardía."
  },
  {
    id: "energia-cena-moderado",
    prioridad: 2,
    condicion: (s, e, c) => e === 0 && c === 0,
    recomendacion: "⚠️ Parte de tu cansancio de hoy viene de anoche. Cuando cenas tarde, tu cuerpo pasa la noche trabajando en la digestión en lugar de recuperarse, y eso se traduce en poca energía al despertar. Mañana intenta tomar luz natural en los primeros 30 minutos del día — eso ayuda a activar el cuerpo. Y esta noche, cierra la cocina al menos 2 horas antes de dormir.",
    alternativa: "No puedes cambiar la hora de cenar ni salir al sol: toma un vaso grande de agua al despertar antes de cualquier otra cosa, y muévete aunque sean 5 minutos — unos estiramientos o una vuelta corta. No reemplaza la luz natural pero activa el metabolismo de forma similar."
  },
  {
    id: "sueno-energia-moderado",
    prioridad: 2,
    condicion: (s, e, c) => s === 1 && e === 1,
    recomendacion: "🟡 Ni bien ni mal — estás en modo ahorro de energía. Tu cuerpo descansó a medias y tu energía lo refleja. La clave aquí es la consistencia: intenta acostarte y levantarte a la misma hora todos los días, incluso el fin de semana. Y mañana, saca 10-15 minutos para exponerte a luz natural al despertar. Esos dos hábitos solos marcan una diferencia real con el tiempo.",
    alternativa: "No puedes mantener horarios fijos ni salir a tomar luz: pon al menos la alarma de levantarte a la misma hora todos los días, aunque la de acostarte varíe. La hora de despertar es la que ancla el ritmo circadiano, no tanto la de dormir."
  },
  {
    id: "sueno-moderado-cena-tardia",
    prioridad: 2,
    condicion: (s, e, c) => s === 1 && e === 2 && c === 1,
    recomendacion: "🟡 Tienes buena energía, pero tu sueño no está siendo todo lo reparador que podría. La cena un poco tarde puede estar jugando en contra sin que lo notes mucho. Aprovecha que hoy te sientes bien para hacer un ajuste pequeño: intenta cenar 30-45 minutos antes esta semana. Cuando la energía está bien es el mejor momento para mejorar el sueño — antes de que se convierta en un problema.",
    alternativa: "No puedes adelantar la cena: intenta que tu última comida sea la más ligera del día. Si puedes, evita comer en el sofá o en la cama — comer en la mesa aunque sea tarde le da al cuerpo una señal más clara de que la comida terminó."
  },

  {
    id: "energia-moderada-cena-tardia",
    prioridad: 2,
    condicion: (s, e, c) => s === 2 && e === 1 && c === 1,
    recomendacion: "🔋 Dormiste bien, pero la cena tardía y tu energía baja están conectadas. Blueprint explica que cuando cenas tarde tu cuerpo gasta energía digiriendo durante la noche en vez de recuperarse, y eso se nota al día siguiente en tu nivel de energía. Acción concreta: adelanta la cena 30-45 minutos esta semana y observa si tu energía matutina mejora.",
    alternativa: "Si no puedes cenar más temprano por tu horario: reduce el tamaño de la cena tardía y hazla lo más ligera posible, evita carbohidratos pesados y grasas. Una cena ligera tarde es menos dañina para tu recuperación que una cena abundante tarde."
  },
 
  // ============================
  // PRIORIDAD 3 — Un solo problema
  // ============================
  {
    id: "solo-sueno-malo",
    prioridad: 3,
    condicion: (s, e, c) => s === 0 && e >= 1 && c >= 1,
    recomendacion: "😴 Lo demás está bien, pero el sueño falló anoche. El descanso es la base de todo — sin él, con el tiempo lo demás también se resiente. Esta noche prueba una cosa concreta: cuarto oscuro, fresco (entre 15 y 19°C) y sin pantallas al menos 30-60 minutos antes de dormir. Si puedes, cambia el móvil por un libro o algo relajante esa última hora.",
    alternativa: "No puedes controlar el ambiente ni dejar las pantallas: activa el modo oscuro o noche en todos tus dispositivos y baja el brillo al mínimo en la última hora. No es lo mismo que apagarlos, pero reduce significativamente el impacto de la luz azul."
  },
  {
    id: "solo-energia-baja",
    prioridad: 3,
    condicion: (s, e, c) => e === 0 && s >= 1 && c >= 1,
    recomendacion: "⚡ Dormiste bien y cenaste bien, pero la energía no acompañó hoy. Puede pasar. Una cosa que marca la diferencia: mañana, en los primeros 30 minutos después de despertar, sal a tomar luz natural aunque sea 10-15 minutos. Eso le dice a tu cuerpo que ya es de día y activa la energía de manera natural. Si no hay sol, una vuelta corta también ayuda.",
    alternativa: "No puedes salir ni hay luz solar: haz 5-10 minutos de movimiento ligero nada más despertar — estiramientos, caminar por la casa. El movimiento activa las mismas señales de alerta que la luz natural, aunque de forma más leve."
  },
  {
    id: "solo-cena-tarde",
    prioridad: 3,
    condicion: (s, e, c) => c === 0 && s >= 1 && e >= 1,
    recomendacion: "🍽️ Sueño y energía en buena forma — solo la cena llegó tarde. Cenar muy tarde hace que tu cuerpo trabaje digiriendo mientras intentas descansar, lo que reduce la calidad del sueño aunque no lo notes mucho todavía. Esta semana, intenta cerrar la cocina al menos 2 horas antes de dormir. Un cambio pequeño con impacto real.",
    alternativa: "No puedes cenar más temprano esta semana: empieza por adelantar solo 15-20 minutos. No parece mucho pero crea el hábito. En dos semanas ya habrás adelantado casi media hora sin que se sienta como un esfuerzo."
  },
  {
    id: "solo-sueno-moderado",
    prioridad: 3,
    condicion: (s, e, c) => s === 1 && e === 2 && c === 2,
    recomendacion: "😴 Cenas bien, tienes buena energía — lo único que falla es la calidad del sueño. Cuando todo lo demás está bien y aún así el sueño no es reparador, casi siempre tiene que ver con el ambiente o los 60 minutos antes de acostarte. Prueba esto: cuarto fresco (entre 15 y 19°C), luz tenue en las 2 horas previas a dormir y una pequeña rutina de relajación antes de meterte a la cama — puede ser leer, respirar tranquilo, lo que te funcione.",
    alternativa: "No puedes cambiar el ambiente ni crear una rutina nueva: elige una sola cosa pequeña para hacer diferente esta noche antes de dormir — puede ser dejar el móvil en otra habitación, tomarte un vaso de agua tranquilo o simplemente sentarte 5 minutos sin hacer nada. La rutina no tiene que ser elaborada para funcionar."
  },

  {
    id: "solo-energia-moderada",
    prioridad: 3,
    condicion: (s, e, c) => s === 2 && e === 1 && c === 2,
    recomendacion: "🔋 Dormiste bien y cenaste a buena hora, pero tu energía no está al 100%. Esto le pasa a tu cuerpo cuando el sueño fue suficiente en horas pero no completamente reparador. Prueba esto hoy: sal a recibir luz natural en los primeros 15-30 minutos después de despertar, aunque sean 10 minutos frente a una ventana. La luz del día le indica a tu cerebro que es hora de activarse y producir energía.",
    alternativa: 'No puedes salir ni tienes luz natural disponible: muévete 5-10 minutos nada más despertar — estiramientos, caminar por la casa, lo que sea. El movimiento le manda a tu cuerpo la misma señal de "ya es de día, actívate", aunque de forma más leve que el sol.'
  },

  {
  id: "solo-cena-tardia-moderada",
  prioridad: 3,
  condicion: (s, e, c) => s === 2 && e === 2 && c === 1,
  recomendacion: "🍽️ Tu sueño y energía están en niveles óptimos, tu único punto débil es la hora de la cena. Aunque por ahora no está afectando tu descanso ni tu energía, Blueprint advierte que cenar tarde de forma repetida eleva tu frecuencia cardíaca durante la noche e interrumpe los ciclos de recuperación profunda a largo plazo. Acción concreta: adelanta la cena 30 minutos esta semana, es un cambio pequeño que tu cuerpo notará rápido.",
  alternativa: "Si tu horario no te permite cenar más temprano: haz la cena lo más ligera posible, evita carbohidratos pesados y grasas. Una cena ligera tardía es mucho menos dañina para tu recuperación que una cena abundante tardía."
  },
 
  // ============================
  // PRIORIDAD 4 — Estado óptimo
  // ============================
  {
    id: "optimo",
    prioridad: 4,
    condicion: (s, e, c) => s === 2 && e === 2 && c === 2,
    recomendacion: "🟢 Todo en orden — dormiste bien, tienes energía y cenaste a buena hora. Eso no es poco. Para seguir subiendo el nivel, puedes añadir: luz natural en los primeros 30 minutos del día y mantener el cuarto entre 15 y 19°C al dormir. Lo más importante ahora es la consistencia — los resultados reales vienen de repetir esto día tras día.",
    alternativa: "No puedes añadir nada nuevo ahora mismo: no pasa nada. Lo más valioso que puedes hacer es no romper lo que ya funciona — mantén los horarios aunque sea fin de semana."
  },
 
  // ============================
  // PRIORIDAD 5 — Fallback general
  // ============================
  {
    id: "general",
    prioridad: 5,
    condicion: (s, e, c) => true,
    recomendacion: "🟡 Hay espacio para mejorar. Tres hábitos simples que marcan la diferencia: acostarte a la misma hora todos los días, cenar al menos 2 horas antes de dormir y tomar luz natural al despertar. No tienes que hacer todo a la vez — elige uno y empieza por ahí.",
    alternativa: "No puedes implementar los tres hábitos: elige solo uno. El más fácil para ti. Cualquiera de los tres tiene impacto por sí solo — no tienes que hacerlos todos a la vez para empezar a notar diferencia."
  }
 
];
 
 
//-----------------------------
// Funciones Modulares
//-----------------------------
 
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
  return {
    recomendacion: reglasCumplidas[0].recomendacion,
    alternativa:   reglasCumplidas[0].alternativa
  }
 
}
 
function obtenerexplicacion(){
 
   return{
 
      sueno:   reglaexplicacion.sueno[datos[0]],
      energia: reglaexplicacion.energia[datos[1]],
      cena:    reglaexplicacion.cena[datos[2]]
 
   }
 
}
 
 
//-----------------------
// Parte de Frontend
//-----------------------
 
function sel(campo, val, btn) {
  const idx = campo === 'sueno' ? 0 : campo === 'energia' ? 1 : 2;
  datos[idx] = val;
  document.getElementById('opts-' + campo).querySelectorAll('.option-btn').forEach(b => b.className = 'option-btn');
  btn.className = 'option-btn selected-' + val;
  document.getElementById('btn-analizar').disabled = datos.filter(d => d !== null).length < 3;
}
 
// Landing — scroll hacia la app
function empezar() {
  document.getElementById('app-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
 
 
//----------------------
// Funcion Principal
//-----------------------
 
function analizar(){
 
   const suma           = sumaDatos();
   const estado         = obtenerEstadoscore(suma);
   const { recomendacion, alternativa } = obtenerRecomendacion();
   const explicacion    = obtenerexplicacion();
 
   // porcentaje para la barra
   const pct = (suma / 5) * 100;
 
   //--------------------
   // Parte de Frontend
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
 
  document.getElementById('overlay').classList.add('open');
  setTimeout(() => { const b = document.getElementById('sbar'); if (b) b.style.width = pct + '%'; }, 400);
 
}
 
 
//------------------------------
// Panel - Abrir y Cerrar
//------------------------------
 
function cerrar() {
  document.getElementById('overlay').classList.remove('open');
}
 
function handleOverlayClick(e) {
  if (e.target === document.getElementById('overlay')) cerrar();
}