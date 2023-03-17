const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

const reposTableItems = document.querySelector(".repos-table-items");

const emptyInputError = document.querySelector(".empty-input");
const noResultsError = document.querySelector(".no-results");

searchInput.addEventListener("focus", (event) => {
	emptyInputError.style.display = "none";
	noResultsError.style.display = "none";
});

searchButton.addEventListener("click", async (event) => {
	event.preventDefault();
	if (searchInput.value) {
		emptyInputError.style.display = "none";
		noResultsError.style.display = "none";

		reposTableItems.replaceChildren();
		searchButton.disabled = true;

		const reposData = await fetch(
			`https://api.github.com/search/repositories?q=${searchInput.value}&per_page=10`
		);
		const dataToTable = await reposData.json();

		if (dataToTable.items.length == 0) {
			noResultsError.style.display = "block";
		} else {
			for (let repo of dataToTable.items) {
				const tableRow = document.createElement("tr");
				const rowName = document.createElement("td");
				const rowAuthor = document.createElement("td");
				const rowInfo = document.createElement("td");
				const repoRef = document.createElement("a");
				const rowRef = document.createElement("td");

				rowName.textContent = repo.name;
				rowName.style.width = "28%";
				rowAuthor.textContent = repo.owner.login;
				rowAuthor.style.width = "16%";
				rowInfo.textContent =
          repo.description.length < 50
          	? repo.description
          	: repo.description.slice(0, 48).trim() + "...";
				rowInfo.style.width = "28%";
				repoRef.textContent = repo.html_url;
				repoRef.href = repo.html_url;
				rowRef.style.width = "28%";

				rowRef.appendChild(repoRef);
				tableRow.appendChild(rowName);
				tableRow.appendChild(rowAuthor);
				tableRow.appendChild(rowInfo);
				tableRow.appendChild(rowRef);
				reposTableItems.appendChild(tableRow);
			}
		}

		searchButton.disabled = false;
		console.log(dataToTable);
	} else {
		emptyInputError.style.display = "block";
	}
});
