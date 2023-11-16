const buttonCalculate = document.querySelector('.button__calculate');
const buttonCoupon = document.querySelector('.button__coupon');
const buttonCalculatorBack = document.querySelector('.calculator-back');
const buttonCouponBack = document.querySelector('.coupon-back');
const inicioActions = document.querySelector('.actions');
const discountCalculator = document.querySelector('.discount__calculator');
const buttonCalculateDiscount = document.querySelector('.button__calculate__discount');
const discountCoupon = document.querySelector('.discount__coupon');
const priceInput = document.querySelector('#price');
const percentageInput = document.querySelector('#percentage');
const stopInput = document.querySelector('#stop');
const inputPercentage = document.querySelector('.inputPercentage');

buttonCalculate.addEventListener('click', openDiscountCalculator);
buttonCoupon.addEventListener('click', openCouponSearch);
buttonCalculatorBack.addEventListener('click', goBackCalculator);
buttonCouponBack.addEventListener('click', goBackCoupon);
buttonCalculateDiscount.addEventListener('click', calculateDiscount);

function openDiscountCalculator () {
    inicioActions.classList.add('hidden');
    discountCalculator.classList.remove('hidden');
}

function openCouponSearch () {
    console.log('hola')
    inicioActions.classList.add('hidden');
    discountCoupon.classList.remove('hidden');
}

function goBackCalculator () {
    discountCalculator.classList.add('hidden');
    inicioActions.classList.remove('hidden');
}

function goBackCoupon () {
    discountCoupon.classList.add('hidden');
    inicioActions.classList.remove('hidden');
}

function limitInputDecimal(input) {
    input.addEventListener('keydown', function (event) {
        const keyCode = event.which || event.keyCode;

        if (!((keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 96 && keyCode <= 105) ||
            keyCode === 8 || keyCode === 9 ||
            keyCode === 13 || keyCode === 37 ||
            keyCode === 39 || keyCode === 46 ||
            (keyCode === 110 || keyCode === 190) && !input.value.includes('.'))) {
            event.preventDefault();
        }
    });

    input.addEventListener('input', function () {
        let inputValue = input.value;

        // Verificar si hay más de un punto decimal
        const dotCount = inputValue.split('.').length - 1;
        if (dotCount > 1) {
            // Si hay más de un punto, eliminar los puntos adicionales
            input.value = inputValue.replace(/\.+$/, '');
        }

        const decimalIndex = inputValue.indexOf('.');
        if (decimalIndex !== -1) {
            const decimalPart = inputValue.substring(decimalIndex + 1);
            if (decimalPart.length > 2) {
                // Si hay más de 2 dígitos después del punto, truncar la entrada
                input.value = inputValue.substring(0, decimalIndex + 3);
            }
        }

        console.log(input.value);
    });
}

limitInputDecimal(priceInput);
limitInputDecimal(stopInput);

function limitEntryInteger(input) {
    input.addEventListener('keydown', function (event) {
        const keyCode = event.which || event.keyCode;

        // Permitir solo números y teclas de control
        if (!((keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 96 && keyCode <= 105) ||
            keyCode === 8 || keyCode === 9 ||
            keyCode === 13 || keyCode === 37 ||
            keyCode === 39 || keyCode === 46)) {
            event.preventDefault();
        }
    });

    input.addEventListener('input', function () {
        let inputValue = input.value;

        // Convertir a número entero y asegurarse de que esté entre 0 y 100
        const intValue = parseInt(inputValue, 10);
        if (isNaN(intValue) || intValue < 0 || intValue > 100) {
            // Si no es un número entero o está fuera del rango, establecer el valor en blanco
            input.value = '';
        } else {
            // Establecer el valor numérico entero
            input.value = intValue;
        }

        console.log(input.value);
    });
}

limitEntryInteger(percentageInput);

function calculateDiscount(e) {
    e.preventDefault();
    const priceValue = document.querySelector('#price').value;
    const percentageValue = parseFloat(document.querySelector('#percentage').value);
    const stopValue = parseFloat(document.querySelector('#stop').value);

    const result = document.querySelector('.result');
    result.classList.remove('hidden');

    function discountAmountF() {
        const discountAmount = (percentageValue * priceValue) / 100;
        if(discountAmount > stopValue){
            return stopValue;
        }
        return discountAmount;
    }

    const resultDiscountAmount = discountAmountF();
    
    const discountedPriceApplied = (priceValue * (100 - percentageValue)) / 100;

    const resultPrice = document.querySelector('.price');
    resultPrice.textContent = priceValue;
    const resultDiscount = document.querySelector('.discount');
    resultDiscount.textContent = resultDiscountAmount;
    const resultTotal = document.querySelector('.total');
    const resultTotalCalculate = priceValue - resultDiscountAmount;
    resultTotal.textContent = resultTotalCalculate;
}



