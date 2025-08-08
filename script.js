// Variáveis globais
let cart = [];
let cartCount = 0;

// Elementos DOM
const cartCountElement = document.querySelector('.cart-count');
const buyButtons = document.querySelectorAll('.buy-btn');
const cartButton = document.querySelector('.cart-btn');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    animateOnScroll();
    updateCartDisplay();
});

// Event Listeners
function initializeEventListeners() {
    // Botões de compra
    buyButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addToCart(index);
            showNotification('Produto adicionado ao carrinho!', 'success');
        });
    });

    // Botão do carrinho
    cartButton.addEventListener('click', function() {
        showCart();
    });

    // Navegação suave
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Produtos (simulando dados)
const products = [
    {
        id: 1,
        name: '🍀 CAIXA PIX - de R$5 até R$999 🔥',
        price: 1.00,
        oldPrice: 1.50,
        image: 'fas fa-gift'
    },
    {
        id: 2,
        name: '📦 CAIXA DE ASSINATURAS - 100% DE CHANCE 🍀',
        price: 3.40,
        oldPrice: 5.10,
        image: 'fas fa-box'
    },
    {
        id: 3,
        name: '📶 INTERNET ILIMITADA',
        price: 7.90,
        oldPrice: 11.85,
        image: 'fas fa-wifi'
    },
    {
        id: 4,
        name: '🎵 SPOTIFY PREMIUM - 1 ANO',
        price: 15.90,
        oldPrice: 25.00,
        image: 'fas fa-music'
    },
    {
        id: 5,
        name: '🎮 XBOX GAME PASS - 3 MESES',
        price: 29.90,
        oldPrice: 45.00,
        image: 'fas fa-gamepad'
    },
    {
        id: 6,
        name: '📺 NETFLIX PREMIUM - 6 MESES',
        price: 49.90,
        oldPrice: 89.90,
        image: 'fas fa-tv'
    }
];

// Adicionar ao carrinho
function addToCart(productIndex) {
    const product = products[productIndex];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    cartCount++;
    updateCartDisplay();
    
    // Animação do botão
    const button = buyButtons[productIndex];
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// Atualizar display do carrinho
function updateCartDisplay() {
    cartCountElement.textContent = cartCount;
    
    // Animação do contador
    if (cartCount > 0) {
        cartCountElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Mostrar carrinho
function showCart() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio!', 'info');
        return;
    }
    
    let cartHTML = '<div class="cart-modal"><div class="cart-content">';
    cartHTML += '<h3>Seu Carrinho</h3>';
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHTML += `
            <div class="cart-item">
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">Qtd: ${item.quantity}</span>
                <span class="item-price">R$ ${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    
    cartHTML += `
        <div class="cart-total">
            <strong>Total: R$ ${total.toFixed(2)}</strong>
        </div>
        <div class="cart-actions">
            <button onclick="checkout()" class="checkout-btn">Finalizar Compra</button>
            <button onclick="closeCart()" class="close-btn">Fechar</button>
        </div>
    `;
    cartHTML += '</div></div>';
    
    document.body.insertAdjacentHTML('beforeend', cartHTML);
    
    // Adicionar estilos do modal
    const style = document.createElement('style');
    style.textContent = `
        .cart-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        .cart-content {
            background: #1a1a1a;
            border: 1px solid #333;
            color: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
            border-bottom: 1px solid #333;
        }
        .cart-total {
            padding: 1rem 0;
            font-size: 1.2rem;
            text-align: right;
        }
        .cart-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }
        .checkout-btn, .close-btn {
            flex: 1;
            padding: 0.8rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        .checkout-btn {
            background: #00ff88;
            color: #000;
        }
        .close-btn {
            background: #333;
            color: white;
        }
    `;
    document.head.appendChild(style);
}

// Fechar carrinho
function closeCart() {
    const modal = document.querySelector('.cart-modal');
    if (modal) {
        modal.remove();
    }
}

// Checkout
function checkout() {
    showNotification('Redirecionando para o pagamento...', 'success');
    closeCart();
    // Aqui você integraria com um sistema de pagamento real
    setTimeout(() => {
        showNotification('Funcionalidade em desenvolvimento!', 'info');
    }, 2000);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Cores baseadas no tipo
    const colors = {
        success: '#00ff88',
        error: '#ff4757',
        info: '#00ff88',
        warning: '#ffa502'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Animações no scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.product-card, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Efeito parallax no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Efeito de digitação no título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação quando a página carregar
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Smooth scroll para navegação
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Adicionar efeito de loading nos botões
buyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = 'Adicionando...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 1000);
    });
});

// Contador de visitantes (simulado)
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount++;
localStorage.setItem('visitorCount', visitorCount);

// Adicionar contador na página (opcional)
const addVisitorCounter = () => {
    const counter = document.createElement('div');
    counter.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        z-index: 1000;
    `;
    counter.textContent = `Visitantes: ${visitorCount}`;
    document.body.appendChild(counter);
};

// Descommente a linha abaixo se quiser mostrar o contador
// addVisitorCounter();