const API_KEY = "4802f33879989cab6fb0f507fd3939c0";
const API_URL_MOVIES_WEEK = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=fr`;
const urlImg = "https://image.tmdb.org/t/p/w500/";
const urlImgSelectedMovie = "https://image.tmdb.org/t/p/w500";
let movieResearchByUser;
let API_URL_RESEARCH_MOVIE;
let idMovieSelectedByUser;
let API_URL_MOVIE_SELECTED;

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

//Une fois le DOM monté => Appel de la fonction de requête ajax
$(() => {
  ajaxRequest(API_URL_MOVIES_WEEK, displayWeekMovies);
  gestionDisplayOverviewWeekMovies();
});



//fonction qui va créer la liste de films de la semaine à partir de la réponse de la requête ajax,
function displayWeekMovies(items) {
  let html = '<h2>Les Films de la semaine</h2><section id="liste_films">';
  for (let i = 0; i < items.results.length; i++) {
    items.results[i].title
      ? (titre = items.results[i].title)
      : (titre = items.results[i].name);
    items.results[i].release_date
      ? (dateDeSortie = items.results[i].release_date)
      : (dateDeSortie = "Information indisponible");
    html += `
            <div class="container_film">
                <h3>${titre}</h3>
                <ul>
                    <img class="img_film_semaine" src=${urlImg}${items.results[i].poster_path}>
                    <li>Note : ${items.results[i].vote_average}</li><br/>
                    <li>Nombre de votes : ${items.results[i].vote_count}</li><br/>
                    <li>Date : ${dateDeSortie}</li><br/>
                    
                    <p id="resume_film_semaine"><span class="voir_resume">Voir le résumé</span><br/>${items.results[i].overview}<p>
                </ul>
            </div>`;
  }
  html += "</section>";
  $("#main").html(html);
  console.log(items.results);
}

// fonction d'affichage des résultats de la recherche
function displayResearchMovie(items) {
  $("aside").empty();
  let html = '<p>Selectioner un film</p><ul id="liste_film_recherche">';
  for (let i = 0; i < items.results.length; i++) {
    items.results[i].title
      ? (titre = items.results[i].title)
      : (titre = items.results[i].name);
    items.results[i].release_date
      ? (dateDeSortie = items.results[i].release_date)
      : (dateDeSortie = "Information indisponible");
    html += `
             <li class="titre_film" id=${items.results[i].id}>${titre}</li>     
            `;
  }
  html += "</ul>";
  $("#propositions_recherche").html(html);
  console.log(items.results);
  $(".titre_film").on("click", eventClickSelectedMovie);
}

// $("#bouton_search").on("click",  changeValue);
// $("#bouton_search").on("click",  console.log(API_URL_SEARCH_MOVIE));

// fonction d'affichage des détails du film sélectionné dans les résultats de la recherche

// fonction d'affichage du premier élément des résultats de la rechercheaprès la recheche
function displaySelectedMovie(items) {
  let html = "<ul class='liste_film_choisit'>";
  items.title ? (titre = items.title) : (titre = items.name);
  items.release_date
    ? (dateDeSortie = items.release_date)
    : (dateDeSortie = "Information indisponible");
  items.production_companies[0]
    ? (production = items.production_companies[0].name)
    : (production = "Information indisponible");
  html += `
    <div class="titre_image_selected_film">
  <li>${titre}</li>
  <li><img class="img_movie_selected" alt=${titre} src=${urlImgSelectedMovie}${items.poster_path}></li><br/>
  </div>
  <div class="descritption_film_choisit"><li>Date : ${dateDeSortie}</li><br/>
  <p>${items.overview}<p><br/>
  <li>Note : ${items.vote_average}</li><br/>
  <li>Nombre de votes : ${items.vote_count}</li><br/>
  <li>Production : ${production}</li><br/>
  </ul>
  </div>
  `;
  $("#detail_film").html(html);
  console.log(items);
}

// Evènement destiné au clic de la recherche
function eventClickResearchMovie(e) {
  movieResearchByUser = $("#film").val();
  e.preventDefault();
  if (movieResearchByUser !== "") {
    API_URL_RESEARCH_MOVIE = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieResearchByUser}&language=fr`;
    ajaxRequest(API_URL_RESEARCH_MOVIE, displayResearchMovie);
    console.log(movieResearchByUser);
    console.log(API_URL_RESEARCH_MOVIE);
    $(".container_film_recherche_select")
      .removeClass("display_none")
      .addClass("display");
  }
}

// Evènement destiné au clic sur le film de la liste des résultat de la recheche
function eventClickSelectedMovie(e) {
  e.preventDefault();
  idMovieSelectedByUser = this.id;
  console.log(idMovieSelectedByUser);
  API_URL_MOVIE_SELECTED = `https://api.themoviedb.org/3/movie/${idMovieSelectedByUser}?api_key=${API_KEY}&language=fr`;
  ajaxRequest(API_URL_MOVIE_SELECTED, displaySelectedMovie);
}

// Ecouteur boutton recherche 'clic'
$("#bouton_search").click(eventClickResearchMovie);

//Gestion affichage des résumés des films de la semaine
function gestionDisplayOverviewWeekMovies() {
  $(".container_film").on(
    "mousover",
    $("#resume_film_semaine").css("position", "absolute")
  );
}
