
// Funcionalidade básica de JavaScript para o site

document.addEventListener('DOMContentLoaded', function() {
    // Detecta o tema do sistema (claro/escuro)
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Adiciona classe ao body com base na preferência
    if (prefersDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Destaque para o card do serviço ao passar o mouse
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--primary)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'var(--border)';
        });
    });
});

// Função para mostrar notificações tipo toast (será usada nas páginas que precisam de feedback)
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remover após alguns segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Simular autenticação básica (será expandido nas páginas de login/registro)
const authModule = {
    isLoggedIn: false,
    currentUser: null,
    
    login(email, password) {
        // Simulação de login - em uma aplicação real, isso seria uma chamada de API
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    this.isLoggedIn = true;
                    this.currentUser = {
                        name: email.split('@')[0],
                        email: email,
                        role: email.includes('worker') ? 'worker' : 'customer'
                    };
                    localStorage.setItem('user', JSON.stringify(this.currentUser));
                    resolve(this.currentUser);
                } else {
                    reject(new Error('Credenciais inválidas'));
                }
            }, 1000);
        });
    },
    
    logout() {
        this.isLoggedIn = false;
        this.currentUser = null;
        localStorage.removeItem('user');
        return Promise.resolve();
    },
    
    checkAuth() {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.isLoggedIn = true;
                return true;
            } catch (e) {
                this.logout();
                return false;
            }
        }
        return false;
    }
};

// Verifica autenticação ao carregar a página
authModule.checkAuth();
