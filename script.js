// Elementos do DOM
const btnStart = document.getElementById("start");
const btnStop = document.getElementById("stop");
const btnReset = document.getElementById("reset");
const mili = document.getElementById("mili");
const segundos = document.getElementById("segundos");
const minutos = document.getElementById("minutos");
const horas = document.getElementById("horas");

// Ponteiros do relógio
const hourHand = document.querySelector('.hour-hand');
const minHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

// Variáveis de controle
let startTimer = null;
let isRunning = false;
let ms = 0;
let seg = 0;
let min = 0;
let hr = 0;

// Formata número para sempre ter dois dígitos
function formatNumber(num) {
    return num < 10 ? `0${num}` : num;
}

// Atualiza os ponteiros do relógio
function updateClockHands() {
    const secondsDegrees = ((seg + ms/100) / 60) * 360;
    const minutesDegrees = ((min + seg/60) / 60) * 360;
    const hoursDegrees = ((hr + min/60) / 12) * 360;

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

// Inicia o cronômetro
function start() {
    if (!isRunning) {
        isRunning = true;
        btnStart.classList.add("ativo");
        btnStop.classList.remove("ativo");
        
        startTimer = setInterval(() => {
            ms++;
            
            if (ms >= 100) {
                ms = 0;
                seg++;
                
                if (seg >= 60) {
                    seg = 0;
                    min++;
                    
                    if (min >= 60) {
                        min = 0;
                        hr++;
                    }
                }
            }
            
            atualizaValor();
            updateClockHands();
        }, 10);
    }
}

// Para o cronômetro
function stop() {
    if (isRunning) {
        clearInterval(startTimer);
        isRunning = false;
        btnStop.classList.add("ativo");
        btnStart.classList.remove("ativo");
    }
}

// Reseta o cronômetro
function reset() {
    clearInterval(startTimer);
    isRunning = false;
    ms = 0;
    seg = 0;
    min = 0;
    hr = 0;
    
    btnStart.classList.remove("ativo");
    btnStop.classList.remove("ativo");
    
    atualizaValor();
    updateClockHands();
}

// Atualiza os valores no display
function atualizaValor() {
    mili.innerHTML = formatNumber(ms);
    segundos.innerHTML = formatNumber(seg);
    minutos.innerHTML = formatNumber(min);
    horas.innerHTML = formatNumber(hr);
}

// Event Listeners
btnStart.addEventListener("click", start);
btnStop.addEventListener("click", stop);
btnReset.addEventListener("click", reset);

// Inicialização
document.querySelectorAll('.marker').forEach((marker, index) => {
    marker.style.transform = `rotate(${index * 30}deg)`;
});

document.querySelectorAll('.number').forEach(number => {
    const value = number.textContent;
    number.innerHTML = `<span>${value}</span>`;
});

// Inicializar display e ponteiros
atualizaValor();
updateClockHands();