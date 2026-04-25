// Добавьте этот JavaScript для создания партиклов
(function createParticles() {
    const container = document.querySelector('.neon');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    container.appendChild(particlesContainer);
    
    const particleCount = 80; // Количество частиц
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайные размеры (от 2px до 8px)
        const size = 2 + Math.random() * 6;
        particle.style.setProperty('--size', `${size}px`);
        
        // Случайная позиция относительно центра
        const angle = Math.random() * Math.PI * 2;
        const radius = 150 + Math.random() * 400; // от 150px до 550px от центра
        const xPos = Math.cos(angle) * radius;
        const yPos = Math.sin(angle) * radius;
        
        particle.style.left = `calc(50% + ${xPos}px)`;
        particle.style.top = `calc(50% + ${yPos}px)`;
        
        // Случайные параметры движения
        const moveX = (Math.random() - 0.5) * 200;
        const moveY = (Math.random() - 0.5) * 200;
        const moveZ = (Math.random() - 0.5) * 100;
        
        particle.style.setProperty('--x', moveX);
        particle.style.setProperty('--y', moveY);
        particle.style.setProperty('--z', moveZ);
        
        // Случайная длительность анимации (6-15 секунд)
        const duration = 6 + Math.random() * 9;
        particle.style.setProperty('--duration', `${duration}s`);
        
        // Случайная задержка
        const delay = Math.random() * 10;
        particle.style.setProperty('--delay', `${delay}s`);
        
        // Случайная прозрачность
        const opacity = 0.3 + Math.random() * 0.6;
        particle.style.setProperty('--opacity', opacity);
        
        // Случайное свечение
        const glow = 4 + Math.random() * 12;
        particle.style.setProperty('--glow', `${glow}px`);
        
        // 20% частиц делаем более яркими
        if (Math.random() < 0.2) {
            particle.classList.add('particle--glow');
        }
        
        // 30% частиц с мерцанием
        if (Math.random() < 0.3) {
            particle.classList.add('particle--sparkle');
        }
        
        // Для разнообразия, некоторые частицы используют reverse анимацию
        if (Math.random() < 0.4) {
            particle.style.animation = `float3dReverse ${duration}s infinite ease-in-out`;
            particle.style.animationDelay = `${delay}s`;
        }
        
        particlesContainer.appendChild(particle);
    }
})();


// Символы для матрицы (расширенный набор: katakana, цифры, буквы, бинарные символы)
const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789!@#$%^&*()_+[]{};:<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01";
const charsArray = matrixChars.split('');
// ---------- 3) ДОПОЛНИТЕЛЬНЫЙ ЭФФЕКТ:  МАТРИЧНЫЕ "ГЛИТЧИ" НАД ТЕКСТОМ ----------
// Добавим случайную анимацию искажения для букв OVERWEB (имитация матричного глитча)
const nameSpans = document.querySelectorAll('.neon__name span');
function applyMatrixGlitch() {
    setInterval(() => {
        if (Math.random() > 0.5) {
            const randomSpan = nameSpans[Math.floor(Math.random() * nameSpans.length)];
            const originalText = randomSpan.innerText;
            const glitchChar = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            randomSpan.style.transition = '0.05s';
            randomSpan.innerText = glitchChar;
            setTimeout(() => {
                randomSpan.innerText = originalText;
            }, 70);
        }
        // дополнительно: эффект смещения тени
        if (Math.random() > 0.92) {
            const title = document.querySelector('.neon__name');
            title.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                title.style.transform = '';
            }, 60);
        }
    }, 800);
}
applyMatrixGlitch()


// ---------- 4) МЕРЦАНИЕ ЗНАЧКОВ В МАТРИЧНЫХ КОЛЬЦАХ (динамическое обновление data-code) ----------
const matrixRings = document.querySelectorAll('.matrix-ring');
const randomCodeStrings = [
    "01001101 01100001 01110100 01110010 01101001 01111000", 
    "10101110 01101011 01101111 01100100 01100101", 
    ">_ SYSTEM ONLINE _< 0xF0 0x9C 0x3A", 
    "01101001 01101110 01101001 01110100 00100000 01101101 01100001 01110100 01110010 01101001 01111000",
    "ЗАЩИТА ПЕРЕГРУЖЕНА", 
    "%% 10011100 00110101 11010110 %%", 
    "WAKE UP NEO...", 
    "МАТРИЦА ПЕРЕЗАПУСК", 
    "101010 111100 001111 100101"
];

function updateRingCode() {
    matrixRings.forEach(ring => {
        if (Math.random() > 0.7) {
            let newCode = randomCodeStrings[Math.floor(Math.random() * randomCodeStrings.length)];
            // добавляем случайные символы в конец или начало для разнообразия
            if (Math.random() > 0.5) newCode += " " + Math.floor(Math.random() * 9999).toString(16);
            ring.setAttribute('data-code', newCode);
        }
    });
    setTimeout(updateRingCode, 2800 + Math.random() * 2000);
}
updateRingCode();
