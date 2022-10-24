let elBody = document.querySelector("body");
let elForm = document.querySelector(".form"); 
let elSelect = document.querySelector(".select"); 
let elSelectTime = document.querySelector(".select-time"); 
let elTitle = document.querySelector(".title"); 
let elList = document.querySelector(".list");
let elCount = document.querySelector(".count");
let elTime = document.querySelector(".timer");
let elModal = document.querySelector(".modal");
let elModalList = document.querySelector(".modal-list");
let elModalBtn = document.querySelector(".modal-btn");
let elModalCloseBtn = document.querySelector(".modal-close");
let elHeader = document.querySelector("header");
let elMain = document.querySelector("main");
let elStart = document.querySelector(".game-start");

let easyArray = roadSymbol.slice(0, 20);
let mediumArray = roadSymbol.slice(0, 40);
let hardArray = roadSymbol.slice(0, 70);
let errorArray = [];
let countError = 0;
let count = 0;

function categoriesFunction(arr) {
    let randomId = arr[Math.floor(Math.random() * arr.length)];
    elTitle.textContent = randomId.symbol_title;
}

elForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
 
    if (elSelect.value != "" & elSelectTime.value != "") {
        if (elSelect.value == "all") {
            categoriesFunction(roadSymbol);
            createTest(roadSymbol, elList);
        }if (elSelect.value == "easy") {
            categoriesFunction(easyArray);
            createTest(easyArray, elList);
        }if (elSelect.value == "medium") {
            categoriesFunction(mediumArray);
            createTest(mediumArray, elList);
        }if (elSelect.value == "hard") {
            categoriesFunction(hardArray);
            createTest(hardArray, elList);
        }
        if (elSelectTime.value == 3) {
            let fiveMinutes = 60 * 3;
            startTimer(fiveMinutes, elTime);
        }
        if (elSelectTime.value == 5) {
            let fiveMinutes = 60 * 5;
            startTimer(fiveMinutes, elTime);
        }
        if (elSelectTime.value == 10) {
            let fiveMinutes = 60 * 10;
            startTimer(fiveMinutes, elTime);
        }
        elStart.style.display = "none";
        elHeader.classList.add("show-modal");
        elMain.classList.add("show-modal");
    }
})

function createTest(arr, element) {
    element.innerHTML = "";
    arr.forEach(item => {
        let elItem = document.createElement("li");
        elItem.dataset.id = item.id;
        let elCard = 
        `
            <div class="card">
                <img class="card-img" src=${item.symbol_img} alt=${item.symbol_title} data-id=${item.id}>
                <img class="card-img__success" src="./images/success.png">
                <img class="card-img__error" src="./images/error-img.png">
            </div>
        `
        elItem.innerHTML = elCard;
        elCount.textContent = count;
        element.appendChild(elItem);
    })
}

function errorFunction(arr, element) {
    element.innerHTML = "";
    arr.forEach(item => {
        let elItem = document.createElement("li");
        elItem.dataset.id = item.id;
        let elCard = 
        `
            <div class="card">
                <img class="card-img" src=${item.symbol_img} alt=${item.symbol_title} data-id=${item.id}>
                <h2 class="card-title">${item.symbol_title}</h2>
            </div>
        `
        elItem.innerHTML = elCard;
        elCount.textContent = count;
        element.appendChild(elItem);
    });
}

elList.addEventListener("click", (e) =>{
    if (elSelect.value == "all") {
        categoriesChose(roadSymbol, e);
    }
    if (elSelect.value == "easy") {
        categoriesChose(easyArray, e);
    }
    if (elSelect.value == "medium") {
        categoriesChose(mediumArray, e);
    }
    if (elSelect.value == "hard") {
        categoriesChose(hardArray, e);
    }
});

function categoriesChose(arr, evt) {
    if (evt.target.matches(".card-img")) {
        let btnId = Number(evt.target.dataset.id);
        let itemId = arr.find(item => item.id === btnId);
        if (itemId.symbol_title == elTitle.textContent) {
            let itemDel = arr.findIndex(item => item.id === btnId);
            arr.splice(itemDel, 1);
            if (arr.length == "") {
                elModal.classList.add("show-modal");
                document.querySelector(".modal-count").textContent = "To'plagan balingiz: " + count;
                document.querySelector(".modal-error").textContent = "Qilgan xatolaringiz: " + countError;
            }if (arr.length == "" && errorArray.length == "") {
                document.querySelector(".modal-title").textContent = "Siz hamma savolga to'g'ri javob berdingiz"
            }
            evt.target.parentElement.childNodes[1].style.opacity = "0.2";            
            evt.target.parentElement.childNodes[3].classList.add("d-block");            
            categoriesFunction(arr);
            count += 2;
            elCount.textContent = count;
        }else{
            count --;
            countError++;
            setTimeout(function() {
                evt.target.parentElement.classList.add("error")
                setTimeout(function() {
                    evt.target.parentElement.classList.remove("error")
                }, 100)
            }, 0)   
            if (!errorArray.includes(itemId)) {
                errorArray.push(itemId);
            }
            elCount.textContent = count;
            if (countError >= 5) {   
            
                elModal.classList.add("show-modal"); 
            }
        }
    }
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var timerFunction = setInterval( () => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            clearInterval(timerFunction);
        }
        if (timer >= 10) {
            elTime.style.color = "green";
        }else{
            elTime.style.color = "red";
        }
        if(timer == 0){
            elModal.classList.add("show-modal"); 
        }
    }, 1000);   
}
elModalBtn.addEventListener("click", function() {
    elModalBtn.style.display = "none";
    errorFunction(errorArray, elModalList);
    if (elModalList.childNodes.length != 0) {
        document.querySelector(".modal-card").style.overflowY = "scroll";
    }
})

elModalCloseBtn.addEventListener("click", function() {
    elModal.classList.remove("show-modal");
    window.location.reload();
});