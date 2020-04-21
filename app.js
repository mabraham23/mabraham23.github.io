sandwiches = null;

const BASEURL = "https://subway-app.herokuapp.com"

var submit_button = document.querySelector("#submit-button");
var from_login_to_register_button = document.querySelector( "#display_register");
var from_register_to_login_button = document.querySelector( "#display_login")
var login_page_div = document.querySelector( "#login_page");
var register_page_div = document.querySelector( "#register_page");
var login_button = document.querySelector("#submit_login");
var main_page = document.querySelector("#main_div");

function deleteSandwichOnServer( sandwichId ) {
    fetch(BASEURL + "/sandwiches/" + sandwichId, {
        method: "DELETE",
        credentials: "include"
    }).then( function ( response ) {
        loadSandwiches();
    });
}

function editSandwichOnServer( name, bread, meat, cheese, veggies, sauces ) {
    var edit_Name = name;
    var edit_Bread = bread;
    var edit_Meat = meat;
    var edit_Cheese = cheese;
    var edit_Veggies = veggies;
    var edit_Sauces = sauces;

    var data = "name=" + encodeURIComponent( edit_Name );
    data += "&bread=" + encodeURIComponent( edit_Bread );
    data += "&meat=" + encodeURIComponent( edit_Meat ); 
    data += "&cheese=" + encodeURIComponent( edit_Cheese ); 
    data += "&veggies=" + encodeURIComponent( edit_Veggies ); 
    data += "&sauces=" + encodeURIComponent( edit_Sauces );

    fetch( BASEURL + "/sandwiches/" + edit_sandwich_id, {
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    }).then( function ( response ) {
        loadSandwiches();
    });
}


login_button.onclick = function ( ) {
    // var firstNameLoginInput = document.querySelector("#first_name_login");
    // var firstNameLoginItem = firstNameLoginInput.value;
    // var lastNameLoginInput = document.querySelector("#last_name_login");
    // var lastNameLoginItem = lastNameLoginInput.value;
    var emailLoginInput = document.querySelector("#email_login");
    var emailLoginItem = emailLoginInput.value;
    var passwordLoginInput = document.querySelector("#password_login");
    var passwordLoginItem = passwordLoginInput.value;

    var login_error = document.querySelector( "#login_error");

    // var data = "first_name=" + encodeURIComponent( firstNameLoginItem );
    // data += "&last_name=" + encodeURIComponent( lastNameLoginItem );
    var data = "&email=" + encodeURIComponent( emailLoginItem);
    data += "&password=" + encodeURIComponent( passwordLoginItem );
 
    fetch(BASEURL + "/sessions", {
        method: "POST",
        credentials: "include",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function (response) {
        if ( response.status == 201 ) {
            main_page.style.display = "block";
            login_page_div.style.display = "none";
            loadSandwiches()
        }
        else if ( response.status == 401 ) {
            login_error.style.display = "block";
        }
    }); 
}

var register_button = document.querySelector("#submit_register");
register_button.onclick = function () {
    var firstNameInput = document.querySelector("#first_name");
    var firstNameItem = firstNameInput.value;
    var lastNameInput = document.querySelector("#last_name");
    var lastNameItem = lastNameInput.value;
    var emailInput = document.querySelector("#email");
    var emailItem = emailInput.value;
    var passwordInput = document.querySelector("#password");
    var passwordItem = passwordInput.value;
    var confirmPasswordInput = document.querySelector("#confirm_password");
    var confirmPasswordItem = confirmPasswordInput.value;
    var match_failure = document.querySelector( "#match_failure");

    
    var result = passwordItem.localeCompare(confirmPasswordItem);
    
    if ( result == 0 ) {
        match_failure.style.display = "none";
        var account_created = document.querySelector( "#account_created");
        var duplicate_email = document.querySelector( "#duplicate_email");
        var data = "first_name=" + encodeURIComponent( firstNameItem );
        data += "&last_name=" + encodeURIComponent( lastNameItem );
        data += "&email=" + encodeURIComponent( emailItem);
        data += "&password=" + encodeURIComponent( passwordItem );
        
        
        fetch(BASEURL + "/users", {
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function (response) {
            
            if ( response.status == "201" ) {
                duplicate_email.style.display = "none";
                account_created.style.display = "block";

                firstNameInput.value = "";
                lastNameInput.value = "";
                emailInput.value = "";
                passwordInput.value = "";
                confirmPasswordInput.value = "";
            }
            else if ( response.status == "422") {
                duplicate_email.style.display = "block";
                emailInput.value = "";
            }
        });
    }
    else {
        match_failure.style.display = "block";
    }
}

var show_Password = document.querySelector( "#showPassword" );
show_Password.onclick = function () {
    var passwordLoginInput = document.querySelector( "#password_login");
    if ( passwordLoginInput.type === "password") {
        passwordLoginInput.type = "text";
    } else {
        passwordLoginInput.type = "password";
    }
}


from_login_to_register_button.onclick = function () {
    login_page_div.style.display = "none";
    register_page_div.style.display = "block";
}

from_register_to_login_button.onclick = function () {
    login_page_div.style.display = "block";
    register_page_div.style.display = "none";
    account_created.style.display = "none";
    
}


submit_button.onclick = function () { 
    var sandwichNameInput = document.querySelector("#sandwich_name");
    var sandwichNameItem = sandwichNameInput.value;
    var sandwichBreadInput = document.querySelector("#bread");
    var sandwichBreadItem = sandwichBreadInput.value;
    var sandwichMeatInput = document.querySelector("#meat");
    var sandwichMeatItem = sandwichMeatInput.value;
    var sandwichCheeseInput = document.querySelector("#cheese");
    var sandwichCheeseItem = sandwichCheeseInput.value;
    var sandwichVeggiesInput = document.querySelector("#veggies");
    var sandwichVeggiesItem = sandwichVeggiesInput.value;
    var sandwichSaucesInput = document.querySelector("#sauces");
    var sandwichSaucesItem = sandwichSaucesInput.value;

    var data = "name=" + encodeURIComponent( sandwichNameItem );
    data += "&bread=" + encodeURIComponent( sandwichBreadItem );
    data += "&meat=" + encodeURIComponent( sandwichMeatItem ); 
    data += "&cheese=" + encodeURIComponent( sandwichCheeseItem ); 
    data += "&veggies=" + encodeURIComponent( sandwichVeggiesItem ); 
    data += "&sauces=" + encodeURIComponent( sandwichSaucesItem );

    sandwichNameInput.value = "";
    sandwichBreadInput.value = "";
    sandwichMeatInput.value = "";
    sandwichCheeseInput.value = "";
    sandwichVeggiesInput.value = "";
    sandwichSaucesInput.value = "";

    fetch(BASEURL + "/sandwiches", {
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function (response) {

        loadSandwiches();
    });
};

function loadSandwiches() { 
    fetch(BASEURL + "/sandwiches", {credentials: "include"}).then( function ( response ) {
        if ( response.status == 200 ) {
            login_page_div.style.display = "none";
            main_page.style.display = "block";
            response.json().then( function ( sandwichesFromServer ) {
                sandwiches = sandwichesFromServer;
                var sandwichList = document.querySelector("#sandwich-list");
                sandwichList.innerHTML = "";
                var breadInput = document.querySelector("#bread");
                breadInput.placeholder = "bread";
                sandwiches.forEach(function ( sandwich ) {
                    var listItem = document.createElement("li");
    
                    var name_element = document.createElement("div");
                    name_element.innerHTML = sandwich.name;
                    name_element.style = "background-color: orange;"
                    name_element.classList.add("sandwich-item");
                    listItem.appendChild( name_element );
    
                    var bread_elemement = document.createElement("div");
                    bread_elemement.innerHTML = sandwich.bread;
                    bread_elemement.classList.add("sandwich-item");
                    listItem.appendChild( bread_elemement );
    
                    var meat_elemement = document.createElement("div");
                    meat_elemement.innerHTML = sandwich.meat;
                    meat_elemement.classList.add("sandwich-item");
                    listItem.appendChild( meat_elemement );
                    
                    var cheese_elemement = document.createElement("div");
                    cheese_elemement.innerHTML = sandwich.cheese;
                    cheese_elemement.classList.add("sandwich-item");
                    listItem.appendChild( cheese_elemement );
                    
                    var veggies_elemement = document.createElement("div");
                    veggies_elemement.innerHTML = sandwich.veggies;
                    veggies_elemement.classList.add("sandwich-item");
                    listItem.appendChild( veggies_elemement )
                    
                    var sauces_elemement = document.createElement("div");
                    sauces_elemement.innerHTML = sandwich.sauces;
                    sauces_elemement.classList.add("sandwich-item");
                    listItem.appendChild( sauces_elemement );
                    
                    var deleteButton = document.createElement("button");
                    deleteButton.innerHTML = "Delete";
                    deleteButton.classList.add("button");
                    deleteButton.setAttribute("id", "delete-button");
                    deleteButton.onclick = function() {
                        if (confirm("Are you sure you want to delete " + sandwich.name + "?")) {
                            deleteSandwichOnServer( sandwich.id );
                        }
                    };
                    listItem.appendChild(deleteButton);
                    
                    var editButton = document.createElement("button");
                    editButton.classList.add("button");
                    editButton.setAttribute("id", "edit-button")
                    editButton.innerHTML = "Edit";
                    editButton.onclick = function () {
    
                        edit_sandwich_id = sandwich.id;
                        
                        var edit_div = document.createElement("div");
                        edit_div.classList.add("edit-div");
    
                        var name_edit = document.createElement("input");
                        name_edit.value = sandwich.name;
    
                        var bread_edit = document.createElement("input");
                        bread_edit.value = sandwich.bread;
                        edit_div.appendChild(bread_edit);
    
                        var meat_edit = document.createElement("input");
                        meat_edit.value = sandwich.meat;
                        edit_div.appendChild(meat_edit);
                        
                        var cheese_edit = document.createElement("input");
                        cheese_edit.value = sandwich.cheese;
                        edit_div.appendChild(cheese_edit)
                        
                        var veggies_edit = document.createElement("input");
                        veggies_edit.value = sandwich.veggies;
                        edit_div.appendChild(veggies_edit);
                        
                        var sauces_edit = document.createElement("input");
                        sauces_edit.value = sandwich.sauces
                        edit_div.appendChild(sauces_edit);
    
                        var brea = document.createElement("br");
                        edit_div.appendChild(brea);
    
                        var cancel_edit = document.createElement("button");
                        cancel_edit.innerHTML = "Cancel";
                        cancel_edit.classList.add("button");
                        cancel_edit.setAttribute("id", "cancel-button");
                        edit_div.appendChild(cancel_edit); 
    
                        
                        var submit_edit = document.createElement("button");
                        submit_edit.innerHTML = "Submit";
                        submit_edit.classList.add("button");
                        submit_edit.setAttribute("id", "submit-button");
                        edit_div.appendChild(submit_edit);
    
                        listItem.innerHTML = "";
    
                        listItem.appendChild(name_edit);
                        listItem.appendChild(edit_div);
    
                        cancel_edit.onclick = function () {
                            loadSandwiches();
                        }
    
                        submit_edit.onclick = function () {
                            editSandwichOnServer( name_edit.value, bread_edit.value, meat_edit.value, cheese_edit.value, veggies_edit.value, sauces_edit.value );
                        }
                    }
                    listItem.appendChild(editButton);
                    sandwichList.appendChild(listItem);
                    
                });
            });
        } else if ( response.status == 401 ) {
            main_page.style.display = "none";
            login_page_div.style.display = "block";
        }
    });
}

loadSandwiches();
