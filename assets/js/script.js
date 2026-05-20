// --- 1. LÓGICA DE CLASES ---
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

  get nombre() {
    return this.#nombre;
  }
  get hambre() {
    return this.#hambre;
  }
  get energia() {
    return this.#energia;
  }
  get felicidad() {
    return this.#felicidad;
  }
  get salud() {
    return this.#salud;
  }

  set hambre(valor) {
    this.#hambre = Math.max(0, Math.min(100, valor));
  }
  set energia(valor) {
    this.#energia = Math.max(0, Math.min(100, valor));
  }
  set felicidad(valor) {
    this.#felicidad = Math.max(0, Math.min(100, valor));
  }
  set salud(valor) {
    this.#salud = Math.max(0, Math.min(100, valor));
  }

  alimentar() {
    this.hambre -= 20;
    this.energia += 10;
    logConsole(`🍽️ ${this.nombre} comió.`);
  }
  jugar() {
    this.felicidad += 20;
    this.energia -= 15;
    logConsole(`⚾ ${this.nombre} jugó.`);
  }
  curar() {
    this.salud += 25;
    logConsole(`💉 ${this.nombre} fue curado.`);
  }
  descansar() {
    this.energia += 30;
    logConsole(`💤 ${this.nombre} descansó.`);
  }
  acariciar() {
    this.felicidad += 10;
    logConsole(`❤️ Acariciaste a ${this.nombre}.`);
  }

  get estadoGeneral() {
    if (this.salud <= 20) return "Enfermo";
    if (this.energia <= 20) return "Agotado";
    if (this.felicidad <= 20) return "Triste";
    return "Feliz";
  }
}

class TamagotchiIgnis extends Tamagotchi {
  constructor(nombre) {
    super(nombre);
    this.especie = "Ignis";
    this.emoji = "🔥";
  }
  alimentar() {
    this.hambre -= 25;
    this.energia += 25;
    logConsole(`🔥 ${this.nombre} comió carbón picante.`);
    this.verificarApagado();
  }
  jugar() {
    this.felicidad += 30;
    this.energia -= 30;
    logConsole(`🔥 ${this.nombre} jugó impulsivamente.`);
    this.verificarApagado();
  }
  verificarApagado() {
    if (this.felicidad < 25) {
      this.energia -= 20;
      logConsole(`⚠️ ${this.nombre} se está apagando.`);
    }
  }
  get estadoGeneral() {
    return this.felicidad < 25 ? "Apagado" : super.estadoGeneral;
  }
}

class TamagotchiAqua extends Tamagotchi {
  constructor(nombre) {
    super(nombre);
    this.especie = "Aqua";
    this.emoji = "💧";
  }
  alimentar() {
    super.alimentar();
    this.salud += 15;
    logConsole(`💧 ${this.nombre} se hidrató.`);
  }
  jugar(enGrupo = false) {
    if (enGrupo) {
      this.felicidad += 35;
      this.energia -= 15;
      logConsole(`💧 ${this.nombre} amó la fiesta.`);
    } else {
      this.felicidad += 5;
      this.energia -= 10;
      logConsole(`💧 ${this.nombre} jugó solo (se aburre).`);
    }
  }
  transferirSalud(companero) {
    if (this.salud > 20) {
      this.salud -= 15;
      companero.salud += 20;
      logConsole(`🔮 ${this.nombre} curó a ${companero.nombre}.`);
    }
  }
}
class TamagotchiUmbra extends Tamagotchi {
  #sigilo;
  constructor(nombre) {
    super(nombre);
    this.especie = "Umbra";
    this.emoji = "🦇";
    this.#sigilo = 50;
  }
  get sigilo() {
    return this.#sigilo;
  }
  set sigilo(valor) {
    this.#sigilo = Math.max(0, Math.min(100, valor));
  }
  jugar() {
    this.felicidad += 20;
    this.energia += 20;
    this.sigilo += 15;
    logConsole(`🦇 ${this.nombre} jugó durmiendo en las sombras.`);
  }
  alimentar(esDeNoche = false) {
    if (esDeNoche) {
      this.hambre -= 40;
      this.energia += 25;
      logConsole(`🦇 ${this.nombre} se dio un festín nocturno.`);
    } else {
      super.alimentar();
    }
  }
}

// --- 2. GESTIÓN DE LA INTERFAZ ---
const instIgnis = new TamagotchiIgnis("Ignis");
const instAqua = new TamagotchiAqua("Aqua");
const instUmbra = new TamagotchiUmbra("Umbra");
const listaTamagotchis = [instIgnis, instAqua, instUmbra];
let ambienteNocturno = false;

// --- 3. FUNCIONES DE INTERACCIÓN ---
function toggleAmbiente() {
  ambienteNocturno = !ambienteNocturno;
  document.getElementById("btn-toggle-time").innerText = ambienteNocturno
    ? "Cambiar a Día ☀️"
    : "Cambiar a Noche 🌙";
  logConsole(
    ambienteNocturno
      ? "🌌 El zoológico ahora está de NOCHE."
      : "☀️ El zoológico ahora está de DÍA.",
  );
  renderTamagotchis();
}
// funcion para mostrar mensajes en la consola del juego
function logConsole(mensaje) {
  const consola = document.getElementById("event-console");
  consola.innerHTML += `<br>>> ${mensaje}`;
  consola.scrollTop = consola.scrollHeight;
}

// función para animar el botón y el icono del tamagotchi al hacer click
function animarBotonIcono(index, accion) {
  const t = listaTamagotchis[index];
  if (accion === "alimentar" && t.especie === "Umbra")
    t.alimentar(ambienteNocturno);
  else t[accion]();

  const charDiv = document.getElementById(`char-${index}`);
  charDiv.style.transform = "scale(1.3)";
  setTimeout(() => {
    charDiv.style.transform = "scale(1)";
    renderTamagotchis();
  }, 200);
}

// función para renderizar los tamagotchis en la interfaz
function renderTamagotchis() {
  const wrapper = document.getElementById("zoo-wrapper");
  wrapper.innerHTML = "";

  listaTamagotchis.forEach((t, index) => {
    const isDead = t.estadoGeneral === "Apagado" || t.salud === 0;

    const cardHTML = `
                    <div class="device-wrapper">
                        <div class="tamagotchi-egg egg-${t.especie.toLowerCase()}">
                            <div class="golden-frame">
                                <div class="screen">
                                    <div class="screen-overlay ${isDead ? "visible" : ""}">X_X</div>
                                    <div class="screen-icons">
                                        <span>🍴</span><span>💡</span><span>⚾</span><span>💉</span>
                                    </div>
                                    <div class="character" id="char-${index}">${isDead ? "👻" : t.emoji}</div>
                                    <div class="screen-icons">
                                        <span>🦆</span><span>⚖️</span><span>🗣️</span><span>😃</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="hardware-buttons">
                                <button class="hw-btn" onclick="animarBotonIcono(${index}, 'alimentar')" title="A: Alimentar"></button>
                                <button class="hw-btn" onclick="animarBotonIcono(${index}, 'jugar')" title="B: Jugar"></button>
                                <button class="hw-btn" onclick="animarBotonIcono(${index}, 'curar')" title="C: Curar"></button>
                            </div>
                        </div>

                        <div class="stats-panel">
                            <h3>${t.nombre} <small class="status-label">[${t.estadoGeneral}]</small></h3>
                            <div class="stat-line"><span>Hambre</span> <div class="bar-bg"><div class="bar-fill fill-h" style="width:${t.hambre}%"></div></div></div>
                            <div class="stat-line"><span>Energía</span> <div class="bar-bg"><div class="bar-fill fill-e" style="width:${t.energia}%"></div></div></div>
                            <div class="stat-line"><span>Felicidad</span> <div class="bar-bg"><div class="bar-fill fill-f" style="width:${t.felicidad}%"></div></div></div>
                            <div class="stat-line"><span>Salud</span> <div class="bar-bg"><div class="bar-fill fill-s" style="width:${t.salud}%"></div></div></div>
                            ${t.especie === "Umbra" ? `<div class="stat-line"><span>Sigilo</span> <div class="bar-bg"><div class="bar-fill" style="background:#a855f7; width:${t.sigilo}%"></div></div></div>` : ""}
                            
                            <div class="extra-actions">
                                <button class="btn-small" onclick="animarBotonIcono(${index}, 'descansar')">💤 Descansar</button>
                                <button class="btn-small" onclick="animarBotonIcono(${index}, 'acariciar')">❤️ Acariciar</button>
                            </div>
                        </div>
                    </div>
                `;
    wrapper.innerHTML += cardHTML;
  });
}

// --- GRUPALES ---
function ejecutarFiesta() {
  logConsole("🎉 Fiesta Elemental!");
  listaTamagotchis.forEach((t) => {
    if (t.especie === "Aqua") t.jugar(true);
    else if (t.especie === "Umbra") {
      t.felicidad += 15;
      t.sigilo -= 25;
    } else t.felicidad += 20;
  });
  renderTamagotchis();
}

function ejecutarDuelo() {
  const ganador = Math.random() > 0.5 ? instIgnis : instAqua;
  const perdedor = ganador === instIgnis ? instAqua : instIgnis;
  ganador.felicidad += 20;
  perdedor.salud -= 15;
  logConsole(`⚔️ Duelo: ${ganador.nombre} vence a ${perdedor.nombre}.`);
  renderTamagotchis();
}

function ejecutarRitual() {
  instAqua.transferirSalud(instIgnis);
  instAqua.transferirSalud(instUmbra);
  renderTamagotchis();
}

renderTamagotchis();