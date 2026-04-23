// assets/js/main.js
const searchInput = document.getElementById('search');
const iconTypeSelect = document.getElementById('iconType');
const gridContainer = document.getElementById('grid');
const statsDiv = document.getElementById('stats');
const copyToast = document.getElementById('copyToast');

let currentType = 'far';
let currentSearch = '';

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        copyToast.classList.add('show');
        setTimeout(() => copyToast.classList.remove('show'), 1500);
    } catch(err) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copyToast.classList.add('show');
        setTimeout(() => copyToast.classList.remove('show'), 1500);
    }
}

function renderIcons(icons) {
    if (!icons || icons.length === 0) {
        gridContainer.innerHTML = '<div class="empty">No icons found.</div>';
        statsDiv.textContent = '0 icons';
        return;
    }
    
    const fragment = document.createDocumentFragment();
    
    icons.forEach(iconName => {
        const card = document.createElement('div');
        card.className = 'card';
        const iconClass = `${currentType} fa-${iconName}`;
        
        card.innerHTML = `
            <i class="${iconClass}"></i>
            <div class="class-name">${iconClass}</div>
        `;
        
        card.addEventListener('click', () => copyToClipboard(iconClass));
        fragment.appendChild(card);
    });
    
    gridContainer.innerHTML = '';
    gridContainer.appendChild(fragment);
    statsDiv.textContent = `${icons.length} of ${iconsList.length} icons`;
}

function filterAndRender() {
    let filtered = [...iconsList];
    
    if (currentSearch.trim() !== '') {
        const searchTerm = currentSearch.toLowerCase().trim();
        filtered = filtered.filter(iconName => 
            iconName.toLowerCase().includes(searchTerm)
        );
    }
    
    renderIcons(filtered);
}

let searchTimeout;
function handleSearch() {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        currentSearch = searchInput.value;
        filterAndRender();
    }, 200);
}

function handleTypeChange() {
    currentType = iconTypeSelect.value;
    filterAndRender();
}

searchInput.addEventListener('input', handleSearch);
iconTypeSelect.addEventListener('change', handleTypeChange);

if (typeof iconsList !== 'undefined' && iconsList.length > 0) {
    filterAndRender();
} else {
    gridContainer.innerHTML = '<div class="empty">Error: CSS file not found.</div>';
}
