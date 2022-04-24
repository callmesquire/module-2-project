let sortButton = document.querySelector('.sort');
let addButton = document.querySelector('.add');
let input = document.querySelector('input');
let ul = document.querySelector('ul');
let sortImage = document.querySelector('.sort');

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('todoList')) {
        ul.innerHTML = localStorage.getItem('todoList');
        let listArray = Array.from(document.querySelectorAll('li'));
        listArray.forEach((li) => {
            li.querySelector('img').addEventListener('click', (event) => {
                let removeConfirmed = confirm('Вы действительно хотите удалить этот пункт списка?');
                if (removeConfirmed) {
                    event.target.parentElement.parentElement.remove();
                    localStorage.setItem('todoList', ul.innerHTML);
                } else {
                    return;
                }   
            });
        })
    }
});
function listLineAdding() {
    if (input.value !='') {
        let li = document.createElement('li');
        li.innerHTML = `${input.value} <p><img class='remove' src=./img/remove_button.png alt="кнопка удаления"></p>`;
        li.querySelector('img').addEventListener('click', (event) => {
            let removeConfirmed = confirm('Вы действительно хотите удалить этот пункт списка?');
            if (removeConfirmed) {
                event.target.parentElement.parentElement.remove();
                localStorage.setItem('todoList', ul.innerHTML);
            } else {
                return;
            }   
        });
        li.draggable = true;
        ul.append(li);
        localStorage.setItem('todoList', ul.innerHTML);
        input.value = '';      
    } else {
        alert('Нужно ввести тест в поле ввода и только после этого нажать кнопку "добавить"');
    }
}
addButton.addEventListener('click', () => {
    listLineAdding();
});
input.addEventListener('keydown', (event) => {
    if (event.code == 'Enter') {
        listLineAdding();
    }      
});
let order = 1;

sortButton.addEventListener('click', () => {
    let listArray = Array.from(document.querySelectorAll('li'));
    listArray.sort((a, b) => {
        return a.innerText.localeCompare(b.innerText)*(order); 
    })             
    ul.innerHTML = null;
    listArray.forEach(element => {
        ul.append(element);
        localStorage.setItem('todoList', ul.innerHTML);
    })
    order = order*(-1);
    switch(order) {
        case 1:
            sortImage.src = './img/sort_down.png';
            break;
        case -1:
            sortImage.src = './img/sort_up.png';
            break;
    } 
});


ul.addEventListener('dragstart', (event) => { 
    if (event.target.tagName === 'LI') {
        event.target.classList.add('selected');
    }
})

ul.addEventListener('dragend', (event) => {
    event.target.classList.remove('selected');
});

ul.addEventListener('dragover', (event) => {
    event.preventDefault();
    let activeLi = document.querySelector('.selected');
    if (event.target.tagName === 'LI') {
        let currentLi = event.target;
        ul.insertBefore(activeLi, currentLi);
        localStorage.setItem('todoList', ul.innerHTML);
    }
});

