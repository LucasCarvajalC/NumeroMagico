const formulario = document.getElementById('teclado');
const valorNumero = document.getElementById('input-numero');
const reiniciarBtn = document.getElementById('reiniciar-juego-btn');
const indicadorCantidadIntentos = document.getElementById('indicador-numero-intentos');
const indicadorPista = document.getElementById('indicador-de-pista');
const contenedorEstado = document.getElementById('contenedor-estado-juego');
const indicadorEstadoJuego = document.getElementById('indicador-estado-juego');
const contenedorIntentos = document.getElementById('registro-de-intentos');

//función para generar el numero
function generarRandom(tamaño){
    return Math.floor(Math.random()*tamaño)+1;
}

//variables globales para el funcionamiento
let contador =10;
let num=generarRandom(100);
let imagen;

//boton para reiniciar el juego
reiniciarBtn.addEventListener("click", ()=>{
    contador =10;
    indicadorCantidadIntentos.innerText='10';
    num=generarRandom(100);    
    if(contenedorEstado.classList.contains('activo')){
        contenedorEstado.classList.remove('activo');
        indicadorEstadoJuego.innerText='';
    }
    if (imagen) {
        imagen.remove();
        imagen = null; 
    }
    indicadorPista.innerText='';
    valorNumero.value='';
    contenedorIntentos.innerHTML='';

    
});


//función para invocar el metodo de juego
formulario.addEventListener("submit", (e)=>{
    //importante
    e.preventDefault();
    if(parseInt(valorNumero.value)<0 || parseInt(valorNumero.value)>100){
        alert('debe ingresar un número entre 1-100 en la casilla');
    }else{
        if(valorNumero.value.trim()!==''){
            juego();
        }else{
            alert('debe ingresar un número en la casilla');
        } 
    }
   
});

//reglas del juego
function juego(){
    
    //ojo con el parseo, los inputs regresan texto
    let valorIngresado = parseInt( valorNumero.value);

    //añadimos un elemento a la lista, el cual es el historial de juego
    const nuevoElemento = document.createElement('li');
    nuevoElemento.textContent = 'Su intento fue: '+valorIngresado;
    contenedorIntentos.appendChild(nuevoElemento);

    //jugamos si aún tenemos "vidas"
    if(contador>0){

        if(valorIngresado === num){
            indicadorEstadoJuego.innerText='NICEEEEE, felicidades bro.';
            contenedorEstado.classList.add('activo');

            imagen = document.createElement('img');
            imagen.src='../img/happy.png';
            imagen.classList.add('imagenVictoriaDerrota');
            contenedorEstado.appendChild(imagen);

        }else{
            contador--;
            indicadorCantidadIntentos.innerText=contador;

            if(valorIngresado<num){
                indicadorPista.innerHTML='El número es mayor que '+valorIngresado;
            }
            if(valorIngresado>num){
                indicadorPista.innerHTML='El número es menor que '+valorIngresado;
            }
        }
    }

    //si se acabaron los intentos y no acertó
    if(contador===0 && valorIngresado!==num){
        indicadorEstadoJuego.innerText='Muy buen intento, era el '+num;
        contenedorEstado.classList.toggle('activo');

        imagen = document.createElement('img');
        imagen.src='../img/sad.png';
        imagen.classList.add('imagenVictoriaDerrota');
        contenedorEstado.appendChild(imagen);

    }

    //limpiamos el input (opcional, pero para comidad del usuario se pone)
    valorNumero.value='';

}

