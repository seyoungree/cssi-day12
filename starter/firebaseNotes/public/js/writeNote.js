let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
    console.log("note submission function called");
    // 1. Capture the form data
    const titleInput = document.querySelector("#noteTitle");
    const textInput = document.querySelector("#noteText");
    // 2. Format the data 
    const note = {
        title: titleInput.value,
        text: textInput.value
    };
    // 3. Clear the form so that we can write a new note
    titleInput.value = "";
    textInput.value = "";
    // 4. Write it to our database
    console.log(googleUser);
    const dbRef = firebase.database().ref(`users/${googleUser.uid}`);
    dbRef.push(note);
}
