// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// 1. Titolo; 2. Titolo Originale; 3. Lingua; 4. Voto

$(document).ready(function() {
  var url_base = 'https://api.themoviedb.org/3';
  var source   = $("#entry-template").html();
  var template = Handlebars.compile(source);
  search();

  function search(){
    //intercetto il click sul bottone
    $('.bottone').click(function() {
      //resetto sempre l'html ogni volta che parte la ricerca
      $('.container_card').html('');
      //salvo il valore dell'input
      var valore_input = $('.search').val();

      //chiamata ajax
      $.ajax({
        //url preso dal sito
        'url': url_base + '/search/movie',
        //data : api key personale del sito e query = valore input
        'data':{
          'api_key': 'bd8c17f057d750aa7d3b3a89931beb84',
          'query': valore_input,
          'language':'it'
        },
        'success': function(data){
          //ciclo for lungo quanto tutto l'array results
            stampa_film(data)
          }
      })
    })
  }
  function stampa_film(film){
    for(var i=0; i<film.results.length; i++){
      var context = {
          'titolo': film.results[i].title,
          'titolo_originale':film.results[i].original_title ,
          'lingua':film.results[i].original_language,
          'voto':film.results[i].vote_average
        };
        var html = template(context);
        //appendo tutto al contenitore delle carte
        $('.container_card').append(html);
    }
  }


})
