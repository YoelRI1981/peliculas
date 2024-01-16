const main$$ = document.querySelector("main");


const getPeliculas = async () => {
const response = await fetch("http://localhost:3000/api/movies",  { method: 'GET',
mode: 'cors', 
cache: 'default'
});
const result = await response.json();
return result

}
const mapearPeliculas = (peliculasSinMapear) => {
    return peliculasSinMapear.map((pelicula)=> ({
        titulo: pelicula.title,
        director: pelicula.director,
        año: pelicula.year,
        genero: pelicula.genre.map((genre) => genre).join(', '),
        portada: pelicula.cover,
        duracion: pelicula.runTime,
        interpretes: pelicula.starring.map((starring) => starring).join(', '),

    }));

};
 const pintarPeliculas = (peliculas) => {
main$$.innerHTML = "";
    for (const pelicula of peliculas) {
        let peliculasDiv$$ = document.createElement("div")
        peliculasDiv$$.innerHTML=`
        <h2>${pelicula.titulo}</h2>
        <h3>${pelicula.director}</h3>
        <img src= "${pelicula.portada}" alt="${pelicula.titulo}">
        <p>${pelicula.genero}</p>
        <p>${pelicula.año}</p>
        <p>${pelicula.interpretes}</p>
        <P>${pelicula.duracion}</P>
        `  

        main$$.appendChild(peliculasDiv$$);
    }
 }

 const cogerInput = (peliculas) =>{
const input$$ = document.querySelector("input");
console.log(input$$);
input$$.addEventListener("input", () => 
filtrarPeliculas(peliculas, input$$.value));
}

const filtrarPeliculas= (arrayParaFiltrar, filtro) =>{
    let peliculasFiltradas = arrayParaFiltrar.filter((pelicula) => 
    pelicula.titulo.toLowerCase().includes(filtro.toLowerCase()));
    pintarPeliculas(peliculasFiltradas);
}





const init = async () => {
const peliculas = await getPeliculas();

const peliculasMapeados = mapearPeliculas(peliculas);
 pintarPeliculas(peliculasMapeados)
 cogerInput(peliculasMapeados)
}
init ()