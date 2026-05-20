// --- 1. LÓGICA DE CLASES ---//
class Tamagotchi {
  #nombre;
  #hambre;
  #energia;
  #felicidad;
  #salud;

  constructor(nombre) {
    this.#nombre = nombre;
    this.#hambre = 30;
    this.#energia = 70;
    this.#felicidad = 60;
    this.#salud = 100;
  }

  get nombre() { return this.#nombre; }
  get hambre() { return this.#hambre; }
  get energia() { return this.#energia; }
  get felicidad() { return this.#felicidad; }
  get salud() { return this.#salud; }

  set hambre(valor) {
    if (valor > 100) this.#hambre = 100;
    else if (valor < 0) this.#hambre = 0;
    else this.#hambre = valor;
  }
  set energia(valor) {
    if (valor > 100) this.#energia = 100;
    else if (valor < 0) this.#energia = 0;
    else this.#energia = valor;
  }
  set felicidad(valor) {
    if (valor > 100) this.#felicidad = 100;
    else if (valor < 0) this.#felicidad = 0;
    else this.#felicidad = valor;
  }
  set salud(valor) {
    if (valor > 100) this.#salud = 100;
    else if (valor < 0) this.#salud = 0;
    else this.#salud = valor;
  }

  alimentar() {
    this.hambre -= 20;
    this.energia += 10;
    logConsole("🍽️ " + this.nombre + " comió.");
  }
  jugar() {
    this.felicidad += 20;
    this.energia -= 15;
    logConsole("⚾ " + this.nombre + " jugó.");
  }
  curar() {
    this.salud += 25;
    logConsole("💉 " + this.nombre + " fue curado.");
  }
  descansar() {
    this.energia += 30;
    logConsole("💤 " + this.nombre + " descansó.");
  }
  acariciar() {
    this.felicidad += 10;
    logConsole("❤️ Acariciaste a " + this.nombre + ".");
  }

  get estadoGeneral() {
    if (this.salud <= 20) return "Enfermo";
    if (this.energia <= 20) return "Agotado";
    if (this.felicidad <= 20) return "Triste";
    return "Feliz";
  }
}

class TamagotchiFuego extends Tamagotchi {
  constructor(nombre) { super(nombre); this.especie = "Fuego"; this.emoji = "🔥"; }
  alimentar() {
    this.hambre -= 25;
    this.energia += 25;
    logConsole("🔥 " + this.nombre + " comió carbón picante.");
    this.verificarApagado();
  }
  jugar() {
    this.felicidad += 30;
    this.energia -= 30;
    logConsole("🔥 " + this.nombre + " jugó impulsivamente.");
    this.verificarApagado();
  }
  verificarApagado() {
    if (this.felicidad < 25) {
      this.energia -= 20;
      logConsole("⚠️ " + this.nombre + " se está apagando.");
    }
  }
  get estadoGeneral() {
    return this.felicidad < 25 ? "Apagado" : super.estadoGeneral;
  }
}

class TamagotchiAgua extends Tamagotchi {
  constructor(nombre) { super(nombre); this.especie = "Agua"; this.emoji = "💧"; }
  alimentar() {
    super.alimentar();
    this.salud += 15;
    logConsole("💧 " + this.nombre + " se hidrató.");
  }
  jugar(enGrupo) {
    if (enGrupo) {
      this.felicidad += 35;
      this.energia -= 15;
      logConsole("💧 " + this.nombre + " amó la fiesta.");
    } else {
      this.felicidad += 5;
      this.energia -= 10;
      logConsole("💧 " + this.nombre + " jugó solo.");
    }
  }
  transferirSalud(companero) {
    if (this.salud > 20) {
      this.salud -= 15;
      companero.salud += 20;
      logConsole("🔮 " + this.nombre + " curó a " + companero.nombre + ".");
    }
  }
}

class TamagotchiTierra extends Tamagotchi {
  #defensa = 50;
  constructor(nombre) { super(nombre); this.especie = "Tierra"; this.emoji = "🪨"; }
  get defensa() { return this.#defensa; }
  set defensa(valor) {
    if (valor > 100) this.#defensa = 100;
    else if (valor < 0) this.#defensa = 0;
    else this.#defensa = valor;
  }
  jugar() {
    this.felicidad += 15;
    this.energia -= 30;
    this.defensa += 20;
    logConsole("🪨 " + this.nombre + " entrenó duro.");
  }
  descansar() {
    this.energia += 60;
    logConsole("🪨 " + this.nombre + " se enterró a descansar.");
  }
}
// --- 2. GESTIÓN E INTERFAZ ---
const instFuego = new TamagotchiFuego("Fuego");
const instAgua = new TamagotchiAgua("Agua");
const instTierra = new TamagotchiTierra("Tierra");
const listaTamagotchis = [instFuego, instAgua, instTierra];
let ambienteNocturno = false;

// Dia o Noche
function toggleAmbiente() {
  ambienteNocturno = !ambienteNocturno;
  document.getElementById("btn-toggle-time").innerText = ambienteNocturno ? "Cambiar a Día ☀️" : "Cambiar a Noche 🌙";
  renderTamagotchis();
}
// Mensajes en consola
function logConsole(mensaje) {
  const consola = document.getElementById("event-console");
  consola.innerHTML += "<br>>> " + mensaje;
}
// Interración de Botones
function animarBotonIcono(index, accion) {
  if (accion === 'jugar' && listaTamagotchis[index].especie === 'Agua') {
    listaTamagotchis[index].jugar(false);
  } else {
    listaTamagotchis[index][accion]();
  }
  renderTamagotchis();
}
// ---RENDERIZADO  ---//
function renderTamagotchis() {
  const wrapper = document.getElementById("zoo-wrapper");
  wrapper.innerHTML = "";

  for (let i = 0; i < listaTamagotchis.length; i++) {
    const t = listaTamagotchis[i];
    const isDead = t.estadoGeneral === "Apagado" || t.salud === 0;
    
    let lineaDefensa = "";
    if (t.especie === "Tierra") {
      lineaDefensa = '<div class="stat-line"><span>Defensa</span> <div class="bar-bg"><div class="bar-fill fill-u" style="width:' + t.defensa + '%"></div></div></div>';
    } else {
      lineaDefensa = '<div class="stat-line" style="visibility:hidden"><span>.</span></div>';
    }

    wrapper.innerHTML += `
      <div class="device-wrapper">
        <div class="tamagotchi-egg egg-${t.especie.toLowerCase()}">
          <div class="golden-frame">
            <div class="screen">
              <div class="screen-overlay ${isDead ? "visible" : ""}">${isDead ? "X_X" : ""}</div>
              <div class="character">${isDead ? "👻" : t.emoji}</div>
            </div>
          </div>
          <div class="hardware-buttons">
            <button class="hw-btn" onclick="animarBotonIcono(${i}, 'alimentar')"></button>
            <button class="hw-btn" onclick="animarBotonIcono(${i}, 'jugar')"></button>
            <button class="hw-btn" onclick="animarBotonIcono(${i}, 'curar')"></button>
          </div>
        </div>
        <div class="stats-panel">
          <h3>${t.nombre} <small class="status-label">[${t.estadoGeneral}]</small></h3>
          <div class="stat-line"><span>Hambre</span> <div class="bar-bg"><div class="bar-fill fill-h" style="width:${t.hambre}%"></div></div></div>
          <div class="stat-line"><span>Energía</span> <div class="bar-bg"><div class="bar-fill fill-e" style="width:${t.energia}%"></div></div></div>
          <div class="stat-line"><span>Felicidad</span> <div class="bar-bg"><div class="bar-fill fill-f" style="width:${t.felicidad}%"></div></div></div>
          <div class="stat-line"><span>Salud</span> <div class="bar-bg"><div class="bar-fill fill-s" style="width:${t.salud}%"></div></div></div>
          ${lineaDefensa}
          <div class="extra-actions">
            <button class="btn-small" onclick="animarBotonIcono(${i}, 'descansar')">💤 Descansar</button>
            <button class="btn-small" onclick="animarBotonIcono(${i}, 'acariciar')">❤️ Acariciar</button>
          </div>
        </div>
      </div>`;
  }
}
function ejecutarFiesta() {
  for (let i = 0; i < listaTamagotchis.length; i++) {
    const t = listaTamagotchis[i];
    if (t.especie === "Agua") t.jugar(true);
    else t.felicidad += 20;
  }
  renderTamagotchis();
}

function ejecutarDuelo() {
  instFuego.felicidad += 20;
  instAgua.salud -= 15;
  logConsole("⚔️ Duelo realizado.");
  renderTamagotchis();
}

function ejecutarRitual() {
  instAgua.transferirSalud(instFuego);
  renderTamagotchis();
}

renderTamagotchis();