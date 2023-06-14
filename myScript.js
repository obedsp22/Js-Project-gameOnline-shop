function showOptions(tab) {
    $(tab).fadeToggle("slow")
}

function openModal() {
    $(".modaL").css("display", "block")
    $("#nav").hide()
}

function closeModal() {
    $(".modaL").hide();
}

function switchtabs(tab) {
    var header = document.getElementById("tabs");
    var btns = header.getElementsByClassName("tab");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
    var j, tabcontent;
    tabcontent = document.getElementsByClassName("Mbody");
    for (j = 0; j < tabcontent.length; j++) {
        tabcontent[j].style.display = "none";
    }
    document.getElementById(tab).style.display = "block";
}



// Validating Users...
// admin: 'admin@email.com', password: 'admin123', name: 'Admin'

function registerUser() {
    let allUsers = JSON.parse(localStorage.getItem("All Users"));
    let newUser = {};

    newUser.honors = $("#honors").val();
    newUser.name = $("#reg-name").val();
    newUser.email = $("#reg-email").val();
    newUser.mobile = $("#reg-mobile").val();
    newUser.pass = $("#reg-pass").val();

    if (newUser.name == '' || newUser.mobile == '' || newUser.pass == '') {
        $("#verify").html('<i class="bi bi-exclamation-circle" id="warning"></i> Please fill out all entries before signing up.');
        $("#verify").css({ 'background-color': 'red', 'color': 'black' });
        $("#warning").css("color", "yellow");
        $("#verify").show();
        return;
    }

    let emailPatt = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let mobilePatt = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g;
    let testMob = mobilePatt.test(newUser.mobile);
    let testemail = emailPatt.test(newUser.email);
    if (testMob == false) {
        swal("Invalid Mobile", "This number is not a valid entry", "warning");
        return;
    };
    if (testemail == false) {
        swal("Invalid Email", "This email is not a valid entry", "warning")
        return;
    };

    if (allUsers !== null) {
        let mobTaken = allUsers.find(info => info.mobile == newUser.mobile);
        let emailTaken = allUsers.find(info => info.email == newUser.email || newUser.email == 'admin@email.com');
        if (mobTaken) {
            swal("Sorry", "This mobile number has already been taken by another user.", "warning");
            return;
        }
        if (emailTaken) {
            swal("Sorry", "This email has already been taken by another user.", "warning");
            return;
        }
    }

    if (allUsers == null) allUsers = [{ admin: 'admin@email.com', password: 'admin123', name: 'Admin' }];
    allUsers.push(newUser);

    $("#verify").html('<i class="bi bi-check-circle" id="success"></i> You have been registered successfully!');
    $("#verify").css({ 'background-color': 'green', 'color': 'white' });
    $("#success").css("color", "rgb(50, 226, 50)");
    $("#verify").show();

    localStorage.setItem("All Users", JSON.stringify(allUsers))
}


function logUserIn() {
    let allUsers = JSON.parse(localStorage.getItem("All Users"));
    if (allUsers == null) allUsers = [{ admin: 'admin@email.com', password: 'admin123', name: 'Admin' }];

    let user = {};
    user.email = $("#email").val();
    user.pass = $("#pass").val();

    if (user.email == "" || user.pass == "") {
        $("#verify2").html('<i class="bi bi-exclamation-circle" id="warning"></i> Please enter your email/password to log in.');
        $("#verify2").css({ 'background-color': 'red', 'color': 'black' });
        $("#warning").css("color", "yellow");
        $("#verify2").show();
        return;
    }

    // if (loggedUser == null) {
    //     let Items = JSON.parse(localStorage.getItem('Guest'));
    // }
    // else {
    //     Items = JSON.parse(localStorage.getItem(loggedUser.email));
    // };
    // if (items !== null) {
    //     let confirm = confirm(`If you choose to log in, your items will not be saved. \nIf you choose to continue click "OK".`)
    //     if (confirm == false) { return; }
    // }

    if (allUsers !== null) {
        let loggedUser = allUsers.find(info => user.email == info.email && user.pass == info.pass);
        let admin = allUsers.find(info => user.admin == info.email && user.pass == info.password)
        if (loggedUser) {
            swal("Successfully Logged In", "You will now be logged in", "success");
            localStorage.setItem("Logged User", JSON.stringify(loggedUser));
            $(".modaL").hide()
        }
        else if (admin) {
            swal("Successfully Logged In", "You will now be logged in", "success");
            localStorage.setItem("Logged User", JSON.stringify(admin));
            $(".modaL").hide()
        }
        else {
            $("#verify2").html('<i class="bi bi-exclamation-circle" id="warning"></i> The User/Password entered is incorrect.');
            $("#verify2").css({ 'background-color': 'red', 'color': 'black' });
            $("#warning").css("color", "yellow");
            $("#verify2").show();
        }
    }
    else {
        $("#verify2").html('<i class="bi bi-exclamation-circle" id="warning"></i> The User/Password entered is incorrect. Please make sure you have an account registered.');
        $("#verify2").css({ 'background-color': 'red', 'color': 'black' });
        $("#warning").css("color", "yellow");
        $("#verify2").show();
    }

    displayUser();
}


function logOut() {
    localStorage.removeItem("Logged User");
    $("#nav").hide();
    window.open('index.html', '_self');
    displayUser();
}


function displayUser() {
    let loggedUser = JSON.parse(localStorage.getItem("Logged User"))
    if (loggedUser !== null) {
        if (loggedUser.admin == "admin@email.com") {
            $("#admin").show();
            $("#admin").html(`Welcome ${loggedUser.name}`)
            $("#guest").hide();
            $("#signUp").hide();
            $("#loggedUserOptions").show();
            $("#logout").show();
        }
        else {
            $("#display-user").show();
            $("#display-user").html("Welcome " + loggedUser.honors + ' ' + loggedUser.name);
            $("#guest").hide();
            $("#admin").hide();
            $("#signUp").hide();
            $("#logout").show();
        }
    }
    else {
        $("#guest").show();
        $("#display-user").hide();
        $("#admin").hide();
        $("#signUp").show();
        $("#loggedUserOptions").hide();
        $("#logout").hide();
    }

}

// function generateRandom(min,max) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }
let n = 0
function addProduct() {
    let loggedUser = JSON.parse(localStorage.getItem("Logged User"))
    let allProducts = JSON.parse(localStorage.getItem(loggedUser.admin))
    let pict = localStorage.getItem("Picture");
    n++
    let productInfo = {
        id: "00-" + n,
        img: $("#picture").val(''),
        name: $("#prod-name").val(),
        price: ($("#prod-price").val() * 1).toFixed(2),
    }

    for (let i in allProducts) {
        if (allProducts[i].name == productInfo.name) {
            swal("Please Choose Another Name", "You cannot use a product name twice.", "warning");
            return;
        }
    }

    if (pict !== null) {
        productInfo.img = pict
    }

    if (productInfo.img == '' || productInfo.name == '' || productInfo.price == '') {
        swal("Missing entries", 'Please make sure to fill in all missing entries', 'warning');
    };

    if (productInfo.price == 0) {
        swal("Invalid", 'Please make sure that the product price is greater than 0.', 'error');
    };

    if (allProducts == null) allProducts = [];
    allProducts.push(productInfo);

    localStorage.setItem(loggedUser.admin, JSON.stringify(allProducts));
    swal("Product Added", 'Your product was added successfully', "success");


    $("#picture").val('');
    $("#prod-name").val('');
    $("#prod-price").val('');

    localStorage.removeItem("Picture");
    displayProducts()
    listproducts()
}

function listproducts() {
    let loggedUser = JSON.parse(localStorage.getItem("Logged User"));
    let allProducts = JSON.parse(localStorage.getItem(loggedUser.admin));
    let div = '';

    allProducts.forEach((items, i) => {
        div += `<div class="col-md text-center carDs">
                    <div class="my-5">
                        <div class="img-height">
                            <img src="${items.img}" alt="" class="image-cards">
                        </div>
                        <h5>${items.name}</h5>
                        <p>$${items.price} ea.</p>
                    </div>
                    <div>
                        <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                    </div>
                </div>`
    });
    if (allProducts == null || allProducts == '') {
        div = `<p class="h2 ps-5" id="no-prods" style="font-family: 'Courier New', Courier, monospace;">No products have been created.</p>`
    }

    $("#allProducts").html(div);
}

function deleteProduct(i) {
    let loggedUser = JSON.parse(localStorage.getItem("Logged User"));
    let allProducts = JSON.parse(localStorage.getItem(loggedUser.admin));

    $(".confirm-container").show();

    var item = allProducts[i];
    localStorage.setItem("Item", JSON.stringify(item));
}

function confirmDelete() {
    let loggedUser = JSON.parse(localStorage.getItem("Logged User"));
    let allProducts = JSON.parse(localStorage.getItem(loggedUser.admin));

    let item = JSON.parse(localStorage.getItem('Item'));
    let filter = allProducts.filter(i => i.name !== item.name);

    localStorage.removeItem("Item");
    $(".confirm-container").hide();

    localStorage.setItem(loggedUser.admin, JSON.stringify(filter));
    listproducts();
}

function Cancel() {
    $(".confirm-container").hide();
    localStorage.removeItem("Item");
}


function displayProducts() {
    let allProducts = JSON.parse(localStorage.getItem("admin@email.com"));
    let div = '';

    if (allProducts == null || allProducts == '') {
        div = `<p class="h2 ps-5" id="no-prods" style="font-family: 'Courier New', Courier, monospace;">Sorry, our admin has not entered any items currently. Please be sure to come back soon, or notify us about this issue. We do appreciate feedback.</p>`
    }
    else {
        allProducts.forEach((items, j) => {
            div += `<div class="col-md text-center carDs forCust" onclick="viewProduct(${j}), window.open('item.html', '_self')">
                    <div class="my-5">
                        <div class="img-height">
                            <img src="${items.img}" alt="" class="image-cards">
                        </div>
                        <h5 class="fs-3">${items.name}</h5>
                        <p class="fw-bold">$${items.price}</p>
                    </div>
                </div>`
        });
    };
    $(".shop-Items").html(div)
}


function viewProduct(j) {
    let allProducts = JSON.parse(localStorage.getItem("admin@email.com"));
    let single = allProducts[j];
    localStorage.setItem("Single Product Info", JSON.stringify(single));
}


function singleProduct() {
    let single = JSON.parse(localStorage.getItem("Single Product Info"));
    let div = '';

    div = `<div class="row">
                <div class="col-lg-6">
                    <div id="img-div">
                        <img src="${single.img}" alt="" class="sing-img">
                    </div>
                    <figcaption class="mt-2">Viverra suspendisse potenti nullam ac. Aliquet porttitor lacus luctus accumsan tortor posuere. Condimentum id venenatis a condimentum vitae sapien.</figcaption>
                </div>
                <div class="col-lg-4">
                    <h5 class="h5">${single.name}</h5>
                    <p class="mt-3 fw-bold">${single.id}</p>
                    <p id="price-info" class="fs-5">$${single.price}</p>
                    <label>Quantity</label><br>
                    <input type="number" id="prod-quantity" value="1"><br>
                    <button class="btn1 my-3" onclick="addToCart()">Add To Cart</button>
                    <div class="bord">
                        <div class="info prod-bord" onclick="window.open('#','_self')">PRODUCT INFO</div>
                        <div class="info prod-bord" onclick="window.open('FAQ.html','_self')">RETURN & REFUND POLICY</div>
                        <div class="info" onclick="window.open('FAQ.html','_self')">SHIPPING INFO</div>
                    </div>
                </div>
            </div>`

    $("#single-prod").html(div);
}


function addToCart() {
    let loggedUser = JSON.parse(localStorage.getItem("Logged User"));

    if (loggedUser == null) {
        var Items = JSON.parse(localStorage.getItem('Guest'));
    }
    else {
        Items = JSON.parse(localStorage.getItem(loggedUser.email));
    };

    let single = JSON.parse(localStorage.getItem("Single Product Info"));

    let id = single.id;
    let name = single.name;
    let price = single.price;
    let quantity = parseInt($("#prod-quantity").val());

    if (single.id == null) id = "00";
    let addTo = {
        id: id,
        name: name,
        quantity: quantity.toFixed(2),
        price: (price * 1).toFixed(2),
        totalprice: (price * quantity).toFixed(2)
    };

    if (Items == null) Items = [];
    Items.push(addTo);

    if (loggedUser == null) { var user = 'Guest' } else { user = loggedUser.email; };

    swal("Added to Cart", `${single.name} was added to your cart`, 'success');
    localStorage.setItem(user, JSON.stringify(Items));
    displayItemNum()
}


function displayCartItems() {
    let loggedUser = JSON.parse(localStorage.getItem("Logged User"));

    if (loggedUser == null) {
        var items = JSON.parse(localStorage.getItem('Guest'));
    }
    else {
        items = JSON.parse(localStorage.getItem(loggedUser.email));
    }

    let table = '';
    var total = 0;

    if (items !== null) {
        items.forEach((item, i) => {
            table += `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.totalprice}</td>
                    <td>${item.quantity}</td>
                    <td><button class="btn btn-outline-danger" onclick="removeItem(${i})">Delete</button></td>
                </tr>`
            total += (item.totalprice) * 1;
        });
        $(".Table").show();
        $("#cart-table").html(table);
        $("#total").html("$" + total.toFixed(2));
    }
    else if (items = [] || items == null) {
        let cart = '<h2>0 Cart Items</h2>There are currently no items in your shopping cart. Please make sure to click "Add To Cart", when shopping. Enjoy your Shopping!'
        $(".e-cart").html(cart);
        $(".e-cart").show();
        $(".Table").hide();
    }
}

function displayItemNum() {
    let loggedUser = JSON.parse(localStorage.getItem("Logged User"));
    if (loggedUser == null) {
        var items = JSON.parse(localStorage.getItem('Guest'));
    }
    else {
        items = JSON.parse(localStorage.getItem(loggedUser.email));
    }

    var numOfItems = 0;
    if (items !== null) {
        items.forEach(item => {
            numOfItems += item.quantity * 1;
        });
    }

    $("#numOfItems").html(numOfItems)
}


function removeItem(i) {
    let loggedUser = JSON.parse(localStorage.getItem("Logged User"));

    if (loggedUser == null) {
        var items = JSON.parse(localStorage.getItem('Guest'));
    }
    else {
        items = JSON.parse(localStorage.getItem(loggedUser.email));
    }

    items.splice(i, 1);

    let user;
    loggedUser == null ? user = 'Guest' : user = loggedUser.email;

    localStorage.setItem(user, JSON.stringify(items))
    displayCartItems()
    displayItemNum()
}

function placeOrder() {
    let loggedUser = JSON.parse(localStorage.getItem("Logged User"));

    if (loggedUser == null) {
        var items = JSON.parse(localStorage.getItem('Guest'));
    }
    else {
        items = JSON.parse(localStorage.getItem(loggedUser.email));
    }

    let user;
    loggedUser == null ? user = 'Guest' : user = loggedUser.email;

    localStorage.removeItem(user);
    swal('Thank You!', "Your order has been placed.", 'success');
    displayItemNum()
    displayCartItems()
}


function showFAQ(div) {
    $(div).slideToggle("slow");
}


function subscribe() {
    let email = $("#subscribe").val();
    let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let test = pattern.test(email);
    if(test == true){
        swal("Thank You!", "You are Subscribed", "success");
    }
    else{
        swal("Invaild email", "Please enter a valid email", "warning");
    }
}