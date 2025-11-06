// Lightweight interactive JS for portfolio_hr
document.addEventListener('DOMContentLoaded', () => {
    // Populate experience from hr_projects.json
    fetch('./data/hr_projects.json')
        .then(r => r.json())
        .then(data => {
            const expContainer = document.getElementById('experience-list');
            const projectsContainer = document.getElementById('hr-projects');
            if (!expContainer || !projectsContainer) return;

            // Show entities of type '프로젝트', '프로그램' as experience/projects
            const typesOfInterest = new Set(['프로젝트','프로그램']);
            const entities = (data.entities || []).filter(e => typesOfInterest.has(e.type));

            entities.forEach(e => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <h3>${e.name}</h3>
                    <div style="color:#6b7280; margin:8px 0;">${e.type}</div>
                    <p style="color:#374151">${e.description || ''}</p>
                `;
                expContainer.appendChild(card.cloneNode(true));
                projectsContainer.appendChild(card);
            });
        })
        .catch(err => console.error('데이터 로드 실패(hr_projects):', err));

    // Skills radar from hr_skills.json
    fetch('./data/hr_skills.json')
        .then(r => r.json())
        .then(mat => {
            const skills = mat.skills || [];
            const labels = skills.map(s => s.name);
            const data = skills.map(s => s.level);
            const ctx = document.getElementById('skills-radar');
            if (ctx && window.Chart) {
                new Chart(ctx, {
                    type: 'radar',
                    data: { labels, datasets: [{ label: '숙련도(10)', data, backgroundColor: 'rgba(63,81,181,0.12)', borderColor: '#3f51b5' }] },
                    options: { scales: { r: { suggestedMin:0, suggestedMax:10 } } }
                });
            }

            const ul = document.getElementById('skills-list');
            if (ul) {
                ul.innerHTML = skills.map(s => `<li style="padding:8px 0; border-bottom:1px solid #f3f4f6">${s.name} <span style="color:#6b7280">(Lv.${s.level})</span><div style="color:#9ca3af">${s.evidence||''}</div></li>`).join('');
            }
        })
        .catch(err => console.error('Skills 로드 실패:', err));

    // Simple Hiring Dashboard example (mock KPIs)
    const hiringCtx = document.getElementById('hiring-dashboard');
    if (hiringCtx && window.Chart) {
        const labels = ['Lead Time','Offer Rate','Acceptance Rate','Retention 3mo'];
        const values = [35, 22, 78, 92]; // example percentages or days
        new Chart(hiringCtx, {
            type: 'bar',
            data: { labels, datasets: [{ label: 'KPI (예시)', data: values, backgroundColor: ['#3f51b5','#4caf50','#ff9800','#9c27b0'] }] },
            options: { responsive:true, plugins:{legend:{display:false}} }
        });
        const legend = document.getElementById('dashboard-legend');
        if (legend) legend.textContent = '예시: Lead Time(일), Offer/Acceptance/Retention(%)';
    }
});
