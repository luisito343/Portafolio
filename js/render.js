window.renderProjects = async function renderProjects({ type = 'all' } = {}) {
    try {
        const res = await fetch('./js/data/projects.json')
        const all = await res.json()
        const list = type === 'all' ? all : all.filter(p => p.type === type)
        const grid = document.querySelector('[data-projects-grid]')
        if (!grid) return
        grid.innerHTML = list.map(p => `
        <article class="card">
            <img src="${p.image}" alt="Vista previa: ${p.title}" loading="lazy" />
            <div class="body">
                <div class="badge">${p.type}</div>
                <h3>${p.title}</h3>
                <p class="subtitle">${p.description}</p>
                <div class="stack">${p.stack.map(s => `<span>${s}</span>`).join('')}</div>
                <p style="margin-top:10px">
                    ${p.demo ? `<a class="btn" href="${p.demo}" target="_blank" rel="noopener">Demo</a>` : ''}
                    ${p.code ? `<a class="btn ghost" href="${p.code}" target="_blank" rel="noopener">Código</a>` : ''}
                </p>
            </div>
        </article>
    `).join('')
    } catch (err) {
        console.error('Error cargando proyectos:', err)
    }
}

// Render inicial
document.addEventListener('DOMContentLoaded', () => window.renderProjects())