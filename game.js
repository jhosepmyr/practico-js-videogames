const canvas = document.querySelector('#game');
//getContext--metodo para tener las propiedades de Canvas
const game = canvas.getContext('2d');
// window es como todo nuestro HTML 
// lOAD--evento de cada vez que recargamos la pagina
// RESIZE--evento de cada vez que modificamos el tamano de la pagina
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');

const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

const botonReiniciar = document.querySelector('#reset')


let canvasSize;
let elementsSize;
let timeStart;
//variable del tiempo del juagdor
let timePlayer;
let timeInterval;


//variable de el cambio de niveles
let level = 0;
//variable de vidas del jugador
let lives = 3;

const playerPosition = {
    x: undefined,
    y: undefined
}

const giftPosition = {
    x: undefined,
    y: undefined,
  };
//se crea como let ya que queremos que se pueda reinicializar la variable con cons no se puede
let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

//esto para todas las variables que sean numeros para reducirles los decimales, ya que podria fallar el calculo de las pantallas en algun momento
function fixNumber(n){
  return Number(n.toFixed(0));
}

function setCanvasSize() {

    //window.innerHeight y innerWidth-- son metodos para saber las dimensiones de la pantalla
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    //para que todos las variables q se generen a partir de este tengan la minima cantidad de decimales
    canvasSize = Number(canvasSize.toFixed(0));

    //setAttribute--metodo para reasignar un atributo
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;


    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();

    }

function startGame(){
// transformar el string de los mapas en un arreglo bidimensional
//  const map = maps[0].match(/[IXO\-]+]/g).map(a=>a.split(""))

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';
    
    //trae el arreglo de maps.js
    const map = maps[level];

    //significa que si no hay ninguna posicion en nuestro arreglo de map
    if(!map){
      gameWin();
      return;
    }
    //le ponemos un condicional para que solo se ejecute cuando este vacia porque la funcion startGame se ejecuta constantemente
    if(!timeStart){
       //la deficion de Date y setInterval al final
      timeStart = Date.now();
      timeInterval = setInterval(showTime,100);

      showRecord();
    }

    //trim---metodo que sirve para solo string no arreglos que quita los espacios del inicio y del final
    //split---metodo de arreglos para buscar y quita lo que se manda
    const mapRows = map.trim().split('\n'); //creara un arreglo de las final que son 10
    //map---metodo de arreglos que crea un arreglo a partir de un arreglo
    const mapRowCols = mapRows.map(row => row.trim().split(''));// creara un arreglo bidimensional del arreglo dentro de cada elemento habra un arreglo de 10 elementos--se hizo con el objetivo de navegar

    //funcion llamada para mostrar la vidas desde el comienzo desde del if para que no se duplique
    showLives();

    //metodo clearRect para hacer un borrar de la seccion establecida
    game.clearRect(0,0, canvasSize, canvasSize);

    // con esto ya no se duplicara la variable cada vez que nos movamos sino se borra todo y se vuelve a escribir
    enemyPositions = [];

    //forEach---metodo de array que es similir al metodo map. pero aqui no creo ningun arrya solo itera por cada elemento--aqui tambien hubiera funcionado el metodo map.--ademas podemos darle un parametro nomas---pero si le DAMOS UN SEGUNDO PARAMETRO, ese es el indice del primer parametro
    //primero iterara las columanas que son 10
    mapRowCols.forEach((row, rowI) =>{
        //aqui iterara los 10 elementos de cada columna que son las filas por decir
        row.forEach((col, colI) => {
            //le damos de parametro COL ya que son los indices que ayudara a mostrar el respectivo emoji
            const emoji = emojis[col];
            //se suma uno ya q le establecimos un textAlign que afecta ya q colI y rowI vienen de los array que comienzan con 0
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);

            if(col == 'O'){
                //creamos un if anidado para que los valores se puedan establecer
                if(!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            }else if (col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
            }else if(col == 'X'){
              enemyPositions.push({x: posX, y: posY});
            }

            game.fillText(emoji, posX, posY);
        })
    });

    movePlayer();

    //esta forma es dificil de entener pero si funciona
    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         //le restamos uno puesto q los array comienzan de 0 no de 1
    //         game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
    //     }
        
    // }
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

botonReiniciar.addEventListener('click', reiniciarJuego);
function reiniciarJuego() {
  location.reload();
}

function movePlayer(){
    //en la constante podemos darle una igual para que nos regrese un boleano
    // el metodo toFixed nos ayuda a solo escoger una cantidad limitada de decimales, con su parametro lo fijamos
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;
    
    if (giftCollision) {
      levelWin();
    }

    //creamos esta constante para ver si se choca contra algun obstaculo pero con las positiones del array
    //find---metodo array que busca por cada array,pero no modifica al array original
    const enemyCollision = enemyPositions.find(enemy => {
      const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
      const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
      return enemyCollisionX && enemyCollisionY;
    })

    if(enemyCollision){
      levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}


//esta funcion sera para cuando ganemos
function levelWin(){
  console.log('subiste de nivel');
  //esta variable es para que cada vez se sume 1 
  level++;
  startGame();
}

function levelFail(){
  console.log('chocaste contra un enemigo');
  //decreceman las vidas
  lives--;
  

  //para
  if (lives<=0){
    //lo volvemos al primer nivel
    level = 0;
    //y le reseteamos las vidas que tenia
    lives = 3;
    //cada ves q pierda se volvera undefine haciendo q en la funcion startGame vuelva a iniciar en 0
    timeStart = undefined;
  }

  //ponemos undefined ya que al pasar por la funcion startGame en la validacion de la posicion del if anidado nos regresara a la posicion inicial
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin(){
  console.log('terminaste el juego');
   //la deficion de clearInterval al final
  clearInterval(timeInterval);
  //variable que se actualizara despues del primer intento
  const recordTime = localStorage.getItem('record_time');
  //variable del tiempo del jugador
  const playerTime = Date.now() - timeStart;
  //condicion de si recordtime tiene tiempo es verdadero si no no
  if(recordTime){
    if(recordTime >= playerTime){
      //reinicializamos la variable del localStorage con el menor tiempo
      localStorage.setItem('record_time', playerTime);
      pResult.innerHTML = 'superaste el record';
    }else {
      //no hace nada
      pResult.innerHTML = 'lo siento no superaste el record';
    }
  } else {
    // esto se ejecuta la primera vez q jugamos
    localStorage.setItem('record_time', playerTime)
    pResult.innerHTML = 'Primera vez? Muy bien, pero ahora trata de superar tu tiempo :)';
  }
  console.log({recordTime, playerTime});
}

function showLives(){
  //fill---metodo de array para insertarle a cada elemento
 const heartsArray = Array(lives).fill(emojis['HEART']); // es un superprotipo de JS para crear un array, va siempre con mayuscula al comienzo // el parametro es de un array que ayudara para saber cuantos elementos tendra el nuevo array

 //va antes del forEach para limpie el string sino se agregaria cada vez mas
 spanLives.innerHTML = "";
//append--metodo para agregar contenido
//forEach--metodo de array para recorrer por cada elemento
 heartsArray.forEach(heart => spanLives.append(heart));
// esta solucion de abajo no ya que solo agregaria un solo corazon 
//  heartsArray.forEach(heart => spanLives.innerHTML =heart);

 
}

function showTime(){
  //la deficion de Date al final
  spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord(){
  //mostrara en pantalla nuestro record
  spanRecord.innerHTML = localStorage.getItem('record_time');
}

//keyup--evento que es cuando soltamos la tecla
//keydown--evento que es cuando presionamos la tecla
window.addEventListener('keydown', moveByKeys);
//window--posee para extraer los datos de los perifericos
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);
//dato que cada funcion del evento, recibe un parametro que es el evento se puede poner como tambien no

function moveByKeys(event) {
    //el evento tiene varias propiedades--key es identificador de cada tecla en este caso
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}
function moveUp() {
  console.log('Me quiero mover hacia arriba');

  if ((playerPosition.y - elementsSize) < elementsSize) {
    console.log('OUT');
  } else {
    playerPosition.y -= elementsSize;
    startGame();
  }
}
function moveLeft() {
  console.log('Me quiero mover hacia izquierda');

  if ((playerPosition.x - elementsSize) < elementsSize) {
    console.log('OUT');
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
}
function moveRight() {
  console.log('Me quiero mover hacia derecha');

  if ((playerPosition.x + elementsSize) > canvasSize) {
    console.log('OUT');
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
}
function moveDown() {
  console.log('Me quiero mover hacia abajo');
  
  if ((playerPosition.y + elementsSize) > canvasSize) {
    console.log('OUT');
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
}


//FUNCIONES DE TIEMPO DE JS
//setInterval(a,b)--nos da dos argumentos. 1- la funcion flecha o alguna funcion externa. 2- el tiempo en milisegundos que se ejecutara continuamente el tiempo establecido
//setTimeout(a,b)---nos da dos argumentos. 1- la funcion flecha o alguna funcion externa. 2- el tiempo en milisegundos para que la funcion del 1 argumento se ejecute solo una vez depsues del tiempo establecido
//clearInterval(variable)-- lo damos un parametro de una variable con setInterval , para frenarlo y no se ejecute

//DATE--super objetos de JS o prototipe
//Date.now()--El m??todo est??tico Date.now() devuelve el n??mero de milisegundos transcurridos desde el 1 de enero de 1970 a las 00:00:00 UTC.


//localStorage
//solo esta herramienta funciona en los navegadores--por ende solo en FrontEnd
//almacenamiento local en nuestro navegador--pedirle al navegador que guarde --y que la informacion no se borre
// localStorage--para ver las variables guardadas
// localStorage.setItem(a,b)---a. la variable que guardaremos-b. el contenido de la variable.
// localStorage.getItem(a)--a. traera la variable si esta guardada
// localStorage.removeItem(a)--a. la variable que sera eliminada


//location.reload()--funcion que reincia la pagina como si se presionara F5--- no tan bueno, para el usuario

//BUGS
//crear cuando ganes muestre algo
//cuando pierdas puedes poner un cronometro de cuanta regresiva para q se reinicie la pagina con timeOuts()