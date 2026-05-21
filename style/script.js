// ── Themes ───────────────────────────────────────
const themes = [
    { name: 'Midnight', gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' },
    { name: 'Ocean',    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)' },
    { name: 'Obsidian', gradient: 'linear-gradient(135deg, #000000 0%, #434343 100%)' },
    { name: 'Rose',     gradient: 'linear-gradient(135deg, #c06c84 0%, #6c3483 50%, #355c7d 100%)' },
    { name: 'Sakura',   gradient: 'linear-gradient(135deg, #f8cdda 0%, #c06c84 40%, #7b2d8b 100%)' },
    { name: 'Aurora',   gradient: 'linear-gradient(135deg, #0b3d0b 0%, #1a472a 30%, #2e7d32 60%, #00695c 100%)' },
];

const themeGrid = document.getElementById('theme-grid');
const cardGradient = document.getElementById('card-gradient');

themes.forEach((t, i) => {
    const sw = document.createElement('div');
    sw.className = 'theme-swatch' + (i === 0 ? ' active' : '');
    sw.style.background = t.gradient;
    sw.title = t.name;
    sw.addEventListener('click', () => {
        document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
        sw.classList.add('active');
        cardGradient.style.background = t.gradient;
    });
    themeGrid.appendChild(sw);
});

cardGradient.style.background = themes[0].gradient;

// ── Logo toggle ───────────────────────────────────
function setLogo(type) {
    const mc   = document.getElementById('mc-logo-el');
    const visa = document.getElementById('visa-logo-el');
    const btnMc   = document.getElementById('btn-mc');
    const btnVisa = document.getElementById('btn-visa');
    if (type === 'mc') {
        mc.style.display = 'flex';
        visa.style.display = 'none';
        btnMc.classList.add('active');
        btnVisa.classList.remove('active');
    } else {
        mc.style.display = 'none';
        visa.style.display = 'block';
        btnMc.classList.remove('active');
        btnVisa.classList.add('active');
    }
}

// ── Live Edit ─────────────────────────────────────
document.getElementById('inp-number').addEventListener('input', e => {
    let raw = e.target.value.replace(/\D/g,'').slice(0,16);
    let fmt = raw.match(/.{1,4}/g)?.join(' ') || '';
    e.target.value = fmt;
    document.getElementById('card-number-display').textContent = fmt || 'XXXX XXXX XXXX XXXX';
});
document.getElementById('inp-name').addEventListener('input', e => {
    document.getElementById('card-name-display').textContent = e.target.value.toUpperCase() || 'CARD HOLDER';
});
document.getElementById('inp-expiry').addEventListener('input', e => {
    let raw = e.target.value.replace(/\D/g,'').slice(0,4);
    if (raw.length > 2) raw = raw.slice(0,2) + '/' + raw.slice(2);
    e.target.value = raw;
    document.getElementById('card-expiry-display').textContent = raw || 'MM/YY';
});
document.getElementById('inp-brand').addEventListener('input', e => {
    document.getElementById('card-brand').textContent = e.target.value.toUpperCase() || 'MASTERCARD';
});

// ── Download Card ─────────────────────────────────
async function downloadCard() {
    const btn = document.getElementById('download-btn');
    const card = document.getElementById('atm-card');

    // Disable hover transform sementara
    card.style.transform = 'none';
    btn.textContent = 'Generating...';
    btn.disabled = true;

    try {
        const canvas = await html2canvas(card, {
            scale: 2,            // 2x resolution → tajam
            useCORS: true,
            backgroundColor: null,
            logging: false,
            width: card.offsetWidth,
            height: card.offsetHeight,
        });

        // Buat link download
        const link = document.createElement('a');
        link.download = 'atm-card-vyy.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch(err) {
        alert('Gagal download: ' + err.message);
    }

    // Restore
    card.style.transform = '';
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Card Image`;
    btn.disabled = false;
}

// ── 3-second Loading → Main ───────────────────────
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hide');
        const main = document.getElementById('main-page');
        main.classList.add('show');
        setTimeout(() => {
            document.querySelector('.site-header').classList.add('animate');
            document.querySelector('.card-preview-section').classList.add('animate');
            document.querySelector('.themes-section').classList.add('animate');
            document.querySelector('.editor-section').classList.add('animate');
        }, 100);
    }, 3000);
});
