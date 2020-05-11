let my_input=document.getElementById('my_input');
let my_button=document.getElementById('my_button');
let list=document.getElementById('list');
let clock=document.getElementById('clock');
let timeImage=document.getElementById('timeImage');
let timeEvent=document.getElementById('timeEvent');
let TasksLeft=document.getElementById('TasksLeft');

let morning=6;
let day=12;
let evening=17;
let night=0;
let i;

if(localStorage.getItem('TasksLeft')==null){
        i=0;
    }else{
        i=localStorage.getItem('TasksLeft');
    }
TasksLeft.innerHTML=TasksLeft.innerHTML+i;
localStorage.setItem('TasksLeft',i);

//Добавление задачи
my_button.addEventListener('click',function(){
    if(localStorage.getItem('notes').indexOf(my_input.value)==-1){
        i++;
        TasksLeft.innerHTML=TasksLeft.innerHTML.substr(0,16)+i;
        localStorage.setItem('TasksLeft',i);
        
        let list_elem=document.createElement('div');
        list_elem.setAttribute('id','list_elem');
        list.appendChild(list_elem);
    
        let li=document.createElement('li');
        li.setAttribute('id','li');
        li.innerHTML=my_input.value;
        list_elem.appendChild(li);
        
        save(my_input.value)
        
        //Кнопки завершения и удаления
        let complete_button=document.createElement('button');
        complete_button.setAttribute('id','complete_button');
        complete_button.innerHTML='<i class="fas fa-check-square"></i>'
        list_elem.appendChild(complete_button);

        let delete_button=document.createElement('button');
        delete_button.setAttribute('id','delete_button');
        delete_button.innerHTML='<i class="fas fa-trash-alt"></i>'
        list_elem.appendChild(delete_button);         

        my_input.value='';
    }else if(my_input.value==''){
        alert('Текст задачи не может быть пустым!');
    }else{
        alert('Такая задача уже существует!');
    }
})

//Клик по кнопке
list.addEventListener('click',function(event){
    let item=event.target;
    let item_par=item.parentElement
    if(item.getAttribute('id')==='delete_button'){
        
        item_par.classList.add('remove');
        del(item_par);
        item_par.addEventListener('transitionend',function(){
            item_par.remove();
        })
    }
    
    if(item.getAttribute('id')==='complete_button'){
        item_par.classList.toggle('completed');
    }
})

document.addEventListener('DOMContentLoaded',get())

//Сохранение записи в хранилище
function save(note){
    
    let notes;
    if(localStorage.getItem('notes')==null){
        notes=[];
    }else{
        notes=JSON.parse(localStorage.getItem('notes'))
    }
    notes.push(note);
    localStorage.setItem('notes',JSON.stringify(notes));
}

//Получение записи из хранилища
function get(){
    let notes;
    if(localStorage.getItem('notes')==null){
        notes=[];
    }else{
        notes=JSON.parse(localStorage.getItem('notes'))
    }
    notes.forEach(function(note){
        let list_elem=document.createElement('div');
        list_elem.setAttribute('id','list_elem');
        list.appendChild(list_elem);
    
        let li=document.createElement('li');
        li.setAttribute('id','li');
        li.innerHTML=note;
        list_elem.appendChild(li);
    
        let complete_button=document.createElement('button');
        complete_button.setAttribute('id','complete_button');
        complete_button.innerHTML='<i class="fas fa-check-square"></i>'
        list_elem.appendChild(complete_button);
    
        let delete_button=document.createElement('button');
        delete_button.setAttribute('id','delete_button');
        delete_button.innerHTML='<i class="fas fa-trash-alt"></i>'
        list_elem.appendChild(delete_button);
    })
    
}

//Удаление записи из хранилища
function del(note){
    i--;
    TasksLeft.innerHTML=TasksLeft.innerHTML.substr(0,16)+i;
    localStorage.setItem('TasksLeft',i);
    
    let notes;
    if(localStorage.getItem('notes')==null){
        notes=[];
    }else{
        notes=JSON.parse(localStorage.getItem('notes'))
    }
    let noteIndex=note.children[0].innerText
    notes.splice(notes.indexOf(noteIndex),1);
    localStorage.setItem('notes',JSON.stringify(notes));
}

//Получение текущего времени
function showCurrentTime(){
    let currentTime=new Date();
    let hours=currentTime.getHours();
    let minutes=currentTime.getMinutes();
    let seconds=currentTime.getSeconds();
    let clockTime=hours+':'+minutes+':'+seconds;
    clock.innerHTML=clockTime;
}

function updateClock(){
    let time=new Date().getHours();
    let mesageText;
    let image='images/morning.jpg';
    
    //Проверка времени суток
    if(time>=morning&&time<day){
        image='images/morning.jpg';
        messageText='Доброе Утро!';
    }else if(time>=day&&time<evening){
        image='images/day.jpg';
        messageText='Добрый День!'
    }else if(time>=evening&&time<24){
        image='images/evening.jpg';
        messageText='Добрый Вечер!'
    }else{
        image='images/night.jpg'
        messageText='Доброй Ночи!'
    }
    timeImage.src=image;
    timeEvent.innerHTML=messageText;
    showCurrentTime();
}
updateClock();

setInterval(updateClock,1000);