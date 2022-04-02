const API_KEY = "4802f33879989cab6fb0f507fd3939c0";

const API_URL = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=fr`;

function ajaxRequest(url) {
  // requete ajax -> asynchrone
  $.getJSON(url)
    // si response
    .done((res) => {
      AffichageFilmsDeLaSemaine(res);
    })
    // si erreur
    .fail((error) => {
      console.log(error);
    });
}

//Une fois le DOM monté => Appel de la fonction de requête ajax
$(() => {
  ajaxRequest(API_URL);
});

//fonction qui va créer la liste de films de la semaine à partir de la réponse de la requête ajax
function AffichageFilmsDeLaSemaine(items) {
  const urlImg = "https://image.tmdb.org/t/p/w500/";
  let dateDeSortie;
  let titre
  let html = '<section id="liste_films">';
  for (let i = 0; i < items.results.length; i++) {
    items.results[i].title !== undefined
      ? (titre = items.results[i].title)
      : (titre = items.results[i].name);
    items.results[i].release_date !== undefined
      ? (dateDeSortie = items.results[i].release_date)
      : (dateDeSortie = "indisponible");
    html += `
            <div class="container_film">
                <h2>${titre}</h2>
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


// Gestion de la date de sortie du film si non présente dans l'API

