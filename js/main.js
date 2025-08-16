const themeBtn = document.getElementById('themeToggle')
const nav = document.getElementById('siteNav')
const navBtn = document.getElementById('navToggle')
const navLinks = document.getElementById('primaryNav')
const date = new Date().getFullYear()
const mql = window.matchMedia('(prefers-color-scheme: dark)')
const html = document.documentElement

document.getElementById('year').textContent = date

function updateThemeBtn(theme = html.getAttribute('data-theme')) {
    const themeBtn = document.getElementById('themeToggle')
    if (!themeBtn) return
    themeBtn.textContent = theme === 'light' ? '🌙' : '☀️'
}

function applyTheme(theme) {
    html.setAttribute('data-theme', theme)
    updateThemeBtn(theme)
}

(function initTheme() {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
        applyTheme(stored)
    } else {
        applyTheme(mql.matches ? 'dark' : 'light')
    }
})()

themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || (mql.matches ? 'dark' : 'light')
    const next = current === 'light' ? 'dark' : 'light'
    applyTheme(next)
    localStorage.setItem('theme', next)
})

function toggleNav() {
    const isOpen = nav.classList.toggle('open')
    navBtn.setAttribute('aria-expanded', String(isOpen))
}

navBtn.addEventListener('click', toggleNav)

navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.matchMedia('(max-width: 900px)').matches) {
        nav.classList.remove('open')
        navBtn.setAttribute('aria-expanded', 'false')
    }
})

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        nav.classList.remove('open')
        navBtn.setAttribute('aria-expanded', 'false')
    }
})


document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]')
    if (!btn) return
    const type = btn.getAttribute('data-filter')
    window.renderProjects({ type })
})