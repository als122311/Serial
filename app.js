let table = document.querySelector("#game-table")
let text = document.querySelector("#timer")
let start = document.querySelector("#start")
let restart = document.querySelector("#restart")
let save = document.querySelector("#save")
let close = document.querySelector("#close")
let modal = document.querySelector(".modal")

let selectedTime = 30

start.addEventListener("click", gameStart)
restart.addEventListener("click",gameStart)

function gameStart() {
    start.style.display = "none"
    restart.style.display = "block"
    createTable()
    clearInterval(timer)
    timer = setInterval(clock,1000 )
    time = selectedTime
    text.innerText = "Time left " + time
    

    isGameOver = false
    presentNumber = 0
}

function createTable() {
 getNumbers()
 let html = ''
 for (let row = 0; row < rows; row++) {
    html +='<tr>';
    for (let col = 0; col < cols;col++){
        html +='<td ';
        html += getRandomStyle()
        html += '>'
        html += getRandomNumber()
        html += '</td>'
    }
    html +='</tr>';
 }
 table.innerHTML = html
 table.style.opacity = 1
}

function clock() {
    time--
    if (time > 0){
    text.innerText = "Time left " + time
    }
    else{
        clearInterval(timer)
        text.innerText =  " you suck!!!"

        isGameOver = true
    }
}

let numbers = []
let cols = 3
let rows = 3

function getNumbers() {
for(let i = 0; i < rows * cols; i++){
    numbers[i] = i + 1
}

}

function getRandomNumber() {
let n = Math.floor(Math.random() * numbers.length)
let res = numbers[n]
numbers.splice(n, 1)
return res

}

function getRandomColor() {
    let rgb
    rgb = "color: rgb("
    rgb += Math.floor(Math.random() * 200)
    rgb += ","
    rgb += Math.floor(Math.random() * 200)
    rgb += ","
    rgb += Math.floor(Math.random() * 200)
    rgb += ");"
    return rgb
}

function getFontSize() {
    let size;
    size = "font-size: "
    size += Math.floor(Math.random() * 30 + 20)
    size += "px;"
    return size
}

function getRandomStyle() {
    return "style='" + getRandomColor() + getFontSize() + "'"
}




// alert(getRandomStyle())




let presentNumber = 0


table.addEventListener("click", function(child) {
    if ( isGameOver == false) {
    let cell = child.target
    let number = +cell.innerText
    console.log(number + 1)
    if (number == presentNumber + 1) {
        presentNumber++
        cell.classList.add("selected")
        if (number == rows * cols) {
            isGameOver = true
            clearInterval(timer)
            text.innerText = "You won!!"
        }
    }

    
}
})


let isGameOver = false

    close.addEventListener("click", function (){
        modal.classList.add("modal-invisible")
    })

    save.addEventListener("click", function(){
        modal.classList.add("modal-invisible")

        let levels = document.querySelectorAll(".level .select input")
        for (let i = 0; i < levels.length; i++){
            if (levels[i].checked) {
                rows =(i + 1) * 3
                cols = rows
            }
        }

        let time = document.querySelectorAll(".time .select input")
        for (let i = 0; i < time.length; i++){
            if (time[i].checked) {
                selectedTime =(i + 1) * 30
                if (i == 2) selectedTime = 120
                
            }
        }

        
    })