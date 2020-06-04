var app = new Vue({
    el: '#app',
    data: {
        product: 'Meias',        
        description: 'Par de meias velhas', // parte do challenge #1
        image: './assets/vmSocks-green.jpg',
        link: 'https://www.google.com/search?q=meias&tbm=isch&ved=2ahUKEwiquY2PtujpAhUiALkGHT7-CDoQ2-cCegQIABAA&oq=meias&gs_lcp=CgNpbWcQAzIECCMQJzICCAAyAggAMgQIABBDMgQIABBDMgIIADICCAAyAggAMgIIADICCABQ6hdY5xhgnxpoAHAAeACAAYoBiAGOApIBAzAuMpgBAKABAaoBC2d3cy13aXotaW1n&sclient=img&ei=KgzZXqr8HaKA5OUPvvyj0AM&bih=657&biw=1366', // parte do challenge #2
        //inventory: 0
        inStock: false,
        onSale: true, // parte do challenge #3
        details:  ["80% algodão", "70% poliéster", "Gênero-neutro"],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './assets/vmSocks-green.jpg'
            },
            {
                variantId: 2235,
                variantColor: 'blue',
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