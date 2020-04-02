$(document).ready(function(){
    $.ajax({
        url : "products.json",
        method : "GET",
        dataType : "json",
        success : function(data){
            showData(data);
        },
        error : function(err){
            console.log(err);
        }
    })
    $('#a').click(move);
    $('#b').click(move);
    $('#c').click(sendData);
})

var newLeft = [];
var rest = [];
var leftArray = [];
var values = [];
var notValues = [];
var rightArray = [];
var valuesRight = [];
var notValuesRight = [];
var restRight = [];

function showData(data){
    var ispis = '';
    for(let el of data){
        ispis += `<input class='checkovi' name='leviBlokChecks' type="checkbox" value="${el.id}"/><label for="${el.id}">${el.name}</label><br/>`;
        leftArray.push(el);
    }
    document.querySelector('.check1').innerHTML = ispis;
}

function move(){
    var vredDugmeta = this.id;
    $.ajax({
        url : "products.json",
        method : "GET",
        dataType : "json",
        success : function(data){
            if(vredDugmeta == 'a'){
                var nameLeviBlok = document.getElementsByName('leviBlokChecks');

            for(let i = 0 ; i < nameLeviBlok.length ; i++){
                if(nameLeviBlok[i].checked){
                    values.push(nameLeviBlok[i].value);
                }
            }

            for(let i = 0 ; i < nameLeviBlok.length ; i++){
                if(!nameLeviBlok[i].checked){
                    notValues.push(nameLeviBlok[i].value);
                }
            }
            newLeft = data.filter(el => {

                for(let i = 0 ; i < values.length ; i++){
                    if(values[i] == el.id)return el;
                }
            })
            rest = data.filter(el => {
                for(let i = 0 ; i < notValues.length ; i++){
                    if(notValues[i] == el.id)return el;
                }
            })

            var desniChecks = '';

            for(let el of newLeft){
    
                desniChecks += `<input class='checkovi' name='desniBlokChecks' type="checkbox" value="${el.id}"/><label for="${el.id}">${el.name}</label><br/>`;
            }
            document.querySelector('.check2').innerHTML += desniChecks;

            var leviChecks = '';

            for(let el of rest){
                leviChecks += `<input class='checkovi' name='leviBlokChecks' type="checkbox" value="${el.id}"/><label for="${el.id}">${el.name}</label><br/>`;
            }
            document.querySelector('.check1').innerHTML = leviChecks

            }else{
                var nameDesniBlok = document.getElementsByName('desniBlokChecks');
            if(nameDesniBlok.length > 0){
                for(let i = 0 ; i < nameDesniBlok.length ; i++){
                    if(nameDesniBlok[i].checked){
                        valuesRight.push(nameDesniBlok[i].value);
                    }
                }
                for(let i = 0 ; i < nameDesniBlok.length ; i++){
                    if(!nameDesniBlok[i].checked){
                        notValuesRight.push(nameDesniBlok[i].value);
                    }
                }
            }
            rightArray = data.filter(el => {
                for(let i = 0 ; i < valuesRight.length ; i++){
                    if(valuesRight[i] == el.id)return el;
                }

            })
            restRight = data.filter(el => {
                for(let i = 0 ; i < notValuesRight.length ; i++){
                    if(notValuesRight[i] == el.id)return el;
                }
            })
            var desniChecks = '';

            for(let el of rightArray){
            
                desniChecks += `<input class='checkovi' name='leviBlokChecks' type="checkbox" value="${el.id}"/><label for="${el.id}">${el.name}</label><br/>`;
            }
            document.querySelector('.check1').innerHTML += desniChecks;

            var leviChecks = '';

            for(let el of restRight){
            
                leviChecks += `<input class='checkovi' name='desniBlokChecks' type="checkbox" value="${el.id}"/><label for="${el.id}">${el.name}</label><br/>`;
            }
            document.querySelector('.check2').innerHTML = leviChecks;
            }
        },
        error : function(err){
            console.log(err);
        }
    })   
    
    values = [];
    notValues = [];
    valuesRight = [];
    notValuesRight = [];
    restRight = [];
    rest = [];
}

function sendData(){
    var arrayForSending = [];
    var jsonArray;
    var rightChecks = document.getElementsByName('desniBlokChecks');

    if(rightChecks.length > 0){
        for(let i = 0 ; i < rightChecks.length ; i++){
            arrayForSending.push(rightChecks[i].value);
        }
        jsonArray = JSON.stringify(arrayForSending);
    }else{
       return;
    }
    $.ajax({

        url : "obrada.php",
        method : "POST",
        dataType : "json",
        data : {
            "jsonArray" : jsonArray,
            "dugme" : true
        },
        success : function(data){
            console.log(data);
        },
        error : function(xhr){
            console.log(xhr.responseText);
        }
    })
}