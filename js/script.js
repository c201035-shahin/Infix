const header = document.querySelector("header");

window.addEventListener ("scroll", function() {
    header.classList.toggle ("sticky", window.scrollY > 0);
});

const fetchProduct=()=>{
    fetch('http://127.0.0.1:5500/js/data.json')
    .then(response=>response.json())
    .then(data=>showProduct(data))
}

const showProduct=(data)=>{
    console.log(data);
    const ProductContainer=document.getElementById('display-product');
    for (let i = 0; i < 6; i++) {
        const Product = data[i];
        console.log(Product);
        const div=document.createElement('div');
        div.classList.add('col');
        const price = Product.price.slice(1);
        console.log(price);
        div.innerHTML=`
        <div class="cards">
            <img src="${Product.img}" class="card-img-top" width="86px">
            <div class="card-body">
                <h5 class="card-title">${Product.title}</h5>
                <div class="card-info">
                    <p class="card-text">${Product.rating}</p>
                    <p class="card-text">${Product.price}</p>
                </div>
                <div class="add-cart">
                    <button onclick="countProduct(${price})">Add Item</i></button>
                </div>
            </div>
        </div>
        `;
        ProductContainer.appendChild(div);
    };

}

fetchProduct();

let count=0;
const countProduct=(price)=>{
   console.log(price);
   count++;
   const cart=document.getElementById('total-product');
   cart.innerText=count;
   updatePrice(price);
   total();
}

/*const countProduct2=(price)=>{
    console.log(price);
    count--;
    const cart=document.getElementById('total-product');
    cart.innerText=count;
    updatePrice2(price);
    total();
}*/

const updatePrice=(price)=>{
    const oldPrice = parseFloat(document.getElementById('price').innerText);
    const newPrice = oldPrice + price;
    document.getElementById('price').innerText = newPrice.toFixed(2);
    deliveryCharge(newPrice);

}

/*const updatePrice2=(price)=>{
    const oldPrice = parseFloat(document.getElementById('price').innerText);
    const newPrice = oldPrice - price;
    document.getElementById('price').innerText = newPrice.toFixed(2);
    deliveryCharge(newPrice);

}*/

const deliveryCharge=(price)=>{
    if(price<500){
        document.getElementById('delivery-charge').innerText=0;
    }
    else if(price>=500 && price<800){
        document.getElementById('delivery-charge').innerText=100;
    }
    else if(price>=800 && price<1000){
        document.getElementById('delivery-charge').innerText=150;
    } else{
        document.getElementById('delivery-charge').innerText=200;
    }
    shippingCharge(price);
}

const shippingCharge=(price)=>{
    if(price<500){
        document.getElementById('shipping-charge').innerText=0;
    }
    else if(price>=500 && price<800){
        document.getElementById('shipping-charge').innerText=100;
    }
    else if(price>=800 && price<1000){
        document.getElementById('shipping-charge').innerText=150;
    } else{
        document.getElementById('shipping-charge').innerText=200;
    }

    tax();
}
const tax=()=>{
    const price = parseFloat(document.getElementById('price').innerText);
    const tax = price*0.15;
    document.getElementById('tax').innerText=tax.toFixed(2);
}
const total=()=>{
    const price = parseFloat(document.getElementById('price').innerText);
    const delivery = parseFloat(document.getElementById('delivery-charge').innerText);
    const shipping = parseFloat(document.getElementById('shipping-charge').innerText);
    const tax = parseFloat(document.getElementById('tax').innerText);
    const total = price+delivery+shipping+tax;
    document.getElementById('total-price').innerText=total.toFixed(2);

}

const greetings=()=>{
    const totalPrice = parseFloat(document.getElementById('total-price').innerText);
    if(totalPrice==0){
        alert("Please add some products to cart.", "error");
        
    }
    else{
        alert("Thank you for buying.","Your total price is: " +totalPrice);
        count=0;
        document.getElementById('total-product').innerText=count;
        document.getElementById('price').innerText=0;
        document.getElementById('delivery-charge').innerText=0;
        document.getElementById('shipping-charge').innerText=0;
        document.getElementById('tax').innerText=0;
        document.getElementById('total-price').innerText=0;
        
    }
}
