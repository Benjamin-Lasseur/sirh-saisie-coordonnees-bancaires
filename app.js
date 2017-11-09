var donneesLocales;
function init() {
    $.get("http://localhost:8080/api/collaborateurs", function (donnee) {
        donneesLocales = donnee;
    })
}
$(document).ready(function () {

    $.get("http://localhost:8080/api/collaborateurs", function (donnee) {
        donneesLocales = donnee;
        var tableau = `<table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
          </tr>
        </thead>
        <tbody>`;
        donneesLocales.forEach((el) => {
            tableau = tableau +
                ` <tr><td><a onclick='selectionner(` + el.matricule + `)'>`
                + el.matricule +
                `</a></td><td>`
                + el.nom +
                `</td><td>`
                + el.prenom +
                `</td></tr>`
        })
        tableau = tableau + `</tbody></table> `;
        $('#moitie1').html(tableau);
    });
});

function selectionner(matricule) {
    donneesLocales.forEach(don => {
        if (don.matricule == matricule)
            $('#nom').val(don.banque.nom);
        $('#bic').val(don.banque.bic);
        $('#iban').val(don.banque.iban);
    });
    $('#sauverBoutton').html(`<button type="button" class="btn btn-primary float-right" onclick="sauver(` + matricule + `)">Sauver</button>`);
}

function sauver(matricule) {
    var donnees = {};
    $('#form1').serializeArray().forEach(don => donnees[don.name] = don.value);

    $.ajax({
        url: "http://localhost:8080/api/collaborateurs/" + matricule + "/banque",
        contentType: 'application/json',
        type: 'PUT',
        data: JSON.stringify(donnees),
        success: function () {
            console.log("No error");
            init();
        },
        error: function () {
            console.log("error");
        }
    });
}   