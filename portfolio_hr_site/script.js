document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/profile.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Populate Header
            document.getElementById('profile-name').textContent = data.name;
            document.getElementById('profile-role').textContent = data.role;
            
            const contactLinksContainer = document.getElementById('contact-links');
            const footerLinksContainer = document.getElementById('footer-links');
            
            let contactLinksHtml = '';
            if (data.contact.email) {
                contactLinksHtml += `<a href="mailto:${data.contact.email}" class="contact-btn">Email</a>`;
            }
            if (data.contact.links) {
                for (const [name, url] of Object.entries(data.contact.links)) {
                    contactLinksHtml += `<a href="${url}" target="_blank" class="contact-btn">${name}</a>`;
                }
            }
            contactLinksContainer.innerHTML = contactLinksHtml;
            footerLinksContainer.innerHTML = contactLinksHtml;

            // Populate Summary
            document.getElementById('profile-summary').textContent = data.summary;

            // Populate Skills
            const skillsContainer = document.getElementById('skills-container');
            skillsContainer.innerHTML = data.skills.map(skill => `<span class="tag">${skill}</span>`).join('');

            // Populate Experience
            const experienceContainer = document.getElementById('experience-container');
            experienceContainer.innerHTML = data.experience.map((exp, index) => `
                <div class="timeline-item">
                    <div class="timeline-content">
                        <h3>${exp.company}</h3>
                        <p class="timeline-title">${exp.title}</p>
                        <span class="timeline-period">${exp.period}</span>
                        <div class="stat-badges">
                            ${(exp.metrics || []).map(metric => `<span class="stat-badge">${metric}</span>`).join('')}
                        </div>
                        <ul class="highlights">
                            ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                        ${(exp.star_examples || []).length > 0 ? `
                        <div class="accordion">
                            ${exp.star_examples.map((star, starIndex) => `
                                <div class="accordion-item">
                                    <button class="accordion-header" aria-expanded="false" aria-controls="star-${index}-${starIndex}">
                                        <strong>STAR:</strong> ${star.name}
                                        <span class="accordion-icon">+</span>
                                    </button>
                                    <div id="star-${index}-${starIndex}" class="accordion-content" hidden>
                                        <p><strong>Situation:</strong> ${star.S}</p>
                                        <p><strong>Task:</strong> ${star.T}</p>
                                        <p><strong>Action:</strong> ${star.A}</p>
                                        <p><strong>Result:</strong> ${star.R}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        ` : ''}
                    </div>
                </div>
            `).join('');

            // Populate Projects
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = data.projects.map(proj => `
                <div class="project-card">
                    <h3>${proj.name}</h3>
                    <p><strong>What:</strong> ${proj.what}</p>
                    <p><strong>Outcome:</strong> ${proj.outcome}</p>
                </div>
            `).join('');

            // Add Accordion Logic
            document.querySelectorAll('.accordion-header').forEach(button => {
                button.addEventListener('click', () => {
                    const content = button.nextElementSibling;
                    const isExpanded = button.getAttribute('aria-expanded') === 'true';
                    
                    button.setAttribute('aria-expanded', !isExpanded);
                    content.hidden = isExpanded;
                    button.querySelector('.accordion-icon').textContent = isExpanded ? '+' : '-';
                });
            });
        })
        .catch(error => {
            console.error('Failed to load profile data:', error);
            const mainContainer = document.querySelector('main.container');
            if(mainContainer) {
                mainContainer.innerHTML = '<p style="text-align: center; color: red;">콘텐츠를 불러오는 데 실패했습니다. data/profile.json 파일이 올바른지 확인해주세요.</p>';
            }
        });
});
