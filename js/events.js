//VARIABLES

// Déclaration des variables pour modifier les raquêtes
let movieResearchByUser;
let API_URL_RESEARCH_MOVIE;
let idMovieSelectedByUser;
let API_URL_MOVIE_SELECTED;


//FONCTIONS

//Fonction qui va créer la liste de films de la semaine à partir de l'API (/trending/all/week)
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


// Fonction qui affiche les résultats de la recherche à partir de l'API (search/movie)
function displayResearchMovie(items) {
  $("aside").empty();
  let html = '<p>Selectionner un film</p><ul id="liste_film_recherche">';
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

// Fonction qui affiche les détail du film a partir de l'API (/movie/${idMovieSelectedByUser})
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
    <div class="description_film_choisit"><li>Date : ${dateDeSortie}</li><br/>
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


// EVENEMENTS 

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
