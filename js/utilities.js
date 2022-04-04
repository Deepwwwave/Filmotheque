
// CONSTANTES des API
const API_KEY = "4802f33879989cab6fb0f507fd3939c0";
const API_URL_MOVIES_WEEK = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=fr`;
const urlImg = "https://image.tmdb.org/t/p/w500/";
const urlImgSelectedMovie = "https://image.tmdb.org/t/p/w500";


// REQUETE AJAX API
function ajaxRequest(url, functionDisplay) {
    // requete ajax -> asynchrone
    $.getJSON(url)
      // si response
      .done((res) => {
        functionDisplay(res);
        console.log(res);
      })
      // si erreur
      .fail((error) => {
        console.log(error);
      });
  }