"use strict";

console.log("main.js loaded");

let categories;
let types;
let products;
let selector = $('#selector');
let productPage = $('#productPage');
let toWrite = "";

selector.on("change", (event) =>{
	console.log("change event has fired");
	loadCategories()
	.then(
		loadTypes
	).then(
		loadProducts
	).then(
		displayProducts
	);
});

var displayProducts = () => {
	console.log("display products firing");
	productPage.html("");
	console.log(types);
	if(selector.val() === "0") {
		toWrite = `<h2>${categories[0].name}</h2>`;
		for(let n=0; n<types.length; n+=1) {
			console.log(types[n].category);
			if(types[n].category === 0){
				toWrite += `<h3>${types[n].name}</h3>`;
				toWrite += `<p>${types[n].description}</p>`;
				toWrite += `<div class="row container">`;
				for (let i=0; i<products.length; i+=1){
					for (let j in products[i]){
						if(products[i][j].type === types[n].id){
							toWrite += `<div class="col-md-4 container"><h4>${products[i][j].name}</h4>`;
							toWrite += `<p>${products[i][j].description}</p></div>`;
						}
					}
				}
				toWrite += `</div>`;
			}
		}
	}
	if(selector.val() === "1") {
		toWrite = `<h2>${categories[1].name}</h2>`;
		for(let n=0; n<types.length; n+=1) {
			console.log(types[n].category);
			if(types[n].category === 1){
				toWrite += `<h3>${types[n].name}</h3>`;
				toWrite += `<p>${types[n].description}</p>`;
				toWrite += `<div class="row container">`;
				for (let i=0; i<products.length; i+=1){
					for (let j in products[i]){
						if(products[i][j].type === types[n].id){
							toWrite += `<div class="col-md-4 container"><h4>${products[i][j].name}</h4>`;
							toWrite += `<p>${products[i][j].description}</p></div>`;
						}
					}
				}
				toWrite += `</div>`;
			}
		}
	}
	productPage.html(toWrite);
};

var loadCategories= () =>{
    return new Promise(function(resolve,reject){
        $.ajax({
            url: "../json/categories.json",
            success: function(data){
            	console.log("categories.json loaded");
            	console.log("categories data is", data);
                categories = data.categories;
                resolve();
            }
        });
    });
};

var loadProducts = () => {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "../json/products.json",
			success: function(data){
				console.log("products.json loaded");
				console.log("porducts data is", data);
				products = data.products;
				resolve();
			}
		});
	});
};

var loadTypes= () => {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "../json/types.json",
			success: function(data){
				console.log("types.json loaded");
				console.log("types data is", data);
				types = data.types;
				resolve();
			}
		});
	});
};


