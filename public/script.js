var ShoppingCart = function() {
    var STORAGE = 'ShoppingCart';
    var saveToLocalStorage = function() {
        localStorage.setItem(STORAGE, JSON.stringify(cart));
    }
    var getFromLocalStorage = function() {
        return JSON.parse(localStorage.getItem(STORAGE) || '[]');
    }

    var cart = getFromLocalStorage();
    let $shoppingCartList = $('.cart-list');

    var updateCart = function() {
        $shoppingCartList.empty();
        $('.total').html(calculateTotal());
        saveToLocalStorage();
        for (let i = 0; i < cart.length; i++) {
            var source = $('#cart-item-list').html();
            var template = Handlebars.compile(source);
            var newHTML = template(cart[i]);
            $('.cart-list').append(newHTML);
        }
    }

    var calculateTotal = function() {
        var total = 0;

        for (var i = 0; i < cart.length; i++) {
            total += cart[i].price;
        }
        return total;
    }

    var addItem = function(item) {
        cart.push(item)
        saveToLocalStorage();
    }

    var clearCart = function() {
        cart = [];
        updateCart();
        saveToLocalStorage();
    }


    return {
        $shoppingCart: $shoppingCartList,
        cart: cart,
        updateCart: updateCart,
        addItem: addItem,
        clearCart: clearCart
    }
};

var app = ShoppingCart();
app.updateCart();
//--------EVENTS---------
$('.view-cart').on('click', function() {
    $(".shopping-cart").toggleClass("show");
});

$('.add-to-cart').on('click', function() {
    let dataPrice = Number($(this).closest('div.card').attr('data-price'));
    let dataName = $(this).closest('div.card').attr('data-name');
    let item = { name: dataName, price: dataPrice }
    app.addItem(item);
    app.updateCart();
});

$('.clear-cart').on('click', function() {
    app.clearCart();
});