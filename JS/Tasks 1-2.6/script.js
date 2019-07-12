//Task1
var sum = 0;
for (var i = 10; i<=20; i++){
	console.log(i*i);
	sum+= i;
}
console.log(sum);

//Task2
function sumRange(x1, x2){
	return (x1 + x2) / 2 * (x2-x1 + 1);
}

function productRange(x1, x2){
	var product = x1;
	for (var i = x1 + 1; i<=x2; i++)
		product *= i;
	return product;
}

function buttonClick(){
	var x1 = document.getElementById('x1').value;
	var x2 = document.getElementById('x2').value;
	var op1 = document.getElementById('operationChoice1').checked;
	var op2 = document.getElementById('operationChoice2').checked;

	if ((x1 == "") || (x2 == "")) {
		alert("Поля x1 и x2 должны быть заполнены.")
		return;
	}

	x1 = parseInt(x1);
	x2 =parseInt(x2);

	if(Number.isNaN(x1) || Number.isNaN(x2)){
		alert("В поля х1 и х2 должны быть введены числовые значенияю.");
	} else if (x2 < x1){
		alert("x1 не может быть больше x2.");
	} else {
		var resultDiv = document.getElementById('result');
		var result;
		if (op1 == true)
			result = "Sum of numbers from x1 to x2: " + sumRange(x1, x2);
		else
			if (op2 == true)
				result = "Product of numbers from x1 to x2: " + productRange(x1, x2);
			else
				console.log("Undefined behaviour");
		resultDiv.innerHTML = result;
	}
}

function buttonClickClear(){
	document.getElementById('x1').value = "";
	document.getElementById('x2').value = "";
}

//Task 2.6
function isPrime(x){
	if (x < 2) 
		return false;
	for(var i = 2; i <= Math.sqrt(x); i++){
		if (x % i == 0)
			return false;
	}
	return true;
}

function getPrimeInRange(x1, x2){
	var result = [];
	for (var i = x1; i < x2; i++)
		if (isPrime(i))
			result.push(i);
	return result;
}

