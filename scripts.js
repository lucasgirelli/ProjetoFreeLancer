// Arquivo de scripts globais para o site
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar ícones Lucide (se disponível)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Função global para mostrar toast de notificação
    window.showToast = function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info'}" class="toast-icon"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close">
                <i data-lucide="x" class="toast-close-icon"></i>
            </button>
        `;
        
        document.querySelector('.toast-container').appendChild(toast);
        
        // Reinicializar ícones para os novos elementos
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Fechar toast ao clicar no botão
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.add('toast-exit');
            setTimeout(() => {
                toast.remove();
            }, 300);
        });
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            toast.classList.add('toast-exit');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    };
    
    // Função para simular um usuário autenticado (em uma aplicação real, isso seria verificado pelo backend)
    window.getCurrentUser = function() {
        return {
            id: '1',
            name: 'João da Silva',
            email: 'joao@exemplo.com',
            role: 'customer',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
            location: 'São Paulo, SP',
            phone: '(11) 98765-4321',
            profileComplete: true
        };
    };
    
    // Função para redirecionar usuários não autenticados
    window.checkAuth = function() {
        // Simula verificação de autenticação
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        
        if (!isAuthenticated) {
            window.location.href = 'login.html';
            return false;
        }
        
        return true;
    };
    
    // Função para simular login
    window.loginUser = function(email, password) {
        // Simulação simples (em uma aplicação real, isso seria verificado pelo backend)
        if (email && password) {
            localStorage.setItem('isAuthenticated', 'true');
            return true;
        }
        return false;
    };
    
    // Função para simular logout
    window.logoutUser = function() {
        localStorage.removeItem('isAuthenticated');
        window.location.href = 'login.html';
    };
});
