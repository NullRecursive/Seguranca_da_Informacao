//descripta a palavra
function Decrypt(json, matriz){
    let word = [];
    let cont = 0;
    let tamanho = json.length;
    while(cont < tamanho){
        if(json[cont].line === json[cont + 1].line){
            if(json[cont].column === 0){
                json[cont].column = 5;
            }
            if(json[cont + 1].column === 0){
                json[cont + 1].column = 5;
            }
            let calcColum = (json[cont].column - 1) % 5;
            word.push(matriz[(json[cont].line)][calcColum]);
            calcColum = (json[cont + 1].column - 1) % 5;
            word.push(matriz[json[cont].line][calcColum]);
        }
        if(json[cont].column === json[cont + 1].column){
            if(json[cont].line === 0){
                json[cont].line = 5;
            }
            if(json[cont + 1].line === 0){
                json[cont + 1].line = 5;
            }
            let calcLine = (json[cont].line - 1) % 5;
            word.push(matriz[calcLine][json[cont].column]);
            calcLine = (json[cont + 1].line - 1) % 5;
            word.push(matriz[calcLine][json[cont].column]);
        }
        if(json[cont].column !== json[cont + 1].column && json[cont].line !== json[cont + 1].line){

            word.push(matriz[json[cont].line][json[cont + 1].column]);
            word.push(matriz[json[cont + 1].line][json[cont].column]);
        }        
        cont += 2;
    }
    return word;
}

//dada uma cordenada retorna uma palavra da matriz
function getElementMatriz(cord,matriz){
    return matriz[cord.line][cord.column];   
}
//pega a frase completa
function getAllFrase(cords,matriz){
    var frase = [];
    cords.forEach((cord)=>{
        cord.forEach((c)=>{
            frase.push(getElementMatriz(c,matriz));
        });
    });
    console.log(frase);
}
//faz o calculo da coluna
function calColum(cord){
    if(cord[0].column  == 4){
        if(cord[0].line == 4){
            cord[0].column = 0;
            cord[0].line = 4;
        }else{
            cord[0].column = 0;
            cord[0].line = cord[0].column % 4;
        }
        
        
    }else{
       
        cord[0].column += 1;
    }
    if(cord[1].column == 4){
        if(cord[1].line == 4){
            cord[1].column = 0;
            cord[1].line = 4;
        }else{
            cord[1].column = 0;
            cord[1].line = cord[0].column % 4;
        }
        
    }else{
        cord[1].column +=1;
    }
    console.log('coluna');
    console.log(cord)
    return cord;
}
//faz o calculo da linha
function calLine(cord){
    console.log('CalLine')
    if(cord[0].line == 4){
        if(cord[0].column == 4){
            cord[0].line = 0;
            cord[0].column = 4;
        }else{
            cord[0].line = 0;
            cord[0].column = cord[0].line % 4;
        }
    }else{
        console.log(cord[0].line)
        cord[0].line += 1;
    }
    if(cord[1].line == 4){
        if(cord[1].column == 4){
            cord[1].line = 0;
            cord[1].column = 4;
        }else{
            cord[1].line = 0;
            cord[1].column = cord[1].line % 4;
        }
    }else{
        cord[1].line += 1;
    }
    return cord;
}
//verifica se são da mesma linha
function sameLine(cord){
    if(cord[0].line == cord[1].line){
        return true;
    }
    return false;    
}
//verifica se são da mesma coluna
function sameColumn(cord){
        if(cord[0].column == cord[1].column){
            return true;
        }
        return false;
}
//aplica as regras
function rules(cords){
    var arrays = [];
  cords.forEach((cord)=>{
    var pos = JSON.parse(JSON.stringify(cord));
        if(sameLine(pos)){
                arrays.push(calColum(pos));
        }else if(sameColumn(pos)){
            arrays.push(calLine(pos));
        }else{
        arrays.push([{line:pos[0].line,column:pos[1].column},{line:pos[1].line,column:pos[0].column}]);
        }
  });
  return arrays;
}
//pega posição das palavra na matriz
function getPosition(word,matriz){
    let column = 5;
    let line = 5;
    for(var i = 0; i < column; i++){
        for(var j = 0; j < line; j++){
                let index  = matriz[i].indexOf(word);
                if(index > -1){
                   return {line:i,column:index};
                }
        }
    }
}
//pega as cordenadas dos par de palavra
function cord(words,matriz){
    var arrayDot = [];
    for(var i = 0 ; i< 2; i++){
        arrayDot.push(getPosition(words[i],matriz));
    }
    return arrayDot;
}
//pega a matriz completa
function getWordMatriz(words,matriz){
   let length = words.length;
   let array_cord = [];
   for(let i = 0; i < length; i++){
       array_cord.push(cord(words[i],matriz));
   }
   return array_cord;
}
//encripta as palavra
function getEncripWord(word = []){
    const duples = [];
    let message = word;
        for(let i = 0; i < message.length; i += 2){
            const dupleCurrent = message.slice(i, i + 2);
            if(dupleCurrent.length !== 2){
                dupleCurrent.push('x');
                duples.push(dupleCurrent);
            } else if(dupleCurrent[0] === dupleCurrent[1]){
                message.splice(i+1,0,'x');
                duples.push(message.slice(i, i + 2));
            } else{
                duples.push(dupleCurrent);
            }
        }
        return duples;
}
//remove as palavras duplicada do alfabeto em relação a palavra chave
function removeDuplicate(words = [],alphabet = []){
  words.forEach((word)=>{
        var index = alphabet.indexOf(word);
        if(index > -1){
            alphabet.splice(index,1);
        }

  });
   return alphabet;
}
//converte palavra pra array
function StringToArray(string = null){
    var array =[];
    for(var i = 0; i<string.length;i++){
        if(string[i] != ' '){
            array.push(string[i]);
        }
        
    }
    return array;
}
//tira as palavras repetidas
function DropRepeatWord(words = []){
    var newArray = words.filter((word,index)=>{
        return words.indexOf(word) == index;
    });
    return newArray;
}
//pega a matrix completa
function GetMatrixFull(key){
    var matriz = new Array(5); 
    var ALPHABET =  ['a','b','c','d','e','f','g','h', 'i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','y','z'];
    var index = 0;
    var indez = 0;
    var NEW_ALPHABET= removeDuplicate(key,ALPHABET);
    for(var i = 0; i < 5; i++){
        matriz[i] = new Array(5);
        for(var j = 0; j < 5; j++){
            if(index < (key.length)){
            matriz[i][j] = key[index];  
            index++;
            }else{
                if(indez < ALPHABET.length){
                    matriz[i][j] = NEW_ALPHABET[indez];
                    indez++;
                }
            }
        }
    }
    return matriz;
}
var key = "Digite aqui sua chave!!!";
var phrase = "Digite aqui sua Frase!!";
var noDuplicate = DropRepeatWord(StringToArray(key))
var matriz = GetMatrixFull(noDuplicate)
var t = getEncripWord(StringToArray(phrase));
var lines_column = getWordMatriz(t,matriz);
var des = rules(lines_column);
let frase = getAllFrase(des,matriz);





