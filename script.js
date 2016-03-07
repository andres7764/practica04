window.onload = function()
{
    var sudoku      = [],
        solve       = [],
        dimension   = 3,
        dificultad  = 1;

    //Para cargar los combos...
    var select = nom_div("opc_2");
    for (var i = 2; i<= 5; i++)
    {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    }

    /*
        Función en la cual llega el valor escrito por el usaurio
        además de la posición del valor digitado en la matriz...
        Se deberá validar si el número digitado cumple con la condición para estar en esa posición...
        1. Un número no puede repetirse en el mismo cuadrante...
        2. Un número no puede estar en la misma Fila.
        3. Un número no puede estar en la misma columna.*/
    var validaMatriz = function(array,valor)
    {
        var status = false;
        array1 = [];
        var div = valor1 = "";
        var counter = 0;
                for(indice1 = 0; indice1 < solve.length; indice1++) {
                    for(indice2 = 0;indice2 < solve.length; indice2++) {
                        div = array[0]+"_"+array[1]+"_"+[indice1]+"_"+[indice2]; //Matriz única
                        if (nom_div(div) === null) {
                            valor1 = Number(nom_div("td_"+div).innerText);
                        } else {
                            valor1 = Number(nom_div(div).value);
                        }
                        array1.push(valor1);
                    }
                }
                for (i = 0; i < array1.length; i++) {
                    if(array1[i] !== 0)
                    {
                        if(array1[i] == valor) {
                            counter++;   
                        }
                    }
                }
        if (counter > 1){
            status = false;
            nom_div(array[0]+"_"+array[1]).className = "error";
        } else {
            status = true;
            nom_div(array[0]+"_"+array[1]).className = "cuadrante";
        }
        return status;
    }

    var validaHorizontal = function(array,valor)
    {
        var status = false;
        var counter = 0;
        var array1 = [];
        var arrayPos = [];
        var div = "";
        for(columna = 0;columna < solve.length; columna++) { //0 
            for(indice2 = 0; indice2 < solve.length; indice2++) {
                div = array[0]+"_"+columna+"_"+array[2]+"_"+indice2; //Vertical
                valor2 = "td_"+div;
                if (nom_div(div) === null) {
                valor1 = Number(nom_div("td_"+div).innerText);
                } else {
                    valor1 = Number(nom_div(div).value);
                }
                arrayPos.push(valor2);
                array1.push(valor1);
            }
        }
        for (i = 0; i < array1.length; i++) {
                if(array1[i] !== 0)
                {        
                    if(array1[i] == valor) {
                    counter++;   
                    }
                }
        }
        if (counter > 1){ pintarCampos(arrayPos,"error"); status = false; } else { pintarCampos(arrayPos,"interno"); status = true;}
        return status;
    }


    function pintarCampos(array,pint)
    {
       for (i = 0; i < array.length; i ++){
            nom_div(array[i]).className = pint;  
            }
    }

    var validaVertical = function(array,valor)
    {
        var counter = 0;
        var array1 = [];
        var arrayPos = [];
        var status = false;
                for(columna = 0;columna < solve.length; columna++) { //0 
                for(indice2 = 0; indice2 < solve.length; indice2++) {
                    div = [columna]+"_"+array[1]+"_"+[indice2]+"_"+array[3]; //Vertical
                    valor2 = "td_"+div;
                    if (nom_div(div) === null) {
                    valor1 = Number(nom_div("td_"+div).innerText);
                    } else {
                        valor1 = Number(nom_div(div).value);
                    }
                    array1.push(valor1);
                    arrayPos.push(valor2);
                }
            }
              for (i = 0; i < array1.length; i++) {
                if(array1[i] !== 0)
                {        
                    if(array1[i] == valor) {
                    counter++;   
                    }
                }
        }
        if (counter > 1){ pintarCampos(arrayPos,"error"); status = false; } else { pintarCampos(arrayPos,"interno"); status = true;}
           
        return status;
    }

    var validaSudoku = function(valor, id)
    {
        var parteID  = id.split("_");
        var matriz     = validaMatriz(parteID,valor);
        var horizontal = validaHorizontal(parteID,valor);
        var Vertical   = validaVertical(parteID,valor);
       /* if (matriz == true && horizontal == true && Vertical == true){
            if(confirm("Desea jugar de nuevo")){
             nuevoSudoku();   
            }
        } */
       
    }

    var nuevoSudoku = (function nuevoSudoku()
    {
        var newSudoku = sudokuJS.creaSudoku(dimension, dificultad);
        sudoku = newSudoku.sudokujs;
        solve = newSudoku.respuesta;
        //Para dibujar el sudoku en html...
        var txt     = "<table>",
            nomID   = "";
            eventos = [];
        for(var fila = 0; fila < sudoku.length; fila++)
        {
            txt += "<tr>";
            for(var col = 0; col < sudoku.length; col++)
            {
                txt += "<td>";
                txt += "<table class = 'cuadrante' id = '"+fila+"_"+col+"'>";
                for(var i = 0; i < sudoku.length; i++)
                {
                    txt += "<tr>";
                    for(var c = 0; c < sudoku.length; c++)
                    {
                        nomID = fila + "_" + col + "_" + i + "_" + c;
                        txt += "<td class = 'interno' id = 'td_"+(nomID)+"'>";
                        
                        if(sudoku[fila][col][i][c] !== 0)
                        {
                            txt += sudoku[fila][col][i][c];
                        }
                        else
                        {
                            txt += "<input type = 'text' class = 'numero' id = '"+(nomID)+"' maxlength = '1' value=''>";
                            eventos.push(nomID);
                        }
                        txt += "</td>";
                    }
                    txt += "</tr>";
                }
                txt += "</table>";
            }
            txt += "</tr>";
        }
        txt += "</table>";
       // console.log(eventos);
        nom_div("escenario").innerHTML = txt;
        for(var i = 0; i < eventos.length; i++)
        {
            nom_div(eventos[i]).addEventListener("keyup", function(event)
            {
                if(isNumber(this.value) || this.value === "")
                {
                    validaSudoku(this.value === "" ? 0 : Number(this.value), this.id);
                }
                else
                {
                    this.value = "";
                }
            });
        }
        //Fin de dibujar el sudoku...
        return nuevoSudoku;
    })();

    nom_div("resuelve").addEventListener('keydown', function(event)
	{
		//console.log(event);
        //Para completar los campos del sudoku...
        //resuelve
        var nomID = "";
        for(var fila = 0; fila < solve.length; fila++)
        {
            for(var col = 0; col < solve.length; col++)
            {
                for(var i = 0; i < solve.length; i++)
                {
                    for(var c = 0; c < solve.length; c++)
                    {
                        //Saber si el input existe para completar el espacio...
                        nomID = fila + "_" + col + "_" + i + "_" + c;
                        if(nom_div(nomID) !== null)
                        {
                            nom_div(nomID).value = solve[fila][col][i][c];
                        }
                    }
                }
            }
        }
	});

    nom_div("nuevo").addEventListener('click', function(event)
    {
        nuevoSudoku();
    });

    for(var combo = 1; combo <= 2; combo++)
    {
        nom_div("opc_" + combo).addEventListener('change', function(event)
        {
            var numOpc = Number(this.id.split("_")[1]);
            if(numOpc === 1)
            {
                if(Number(this.value) !== 0)
                {
                    dificultad = Number(this.value);
                }
            }
            else
            {
                if(Number(this.value) !== 0)
                {
                    dimension = Number(this.value);
                }
            }
            nuevoSudoku();
        });
    }

    function isNumber(n)
    {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function nom_div(div)
	{
		return document.getElementById(div);
	}
};
