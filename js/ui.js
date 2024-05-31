class UI {
    constructor() {
        this.profileContentDiv = document.querySelector("#profileInfo");
        this.tableContent = document.querySelector("#tableContent");
        this.table = document.querySelector("#table");
        this.searchedUserList = document.querySelector("#searchedUserList");
    }

    fillSearchedUserToUIFromStorage() {
        const users = Storagex.getSearchedUserFromStorage();
        if (users != null && users.length > 0) {
            users.forEach(user => {
                const li = document.createElement("li");
                li.className = "list-group-item";
                li.innerHTML = user;
                this.searchedUserList.appendChild(li);
            })
        }
    }

    addSearchedUserToUI(username) {
        if (Storagex.checkUser(username)) {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = username;
            this.searchedUserList.appendChild(li);
        }

    }

    addUserProfileToUI(user) {
        this.tableContent.innerHTML = ``;
        this.profileContentDiv.innerHTML = `
        <div id="profileDiv">
        <img id="profileImg" class="mb-2" src="${user.avatar_url}" width="200px" height="200px">
        <div id="badgeDiv" class="mt-1">
            <button type="button" class="btn btn-outline-success btn-sm mt-2">
                Followers <span class="badge text-bg-success">${user.followers}</span>
            </button>
            <button type="button" class="btn btn-outline-primary btn-sm mx-2 mt-2">
                Following <span class="badge text-bg-primary">${user.following}</span>
            </button>
            <button id="showRepos" type="button" class="btn btn-outline-danger btn-sm mt-2">
                Repositories <span class="badge text-bg-danger">${user.public_repos}</span>
            </button>
        </div>
        <hr style="border: 1px solid lightgray; width: 75%;">
        <span>${user.name}</span>
        <span>Software Developer</span>
        <div class="info">
            <img src="images/location.png" width="20" height="20">
            <span>${user.location}</span>
        </div>
    </div>
        `
    }

    clearInput() {
        this.profileContentDiv.innerHTML = ``;
        this.tableContent.innerHTML = ``;
    }

    showRepos(repos) {
        if (repos !== null && repos.length > 0) {
            let sayac = 1;
            repos.forEach(repo => {
                this.tableContent.innerHTML += `
                <tr>
                <th scope="row">${sayac}</th>
                <td>${repo.name}</td>
                <td>${repo.language}</td>
                </tr>
                `;
                sayac = sayac + 1;
            })
        }
    }

    clearHistory() {
        this.searchedUserList.innerHTML = "";
        Storagex.clearAllSearchedUserFromStorage();
    }
}