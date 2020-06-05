Vue.config.devtools = true

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <!-- v-bind auxilia no updt da imagem toda vez que os dados mudam
            ele cria um laço entre os dados e o atributo (??)
            vc pode remover o v-bind e deixar só :src por exemplo -->
            <img v-bind:src="image" alt="Meias">
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <!--  parte do challenge #1 -->
            <p>{{ description }}</p>
            <!--  parte do challenge #2 -->
            <a :href="link">Clique aqui para ver mais meias!</a>
            <!-- Vue tem as condicionais v-if, v-else-if e v-else -->
            <!-- <p v-if="inventory > 10">Em Estoque</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Estoque Quase Acabando!</p>
            <p v-else>Fora de Estoque</p> -->
            
            <!-- Há uma outra diretiva do Vue.js que é o v-show 
            Quando é uma condicional simples, tipo True/False, talvez
            seja melhor usar ele, pq ele mostra um elemento ou não 
            dependendo do valor da variável
            O elemento ainda existe, mas é aplicado um display: none 
            nele nesses casos -->

            <!-- :style em diante => parte do challenge #6 -->
            <!-- <p v-show="inStock"-->
            <p v-if="inStock">Em Estoque</p>
            <p v-else :class="{ outOfStock: !inStock }">Fora de Estoque</p>                 
            <p>Frete: {{ shipping }} </p>
                
            <!--  parte do challenge #3 -->
            <p v-if="onSale">Em Venda!</p>
            <p>{{ sale }}</p>

            <!-- parte do challenge #8 -->
            <product-details :details="details"></product-details>
            
            <!-- Essa é a forma de imprimir dados mais complexos 
                É altamente recomendado usar :key pro Vue ter controle
                dos dados -->
            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }" 
                @mouseover="updateProduct(index)" >                    
            </div>
            <!-- você usa : na frente do style pra dizer que é um style binding (?) 
                Se usa CamelCase pq é objeto, mas pode usar kebab-case se vc por 
                entre aspas simples. EX:
                'font-size': fontSize
                Também fica mais limpo e organizado se vc por o style dentro de um 
                objeto. EX:
                (no hmtl)=> <p :style="styleObject">...</p>
                (no js)=> data: { styleObject: {
                                    color: 'red',
                                    fontSize: '13px'
                                }
                            }

                Se tiver mais de um obj de Style, vc pode chamar eles 
                dentro de um array. EX:
                (no hmtl)=> <p :style="[styleObject, styleObject2]">...</p>
                (no js)=> data: { styleObject: {
                                    color: 'red',
                                    fontSize: '13px'
                                }
                                styleObject2: {
                                    margin: '5px',
                                    padding: '20px'
                                }
                            }
                Também dá pra meter condicional aqui \o/
                EX: <div :class="[isActive ? activeClass : '']">...</div>
                -->


            <!--  parte do challenge #4 -->
            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>

            <!-- Como vai ficando mais complexo, é melhor invocar um método aqui -->
            <!-- Também dá pra usr @click ao invés de v-on:click -->
            <!-- Também dá pra fazer @keyup.enter, por exemplo. Esse "." é o modificador 
                E, nesse exemplo, ele faz com que, toda vez que a tecla enter for pressionada
                o método seja chamado -->

            <!-- disabled é outro bind do styles -->
            <button v-on:click="addToCart" 
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Adicionar ao Carrinho</button>

            <!--  parte do challenge #5 -->
            <button @click="removeFromCart">Remover do Carrinho</button>
            
        </div>

        <product-review></product-review>

    </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Meias',        
            description: 'Par de meias velhas', // parte do challenge #1
            selectedVariant: 0,
            link: 'https://www.google.com/search?q=meias&tbm=isch&ved=2ahUKEwiquY2PtujpAhUiALkGHT7-CDoQ2-cCegQIABAA&oq=meias&gs_lcp=CgNpbWcQAzIECCMQJzICCAAyAggAMgQIABBDMgQIABBDMgIIADICCAAyAggAMgIIADICCABQ6hdY5xhgnxpoAHAAeACAAYoBiAGOApIBAzAuMpgBAKABAaoBC2d3cy13aXotaW1n&sclient=img&ei=KgzZXqr8HaKA5OUPvvyj0AM&bih=657&biw=1366', // parte do challenge #2
            //inventory: 0
            onSale: true, // parte do challenge #3
            details:  ["80% algodão", "70% poliéster", "Gênero-neutro"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: './assets/vmSocks-green.jpg',
                    variantQuantity: 20
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './assets/vmSocks-blue.jpg',
                    variantQuantity: 0
                }
            ],
            sizes: ["P", "M", "G"], // parte do challenge #4
                 
        }
    },
     
    //Assim como há uma propriedade para inserir data, tbm tem uma
    //propriedade pra inserir métodos
    //OBS: lalala: function() é pra fção anonima, assim vc pode tirar esse : function
    //Mas nem todos os navegadores suportam isso ainda

    methods: {
        addToCart() {
            //this.cart += 1 //aqui põe this pra referenciar a variável cart acima
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId) //isso aqui faz com que um componente se "comunique" com um dado ou var
                                        //fora do componente. Ele meio que manda sinal caso ocorra uma mudança
                                        //ou ação (tipo clicar o botão) por exemplo
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        },
        // parte do challenge #5
        removeFromCart() {
            //this.cart -= 1
            //parte do challenge #9
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        }
    },

    //nova propriedade
    //é legal usar ela quando vc tem componentes pra computar e custoso
    //ficar rodando eles toda a hora que vc acessa eles
    computed: {
        title() {
            return this.product + ' da ' + this.brand
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
              return this.product + ' da ' + this.brand + ' estão em venda!'
            } 
              return  this.product + ' da ' + this.brand+ ' não estão em venda'
        },
        shipping() {
            if(this.premium) {
                return "Grátis"
            }
            return 2.99
        }
    }

})

//parte do challenge #8
Vue.component('product-details', {
    props: {
      details: {
        type: Array,
        required: true
      }
    },
    template: `
        <!-- v-for é outra diretiva(?) do Vue.js que serve pra fazer laço   -->
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
})

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit="onSubmit">        
            <p>
                <label for="name">Nome:</label>
                <input id="name" v-model="name">
            </p>

            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Nota:</label>
                <!-- .number é um tipo de cast que pega valor como
                        número -->
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                <input type="submit" value="Enviar">
            </p>
        </form>    
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null
        }
    }
})


var app = new Vue({
    el: '#app',
    data: {
        premium: false,        
        cart: [] 
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        decreaseCart(id) {
            const index = this.cart.indexOf(id);
            if (index > -1) {
                this.cart.splice(index, id);
            }
        }
    }    
})

/**
 * Componentes: Para criar um componente, vc utiliza Vue.component
 * 
 * A ordem é Vue.component(<Name>, <Options (ficam dentro de {})>)
 * 
 * Os componentes ficam dentro de templates, ao contrário do que foi
 * visto anteriormente
 * 
 * Ah é, as coisas do template ficam dentro de ``
 * 
 * Vc pode por mais componentes, mas tem um porém:
 * COMPONENTES DE TEMPLATE DEVEM CONTER EXATAMENTE UM
 * ELEMENTO RAÍZ (igual como é no React)
 * 
 * Componentes também possuem data, mas aqui ela funciona diferente
 * Ela fica tipo uma função, e retorna uma data fresca para cada
 * componente
 * 
 * Componentes não acessam dados de fora, então eles usam o Props pra isso
 * Props é um atributo customizado para passagem de dados pros componenes
 * 
 * Pra um componente receber props, tem de declarar ele de forma explícita
 * 
 * No HTML ficaria:
 *      <product message="hello!"></product>
 * 
 * 
 * Vue.component('product', {
 *      props: [message], -> aqui diz que vamos receber um props com o nome mensagem
 * 
 *      \o/ Você também pode customizar o props, passando o tipo, se é requirido, etc \o/
 *      EX:
 *      props: {
 *          message: {
 *              type: String,
 *              required: true,
 *              default: "Hi"
 *          }
 *      }
 *      template: `
 *          <div>
 *             <div> {{ message}} </div> -> Daí vc consegue passar esse props aqui dentro
 *             <h1>Eu sou um componente</h1>
 *             <h2>Não sou bonito?<h2>
 *          </div>
 *      `,
 *      data() {
 *          return {
 *              ....
 *          }
 *      }
 * })
 */

 /**
  * Tem uma funcionalidade do Vue chamada v-model, que é um two-way de binding de dados
  */