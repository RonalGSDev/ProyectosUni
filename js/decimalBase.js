
const inputNumero = document.getElementById("inputNumero");
const inputOpcion = document.getElementById("inputOpcion");
const intputResultado = document.getElementById("intputResultado");
const inputHistorial = document.getElementById("inputHistorial");
const btnConvertir = document.getElementById("btnConvertir");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnEliminarHistorial = document.getElementById("btnEliminarHistorial");

btnLimpiar.disabled = true;

function mostrarMensaje(icono, titulo, texto) {
    Swal.fire({
        icon: icono,     
        title: titulo,  
        text: texto,
    });
}

function divisiones(cociente, base){

    let resultado=[];
    let residuo;

    while(cociente>0){
        residuo = cociente % base; 
        resultado.push(residuo);   
        cociente = Math.floor(cociente / base);  
    }
    resultado.reverse();
    return resultado;
}


btnConvertir.addEventListener('click', () => {

    let num = Math.abs(parseInt(inputNumero.value));
    inputNumero.value = num;

    if(inputNumero.value === "")
        mostrarMensaje("info","¡Aviso!","Ingrese un numero");
    else if(!(parseInt(inputOpcion.value) > 0))
        mostrarMensaje("info","¡Aviso!","Seleccione una opción de conversión");
    else{

        btnLimpiar.disabled = false;
        btnConvertir.disabled = inputOpcion.disabled = inputNumero.disabled = true;

        switch(parseInt(inputOpcion.value)){
            case 1:              
                intputResultado.value = (divisiones(num,8)).join('');
            break;

            case 2:
                intputResultado.value = (divisiones(num,2)).join('');
            break;

            case 3:
                let arregloHexa = divisiones(num,16);

                for(let i=0; i<arregloHexa.length; i++){
                    if(arregloHexa[i] == "10")
                        arregloHexa[i] = "A";
                    else if(arregloHexa[i] == "11")
                        arregloHexa[i] = "B";
                    else if(arregloHexa[i] == "12")
                        arregloHexa[i] = "C";
                    else if(arregloHexa[i] == "13")
                        arregloHexa[i] = "D";
                    else if(arregloHexa[i] == "14")
                        arregloHexa[i] = "E";
                    else if(arregloHexa[i] == "15")
                        arregloHexa[i] = "F";
                }

                intputResultado.value = arregloHexa.join('');
            break;
        }
    }
});

btnLimpiar.addEventListener('click', ()=>{

    inputHistorial.value += `Decimal = ${inputNumero.value}  -->  ${inputOpcion.options[inputOpcion.selectedIndex].text} = ${intputResultado.value} \n`;

    btnLimpiar.disabled = true;
    btnConvertir.disabled = inputOpcion.disabled = inputNumero.disabled = false;

    inputNumero.value="";
    intputResultado.value="";
});


btnEliminarHistorial.addEventListener('click', ()=>{
    inputHistorial.value="";
});