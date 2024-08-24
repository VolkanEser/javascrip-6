// Değişken tanımlama
const card = document.getElementsByClassName("card");
const btnAdd = document.getElementsByClassName("btn-info");
const btnCart = document.querySelector(".btn-cart");
const cartList = document.querySelector(".shopping-cart-list");
const totalPriceElement = document.querySelector("#total-price");
const itemCountElement = document.getElementById("item-count");

let totalPrice = 0;

// Ürün bilgilerini saklamak için Shopping sınıfı
class Shopping {
    constructor(title, price, image) {
        this.image = image;
        this.title = title;
        this.price = parseFloat(price); // Fiyatı float olarak tut
    }
}

// Kullanıcı arayüzü işlemleri için UI sınıfı
class UI {
    addToCart(shopping) {
        const listItem = document.createElement("div");
        listItem.classList.add("list-item");

        listItem.innerHTML = `
            <div class="row align-items-center text-white-50">
                <div class="col-md-3">
                    <img src="${shopping.image}" alt="product" class="img-fluid">
                </div>
                <div class="col-md-5">
                    <div class="title">${shopping.title}</div>
                </div>
                <div class="col-md-2">
                    <div class="price">${shopping.price.toFixed(2)}</div>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-delete">
                        <i class="fas fa-trash-alt text-danger"></i>
                    </button>
                </div>
            </div>
        `;
        cartList.appendChild(listItem);
        this.updateTotalPrice(shopping.price); // Toplam fiyatı güncelle
        this.cartCount(); // Sepetteki ürün sayısını güncelle
    }

    removeCart() {
        cartList.addEventListener("click", (e) => {
            if (e.target && e.target.classList.contains("btn-delete")) {
                const listItem = e.target.closest(".list-item");
                const price = parseFloat(listItem.querySelector(".price").textContent);
                listItem.remove();
                this.updateTotalPrice(-price); // Toplam fiyatı azalt
                this.cartCount(); // Sepetteki ürün sayısını güncelle
            }
        });
    }

    cartToggle() {
        btnCart.addEventListener("click", () => {
            cartList.classList.toggle("d-none");
        });
    }

    cartCount() {
        let cartListItem = cartList.getElementsByClassName("list-item");
        itemCountElement.innerHTML = cartListItem.length;

        if (cartListItem.length === 0) {
            cartList.classList.add("d-none");
        } else {
            cartList.classList.remove("d-none");
        }
    }

    updateTotalPrice(priceChange) {
        totalPrice += priceChange;
        totalPriceElement.innerHTML = totalPrice.toFixed(2); // Fiyatı 2 ondalık basamağa yuvarla
    }
}

// Sepete ürün ekleme işlemi
for (let i = 0; i < card.length; i++) {
    btnAdd[i].addEventListener("click", (e) => {
        let title = card[i].getElementsByClassName("card-title")[0].textContent;
        let price = card[i].getElementsByClassName("price")[0].textContent;
        let image = card[i].getElementsByClassName("card-img-top")[0].src;

        let shopping = new Shopping(title, price, image);

        let ui = new UI();
        ui.addToCart(shopping);

        e.preventDefault();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    let ui = new UI();
    ui.cartToggle();
    ui.removeCart();
});
