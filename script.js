const sidebar = document.getElementById('sidebar');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenu.addEventListener('click', () => sidebar.classList.toggle('open'));

document.querySelectorAll('.group-title').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('open');
  });
});

document.querySelectorAll('.nav-link, .submenu a').forEach(link => {
  link.addEventListener('click', () => sidebar.classList.remove('open'));
});

document.querySelectorAll('.expand').forEach(button => {
  button.addEventListener('click', () => {
    const lab = button.closest('.lab');
    lab.classList.toggle('open');
    button.textContent = lab.classList.contains('open') ? 'Fechar −' : 'Ver cenário +';
  });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const current = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (current) current.classList.add('active');
    }
  });
}, { rootMargin: '-25% 0px -65% 0px' });

sections.forEach(section => observer.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('copyProfile').addEventListener('click', async () => {
  const text = `Eriko Lucena — Service Desk | Suporte Técnico | Cibersegurança
Busco minha primeira oportunidade em TI para desenvolver experiência prática em suporte, redes e infraestrutura, com objetivo de evoluir para Segurança Cibernética.`;
  try {
    await navigator.clipboard.writeText(text);
    const btn = document.getElementById('copyProfile');
    const old = btn.textContent;
    btn.textContent = 'Copiado ✓';
    setTimeout(() => btn.textContent = old, 1800);
  } catch {
    alert('Não foi possível copiar automaticamente. Selecione o texto na apresentação.');
  }
});

// Abra automaticamente o primeiro grupo no desktop.
if (window.innerWidth > 700) {
  document.querySelector('.nav-group')?.classList.add('open');
}
