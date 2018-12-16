'use strict';

function ieee754aBinario(numero)
{

   numero = numero.toString();
    
   //Cogemos la parte entera del numero introducido
   var parteEntera = Math.abs(parseInt(numero));
    
   //Cogemos la parte decimal del numero introducido, en caso de que sea un numero decimal
   var parteDecimal;
   (numero.indexOf(".") != -1) ? parteDecimal = parseFloat("0"+numero.substring(numero.indexOf("."))) :  parteDecimal = 0;

   //Pasamos la parte entera a binario
   var binariaEntera = numEnteroBinario(parteEntera);

   //Pasamos la parte decimal a binario
   var binariaDecimal = numDecimalBinario(parteDecimal);
   
   //Calculamos cuantas posiciones se mueve el punto hasta el primer 1
   var distanciaPuntoMantisa = binariaEntera.length - binariaEntera.indexOf("1") - 1;
    
   //Sumamos al numero de posiciones 127
   var exponente = distanciaPuntoMantisa + 127;

   //Pasamos a binario el numero obtenido, de esta forma sacamos el exponente del ieee754
   var binariaExponente = numEnteroBinario(exponente);

   //Calculamos la mantisa
   var mantisa = (binariaEntera.substring(binariaEntera.indexOf("1")+1)+binariaDecimal).substring(0,23);

   //Concatenamos el signo (dependiendo si el numero introducido es positivo o negativo)
   // con el exponente y la mantisa, obteniendo finalmente el numero en el estandar ieee754
   return (numero > 0) ? "0" + binariaExponente + mantisa : "1" + binariaExponente + mantisa;
}

//Funcion para pasar la parte entera a binario
function numEnteroBinario(numero)
{
    var enteraBinaria = "";
    while(numero>1)
    {
        enteraBinaria += numero%2;
        numero = Math.floor(numero/2); 
    }
    enteraBinaria += numero;
    return invertirString(enteraBinaria);
}

//Funcion para pasar la parte decimal a binario
function numDecimalBinario(numero)
{
   var decimalBinaria = "";
     for(var i=0; i<23; i++)
    {
        numero *= 2;
        decimalBinaria += Math.floor(numero);
        numero = (numero - Math.floor(numero)).toFixed(numero.toString().substring(numero.toString().indexOf(".")+1).length);
      }
    return decimalBinaria;
}

//Funcion para invertir la cadena
function invertirString(numero) {
 
   var separarNumero = numero.split("");
    var invertirArray = separarNumero.reverse();
    var juntarArray = invertirArray.join("");
    return juntarArray;
}
