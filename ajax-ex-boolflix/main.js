// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// 1. Titolo; 2. Titolo Originale; 3. Lingua; 4. Voto

$(document).ready(function() {
  //salvo in una variabile l'url di base
  var url_base = 'https://api.themoviedb.org/3';
  var url_film = '/search/movie';
  //creo template
  var source   = $("#entry-template").html();
  var template = Handlebars.compile(source);

  //intercetto il click sul bottone
  $('.bottone').click(function() {
    //resetto l'html ogni volta che faccio una ricerca
    $('.container_card').html('');
    //salvo il valore scritto dall'utente
    var valore_input = $('.search').val();
    //chiamo la funzione per far partire la chiamata api
    chiamata_api_film(valore_input,url_film);
  })
  //funzione per chiamata_api 
  function chiamata_api_film(testo,sua_api){
    $.ajax({
      //url preso dal sito
      'url': url_base + sua_api,
      //data : api key personale del sito e query = valore input + lingua
      'data':{
        'api_key': 'bd8c17f057d750aa7d3b3a89931beb84',
        'query':testo,
        'language':'it'
      },
      'success': function(data){
        //chiamo la funzinone per stampare i film
          stampa_film(data)
      }
    })
  }
  function stampa_film(film){
    //ciclo for lungo quanto tutto l'array
    for(var i=0; i<film.results.length; i++){
      //context si rifa all'handlebars e gli metto dentro le proprietà da stampare
      var context = {
          'titolo': film.results[i].title,
          'titolo_originale':film.results[i].original_title ,
          'lingua':film.results[i].original_language,
          'voto':film.results[i].vote_average
        };
        //creo l'html contenente il template
        var html = template(context);
        //appendo tutto al contenitore delle carte
        $('.container_card').append(html);
    }
  }


})
