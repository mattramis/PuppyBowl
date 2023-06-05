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
    const playersData = await response.json();
    players = playersData.data.players;
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
    const result = await response.json();
    if (result.ok) {
      console.log("Player added successfully.");
    } else {
      console.error("Failed to add player. Status:", result.status);
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
const renderAllPlayers = async () => {
  try {
    playerContainer.innerHTML = "";

    const playerList = await fetchAllPlayers();

    playerList.forEach((player) => {
      console.log(`Player:`, player);

      const playerElement = document.createElement("div");
      playerElement.innerHTML = `
        <h2>${player.name}</h2>
        <p>${player.breed}</p>
        <p>${player.status}</p>
        <button class="details-button" data-id="${player.id}">See Details</button>
        <button class="delete-button" data-id="${player.id}">Delete</button>
      `;
      playerContainer.appendChild(playerElement);

      // See details
      const detailsButton = playerElement.querySelector(".details-button");
      detailsButton.addEventListener("click", async (event) => {
        const playerId = event.target.dataset.id;
        await renderSinglePlayerById(playerId);
      });

      // Delete player
      const deleteButton = playerElement.querySelector(".delete-button");
      deleteButton.addEventListener("click", async () => {
        await removePlayer(player.id);
        await renderAllPlayers();
      });
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

const renderSinglePlayerById = async (playerId) => {
  try {
    const player = await fetchSinglePlayer(playerId);
    console.log(player);
    // Render single player details to the DOM
    // ...
  } catch (err) {
    console.error(`Oh no, trouble rendering player #${playerId}!`, err);
  }
};

// Rest of your code...

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = async (playerList) => {
  try {
    await renderAllPlayers();
    await addNewPlayer(playerList);
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};
let number = [1, 2, 3, 45, 6];

const init = async () => {
  const newPlayer = {
    name: "Carlos",
    breed: "Bull Dog",
  };
  await renderAllPlayers();
  await renderNewPlayerForm(newPlayer);
};

init();
