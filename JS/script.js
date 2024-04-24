let question = document.querySelector(".question");
let answer = document.querySelectorAll(".answer");
let container_h3 = document.querySelector('.container_h3')

function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

let signs = ["+", "-", "*", "/"];

function backSigns(){
    return signs[randint(0, 3)];
}



function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) { // Цикл повторюється до тих пір, поки залишаються елементи для перемішування
    randomIndex = Math.floor(Math.random() * currentIndex); // Вибираємо елемент, що залишився.
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [    // Міняємо місцями з поточним елементом.
      array[randomIndex], array[currentIndex]];
  }
  return array; // Повертаємо перемішаний масив
}

my_array = [1, 2, 3, 4, 5] // Початковий масив
shuffle(my_array)  // Перемішуємо масив


class Question {
    constructor(){ 
        let num1 = randint(0, 30);
        let num2 = randint(0, 30);
        let znak = backSigns();
        this.question = `${num1} ${znak} ${num2}`
        if(znak === "+"){
            this.correct = num1 + num2;
        } else if(znak === "-"){
            this.correct = num1 - num2;
        } else if(znak === "*"){
            this.correct = num1 * num2;
        } else if(znak === "/"){
            this.correct = Math.round(num1 / num2);
        }
        this.otvetu = [
            randint(0, 100),
            randint(0, 100),
            randint(0, 100),
            randint(0, 100),
            this.correct
        ];
        this.otvetu=shuffle(this.otvetu)
    }
    
    display(){
        question.innerHTML = this.question;
        for(let i = 0; i < answer.length; i += 1){
            answer[i].innerHTML = this.otvetu[i];
        }
    }
}

let total_answers = 0;
let correct_answers_given = 0;
let current_question = new Question();
current_question.display();

for(let i = 0; i < answer.length; i += 1){
    answer[i].addEventListener("click", function(){
        if(parseInt(answer[i].innerHTML) === current_question.correct){
            alert('Good!');
                 answer[i].style.background = '#00FF00';
            anime({
                targets: answer[i],
                background: '#FFFFFF',
                easing: 'linear',
                duration: 1000,
            });

  correct_answers_given += 1;






        } else {
            alert("Bad:(");
             answer[i].style.background = '#FF0000';
            anime({
                targets: answer[i],
                background: '#FFFFFF',
                easing: 'linear',
                duration: 1000,
            });

        }
        total_answers += 1;
        if (total_answers == answer.length) {
            // Обчислюємо точність та виводимо в h3
            container_h3.innerHTML = `Ви дали ${correct_answers_given} правильних відповідей із ${total_answers}.
            Точність - ${Math.round(correct_answers_given * 100 / total_answers)}%`;}
        current_question = new Question();
        current_question.display();
    });
}