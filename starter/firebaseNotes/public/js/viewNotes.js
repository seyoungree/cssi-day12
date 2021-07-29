let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      googleUser = user;
      getNotes(googleUser.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    };
  });
};

const getNotes = (userId) => {
    // 1. get access to all the current user's data
    const dbRef = firebase.database().ref(`users/${userId}`);
    // 2. Display them on the page
    dbRef.on('value', (snapshot) => {
        renderData(snapshot.val());
  });
};

const renderData = (data) => {
    const destination = document.querySelector("#app");
    destination.innerHTML = "";
    for (let key in data) {
        const note = data[key];
        destination.innerHTML += createCard(note);
    }
};

const createCard = (note) => {
    return `<div class ="column is-one-quarter">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">${note.title}</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            ${note.text}
                        </div>
                    </div>
                </div>
            </div>`;
};