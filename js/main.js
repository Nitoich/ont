const el = (selector) => {return document.querySelector(selector)};

currentform = 'home';
changeForm = false;
api_url = 'http://ont.system/api'
let days = [];

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
            changeForm = true;
        }
    });
});


setInterval(() => {
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

function getDay(days, day) {
    let ret;

    for (j = 0; j < days.length; j++) {
        if (days[j] == day) { 
            console.log(days[j]);
            ret = j;
        }
    }
    return ret;
}

document.getElementById('select-group').addEventListener('change', function(event) {

    document.querySelector('.rasp-container').innerHTML = '';
    days = [];

    let canRequest = true;
    let reqRasp = new XMLHttpRequest();
    reqRasp.open('GET', `${api_url}/rasp?group=${this.options[this.options.selectedIndex].value}`);
    reqRasp.responseType = 'json';
    reqRasp.send();
    reqRasp.onload = function() {
        const data = reqRasp.response;
        console.log(reqRasp.response);

        if (data.length != 0) {
            for (i = 0; i < data.length; i++) {
                if (days.includes(data[i].day) == false) {
                    let day = document.createElement('div');
                    day.classList.add('day');
                    day.innerHTML = data[i].day
                    day.addEventListener('click', function(event) {
                        this.classList.toggle('active');
                    });
                    days.push(data[i].day);
                    document.querySelector('.rasp-container').append(day);
                }
                
                let day_item = document.createElement('div');
                day_item.classList.add('lesson_number');
                day_item.innerHTML = `${data[i].count_lesson} -- ${data[i].subject} -- ${data[i].cabinet}каб -- ${data[i].type} -- ${data[i].subgroup}`;
    
                edays = document.querySelectorAll('.day');
                console.log(edays[getDay(days, data[i].day)]);
                edays[getDay(days, data[i].day)].append(day_item);
            }
        }
    }
});