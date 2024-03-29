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

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() { msg = document.getElementById("msg").value; firebase.database().ref(room_name).push({ name: user_name, message: msg, like: 0 }); document.getElementById("msg").value = ""; }
function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                firebase_message_id = childKey; message_data = childData;

                console.log(firebase_message_id);
                console.log(message_data);
                name1 = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];

                name_with_tag = "<h4>" + name1 + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updatelike(this.id)'>";
                span_tag = " <span class='glyphicon glyhicon-thumbs-up'>like: " + like + "</span> </button>";
                row = name_with_tag + message_with_tag + like_button + span_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}

function updatelike(message_id) {

    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    firebase.database().ref(room_name).child(message_id).update({ likes: updated_likes });
}
function logout() { localStorage.removeItem("user_name"); localStorage.removeItem("room_name"); window.location = "index.html"; }