document.getElementById("error").style.display = "none";
document.getElementById("betalingsWijze").style.display = "none";
document.getElementById("geregistreerd").style.display = "none";

let errors = [];








function validateForm() {

    //Array leeg maken
    errors = [];

    //declareren
    let naam = document.getElementById("naam").value;
    let voornaam = document.getElementById("voornaam").value;
    let gebruikersnaam = document.getElementById("gebruikersnaam").value;
    let adres = document.getElementById("adres").value;
    let land = document.getElementById("land").value;
    let provincie = document.getElementById("provincie").value;
    let email = document.getElementById("email").value;
    let postcode = document.getElementById("postcode").value;
    let wachtwoord = document.getElementById("paswoord").value;
    let herhaalWachtwoord = document.getElementById("herhaalPaswoord").value;
    let betalingsWijze = document.querySelector('input[name=betalingswijze]:checked').value;


    //Velden controleren
    checkEmptyField(voornaam, "Het veld voornaam is vereist!");
    checkEmptyField(naam, "Het veld naam is vereist!");
    checkEmptyField(gebruikersnaam, "Het veld gebruikersnaam is vereist!");
    checkEmptyField(adres, "Het veld adres is vereist!");
    checkEmptyField(land, "Land is vereist!")
    checkEmptyField(provincie, "Provincie is vereist!");
    checkEmptyField(email, "Het veld E-mailadres is vereist!");
    checkEmptyField(wachtwoord, "Wachtwoord is vereist!");
    checkEmptyField(postcode, "Postcode is vereist!");
    checkEmptyField(herhaalWachtwoord, "Het veld herhaal wachtwoord is vereist!");

    //Email controleren
    if (!validateEmail(email) && email != "") {
        errors.push("Ongeldig e-mailadres!");
    }
    //Wachtwoor controleren
    if (wachtwoord.length < 7 && wachtwoord != "") {
        errors.push("Wachtwoord moet minstens 7 karakters lang zijn!");
    } else if (wachtwoord != herhaalWachtwoord && herhaalWachtwoord != "") {
        errors.push("Wachtwoorden komen niet overeen!");
    }

    //gebruikersnaam controleren
    validateUser(gebruikersnaam);

    //postcode controleren
    checkPc(postcode);

    //controle welke betaling
    //https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
    validatePayment(betalingsWijze);

    //controle algemene voorwaarden
    if (document.getElementById("algemeneVoorwaarden").checked == false) {
        errors.push("Je moet de algemene voorwaarden accepteren.");
    }

    //error meldingen schrijven
    if (errors != "") {
        document.getElementById("meldingen").innerHTML = errors.join("<br/>");
        alert("error");
    } else {
        alert("");
    }

}

function alert(melding) {
    //functie om de juiste meldingen te tonen
    //https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
    if (melding == "error") {
        document.getElementById("error").style.display = "block";
        document.getElementById("betalingsWijze").style.display = "none";
        document.getElementById("geregistreerd").style.display = "none";
    } else {
        document.getElementById("error").style.display = "none";
        document.getElementById("betalingsWijze").style.display = "block";
        document.getElementById("geregistreerd").style.display = "block";
    }


}

function checkEmptyField(veld, melding) {
    //Functie om lege velden na te kijken
    if (veld == "" || veld == "Kies een land" || veld == "Kies een provincie") {
        errors.push(melding);
    }
}

function validateEmail(emailadres) {
    //Functie om na te kijken of het email adres geldig is
    //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    //aanpassing in de regular expression, na @ was "-" nog toegelaten, dit is verwijderd.
    //regEx = regular expression
    let regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(emailadres);
}

function validateUser(username) {
    //functie om na te gaan of de gebruikersnaam geldig is
    //regular expression, eerste karakter mag a-z zijn in kleine en hoofdletters of een getal of een underscore, daarna mag ook . of koppelteken.
    //* om ervoor te zorgen dat het tweede blok niet hoeft dus 1 karakter is genoeg.
    let regEx = /^[a-zA-Z0-9_]+[a-zA-Z0-9._-]*$/;
    if (!regEx.test(username) && username != "") {
        errors.push("Gebruikersnaam is ongeldig!");
    }
}

function checkPc(veld) {
    //functie om na te gaan of de postcode geldig is
    if ((veld < 1000 || veld > 9999) && veld != "") {
        errors.push("De waarde van postcode moet tussen 1000 en 9999 liggen.");
    }
}

function validatePayment(veld) {
    //functie om na te gaan welke vorm van betalen is aangeduid
    document.getElementById("betaling").innerHTML = veld;
}