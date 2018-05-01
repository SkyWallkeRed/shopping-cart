var ShoppingCart = function() {

    var total = 0;
    var cart = [];
    let $shoppingCartList = $('.cart-list');
    console.log('shopping cart :' + $shoppingCartList);
    // an array with all of our cart items


    //########## Handlebar##########
    var source = $('#cart-item-list').html();
    var template = Handlebars.compile(source);
    var newHTML = template(cart);

    var updateCart = function() {

        $shoppingCartList.empty();
        cart.push({ total: total })

        // TODO: Write this function. In this function we render the page.
        // Meaning we make sure that all our cart items are displayed in the browser.
        // Remember to empty the "cart div" before you re-add all the item elements.
        for (let i = 0; i < cart.length; i++) {
            var newHTML = template(cart[i]);
            $('.cart-list').append(newHTML);
        }

    }

    var addItem = function(item) {
        // cart[0].total = cart[0].total + item.price;
        // console.log(cart[0].total);
        // console.log(item);
        total = total + item.price;
        console.log(total)
        cart.push(item)
        console.log('cart :' + cart)
            // TODO: Write this function. Remember this function has nothing to do with display. 
            // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
    }

    var clearCart = function() {
        // TODO: Write a function that clears the cart ;-)
    }

    return {
        total: total,
        $shoppingCart: $shoppingCartList,
        cart: cart,
        updateCart: updateCart,
        addItem: addItem,
        clearCart: clearCart
    }
};

var app = ShoppingCart();

// update the cart as soon as the page loads!
app.updateCart();


//--------EVENTS---------

$('.view-cart').on('click', function() {
    // TODO: hide/show the shopping cart!
    $(".shopping-cart").toggleClass("show");
});

$('.add-to-cart').on('click', function() {
    console.log(this); // this is clicked 'add to cart <p>
    let dataPrice = Number($(this).closest('div.card').attr('data-price'));
    let dataName = $(this).closest('div.card').attr('data-name');

    let item = { name: dataName, price: dataPrice }
        // TODO: get the "item" object from the page
    app.addItem(item);
    app.updateCart();
});

$('.clear-cart').on('click', function() {
    app.clearCart();
});