// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// 1. Titolo; 2. Titolo Originale; 3. Lingua; 4. Voto

$(document).ready(function() {
  //salvo in una variabile l'url di base
  var url_base = 'https://api.themoviedb.org/3';


  //intercetto il click sul bottone
  $('.bottone').click(function() {
    //resetto l'html ogni volta che faccio una ricerca
    $('.container_card').html('');
    var valore_input = $('.search').val();
    //chiamo la funzione per far partire la chiamata api
    chiamata_api_film(valore_input,url_film);
    chiamata_api_serie(valore_input,url_serie);
    valore_input = $('.search').val('');
  });

  $('.search').keypress(function(event) {
    if(event.which == 13){
      $('.container_card').html('');
      var valore_input = $('.search').val();
      console.log(valore_input);
      chiamata_api_film(valore_input);
      chiamata_api_serie(valore_input);
       valore_input = $('.search').val('')
    }
  });

//funzione per chiamata_api film
  function chiamata_api_film(testo){

    $.ajax({
      //url preso dal sito
      'url': url_base + '/search/movie',
      //data : api key personale del sito e query = valore input + lingua
      'data':{
        'api_key': 'bd8c17f057d750aa7d3b3a89931beb84',
        'query':testo,
        'language':'it'
      },
      'success': function(data){
        //chiamo la funzinone per stampare i film
          stampa_film(data);
      }
    })
  }

//funzione per stampare film
  function stampa_film(film){
    //template per i film
    var source   = $("#template_film").html();
    var template = Handlebars.compile(source);
    var film = film.results;
    //ciclo for lungo quanto tutto l'array
    for(var i=0; i<film.length; i++){
      //context si rifa all'handlebars e gli metto dentro le proprietà da stampare
      var context = {
          'titolo':film[i].title,
          'titolo_originale':film[i].original_title,
          'lingua':flag_show(film[i].original_language),
          'voto': film[i].vote_average,
          'stelle': stelle(film[i].vote_average),
          'copertina':copertina(film[i].poster_path)

        };
        //creo l'html contenente il template
        var html = template(context);
        //appendo tutto al contenitore delle carte
        $('.container_card').append(html);
      }
  }
//funzione per chiamata_api serie
  function chiamata_api_serie(testo){
    $.ajax({
      //url preso dal sito
      'url': url_base + '/search/tv',
      //data : api key personale del sito e query = valore input + lingua
      'data':{
        'api_key': 'bd8c17f057d750aa7d3b3a89931beb84',
        'query':testo,
        'language':'it'
      },
      'success': function(data){
        //chiamo la funzinone per stampare i film
          stampa_serie(data);
      }
    })
  }
  //funzione per stampare le serie tv
  function stampa_serie(film){
    //template per i film
    var source   = $("#template_film").html();
    var template = Handlebars.compile(source);
    var film = film.results;

    //ciclo for lungo quanto tutto l'array
    for(var i=0; i<film.length; i++){
      //context si rifa all'handlebars e gli metto dentro le proprietà da stampare
      var context = {
          'titolo':film[i].name,
          'titolo_originale':film[i].original_name,
          'lingua':flag_show(film[i].original_language),
          'voto': film[i].vote_average,
          'stelle': stelle(film[i].vote_average),
          'copertina': copertina(film[i].poster_path)
        };
        //creo l'html contenente il template
        var html = template(context);
        //appendo tutto al contenitore delle carte
        $('.container_card').append(html);
      }

  }

  function stelle (numero) {
    //prendo il numero
    var meta_numero = numero/2;
    var numero_corretto = Math.ceil(meta_numero);
    // console.log(numero);
    // console.log(meta_numero);
    // console.log(numero_corretto);
    var stelle_piene = '';
    var stelle_vuote = '';


    for(var i=0;i<numero_corretto;i++){
      stelle_piene+= '<i class="fas fa-star"></i> ';
    }

    for(var j=0;j<(5-numero_corretto);j++){
      stelle_vuote += '<i class="far fa-star"></i> ';
    }

    return stelle_piene + stelle_vuote
  }


  function flag_show(language) {
    switch(language){
      case 'it':
      case 'fra':
      case 'es':
      language = '<img src="img/' + language + '.png ">' ;  ;
        break;
      case 'en':
        language = '<img src="img/' + language + '.jpg ">' ;
        break;
      default :
        language = '<img src="img/punto.jpg">';
      }
    return language
  }

  function copertina(elemento){
    if(elemento === null){
      return '<img id="punto_interrogativo" src="img/punto.jpg">';

    }else{
      return '<img src="https://image.tmdb.org/t/p/w185/'+ elemento +'">'
    }
  }



})
