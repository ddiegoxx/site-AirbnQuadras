class Validator{

    constructor() {
        this.validations = [
            'data-min-length',
            'data-email-validate',
            'data-required',
            'data-password-validate',
        ]
    }
    validate(form) {
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length) {
            this.cleanValidations(currentValidations);
        }

        let inputss = form.getElementByIdTagName('input');

        let inputsArrays = [...inputss];

        inputsArrays.forEach(function(input, objs) {

            for(let i = 0; this.validations.length >i; i++) {
                if (input.getAttribute(this.validations[i]) !=null) {

                    let method = this.validations[i].replace("data-", "").replace("-", "");
                    
                    let value = input.getAttribute(this.validations[i])

                    this[method](input,value);
                }
            }
            
        }, this);
    }
    minlength(input, minValue){
        let inputsLength = input.value.length;

        let errorMenssage = 'O ca'
    }

    cleanValidations(validations) {
        validations.forEach(ele => ele.remove());
    }
}

let form1 = document.getElementById('form-login');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

submit.addEventListener('click', function(e){

    e.preventDefault();

    validator.validate(form);
});

function entrar() {
    let email = document.querySelector('email').value;
    let password = document.querySelector('password').value;

    let msgError = document.querySelector('msgError');

    let dados = {
        email: email,
        password: password
    }

}