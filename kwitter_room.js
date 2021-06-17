var firebaseConfig = {
      apiKey: "AIzaSyCmPFJMLW3-kXnbsYRQQnfOBq_gtNSxOGA",
      authDomain: "kwitter-37070.firebaseapp.com",
      databaseURL: "https://kwitter-37070-default-rtdb.firebaseio.com",
      projectId: "kwitter-37070",
      storageBucket: "kwitter-37070.appspot.com",
      messagingSenderId: "638548907409",
      appId: "1:638548907409:web:4a70e293ad396b57cc3630"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name;

function addroom() {

      Room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(Room_name).update({

            purpose: "adding roomname"
      });

      localStorage.setItem("room_name", Room_name);
      window.location = "kwitter_page.html";
}
function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>"; document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();
function redirectToRoomName(name) { console.log(name); localStorage.setItem("room_name", name); window.location = "kwitter_page.html"; } function logout() { localStorage.removeItem("user_name"); localStorage.removeItem("room_name"); window.location = "index.html"; }