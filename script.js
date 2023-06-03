const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2109-UNF-HY-WEB-PT";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}/players`);
    const players = await response.json();
    console.log(players);
    return players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`);
    const player = await response.json();
    console.log(player);
    return player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${APIURL / players}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerObj),
    });

    if (response.ok) {
      console.log("Player added successfully.");
    } else {
      console.error("Failed to add player. Status:", response.status);
    }
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Data deleted successfully.");
    }
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = async (playerList) => {
  try {
    playerContainer.innerHTML = "";
    playerList.forEach((player) => {
      if (!Array.isArray(playerList)) {
        throw new Error("Parties is not an array.");
      }
      console.log(player.name);
      console.log("error");
      const playerElement = document.createElement("div");
      playerElement.classList.add("");
      partyElement.innerHTML = `
      <h2>${player.name}</h2>
      <p>${player.breed}</p>
      <p>${player.status}</p>
      <button class="details-button" data-id="${party.id}">See Details</button>
      <button class="delete-button" data-id="${party.id}">Delete</button>
    `;
      partyContainer.appendChild(playerElement);

      // see details
      const detailsButton = partyElement.querySelector(".details-button");
      detailsButton.addEventListener("click", (event) => {
        // your code here
        const partyId = event.target.dataset.id;
        renderSinglePartyById(party.id);
      });

      // delete party
      const deleteButton = partyElement.querySelector(".delete-button");
      deleteButton.addEventListener("click", async () => {
        // your code here
        const partyID = partyElement.getAttribute("data-id");
        deleteParty(party.id);
        await renderParties(await getAllParties());
      });
    }); // <-- Add this closing bracket
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const init = async () => {
  await renderAllPlayers(await fetchSinglePlayer(340));
};
fetchAllPlayers();
init();
