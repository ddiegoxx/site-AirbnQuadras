const BASE_URL = 'http://3.224.210.59'
class Validator {

    constructor() {
      this.validations = [
        'data-min-length',
        'data-max-length',
        'data-email-validate',
        'data-required',
        'data-equal',
        'data-password-validate',
      ]
    }
    validate(form) {
  
      let currentValidations = document.querySelectorAll('form .error-validation');
  
      if(currentValidations.length) {
        this.cleanValidations(currentValidations);
      }
  
      let inputs = form.getElementsByTagName('input');

      let inputsArray = [...inputs];

      inputsArray.forEach(function(input, obj) {
  
        for(let i = 0; this.validations.length > i; i++) {
          if(input.getAttribute(this.validations[i]) != null) {
  
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
    maxlength(input, maxValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
  
      if(inputLength > maxValue) {
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
    equal(input, inputName) {
  
      let inputToCompare = document.getElementsByName(inputName)[0];
  
      let errorMessage = `Este campo precisa estar igual ao ${inputName}`;
  
      if(input.value != inputToCompare.value) {
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
    passwordvalidate(input) {

      let charArr = input.value.split("");
  
      let uppercases = 0;
      let numbers = 0;
  
      for(let i = 0; charArr.length > i; i++) {
        if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
          uppercases++;
        } else if(!isNaN(parseInt(charArr[i]))) {
          numbers++;
        }
      }
  
      if(uppercases === 0 || numbers === 0) {
        let errorMessage = `A senha precisa um caractere maiúsculo e um número`;
  
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
      validations.forEach(el => el.remove());
    } 
  }
  
  let form = document.getElementById('register-form');
  let submit = document.getElementById('btn-submit');
  
  let validator = new Validator();

  submit.addEventListener('click', function(e) {
    e.preventDefault();
  
    validator.validate(form);
    salvarDados(form)
  });
  function salvarDados(event) {
    console.log('entrou')
    const email = form.elements["email"].value;
    const name = form.elements["name"].value;
    const cpf = form.elements["cpf"].value;
    const password = form.elements["password"].value;
    
    const dados = {
      email: email,
      name: name,
      cpf: cpf,
      password: password,
      usr_type: 2
    };
    /* falta colocar o http do json*/
    fetch(BASE_URL + '/user', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/Json'
      },
      body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        alert("Cadastro criado com sucesso!");
        window.location.href = 'index.html';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Erro ao enviar dados.");
    });
  }