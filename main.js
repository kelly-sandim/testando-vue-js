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
                variantColor: 'verde',
                variantImage: './assets/vmSocks-green.jpg'
            },
            {
                variantId: 2235,
                variantColor: 'azul',
                variantImage: './assets/vmSocks-blue.jpg'
            }
        ],
        sizes: ["P", "M", "G"], // parte do challenge #4
        cart: 0
    },
    //Assim como há uma propriedade para inserir data, tbm tem uma
    //propriedade pra inserir métodos
    //OBS: lalala: function() é pra fção anonima, assim vc pode tirar esse : function
    //Mas nem todos os navegadores suportam isso ainda

    methods: {
        addToCart() {
            this.cart += 1 //aqui põe this pra referenciar a variável cart acima
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
        // parte do challenge #5
        removeFromCart() {
            this.cart -= 1
        }
    }
})