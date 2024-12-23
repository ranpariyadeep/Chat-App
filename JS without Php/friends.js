var backendURL = "https://online-lectures-cs.thi.de/chat/";
var tokenTom =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNzMyMDA4Nzk0fQ.unJ8Q-L8zfHO4BmH2pjxT6fY_FVgg7cGLB7g5uIdWrs";
const collectionID = "d9b941eb-3d65-418d-bc00-e3f73ea0b291";
var actualToken = tokenTom;


const input = document.getElementById("friend-request-name");
var currentUsername = "";
// friend lists
var friendsProbe = [];
var requestProbe = [];
var currentData = [];
var indexNumber = [];

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    let data = JSON.parse(xmlhttp.responseText);
    console.log(`${data}`);
    const dataList = document.getElementById("friend-selector");
    data.forEach((user) => {
      let option = document.createElement("option");
      if (actualToken === tokenTom) {
        if (user !== "Tom") {
          option.innerText = user;
          dataList.appendChild(option);
        }
      } else if (actualToken === tokenJerry) {
        if (user !== "Jerry") {
          option.innerText = user;
          dataList.appendChild(option);
        }
      }
    });
  }
};
xmlhttp.open("GET", backendURL + collectionID + "/user", true);
// Add token, e. g., from Tom
xmlhttp.setRequestHeader("Authorization", "Bearer " + actualToken);
xmlhttp.send();

function removeFriend(username) {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
      console.log("Removed...");
    }
  };
  xmlhttp.open(
    "DELETE",
    backendURL + collectionID + "/friend/" + username,
    true
  );
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.setRequestHeader("Authorization", "Bearer " + actualToken);
  xmlhttp.send();
}

function updateIfUserExists() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 204) {
        console.log("Exists");
        updateBackend();
      } else if (xmlhttp.status == 404) {
        console.log("Does not exist");
        alert("This user doesn't exist!");
      }
    }
  };
  currentUsername = input.value;
  xmlhttp.open("GET", backendURL + collectionID + "/user/" + input.value, true);
  xmlhttp.send();
}

function updateBackend() {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
      console.log("Requested...");
    }
  };
  xmlhttp.open("POST", backendURL + collectionID + "/friend", true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.setRequestHeader("Authorization", "Bearer " + actualToken);

  let data = {
    username: currentUsername,
  };

  let jsonString = JSON.stringify(data);
  xmlhttp.send(jsonString);
}

function onFriendInput() {
  input.classList.remove("error");
}

function addFriends(user) {
  const username = user.username;
  const number = user.unread;
  console.log(username, number)
  const chatList = document.getElementById("chat_list");
  // Clear the list to prevent duplicate rendering
  

  // let friend = list;

  //list.forEach( function(friend)  {
  // for (let i = 0 ; friend.length>i; i++ ){
  //   const li = document.createElement("li");
  //   const a = document.createElement("a");
  //   a.setAttribute("href", "chat.php?friend=" + friend[i]);

  //   const span = document.createElement("span");
  //   span.setAttribute("class", "count");
  //   // span.innerHTML = "";

  //   a.innerText = friend[i];

  //     // for (){
  //       //  span.innerText = number[i];
  //        span.innerText = number;
  //        a.appendChild(span);
  //       //  console.log(`${number[i]},${friend[i]}`);
  //     // }

  //   li.appendChild(a);

  //   chatList.appendChild(li);
  
  // }//);


  const li = document.createElement("li");

  const a = document.createElement("a");
  a.innerText = username;
  a.setAttribute("href", "chat.php?friend=" + username);

  const span = document.createElement("span");
  span.setAttribute("class", "count");
  span.innerText = number;
  a.appendChild(span);

  li.appendChild(a);

  chatList.appendChild(li);
}

function addRequestedFriends(list) {
  const fList = document.getElementById("freind_req_accept");
  // Clear the list to prevent duplicate rendering
  fList.innerHTML = "";

  list.forEach(function (friend) {
    //Tabelle für New Requests
    const p = document.createElement("p");
    const span = document.createElement("span");

    p.setAttribute("id", "freind_req_list");
    p.innerText = " Friend request from ";
    span.setAttribute("id", "ask_p");
    span.innerText = friend;
    p.appendChild(span);

    //Accept Buttons
    const a = document.createElement("a");
    a.setAttribute("href", "");
    const acceptButton = document.createElement("button");
    acceptButton.innerText = "Accept";
    acceptButton.setAttribute("type", "button");
    acceptButton.classList.add("but_new_req_1");

    a.appendChild(acceptButton);

    //Reject Buttons
    const a2 = document.createElement("a");
    a2.setAttribute("href", "");
    const rejectButton = document.createElement("button");
    rejectButton.innerText = "Reject";
    acceptButton.setAttribute("type", "reset");
    rejectButton.classList.add("but_new_req_2");

    a2.appendChild(rejectButton);

    // Buttons zum Listeneintrag hinzufügen

    p.appendChild(a);
    p.appendChild(a2);
    fList.appendChild(p);

    acceptButton.addEventListener("click", function () {
      //Event
      friendsProbe.push(friend);
      requestProbe.splice(requestProbe.indexOf(friend), 1);

      p.removeChild(a2);
      p.removeChild(a);
      fList.removeChild(p);
      // updateIfUserExists();
      // addFriends(friendsProbe); //!
    });

    rejectButton.addEventListener("click", function () {
      //Event
      fList.removeChild(p);

      requestProbe.splice(requestProbe.indexOf(friend), 1);
    });
  });
}

document
  .getElementById("but_add")
  .addEventListener("click", function addButton(event) {
    const text = input.value.trim(); // Trim whitespace

    if (text === "") {
      alert("Please enter a valid name!");
      return;
    }

    // some every array element ne check kare
    if (currentData.some((user) => user.username === text)) {
      alert("This friend is already in your list!");
      input.value = "";
      return;
    }
    if (actualToken === tokenTom) {
      if (text === "Tom") {
        input.classList.add("error");
        alert("You are Tom...");
        return;
      }
    } else if (actualToken === tokenJerry) {
      if (text === "Jerry") {
        input.classList.add("error");
        alert("You are Jerry...");
        return;
      }
    }

    updateIfUserExists();

    input.value = ""; // Clear the input field
  });

function loadFriends() {
  var xmlhttp2 = new XMLHttpRequest();
  xmlhttp2.onreadystatechange = function () {
    if (xmlhttp2.readyState == 4) {
      if (xmlhttp2.status == 200) {
        let data = JSON.parse(xmlhttp2.responseText);

        const chatList = document.getElementById("chat_list");
        chatList.innerHTML = "";
        console.log(data);
        
        currentData = JSON.parse(JSON.stringify(data));

        
       // chatList.innerHTML = "";

        data.forEach((user) => {
          //Alle user entfernen -> (true)
          if (false) {
            removeFriend(user.username);
          }

          if (user.status === "accepted" || user.unread > 0) {
            //friendsProbe.push(user.username);
            // indexNumber.push(user.unread);

            addFriends(user);
            //addFriends(friendsProbe, indexNumber);

            // console.log(indexNumber);
            // console.log(user.unread);
            // console.log("rt");


          } else if (user.status === "requested") {
            requestProbe.push(user.username);
            addRequestedFriends(requestProbe);
          } else {
            console.log(user.username + " hat einen unbekannten Status.");
          }
        });
      } else {
        console.error("Fehler bei der Anfrage: " + xmlhttp2.status);
      }
      friendsProbe.length = 0;
      requestProbe.length = 0;
    }
  };
  xmlhttp2.open("GET", backendURL + collectionID + "/friend", true);
  //xmlhttp2.setRequestHeader('Content-type', 'application/json');
  xmlhttp2.setRequestHeader("Authorization", "Bearer " + actualToken);
  xmlhttp2.send();
}

window.setInterval(function () {
  loadFriends();
}, 1000);

loadFriends();
