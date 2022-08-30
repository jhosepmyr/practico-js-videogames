const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
// window es como todo nuestro HTML 
// lOAD es cuando carga el HTML
window.addEventListener('load', startGame);

function startGame(){
    // fillRect---es donde comienza a crear un espacio de posicion xinicial, yinicial, xfinal-ancho, yfinal-altura
    game.fillRect(0,50,100,100);
    //clearRect--- es para borrar espacio con coordenadas
    game.clearRect(50,50,50,50);
    // font, fillStyle---no son metodos son para que podamos darle css al texto
    game.font = '25px Verdana';
    game.fillStyle='purple';
    //textAlign---no metodo pero nos mueve con respecto a las coordenadas--right o end--hace que la coordenada sea el final del texto---left 0 start -- hace que la coordenada sea el comienzo del texto---center--hace que el texto este al centro de la coordenada
    game.textAlign= 'right'
    //fillText-- metodo para agregar texto con coordenadas
    game.fillText('platzi',50,50)
}