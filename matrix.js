const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Incorporating a diverse range of characters from different languages
const japanese = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const kanji = '日一国会人年大十二本中長出三同時政事自行社見月分議後前民生連五発間対上部東者党地員';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const cyrillic = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
const greek = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ';
const numbers = '0123456789';
const symbols = '$+-_*=/<>?!@#%&';

const characters = japanese + katakana + kanji + latin + cyrillic + greek + numbers + symbols;

const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

// `drops` array stores the y-coordinate for each column
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function draw() {
    // Fading effect: semi-transparent black rectangle covers the whole canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Green text
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        // Get a random character from the `characters` string
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        // x, y coordinates
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        // Draw the character
        ctx.fillText(text, x, y);

        // Reset drop to the top if it has reached the bottom of the screen
        // Random condition adds a more dynamic and less uniform feel to the rain
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Increment y-coordinate for the next frame
        drops[i]++;
    }
}

setInterval(draw, 33);

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Recalculate columns and reset drops, otherwise the effect will be broken
    const newColumns = Math.floor(canvas.width / fontSize);
    drops.length = 0; // Clear the array
    for (let x = 0; x < newColumns; x++) {
        drops[x] = 1;
    }
});
