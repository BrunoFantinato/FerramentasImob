// --- Mobile Menu Toggle ---

// Obtém referências para o botão do menu e o próprio menu móvel
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Adiciona um ouvinte de evento para o clique no botão do menu
menuButton.addEventListener('click', () => {
    // Alterna a classe 'hidden' no menu móvel para mostrá-lo ou escondê-lo
    mobileMenu.classList.toggle('hidden');
    // Adiciona ou remove a classe 'active' ao botão para feedback visual (opcional, requer CSS)
    menuButton.classList.toggle('active');
});

// Adiciona um ouvinte de evento ao menu móvel
mobileMenu.addEventListener('click', (event) => {
    // Verifica se o elemento clicado dentro do menu é um link (tag 'A')
    if (event.target.tagName === 'A') {
        // Esconde o menu móvel
        mobileMenu.classList.add('hidden');
        // Remove a classe 'active' do botão
        menuButton.classList.remove('active');
    }
});


// --- Scroll Animation using Intersection Observer ---

// Adiciona um ouvinte de evento que será disparado quando o conteúdo HTML inicial for completamente carregado e analisado
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os elementos na página que possuem a classe 'animate-on-scroll'
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Verifica se a API IntersectionObserver é suportada pelo navegador
    if ('IntersectionObserver' in window) {
        // Configurações para o Intersection Observer
        const observerOptions = {
            root: null, // Usa o viewport do navegador como a área de observação
            rootMargin: '0px', // Nenhuma margem adicional ao redor do root
            threshold: 0.1 // Aciona o callback quando pelo menos 10% do elemento está visível
        };

        // Função que será chamada sempre que um elemento observado cruzar o limite (threshold)
        const intersectionCallback = (entries, observer) => {
            // Itera sobre cada 'entry' (mudança de intersecção)
            entries.forEach(entry => {
                // Verifica se o elemento está atualmente intersectando (visível no viewport)
                if (entry.isIntersecting) {
                    // Adiciona a classe 'is-visible' ao elemento alvo
                    // Esta classe (definida no CSS) contém os estilos do estado final da animação (ex: opacity: 1, transform: translateY(0))
                    entry.target.classList.add('is-visible');
                    // Uma vez que a animação foi acionada, para de observar este elemento específico
                    // Isso garante que a animação ocorra apenas uma vez quando o elemento entra na tela
                    observer.unobserve(entry.target);
                }
                // Não é necessário fazer nada se 'entry.isIntersecting' for falso neste caso,
                // pois a animação só acontece ao entrar na tela.
            });
        };

        // Cria uma nova instância do IntersectionObserver, passando a função de callback e as opções
        const observer = new IntersectionObserver(intersectionCallback, observerOptions);

        // Itera sobre cada elemento selecionado para animação e começa a observá-lo
        animatedElements.forEach(el => {
            observer.observe(el);
        });

    } else {
        // Fallback para navegadores que não suportam IntersectionObserver
        // Exibe um aviso no console e torna todos os elementos visíveis imediatamente, sem animação.
        console.warn("Intersection Observer not supported, scroll animations disabled.");
        animatedElements.forEach(el => {
            el.classList.add('is-visible'); // Adiciona a classe para garantir consistência (se houver outros estilos)
            // Define diretamente os estilos finais caso a classe 'is-visible' não seja suficiente
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        });
    }
});

