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

let form = document.getElementById('form-login');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

submit.addEventListener('click', function(e){
    e.preventDefault();
    validator.validate(form);
    entrar(form)
});

function entrar(form) {
    let email = form.elements["email"].value;
    let password = form.elements["passowrd"].value;

    let msgError = document.querySelector('msgError');
    let dados = {
        email: email,
        password: password
    }

    fetch(BASE_URL + '/user/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/Json',
            'Authorization': 'Bearer '+ localStorage.getItem('token')
        },
        body: JSON.stringify(dados)
      })
      .then(response => response.json())
      .then(data => {
          alert("Login realizado com sucesso!");
          window.location.href = 'home.html';
      })
      .catch((error) => {
          console.error('Error:', error);
          alert(`Erro ao logar: ${error}`);
      });

}