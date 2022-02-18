document.getElementById("txtPelicula").addEventListener("keypress", function(e){
    if(e.key === 'Enter'){
        buscar();
        ocultar_buscador();
    }
});

bars_search =       document.getElementById("ctn-bars-search");
cover_ctn_search =  document.getElementById("cover-ctn-search");
txtPelicula =       document.getElementById("txtPelicula");

//Funcion para mostrar el buscador
function mostrar_buscador(){
    bars_search.style.top = "80px";
    cover_ctn_search.style.display = "block";
    txtPelicula.focus();
}

//Funcion para ocultar el buscador
function ocultar_buscador(){

    bars_search.style.top = "-10px";
    cover_ctn_search.style.display = "none";
    txtPelicula.value = "";

}

function buscar(){
    var Pelicula = txtPelicula.value;
    var html="";
    fetch('https://api.themoviedb.org/3/search/movie?api_key=8f6e775647d55c4184de24a98632aa69&query=' + Pelicula)
    .then(response => response.json())
    .then(data => {
        //console.log(data.results)
        
        for(var k in data.results) {            
            //console.log(data.results[k]);
            let id = data.results[k].id;
            let poster_path = data.results[k].poster_path;
            let backdrop_path = data.results[k].backdrop_path;
            if(poster_path && backdrop_path){
                fetch('https://api.themoviedb.org/3/movie/' +  id +'?api_key=8f6e775647d55c4184de24a98632aa69')
                .then(response => response.json())
                .then(datails => {
                    
                    console.log(id,datails);
                    let title = datails.title;
                    let overview = datails.overview;
                    let release_date = datails.release_date;
                    let anio = release_date.substring(0, 4);
                    let genres = datails.genres;
                    let production_companies = datails.production_companies;
                    let tagline = datails.tagline;
                    let vote_average = datails.vote_average;
                    let runtime = datails.runtime;
                    

                    html = html +'<div class="c-card"><div class="card"><div class="card"><div class="card_banner"><div class="background"><div class="c-background">';
                    html = html +'<div class="card_poster"><img src="https://image.tmdb.org/t/p/w500' + poster_path + '" alt=""></div>';
                    html = html +'<div class="card_banner_content"><div class="_content"><div class="_content">';
                    html = html +'<h3 class="_content-title">' + title + '('+ anio + ')</h3>';
                    html = html +'<h1 class="_content-tag">' + tagline + '</h1>';
                    html = html +'<p class="_content-subtitle">';
                    
                    for(var g in genres) {
                        if(g>0)html = html +", ";
                        html = html + genres[g].name;
                    }
                    
                    html = html + " <b>" + convertirHora(runtime) + '</b></p>';
                    //html = html +'<div class="_content-popularidad">' + (vote_average*10) + ' %</div>';
                    html = html +'</div></div></div></div></div>';
                    html = html +'<img src="https://image.tmdb.org/t/p/w500' + backdrop_path + '">';
                    html = html +'</div>';
                    html = html +'<div class="card_descripcion"><div class="c-card_descripcion"><div class="card_descripcion_texto"><h1>Resumen</h1>';
                    html = html +'<p>' + overview + '</p>';
                            
                    html = html +'</div></div></div></div></div></div>';     
                    
                    
                    /*for(var p in production_companies) {
                        if(p>0)html = html +", ";
                        html = html + production_companies[p].name;
                    } */                          
                   
            
                    document.getElementById("contenedor").innerHTML = html;    
                }); 
                
            }            
         }
         
    });    
}


function convertirHora(minutos){
    var horas = parseInt(minutos/60)
    var min = (minutos%60)

    return horas+"h "+min+"m"
}


