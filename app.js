let contacts = new Map()
contacts.set('india', '+91123456789')
contacts.set('usa', '+188888888')
contacts.set('canada', '+1999999999')
contacts.set('uae', '+97188888888')
document.getElementById("select1").addEventListener('change',() =>{
    document.getElementById('contact').innerHTML= (contacts.get(document.getElementById('select1').value));
})
document.getElementById("scroll Up").classList.add("hide");
getYPosition = () => {
var top = window.pageYOffset || document.documentElement.scrollTop
return top;
};
document.addEventListener('scroll', () => {
var scroll = getyYPosition();
var arrow = document.getElementById('scrollup');
scrolled = () => {
window.scroll({
top: 0,
left: 0,
behavior: 'smooth'
});
}
if (scroll < 250) {
    document.getElementById("header-sticky").classList.remove("sticky-bar");
    } else{
    document.getElementById("header-sticky").classList.add("sticky-bar");
    }
    
if (scroll > 1200){
arrow.classList.remove("hide");
arrow.classList.add("show");
arrow.addEventListener('click', scrolled);
}else {
document.getElementById('scrollup').classList.remove("show");
document.getElementById('scrollup').classList.add("hide"); 
document.getElementById("scrollUp").removeEventListener("click", scrolled);
}
})

document.querySelectorAll('.product-hover').forEach(product => { 
    product.classList.add('hide');
})
document.querySelectorAll('div[id^="product"]').forEach(product => { 
    product.addEventListener('mouseover', event => { 
        product.classList.add('blur'); 
        product.querySelector('.product-img').querySelector('.product-hover').classList.remove("hide");
        product.querySelector('.product-img').querySelector('.product-hover').classList.add('show');

})
product.addEventListener('mouseout', event => { 
    product.classList.remove('blur'); 
    product.querySelector('.product-img').querySelector('.product-hover').classList.add("hide");
    product.querySelector('.product-img').querySelector('.product-hover').classList.remove('show');

})
});

const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener('click', () => {
    cart.classList.add("active");
});
closeCart.addEventListener('click', () => {
    cart.classList.remove("active");
});


if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}

function start() {
    addEvents();
}

function update() {
    addEvents();
    updateTotal();
}

function addEvents() {
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    console.log(cartRemove_btns);
    cartRemove_btns.forEach(btn => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach((input) => {
        input.addEventListener("change", handle_changeItemQuantity);
    });

    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    })

    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
}
let itemsAdded = [] 

function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgsrc = product.querySelector(".product-img").src;
    console.log(title, price, imgsrc);

    let newToAdd = {
        title,
        price,
        imgsrc,
    };

    if(itemsAdded.find(el => el.title == newToAdd.title)) {
        alert("This item is already exsist");
        return;
    }else{
        itemsAdded.push(newToAdd);
    }

    let cartBoxElement = cartBoxComponent(title, price, imgsrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}


function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded =itemsAdded.filter(
        (el) => 
        el.title != 
        this.parentElement.querySelector('.cart-product-title').innerHTML
);

    update();
}

function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);
    update();
}

function handle_buyOrder () {
    if(itemsAdded.length <= 0){
        alert("There is no order \nplease, make a order");
        return;
    }
    const cartContent= cart.querySelector(".cart-content");
    cartContent.innerHTML='';
    alert("your order is placed successfully:)");
    itemsAdded=[];
    update();
}


function updateTotal() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach(cartBox => {
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace( "₹", " "));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    total = total.toFixed(2);

    totalElement.innerHTML = "₹" + total;
}

function cartBoxComponent(title, price, imgsrc) {
    return `
                    <div class="cart-box">
                        <img src=${imgsrc} alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class='bx bxs-trash-alt cart-remove'></i>
                    </div>`;
}

const createfooter=()=> {
    let footer=document.querySelector('footer');
    footer.innerHTML=`<div class="footer-content">
    <img src="../images/vastralu.jpg" class="logo" alt="">
    <div class="footer-ul-container">
        <ul class="category">
            <li class="category-title">men</li>
            <li><a href="#" class="footer-link">T-shirts</a></li>
            <li><a href="#" class="footer-link">panche kattu</a></li>
        </ul>
        <ul class="category">
            <li class="category-title">women</li>
            <li><a href="#" class="footer-link">Pattu sarees</a></li>
            <li><a href="#" class="footer-link">Chudidars</a></li>
        </ul>
    </div>
    </div>
    <p class="footer-title">About Company</p>
    <p class="info">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis dignissimos ullam voluptatibus sapiente suscipit. Numquam ea asperiores, fugit porro enim quas cum culpa velit cupiditate sequi placeat inventore reiciendis quaerat.</p>
    <p class="info">Support emails-help@vastralu.com,customersupport@vastralu.com</p>    
    <p class="info">telephone-1800225889,1800236654</p>
    <div class="footer-social-container">
    <div>
        <a href="#" class="social-link">Terms and conditions</a>
        <a href="#" class="social-link">privacy policy</a>
    </div>
    <div>
        <a href="#" class="social-link">instagram</a>
        <a href="#" class="social-link">Youtube</a>
        <a href="#" class="social-link">Facebook</a>
    
    </div>
    </div>
    <p class="footer-credit">The pure and made the fully local made garments</p>`
    ;
    }
    createfooter();
    
    function cartnumbers (){
        localStorage.setItem('cartnumbers', 1);
    }  



