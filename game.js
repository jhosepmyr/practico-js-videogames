const canvas = document.querySelector('#game');
//getContext--metodo para tener las propiedades de Canvas
const game = canvas.getContext('2d');
// window es como todo nuestro HTML 
// lOAD--evento de cada vez que recargamos la pagina
// RESIZE--evento de cada vez que modificamos el tamano de la pagina

let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {

    //window.innerHeight y innerWidth-- son metodos para saber las dimensiones de la pantalla
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }
    //setAttribute--metodo para reasignar un atributo
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();

    }

function startGame(){

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementsSize, elementsSize * i);
    }
    // for(let ver=1; ver<=10; ver++){
    //     for (let hor = 1; hor <=10; hor++) {
    //         game.fillText(emojis['X'],elementsSize*hor,elementsSize*ver)
    //     }
    // }
    
    
    
    // fillRect---es donde comienza a crear un espacio de posicion xinicial, yinicial, xfinal-ancho, yfinal-altura
    // game.fillRect(0,50,100,100);

    //clearRect--- es para borrar espacio con coordenadas
    // game.clearRect(50,50,50,50);

    // font, fillStyle---no son metodos son para que podamos darle css al texto
    // game.font = '25px Verdana';--debemos establecer el tamano y la fuente para que funcione
    // game.fillStyle='purple';

    //textAlign---no metodo pero nos mueve con respecto a las coordenadas--right o end--hace que la coordenada sea el final del texto---left 0 start -- hace que la coordenada sea el comienzo del texto---center--hace que el texto este al centro de la coordenada
    // game.textAlign= 'right';

    //fillText-- metodo para agregar texto con coordenadas
    // game.fillText('platzi',50,50);

}