const BASE_URL = 'http://3.224.210.59'
class Validator{

    constructor() {
        this.validations = [
            'data-min-length',
            'data-email-validate',
            'data-required',
        ]
    }
    validate(form) {
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length) {
            this.cleanValidations(currentValidations);
        }

        let inputss = form.getElementsByTagName('input');

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
    minlength(input, minValue) {
  
        let inputLength = input.value.length;
    
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
    
        if(inputLength < minValue) {
          this.printMessage(input, errorMessage);
        }
    }
    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;
    
        let email = input.value;
    
        let errorMessage = `Insira um e-mail no padrão google@gmail.com`;
    
        if(!re.test(email)) {
          this.printMessage(input, errorMessage);
        }
    
      }
    required(input) {
  
        let inputValue = input.value;
    
        if(inputValue === '') {
          let errorMessage = `Este campo é obrigatório`;
    
          this.printMessage(input, errorMessage);
        }
    
      }

    printMessage(input, msg) {
    
        let errorsQty = input.parentNode.querySelector('.error-validation');
    
        if(errorsQty === null) {
          let template = document.querySelector('.error-validation').cloneNode(true);
    
          template.textContent = msg;
      
          let inputParent = input.parentNode;
      
          template.classList.remove('template');
      
          inputParent.appendChild(template);
        }
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
    let password = form.elements["password"].value;

    let msgError = document.querySelector('#msgError');

    let dados = {
        email: email,
        password: password
    }

    fetch(BASE_URL + '/user/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/Json',
        },
        body: JSON.stringify(dados)
      })
      .then( response => {
        if(response.status == 200){
            return response.json()
        }else{
            console.error('Error:', error);
            alert(`Erro ao logar: ${error}`); 
        }
        
      })
      .then(data => {
        const token = data['access_token']
            localStorage.setItem('token', token)
            alert('Login Realizado com sucesso')
            window.location.href = 'home.html';
    })
      .catch((error) => {
          console.error('Error:', error);
          alert(`Erro ao logar: ${error}`);
      });

}