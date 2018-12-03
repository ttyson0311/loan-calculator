//Listen for Submit
document.getElementById('loan-form').addEventListener('submit', function(e){
//Hide Results
document.getElementById('results').style.display = 'none';
//Show loader
document.getElementById('loading').style.display = 'block';

setTimeout(calculateResults, 2000);
e.preventDefault();
});

//Calculate Results
function calculateResults(){
	console.log('Calculating...');

//UI Variables
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

//take the value from amount and turning into decimal with parseFloat
const principal = parseFloat(amount.value);
//take the value from interest and turning into decimal with parseFloat 
const calculatedInterest = parseFloat(interest.value) / 100 / 12;

const calculatedPayments = parseFloat(years.value) * 12;

//Compute monthly payment
const x = Math.pow(1+ calculatedInterest, calculatedPayments);
const monthly = (principal*x*calculatedInterest)/(x-1);


//check to see if monthly number is finite
if(isFinite(monthly)) {
	monthlyPayment.value = monthly.toFixed(2);
	totalPayment.value = (monthly * calculatedPayments). toFixed(2);
	totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
	//Show Results
	document.getElementById('results').style.display = 'block';
	//Hide Loader
	document.getElementById('loading').style.display = 'none';

} else {
	showError('Please Check Your Numbers');
}	
}

//Show Error
function showError (error) {
	//Hide Results
	document.getElementById('results').style.display = 'none';
	//Hide Loader
	document.getElementById('loading').style.display = 'none';
	//Creaate a div
	const errorDiv = document.createElement('div');
	//Get Elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');
	//Add class
	errorDiv.className = 'alert alert-danger';
	//Create Text node and append to div
	errorDiv.appendChild(document.createTextNode(error));
	//Insert error above heading
	card.insertBefore(errorDiv,heading);
	//Clear error after 3 seconds
	setTimeout(clearError, 3000);
}

//Clear error
function clearError(){
	document.querySelector('.alert').remove();
	document.getElementById('results').style.display = 'block';

}