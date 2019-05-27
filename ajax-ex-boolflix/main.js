// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// 1. Titolo; 2. Titolo Originale; 3. Lingua; 4. Voto

$(document).ready(function() {

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
        'url': 'https://api.themoviedb.org/3/search/movie',
        //data : api key personale del sito e query = valore input
        'data':{
          'api_key': 'bd8c17f057d750aa7d3b3a89931beb84',
          'query': valore_input,
          'language':'it'
        },
        'success': function(data){
          //ciclo for lungo quanto tutto l'array results
            for(var i=0; i<data.results.length; i++){
              //se il valore_input è incluso nella proprietà title dell'oggetto results
              if(! valore_input.toLowerCase().includes(data.results[i].title)){
                //creo il template
                var source   = $("#entry-template").html();
                var template = Handlebars.compile(source);
                //context = proprietà da mettere nel template
                var context = {
                  'titolo': data.results[i].title,
                  'titolo_originale':data.results[i].original_title ,
                  'lingua':data.results[i].original_language,
                  'voto':data.results[i].vote_average
                };
                var html    = template(context);
                //controllo se il titolo scritto e quindi il titolo non originale è uguale a quello originale moostri solo il secondo 
                if(data.results[i].title == data.results[i].original_title){
                  $('.card li:first-child').html('');
                }
                //appendo tutto al contenitore delle carte
                $('.container_card').append(html);
              }
            }
          }
      })
    })
  }

})
