const githubName = document.querySelector("#githubName");
const form = document.querySelector("#searchFrom");
const clearButton = document.querySelector("#clearButton");
const clearHistory = document.querySelector("#clearHistory")

const github = new Github();
const ui = new UI();

runEventListeners();

function runEventListeners() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clearInput);
    clearHistory.addEventListener("click", clearTable);
    document.addEventListener("DOMContentLoaded", runPageLoaded);
}

function runPageLoaded() {
    ui.fillSearchedUserToUIFromStorage();
}

function search(e) {
    const username = githubName.value.trim();
    if (!username === null || !username == "") {
        github.getGithubData(username)
            .then(response => {
                ui.addSearchedUserToUI(username)
                Storagex.addSearchedUserToStorage(username);
                ui.addUserProfileToUI(response.user)
                document.querySelector("#showRepos").addEventListener("click", () => ui.showRepos(response.repo));
            })
            .catch(error => console.log(error))
    } else {
        alert("Kullanıcı Adı Giriniz...")
    }
    e.preventDefault();
}

function clearInput() {
    ui.clearInput();
}

function clearTable() {
    ui.clearHistory();
}