const el = (selector) => {return document.querySelector(selector)};

currentform = 'home';
changeForm = false;
api_url = 'http://ont.system/api'

buttons = el('ul.nav__container').querySelectorAll('button');
forms = document.querySelector('.forms__container');

buttons.forEach(element => {
    element.addEventListener('click', function(event) {
        if (currentform != this.className) {
            forms.querySelectorAll('.form').forEach(element => {
                element.classList.remove('active');
            });
            forms.querySelector(`.form.${this.className}`).classList.add('active');
            currentform = this.className;
            console.log(currentform);
            changeForm = true;
        }
    });
});


setInterval(() => {
    console.log(changeForm);
    if (changeForm) {
        
        if (currentform == 'rasp') {
            var select_group = document.getElementById('select-group');

            select_group.innerHTML = `
            <option value="" disabled selected>Группа</option>
            `;

            let request = new XMLHttpRequest();
            request.open('GET', `${api_url}/group`);
            request.responseType = 'json';
            request.send();
            request.onload = function() {
                console.log(request.response);
                var data = request.response;

                for (var i = 0; i < data.length; i ++) {
                    let option = document.createElement('option');
                    option.value = data[i];
                    option.innerHTML = data[i];

                    select_group.append(option);
                }
            }
        }
        changeForm = false;
    }
},15);