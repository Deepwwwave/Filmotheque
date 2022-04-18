//Une fois le DOM monté => Appel de la fonction de requête ajax pour l'affichage des film de la semaine
$(() => {
  ajaxRequest(API_URL_MOVIES_WEEK, displayWeekMovies);
  // Ecouteur boutton recherche 'clic'
  $("#bouton_search").click(eventClickResearchMovie);
});








