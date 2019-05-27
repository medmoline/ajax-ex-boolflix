// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// 1. Titolo; 2. Titolo Originale; 3. Lingua; 4. Voto

$(document).ready(function() {
    //intercetto il click sul bottone
  $('.bottone').click(function() {
    //salvo il valore dell'input
    var valore_input = $('.search').val();
    console.log(valore_input);

    var source   = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = {
      'titolo': '',
      'titolo_originale': '',
      'lingua':'',
      'voto':''
    };
    var html    = template(context);
  })


})
