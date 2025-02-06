const inputNumBase = document.getElementById("inputNumBase");
const opcionSelect = document.getElementById("selectBases");
const intputResultadoDeci = document.getElementById("intputResultadoDeci");
const btnConverDeci = document.getElementById("btnConverDeci");

const btnLimpDeci = document.getElementById("btnLimpDeci");

btnLimpDeci.disabled = true;

window.onload = () => {
    var toastElement = document.querySelector('.toast');
    var toast = new bootstrap.Toast(toastElement);
    toast.show();
}

function mostrarMensaje(icono, titulo, texto) {
    Swal.fire({
        icon: icono,     
        title: titulo,  
        text: texto,
    });
}


function conversionDecimal(array, base){

    let result=0;
    for(let i=0; i<array.length; i++){
        result += Math.pow(base,i)*parseInt(array[i]);
    }
    intputResultadoDeci.value=result;    
}

const selectBases = document.getElementById("selectBases").addEventListener('change', function(){
    inputNumBase.value="";
    if (parseInt(this.value) == 1) {      
        inputNumBase.oninput = function() {
            this.value = this.value.replace(/[^0-7]/g, "");
        };
    } else if (parseInt(this.value) == 2){
      
        inputNumBase.oninput = function() {
            this.value = this.value.replace(/[^01]/g, "");
        };
    } else if (parseInt(this.value) == 3) {
        
        inputNumBase.oninput = function() {
            this.value = this.value.replace(/[^0-9A-Fa-f]/g, ""); 
        };
    }
})


btnConverDeci.addEventListener('click', () => {

    if(parseInt(opcionSelect.value)<3){
        let num = Math.abs(parseInt(inputNumBase.value));
        inputNumBase.value = num;
    }

    if(!(parseInt(opcionSelect.value) > 0))
        mostrarMensaje("info","¡Aviso!","Seleccione una tipo de base a convertir");
    else if(inputNumBase.value === "")
        mostrarMensaje("info","¡Aviso!","Ingrese un numero de la base seleccionada");
    else{

        btnLimpDeci.disabled = false;
        btnConverDeci.disabled = opcionSelect.disabled = inputNumBase.disabled = true;

        let numeroArray = inputNumBase.value.split('');
        numeroArray.reverse();
        

        switch(parseInt(opcionSelect.value)){
            case 1:
                conversionDecimal(numeroArray,8)
            break;

            case 2:
                conversionDecimal(numeroArray,2)
            break;
            case 3:
                const hexMap = { A: "10", B: "11", C: "12", D: "13", E: "14", F: "15" };
                numeroArray = numeroArray.map(char => hexMap[char.toUpperCase()] || char);
                conversionDecimal(numeroArray,16)
            break;
        }

    }
    
    
});

btnLimpDeci.addEventListener('click', ()=>{

    inputHistorial.value += `${opcionSelect.options[opcionSelect.selectedIndex].text} = ${inputNumBase.value}  -->  Decimal = ${intputResultadoDeci.value}\n`;

    btnLimpDeci.disabled = true;
    btnConverDeci.disabled = opcionSelect.disabled = inputNumBase.disabled = false;

    inputNumBase.value="";
    intputResultadoDeci.value="";
});