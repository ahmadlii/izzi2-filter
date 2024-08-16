let cards = document.querySelector(".cards");
function createCardElement(tasker) {
    let card = document.createElement("div");
    card.classList.add("card");
    
    card.innerHTML = `               
        <div class="card-header">
            <img src="${tasker.user.profile_picture.publicUrl}" alt="elon">
            <div class="elon-info">
                <p class="name">
                <span style="font-weight: bold;">${tasker.user.name} ${tasker.user.surname}</span> (elektrik)</p>
                <div class="ratingStar">
                    <img src="./photo/stars.jpg" alt="rating">
                    <span class="point">${tasker.averageRating}</span>
                    <span class="num">(24)</span>
                </div>
            </div>
        </div>
        <div class="pro-flex">
            <div>
                <img src="./photo/tasks.jpg" alt="task">
                <p class="tasks-text"><span>${tasker.completedTasks}</span> Tasks</p>
            </div>
            <div>
                <img src="./photo/Hashtag.jpg" alt="Hashtag">
                <p class="pro-text">Top Pro</p>
            </div>
        </div>
        <p class="text">${tasker.bio}</p>
        <div class="card-footer">
            <p>
                <a href="#" class="view">view profile</a>
            </p>
            <p class="price-dollar">$35</p>
            <button class="book-now">Book Now</button>
        </div>          
    `;
    
    let startDate = new Date(tasker.startDate);
    let today = new Date();
    let currentMonth = today.getMonth();
    let registerMonth = startDate.getMonth();
    let differenceDate = currentMonth - registerMonth;
    
    if (differenceDate >= 0) {
        let newPro = document.createElement("div");
        newPro.innerHTML = `
            <img src="./photo/Heart.jpg" alt="heart">
            <p class="pro-text">New Pro</p>
        `;
        let proFlex = card.querySelector(".pro-flex");
        proFlex.appendChild(newPro);
    }
    
    if (tasker.supervisor) {
        card.classList.add("supervisor");
    }

    return card;
}
async function createCard() {
    const data = await fetch('allProsData.json').then(res => res.json());
    const taskers = data.data.taskers;

    taskers.forEach(tasker => {
        let card = createCardElement(tasker);
        cards.appendChild(card);
    });
}
async function sortedCards(order) {
    const data = await fetch('allProsData.json').then(res => res.json());
    const taskers = data.data.taskers;

    if (order === "Ascending") {
        taskers.sort((a, b) => a.averageRating - b.averageRating);
    } else if (order === "Descending") {
        taskers.sort((a, b) => b.averageRating - a.averageRating);
    }

    cards.innerHTML = '';

    taskers.forEach(tasker => {
        let card = createCardElement(tasker);
        cards.appendChild(card);
    });
}
window.onload = createCard;
let ratingSelect = document.querySelector("#rating");
ratingSelect.addEventListener("change", () => {
    let selectedOption = ratingSelect.value;
    sortedCards(selectedOption);
});
async function sortedTaskCards(optionValue) {
    const data = await fetch('allProsData.json').then(res => res.json());
    const taskers = data.data.taskers;

    if (optionValue === "Ascending") {
        taskers.sort((a, b) => a.completedTasks - b.completedTasks);
    } else if (optionValue === "Descending") {
        taskers.sort((a, b) => b.completedTasks - a.completedTasks);
    }

    cards.innerHTML = '';

    taskers.forEach(tasker => {
        let card = createCardElement(tasker);
        cards.appendChild(card);
    });
}
let taskCountSelect = document.querySelector("#task-count");
taskCountSelect.addEventListener("change", () => {
    let selectedOptions = taskCountSelect.value;
    sortedTaskCards(selectedOptions);
});
function filterCards() {
    let topProChecked = document.getElementById("topProCheckbox").checked;
    let newProChecked = document.getElementById("newProCheckbox").checked;
    let prosChecked = document.getElementById("prosCheckbox").checked;
    let supervisorsChecked = document.getElementById("supervisorsCheckbox").checked;
    let allCards = document.querySelectorAll(".card");
    let noCheckboxSelected = !topProChecked && !newProChecked && !prosChecked && !supervisorsChecked;

    allCards.forEach(card => {
        let isTopPro = card.querySelector(".pro-text")?.textContent.includes("Top Pro");
        let isNewPro = card.querySelector(".pro-text")?.textContent.includes("New Pro");
        let isSupervisor = card.classList.contains("supervisor");
        
        if (noCheckboxSelected) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
            if (supervisorsChecked && isSupervisor) {
                card.style.display = "block";
            } 
            if (!isSupervisor) {
                if (topProChecked && isTopPro) {
                    card.style.display = "block";
                }
                if (newProChecked && isNewPro) {
                    card.style.display = "block";
                }
                if (prosChecked && (isTopPro || isNewPro)) {
                    card.style.display = "block";
                }
            }
        }
    });
}
document.getElementById("topProCheckbox").addEventListener("change", filterCards);
document.getElementById("newProCheckbox").addEventListener("change", filterCards);
document.getElementById("prosCheckbox").addEventListener("change", filterCards);
document.getElementById("supervisorsCheckbox").addEventListener("change", filterCards);

const menuIcon = document.querySelector('.menuicon');
const menuList = document.querySelector('.menu-list');

menuIcon.addEventListener("click", function() {
    if (menuList.style.display === 'block') {
        menuList.style.display = 'none';
    } else {
        menuList.style.display = 'block';
    }
});
