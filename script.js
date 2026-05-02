const data = {
    produtos: [
        { id: 1, nome: "iPhone 15", preco: 6500, categoria: "Celulares", imagem: "https://a-static.mlcdn.com.br/420x420/apple-iphone-15-128gb-azul-61-48mp-ios-5g/magazineluiza/238034800/7d460f4644c7ef6b3893cc0fd7aac79e.jpg", descricao: "O modelo mais recente da Apple.", emEstoque: true },
        { id: 2, nome: "MacBook Air", preco: 8900, categoria: "Notebooks", imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_610969-MLA95668078346_102025-F.webp", descricao: "Leve, fino e extremamente potente.", emEstoque: true },
        { id: 3, nome: "Mouse Gamer", preco: 250, categoria: "Acessórios", imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_868248-MLA99454511918_112025-F.webp", descricao: "Alta precisão com iluminação RGB.", emEstoque: true },
        { id: 4, nome: "Monitor 4K", preco: 2200, categoria: "Acessórios", imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_912843-MLA99938852799_112025-F.webp", descricao: "Imagens nítidas em Ultra HD.", emEstoque: false },
        { id: 5, nome: "PS5", preco: 4200, categoria: "Games", imagem: "https://m.media-amazon.com/images/I/71WCygaQDAL._AC_SX679_.jpg", descricao: "A nova geração dos games.", emEstoque: true },
        { id: 6, nome: "Galaxy S23", preco: 4500, categoria: "Celulares", imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_854264-MLA99586902470_122025-F.webp", descricao: "Smartphone Samsung com câmera épica.", emEstoque: true },
        { id: 7, nome: "Nintendo Switch", preco: 2100, categoria: "Games", imagem: "https://m.magazineluiza.com.br/a-static/420x420/console-nintendo-switch-v2-32gb-edicao-mario-bros-wonder-3-meses-assinatura-nintendo-online/esh0p/2067/c48ec43bd60d2ffeeb8990135bcdb0f6.jpeg", descricao: "Diversão em qualquer lugar.", emEstoque: true },
        { id: 8, nome: "Teclado Mecânico", preco: 450, categoria: "Acessórios", imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_708935-MLA100005092589_122025-F.webp", descricao: "Resistência e feedback tátil.", emEstoque: false }
    ]
};

const productList = document.getElementById("product-list");
const detailsContainer = document.getElementById("details-content");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

function formatPrice(preco) {
    return preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <span class="card-title">${produto.nome}</span>
        <p class="price">${formatPrice(produto.preco)}</p>
        <small>${produto.categoria}</small>
        <div style="margin-top: 10px;">
            <button class="btn-detail">Detalhes</button>
            <button class="btn-highlight" style="background: #ffc107; color: #000;">⭐</button>
        </div>
    `;

    card.querySelector(".btn-detail").addEventListener("click", () => showProductDetails(produto));
    card.querySelector(".btn-highlight").addEventListener("click", () => card.classList.toggle("highlight"));

    return card;
}

function renderProducts(lista) {
    productList.innerHTML = "";
    lista.forEach(p => productList.appendChild(createProductCard(p)));
}

function renderCategories() {
    const categorias = ["Todas", ...new Set(data.produtos.map(p => p.categoria))];
    categorySelect.innerHTML = categorias.map(c => `<option value="${c}">${c}</option>`).join("");
}

function showProductDetails(p) {
    detailsContainer.innerHTML = `
        <h4>${p.nome}</h4>
        <p><strong>Preço:</strong> ${formatPrice(p.preco)}</p>
        <p><strong>Categoria:</strong> ${p.categoria}</p>
        <p><strong>Estoque:</strong> <span class="${p.emEstoque ? 'instock' : 'outstock'}">${p.emEstoque ? 'Disponível' : 'Indisponível'}</span></p>
        <p><strong>Descrição:</strong> ${p.descricao}</p>
    `;
}

function filterProducts() {
    const termo = searchInput.value.toLowerCase();
    const cat = categorySelect.value;
    const filtrados = data.produtos.filter(p => (p.nome.toLowerCase().includes(termo)) && (cat === "Todas" || p.categoria === cat));
    renderProducts(filtrados);
}

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);
btnRender.addEventListener("click", () => {
    searchInput.value = "";
    categorySelect.value = "Todas";
    renderProducts(data.produtos);
});

renderCategories();
function renderProducts(lista) {
    productList.innerHTML = "";
    lista.forEach(p => {
        const novoCard = createProductCard(p);
        productList.appendChild(novoCard);
    });

    const todosCards = document.querySelectorAll(".card");
    todosCards.forEach(c => {
        console.log("ID do produto renderizado:", c.getAttribute("data-id"));
    });
}