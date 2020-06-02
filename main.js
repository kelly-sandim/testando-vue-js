var app = new Vue({
    el: '#app',
    data: {
        product: 'Meias',        
        description: 'Par de meias fedidas', // parte do challenge #1
        image: './assets/vmSocks-green.jpg',
        link: 'https://www.marisa.com.br/masculino/c/meias-m', // parte do challenge #2
        //inventory: 0
        inStock: false,
        onSale: true, // parte do challenge #3
        details:  ["80% algodão", "70% poliéster", "Gênero-neutro"],
        variants: [
            {
                variantId: 2234,
                variantColor: "verde"
            },
            {
                variantId: 2235,
                variantColor: "azul"
            }
        ]
    }
})