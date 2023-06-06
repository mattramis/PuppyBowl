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
    let playerData = await response.json();
    //await fetchSinglePlayer(7039)
    return playerData;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${APIURL}/players`, {
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
    const response = await fetch(`${APIURL}/players/${playerId}`, {
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

    playerList.forEach((players) => {
      console.log(`Player:`, players);

      const playerElement = document.createElement("div");
      playerElement.innerHTML = `
        <h2>${players.name}</h2>
        <p>${players.breed}</p>
        <p>${players.status}</p>
        <button class="details-button" data-id="${players.id}">See Details</button>
        <button class="delete-button" data-id="${players.id}">Delete</button>
      `;
      playerContainer.appendChild(playerElement);

      // See details
      const detailsButton = playerElement.querySelector(".details-button");
      detailsButton.addEventListener("click", async (event) => {
        await renderSinglePlayerById(players.id);
      });

      // Delete player
      const deleteButton = playerElement.querySelector(".delete-button");
      deleteButton.addEventListener("click", async () => {
        await removePlayer(players.id);
        await renderAllPlayers();
      });
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

const renderSinglePlayerById = async (playerId) => {
  try {
    // Render single player details to the DOM
    // ...
    const player = await fetchSinglePlayer(playerId);

    // Create a new HTML element to display party details
    const playerDetailsElement = document.createElement("div");
    playerDetailsElement.innerHTML = `
      <h2>${players.name}</h2>
      <p>${players.breed}</p>
      <button class="close-button">Close</button>
    `;
    playerContainer.appendChild(playerDetailsElement);

    // Add event listener to the close button
    const closeButton = playerDetailsElement.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      playerDetailsElement.remove();
    });
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
    await renderAllPlayers();
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
