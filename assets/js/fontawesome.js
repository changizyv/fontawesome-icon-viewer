// کش کردن المان‌ها
const searchInput = document.getElementById('search');
const gridContainer = document.getElementById('grid');
const statsDiv = document.getElementById('stats');
const copyToast = document.getElementById('copyToast');

let allIcons = window.fontawesomeIcons || [];
let currentFilteredIcons = [];
let renderTimeout = null;
let searchDebounceTimeout = null;

// تابع کپی متن به کلیپ‌بورد
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        copyToast.classList.add('show');
        setTimeout(() => {
            copyToast.classList.remove('show');
        }, 1500);
    } catch (err) {
        console.error('کپی ناموفق:', err);
        // روش قدیمی برای مرورگرهای قدیمی
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copyToast.classList.add('show');
        setTimeout(() => {
            copyToast.classList.remove('show');
        }, 1500);
    }
}

// رندر کردن آیکون‌ها با استفاده از DocumentFragment برای سرعت بالاتر
function renderIcons(icons) {
    const fragment = document.createDocumentFragment();
    
    icons.forEach(icon => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-class', icon.name);
        card.setAttribute('data-hex', icon.hex);
        
        card.innerHTML = `
            <div class="icon">${icon.code}</div>
            <div class="class-name">${icon.name}</div>
        `;
        
        // اضافه کردن رویداد کلیک برای کپی
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            copyToClipboard(icon.name);
        });
        
        fragment.appendChild(card);
    });
    
    // پاک کردن و اضافه کردن جدید
    gridContainer.innerHTML = '';
    gridContainer.appendChild(fragment);
    
    // آپدیت آمار
    statsDiv.textContent = `${icons.length} از ${allIcons.length} آیکون`;
}

// تابع فیلتر کردن با بهینه‌سازی
function filterIcons(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        currentFilteredIcons = [...allIcons];
    } else {
        const term = searchTerm.toLowerCase().trim();
        currentFilteredIcons = allIcons.filter(icon => 
            icon.className.includes(term) || 
            icon.name.toLowerCase().includes(term) ||
            icon.type.includes(term)
        );
    }
    
    // رندر با تاخیر برای جلوگیری از lag
    if (renderTimeout) {
        clearTimeout(renderTimeout);
    }
    
    renderTimeout = setTimeout(() => {
        renderIcons(currentFilteredIcons);
        renderTimeout = null;
    }, 50);
}

// جستجو با debounce برای کاهش پردازش
function handleSearch() {
    if (searchDebounceTimeout) {
        clearTimeout(searchDebounceTimeout);
    }
    
    searchDebounceTimeout = setTimeout(() => {
        filterIcons(searchInput.value);
        searchDebounceTimeout = null;
    }, 200);
}

// نمایش لودینگ اولیه
function showLoading() {
    gridContainer.innerHTML = '<div class="loading">در حال بارگذاری آیکون‌ها...</div>';
}

// رندر اولیه
function init() {
    if (allIcons && allIcons.length > 0) {
        currentFilteredIcons = [...allIcons];
        renderIcons(currentFilteredIcons);
    } else {
        gridContainer.innerHTML = '<div class="empty">هیچ آیکونی یافت نشد. فایل CSS صحیح نیست.</div>';
        statsDiv.textContent = '0 آیکون';
    }
}

// اضافه کردن رویدادها
if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
}

// اجرای اولیه
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
