const API_KEY = "4802f33879989cab6fb0f507fd3939c0";
let movieResearchByUser
const API_URL_MOVIES_WEEK = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=fr`;
const API_URL_SEARCH_MOVIE = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieResearchByUser}&language=fr`


function ajaxRequest(url, functionDisplay) {
  // requete ajax -> asynchrone
  $.getJSON(url)
    // si response
    .done((res) => {
      functionDisplay(res);
      console.log(res)
    })
    // si erreur
    .fail((error) => {
      console.log(error);
    });
}

//Une fois le DOM monté => Appel de la fonction de requête ajax
$(() => {
  ajaxRequest(API_URL_MOVIES_WEEK, displayWeekMovies);
});

//fonction qui va créer la liste de films de la semaine à partir de la réponse de la requête ajax,
function displayWeekMovies(items) {
  const urlImg = "https://image.tmdb.org/t/p/w500/";
  let dateDeSortie;
  let titre;
  let html = '<h2>Les Films de la semaine</h2><section id="liste_films">';
  for (let i = 0; i < items.results.length; i++) {
    items.results[i].title !== undefined
      ? (titre = items.results[i].title)
      : (titre = items.results[i].name);
    items.results[i].release_date !== undefined
      ? (dateDeSortie = items.results[i].release_date)
      : (dateDeSortie = "indisponible");
    html += `
            <div class="container_film">
                <h3>${titre}</h3>
                <ul>
                    <img src=${urlImg}${items.results[i].poster_path}>
                    <li>Note : ${items.results[i].vote_average}</li><br/>
                    <li>Nombre de votes : ${items.results[i].vote_count}</li><br/>
                    <li>Date : ${dateDeSortie}</li><br/>
                    <p>${items.results[i].overview}<p>
                </ul>
            </div>`;
  }
  html += "</section>";
  $("#main").html(html);
  console.log(items.results);
}

//function qui change la valeur 'movieResearchByUser'
changeValue=()=> {
  movieResearchByUser = $("#film").val();
  console.log(movieResearchByUser);
}



// fonction qui va créer la liste de films de la recherche à partir de la réponse de la requête ajax,
function displayResearchMovie(items) {
  let htmlq = '<ul id="liste_film_recherche">';
  for (let i = 0; i < items.results.length; i++) {
    items.results[i].title !== undefined
      ? (titre = items.results[i].title)
      : (titre = items.results[i].name);
    items.results[i].release_date !== undefined
      ? (dateDeSortie = items.results[i].release_date)
      : (dateDeSortie = "indisponible");
    htmlq += `
             <li>${titre}</li>     
            `;
  }
  htmlq += "</ul>";
  $("#propositions_recherche").html(htmlq);
  console.log(items.results);
}






// Evenement au clic du bouton recherche



// $("#bouton_search").on("click",  changeValue);
// $("#bouton_search").on("click",  console.log(API_URL_SEARCH_MOVIE));
// $("#bouton_search").on("click",  ajaxRequest(API_URL_SEARCH_MOVIE, displayResearchMovie));
