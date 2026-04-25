// Минимальный JS: перемещение колонок по вертикали + случайная X-позиция при каждом цикле

// Функция для управления количеством колонок
function manageColumns() {
    const columns = document.querySelectorAll('.column');
    const MAX_COLUMNS = window.innerWidth < 768 ? 15 : 50;
    
    if (columns.length > MAX_COLUMNS) {
        // Удаляем лишние колонки
        for (let i = MAX_COLUMNS; i < columns.length; i++) {
            columns[i].remove();
        }
    }
}

// Сразу удаляем лишние колонки при загрузке
manageColumns();

// Получаем актуальные колонки после удаления
let columns = document.querySelectorAll('.column');

function startColumnRain(column, delay = 0) {
    const duration = 1.7 + Math.random() * 1.3;
    
    function fallCycle() {
        column.style.transition = 'none';
        column.style.transform = `translateY(-50%)`;
        column.style.top = '-40%';
        
        // Меняем X-позицию
        const viewportWidth = window.innerWidth;
        const columnWidth = column.offsetWidth;
        const maxX = Math.max(0, viewportWidth - columnWidth);
        const randomX = Math.random() * maxX;
        column.style.left = `${randomX}px`;
        
        void column.offsetHeight;
        
        column.style.transition = `transform ${duration}s linear`;
        column.style.transform = `translateY(150vh)`;
    }
    
    setTimeout(() => {
        fallCycle();
        setInterval(fallCycle, duration * 1000 + 100);
    }, delay);
}

// Запускаем только существующие колонки
columns.forEach((col, idx) => {
    const randomDelay = Math.random() * 3000;
    startColumnRain(col, randomDelay);
});