// 1. CLASE PADRE (BASE) 
class Tamagotchi {
    #nombre;
    #hambre;
    #energia;
    #felicidad;
    #salud;
    #especie;
    #estadoGeneral;

    constructor(nombre, especie) {
        this.#nombre = nombre;
        this.#especie = especie;
        this.#hambre = 30;
        this.#energia = 80;
        this.#felicidad = 70;
        this.#salud = 100;
        this.#estadoGeneral = "Feliz";
    }

    get nombre() { return this.#nombre; }
    get especie() { return this.#especie; }
    get hambre() { return this.#hambre; }
    get energia() { return this.#energia; }
    get felicidad() { return this.#felicidad; }
    get salud() { return this.#salud; }
    get estadoGeneral() { return this.#estadoGeneral; }

    set hambre(valor) {
        if (valor > 100) {
            this.#hambre = 100;
        } else if (valor < 0) {
            this.#hambre = 0;
        } else {
            this.#hambre = valor;
        }
        this.actualizarEstado();
    }

    set energia(valor) {
        if (valor > 100) {
            this.#energia = 100;
        } else if (valor < 0) {
            this.#energia = 0;
        } else {
            this.#energia = valor;
        }
        this.actualizarEstado();
    }

    set felicidad(valor) {
        if (valor > 100) {
            this.#felicidad = 100;
        } else if (valor < 0) {
            this.#felicidad = 0;
        } else {
            this.#felicidad = valor;
        }
        this.actualizarEstado();
    }

    set salud(valor) {
        if (valor > 100) {
            this.#salud = 100;
        } else if (valor < 0) {
            this.#salud = 0;
        } else {
            this.#salud = valor;
        }
        this.actualizarEstado();
    }

    set estadoGeneral(nuevoEstado) {
        this.#estadoGeneral = nuevoEstado;
    }

    actualizarEstado() {
        if (this.#salud <= 0) {
            this.#estadoGeneral = "Muerto 🪦";
        } else if (this.#energia < 20) {
            this.#estadoGeneral = "Muy Cansado 🥱";
        } else if (this.#hambre > 75) {
            this.#estadoGeneral = "Hambriento 🍗";
        } else if (this.#felicidad < 30) {
            this.#estadoGeneral = "Aburrido 😔";
        } else {
            this.#estadoGeneral = "Saludable 😊";
        }
    }

    alimentar() {
        if (this.#estadoGeneral === "Muerto 🪦") return;
        this.hambre = this.hambre - 25;
        this.energia = this.energia + 10;
        logConsole("🍖 Alimentaste a " + this.nombre + ". Saciando su apetito.");
    }

    jugar() {
        if (this.#estadoGeneral === "Muerto 🪦") return;
        if (this.energia < 15) {
            logConsole("❌ " + this.nombre + " está muy cansado para jugar.");
            return;
        }
        this.felicidad = this.felicidad + 25;
        this.energia = this.energia - 15;
        this.hambre = this.hambre + 10;
        logConsole("🎮 Jugaste con " + this.nombre + ". ¡Se divirtió un montón!");
    }

    descansar() {
        if (this.#estadoGeneral === "Muerto 🪦") return;
        this.energia = this.energia + 30;
        this.hambre = this.hambre + 5;
        logConsole("💤 " + this.nombre + " tomó una siesta reparadora.");
    }

    acariciar() {
        if (this.#estadoGeneral === "Muerto 🪦") return;
        this.felicidad = this.felicidad + 15;
        logConsole("❤️ Le diste mimos a " + this.nombre + ". Siente tu cariño.");
    }
}

// 2. SUBCLASES
class TamagotchiFuego extends Tamagotchi {
    constructor(nombre) {
        super(nombre, "Fuego");
    }

    alimentar() {
        if (this.estadoGeneral === "Muerto 🪦") return;
        this.hambre = this.hambre - 30;
        this.energia = this.energia + 25;
        logConsole("🔥 " + this.nombre + " devoró carbón picante. ¡Está encendido!");
    }

    jugar() {
        if (this.estadoGeneral === "Muerto 🪦") return;
        if (this.energia < 30) {
            logConsole("❌ " + this.nombre + " no tiene suficiente chispa para jugar.");
            return;
        }
        this.felicidad = this.felicidad + 35;
        this.energia = this.energia - 30;
        this.hambre = this.hambre + 15;
        logConsole("⚡ " + this.nombre + " jugó con demasiada intensidad explosiva.");
    }
}

class TamagotchiAgua extends Tamagotchi {
    constructor(nombre) {
        super(nombre, "Agua");
    }

    alimentar() {
        if (this.estadoGeneral === "Muerto 🪦") return;
        this.hambre = this.hambre - 25;
        this.salud = this.salud + 15;
        logConsole("💧 " + this.nombre + " absorbió gotas purificadoras. Recuperó hambre y salud.");
    }

    jugar() {
        if (this.estadoGeneral === "Muerto 🪦") return;
        if (this.energia < 15) {
            logConsole("❌ " + this.nombre + " está muy cansado para jugar.");
            return;
        }
        this.felicidad = this.felicidad + 10;
        this.energia = this.energia - 15;
        this.hambre = this.hambre + 10;
        logConsole("🌊 " + this.nombre + " jugó solo... pero prefiere tener compañía para divertirse de verdad.");
    }

    transferirSalud(objetivo) {
        if (this.salud > 20) {
            this.salud = this.salud - 15;
            objetivo.salud = objetivo.salud + 25;
            logConsole("🔮 " + this.nombre + " usó Ritual Curativo en " + objetivo.nombre + ".");
        } else {
            logConsole("❌ " + this.nombre + " no tiene suficiente salud para sanar a otros.");
        }
    }
}

class TamagotchiTierra extends Tamagotchi {
    constructor(nombre) {
        super(nombre, "Tierra");
    }

    descansar() {
        if (this.estadoGeneral === "Muerto 🪦") return;
        this.energia = 100;
        this.felicidad = this.felicidad + 10;
        logConsole("🪨 " + this.nombre + " se enraizó profundamente. ¡Energía al máximo!");
    }

    alimentar() {
        if (this.estadoGeneral === "Muerto 🪦") return;
        let textoClases = document.body.className;
        let buscar = "modo-noche";
        let esNoche = false;
        for (let i = 0; i <= textoClases.length - buscar.length; i++) {
            let coincidenTodas = true;
            for (let j = 0; j < buscar.length; j++) {
                if (textoClases[i + j] !== buscar[j]) {
                    coincidenTodas = false;
                    break;
                }
            }
            if (coincidenTodas === true) {
                esNoche = true;
                break;
            }
        }

        if (esNoche === true) {
            this.hambre = this.hambre - 50;
            this.energia = this.energia + 20;
            logConsole("🌙🪨 " + this.nombre + " se alimentó de noche. ¡La tierra absorbe el doble de energía!");
        } else {
            this.hambre = this.hambre - 25;
            this.energia = this.energia + 10;
            logConsole("🪨 " + this.nombre + " se alimentó de los minerales del suelo.");
        }
    }
}

// 3. MANEJO DE LISTAS
let listaTamagotchis = [
    new TamagotchiFuego("Flama"),
    new TamagotchiAgua("Gota"),
    new TamagotchiTierra("Roca")
];

const imagenesEspecies = {
    "Fuego":  "assets/imagenes/Fuego.png",
    "Agua":   "assets/imagenes/Agua.png",
    "Tierra": "assets/imagenes/Tierra.png"
};


function renderTamagotchis() {
    const contenedor = document.getElementById("zoo-wrapper");
    contenedor.innerHTML = "";

    if (listaTamagotchis.length === 0) {
        contenedor.innerHTML = `<p class="subtitle" style="grid-column: 1/-1;">El zoológico está vacío. ¡Adopta una criatura elemental!</p>`;
        return;
    }

    for (let i = 0; i < listaTamagotchis.length; i++) {
        const t = listaTamagotchis[i];
        const claseElemento = "card-" + t.especie.toLowerCase();
        const badgeElemento = "badge-" + t.especie.toLowerCase();
        const rutaImagen = imagenesEspecies[t.especie];

        contenedor.innerHTML += `
            <div class="tamagotchi-card ${claseElemento}">
                <div class="card-header">
                    <h3>${t.nombre}</h3>
                    <span class="badge ${badgeElemento}">${t.especie}</span>
                </div>

                <div class="sprite-container">
                    <img src="${rutaImagen}" alt="${t.nombre}" class="tamagotchi-sprite">
                </div>

                <div class="status-indicator">Estado: ${t.estadoGeneral}</div>

                <div class="stats-panel">
                    <div class="stat-row">
                        <label>Hambre: <span>${t.hambre}/100</span></label>
                        <div class="bar-container"><div class="bar bar-hambre" style="width: ${t.hambre}%"></div></div>
                    </div>
                    <div class="stat-row">
                        <label>Energía: <span>${t.energia}/100</span></label>
                        <div class="bar-container"><div class="bar bar-energia" style="width: ${t.energia}%"></div></div>
                    </div>
                    <div class="stat-row">
                        <label>Felicidad: <span>${t.felicidad}/100</span></label>
                        <div class="bar-container"><div class="bar bar-felicidad" style="width: ${t.felicidad}%"></div></div>
                    </div>
                    <div class="stat-row">
                        <label>Salud: <span>${t.salud}/100</span></label>
                        <div class="bar-container"><div class="bar bar-salud" style="width: ${t.salud}%"></div></div>
                    </div>
                </div>

                <div class="actions-panel">
                    <button class="btn-action" onclick="interactuarIndividual(${i}, 'alimentar')">🍖 Comer</button>
                    <button class="btn-action" onclick="interactuarIndividual(${i}, 'jugar')">🎮 Jugar</button>
                    <button class="btn-action" onclick="interactuarIndividual(${i}, 'descansar')">💤 Dormir</button>
                    <button class="btn-action" onclick="interactuarIndividual(${i}, 'acariciar')">❤️ Mimar</button>
                    <button class="btn-action btn-delete" onclick="eliminarTamagotchi(${i})">👋 Liberar al Zoo</button>
                </div>
            </div>
        `;
    }
}

// 4. INTERACCIÓN INDIVIDUAL
function interactuarIndividual(index, accion) {
    const bicho = listaTamagotchis[index];

    if (bicho.estadoGeneral === "Muerto 🪦") {
        logConsole("❌ No podés interactuar con " + bicho.nombre + ". Ha muerto.");
        return;
    }

    if (accion === 'alimentar') bicho.alimentar();
    if (accion === 'jugar')     bicho.jugar();
    if (accion === 'descansar') bicho.descansar();
    if (accion === 'acariciar') bicho.acariciar();

    renderTamagotchis();
}

// 5. CICLO DE VIDA
function pasarTiempo() {
    for (let i = 0; i < listaTamagotchis.length; i++) {
        const t = listaTamagotchis[i];
        if (t.estadoGeneral !== "Muerto 🪦") {
            t.hambre = t.hambre + 4;
            t.energia = t.energia - 3;
            t.felicidad = t.felicidad - 2;

            if (t.hambre >= 85 || t.energia <= 15) {
                t.salud = t.salud - 6;
                logConsole("⚠️ ¡Atención! " + t.nombre + " está perdiendo salud por descuido.");
            }

            if (t.especie === "Fuego" && t.felicidad < 25) {
                t.energia = t.energia - 10;
                logConsole("🔥 " + t.nombre + " entró en modo apagado. ¡Está perdiendo energía rápido!");
            }
        }
    }
    renderTamagotchis();
}
setInterval(pasarTiempo, 5000);

// 6. ADOPTAR Y ELIMINAR
function abrirAdopcion() {
    document.getElementById("modal-adopcion").style.display = "block";
}

function cerrarModal() {
    document.getElementById("modal-adopcion").style.display = "none";
}

function adopcionConfirmada(especie) {
    let nombre = prompt("Dale un nombre a tu invocación de " + especie + ":");

    if (nombre === null || nombre === "") {
        alert("¡Debes asignarle un nombre válido!");
        return;
    }

    let nuevaCriatura;
    if (especie === "Fuego")  nuevaCriatura = new TamagotchiFuego(nombre);
    if (especie === "Agua")   nuevaCriatura = new TamagotchiAgua(nombre);
    if (especie === "Tierra") nuevaCriatura = new TamagotchiTierra(nombre);

    listaTamagotchis.push(nuevaCriatura);
    logConsole("✨ ¡Invocación Exitosa! " + nombre + " de tipo " + especie + " se unió al hábitat.");

    cerrarModal();
    renderTamagotchis();
}

function eliminarTamagotchi(index) {
    const bicho = listaTamagotchis[index];

    let nuevoArray = [];
    for (let i = 0; i < listaTamagotchis.length; i++) {
        if (i !== index) {
            nuevoArray.push(listaTamagotchis[i]);
        }
    }
    listaTamagotchis = nuevoArray;

    logConsole("👋 El elemental " + bicho.nombre + " ha regresado a la naturaleza.");
    renderTamagotchis();
}

// 7. ACTIVIDADES GRUPALES
function toggleAmbiente() {
    const body = document.body;
    const btn = document.getElementById("btn-toggle-time");

    let textoClases = body.className;
    let buscar = "modo-noche";
    let indiceEncontrado = -1;

    for (let i = 0; i <= textoClases.length - buscar.length; i++) {
        let coincidenTodas = true;
        for (let j = 0; j < buscar.length; j++) {
            if (textoClases[i + j] !== buscar[j]) {
                coincidenTodas = false;
                break;
            }
        }
        if (coincidenTodas === true) {
            indiceEncontrado = i;
            break;
        }
    }

    if (indiceEncontrado !== -1) {
        let textoLimpio = "";
        for (let i = 0; i < textoClases.length; i++) {
            if (i < indiceEncontrado || i >= indiceEncontrado + buscar.length) {
                textoLimpio += textoClases[i];
            }
        }
        body.className = textoLimpio;
        btn.innerText = "🌙 Cambiar a Noche";
        logConsole("☀️ El sol brilla en el Zoo Elemental. Energía renovada.");
    } else {
        body.className = textoClases + " modo-noche";
        btn.innerText = "☀️ Cambiar a Día";
        logConsole("🌙 Ha caído la noche en el hábitat. Las criaturas Tierra aprovechan para comer mejor.");
    }
}

function ejecutarFiesta() {
    if (listaTamagotchis.length === 0) return;

    for (let i = 0; i < listaTamagotchis.length; i++) {
        const t = listaTamagotchis[i];
        if (t.estadoGeneral !== "Muerto 🪦") {
            if (t.especie === "Agua") {
                t.felicidad = t.felicidad + 40;
                logConsole("💧 " + t.nombre + " adora las fiestas. ¡Recibió el doble de felicidad!");
            } else {
                t.felicidad = t.felicidad + 20;
            }
            t.energia = t.energia - 10;
        }
    }
    logConsole("🎉 ¡Fiesta en el Ecosistema! Todas las criaturas bailan y suben su felicidad.");
    renderTamagotchis();
}

function ejecutarDuelo() {
    if (listaTamagotchis.length < 2) {
        logConsole("❌ Se necesitan al menos 2 criaturas en el hábitat para iniciar un duelo.");
        return;
    }

    let retador = null;
    let oponente = null;

    for (let i = 0; i < listaTamagotchis.length; i++) {
        if (listaTamagotchis[i].estadoGeneral !== "Muerto 🪦") {
            if (retador === null) {
                retador = listaTamagotchis[i];
            } else if (oponente === null) {
                oponente = listaTamagotchis[i];
                break;
            }
        }
    }

    if (retador === null || oponente === null) {
        logConsole("❌ No hay suficientes criaturas vivas para combatir.");
        return;
    }

    let ganador = null;
    let perdedor = null;

    if (retador.energia >= oponente.energia) {
        ganador = retador;
        perdedor = oponente;
    } else {
        ganador = oponente;
        perdedor = retador;
    }

    ganador.felicidad = ganador.felicidad + 30;
    perdedor.salud = perdedor.salud - 20;
    perdedor.felicidad = perdedor.felicidad - 10;

    logConsole("⚔️ Duelo Amistoso: " + ganador.nombre + " (energía: " + ganador.energia + ") venció a " + perdedor.nombre + " (energía: " + perdedor.energia + ").");
    renderTamagotchis();
}

function ejecutarRitual() {
    let sanador = null;

    for (let i = 0; i < listaTamagotchis.length; i++) {
        const t = listaTamagotchis[i];
        if (t.especie === "Agua" && t.estadoGeneral !== "Muerto 🪦") {
            sanador = t;
            break;
        }
    }

    if (sanador === null) {
        logConsole("🔮 El Ritual falló: se necesita un Tamagotchi de Agua vivo en el zoológico.");
        return;
    }

    let opciones = [];
    for (let i = 0; i < listaTamagotchis.length; i++) {
        const t = listaTamagotchis[i];
        if (t !== sanador && t.estadoGeneral !== "Muerto 🪦") {
            opciones.push(i);
        }
    }

    if (opciones.length === 0) {
        logConsole("🔮 El Ritual falló: no hay otros compañeros vivos para curar.");
        return;
    }

    let mensaje = "¿A quién quiere curar " + sanador.nombre + "?\n";
    for (let i = 0; i < opciones.length; i++) {
        const idx = opciones[i];
        mensaje += (i + 1) + ". " + listaTamagotchis[idx].nombre + " (" + listaTamagotchis[idx].especie + " - Salud: " + listaTamagotchis[idx].salud + ")\n";
    }

    let eleccion = prompt(mensaje + "\nEscribí el número de tu elección:");
    let numero = parseInt(eleccion);

    if (numero !== numero || numero < 1 || numero > opciones.length) {
        logConsole("🔮 Ritual cancelado.");
        return;
    }

    let objetivo = listaTamagotchis[opciones[numero - 1]];
    sanador.transferirSalud(objetivo);
    renderTamagotchis();
}

function ejecutarCarrera() {
    if (listaTamagotchis.length < 2) {
        logConsole("❌ Se necesitan al menos 2 criaturas para organizar una carrera.");
        return;
    }

    let participantes = [];
    for (let i = 0; i < listaTamagotchis.length; i++) {
        if (listaTamagotchis[i].estadoGeneral !== "Muerto 🪦") {
            participantes.push(listaTamagotchis[i]);
        }
    }

    if (participantes.length < 2) {
        logConsole("❌ No hay suficientes criaturas vivas para correr.");
        return;
    }

    let puntajes = [];
    for (let i = 0; i < participantes.length; i++) {
        let base = 0;
        if (participantes[i].especie === "Fuego") {
            base = 70;
        } else {
            base = 40;
        }
        let puntaje = base + Math.floor(Math.random() * 30);
        puntajes.push(puntaje);
    }

    let ganadorIndex = 0;
    for (let i = 1; i < puntajes.length; i++) {
        if (puntajes[i] > puntajes[ganadorIndex]) {
            ganadorIndex = i;
        }
    }

    let ganador = participantes[ganadorIndex];

    for (let i = 0; i < participantes.length; i++) {
        participantes[i].energia = participantes[i].energia - 20;
    }
    ganador.felicidad = ganador.felicidad + 30;

    logConsole("🏁 ¡Carrera Elemental! " + ganador.nombre + " cruzó primero la meta. Todos gastaron energía.");
    renderTamagotchis();
}

// 8. CONSOLA DE EVENTOS
function logConsole(mensaje) {
    const consola = document.getElementById("event-console");
    consola.innerHTML = '<span class="console-line">>> ' + mensaje + '</span>' + consola.innerHTML;
}

// Renderizado inicial
renderTamagotchis();