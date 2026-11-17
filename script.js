
let panier = [];
let points = 150;

// Ajouter une carte
function ajouterPanier(id) {

    let cartes = document.querySelectorAll(".boutique .carte");

    let carte = cartes[id].cloneNode(true);

    // Enlever le bouton ajouter
    carte.querySelector("button").remove();

    // Créer le bouton supprimer
    let bouton = document.createElement("button");

    bouton.textContent = "Supprimer";

    bouton.onclick = function() {
        panier.splice(panier.indexOf(carte), 1);
        afficherPanier();
    };

    carte.appendChild(bouton);

    panier.push(carte);

    afficherPanier();
}


// Afficher le panier
function afficherPanier() {

    let panierHTML = document.getElementById("panier");

    panierHTML.innerHTML = "";

    if (panier.length == 0) {

        panierHTML.innerHTML = "Ton panier est vide.";

    } else {

        panier.forEach(function(carte) {
            panierHTML.appendChild(carte);
        });

    }

    calculerTotal();
}


// Calculer le prix
function calculerTotal() {

    let total = 0;

    panier.forEach(function(carte) {

        let prix = carte.querySelectorAll("p");

        for (let i = 0; i < prix.length; i++) {

            if (prix[i].textContent.includes("Prix")) {

                total = total + Number(prix[i].textContent.match(/\d+/)[0]);

            }

        }

    });

    document.getElementById("total").innerHTML = total;
}


// Valider le panier
function validerPanier() {

    let total = Number(document.getElementById("total").innerHTML);

    if (panier.length == 0) {

        alert("Ton panier est vide !");

    } else if (total > points) {

        alert("Tu n'as pas assez de points !");

    } else {

        points = points - total;

        document.getElementById("points-display").innerHTML = points;

        panier = [];

        afficherPanier();

        alert("Achat réussi !");
    }

}


// Déconnexion
function deconnexion() {

    window.location.href = "connexion.html";

}
