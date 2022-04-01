const API_KEY = "4802f33879989cab6fb0f507fd3939c0";

const response = ajaxRequest();

function ajaxRequest() {
  // requete ajax -> asynchrone
  $.getJSON(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=fr`
  )
    // $.getJSON("./api.json")
    .done((res) => {
      console.log(res);
      displayResult(res);
      // displayResult(res.datas.items);
    })
    .fail((error) => {
      console.log(error);
      // throw new Error();
    });
}

function displayResult(items) {
  // items.forEach(item => {
  //     $("ul").append(`<li>${item.name}</li>`);
  // });

  $("ul").append(`
            
                    
    `);
}
