// Değişken tanımlama 
const card = document.getElementsByClassName("card");
const btnAdd = document.getElementsByClassName("btn-info");
const btnCart = document.querySelector(".btn-cart");
const cartList = document.querySelector(".shopping-cart-list");

// tıkladıgımızda aldıgımız bilgiler
class Shopping {
    constructor(title, price, image) {
        this.image = image;
        this.title = title;
        this.price = price;
    }
}



// click oldugunda gonderım ıslemının oldugu yer
class UI {
    addToCart(shopping) {
        const listİtem = document.createElement("div");
        listİtem.classList = "list-item";

        listİtem.innerHTML =
            `
          <div class="row align-items-center text-white-50">
                                <div class="col-md-3">
                                    <img src="${shopping.image}" alt="product" class="img-fluid">
                                </div>
                                <div class="col-md-5">
                                    <div class="title">${shopping.title}</div>

                                </div>
                                <div class="col-md-2">
                                    <div class="price">${shopping.price}</div>

                                </div>
                                <div class="col-md-2">
                                    <button class="btn btn-delete">
                                        <i class="fas fa-trash-alt text-danger"></i>
                                    </button>
                                </div>
                            </div> 
        `
        cartList.appendChild(listİtem);
    }

    removeCart() {


        let btnRemove = document.getElementsByClassName("btn-delete");
        let self = this;
        for (let i = 0; i < btnRemove.length; i++) {
            btnRemove[i].addEventListener("click", function () {
                this.parentElement.parentElement.parentElement.remove();
                self.cartCount();
            })
        }

    }

    cartToggle() {

        btnCart.addEventListener("click", function () {
            cartList.classList.toggle("d-none");
        })
    }

    cartCount() {
        let cartListİtem = cartList.getElementsByClassName("list-item");
        let itemCount = document.getElementById("item-count");
        // console.log("cart list item uzunluğu", )
        itemCount.innerHTML = cartListİtem.length;


    }
}



// tıklandıgında alınması gereken onay

for (let i = 0; i < card.length; i++) {

    btnAdd[i].addEventListener("click", function (e) {
        let title = card[i].getElementsByClassName("card-title")[0].textContent;
        // let id = card[i].getElementsByClassName("id")[0].textContent;
        let price = card[i].getElementsByClassName("price")[0].textContent;
        let image = card[i].getElementsByClassName("card-img-top")[0].src;
        // btnAdd[i].classList.add("disabled");
        // btnAdd[i].textContent = "In Card";
        let shopping = new Shopping(title, price, image);

        let ui = new UI();

        ui.addToCart(shopping);
        ui.removeCart();
        ui.cartCount();


        e.preventDefault();
    })
}



document.addEventListener("DOMContentLoaded", () => {
    let ui = new UI();

    ui.cartToggle();
})


