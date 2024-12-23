var backendURL = "https://online-lectures-cs.thi.de/chat/";
var tokenTom =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNzMyMDA4Nzk0fQ.unJ8Q-L8zfHO4BmH2pjxT6fY_FVgg7cGLB7g5uIdWrs";
const collectionID = "d9b941eb-3d65-418d-bc00-e3f73ea0b291";
var actualToken = tokenTom;
let loggedInUsername = "Tom";


// const input = document.getElementById("friend-request-name");
// var currentUsername = "";
// // friend lists
// var friendsProbe = [];
// var requestProbe = [];
// var currentData = [];
// var indexNumber = [];

function onFriendInput() {
  input.classList.remove("error");
}


function getLoggedInUser(){
  console.log("Current User:" + window.sessionStorage.getItem("currentlyLoggedInUser") );
  return window.sessionStorage.getItem("currentlyLoggedInUser");
}

var predata;
let datalist = document.getElementById('friend-selector');
function onFriendsLoad() {    //THIS FUNCTION MAYBE?? FILLS THE DATALIST
    datalist.innerHTML = "";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            console.log(data);
            predata = data;
            let acceptedFriends = getAcceptedFriends();
            for (let x of data) {
                if (!acceptedFriends.includes(x) && x !== getLoggedInUser()) {
                    let option = document.createElement('option');
                    option.value = x;
                    datalist.appendChild(option);
                }
            }
        }
    };
    xmlhttp.open("GET", "ajax_list_users.php", true);
    xmlhttp.send();
}

function getAcceptedFriends() {  //THIS FUNCTION PARSES THE LOCAL LIST OF FRIENDS? AND RETURNS IT?
  let listItems = document.querySelectorAll('#chat_list li a');
  let listItemstext = [];
  listItems.forEach(function (item) {
      listItemstext.push(item.innerText.trim());
  });
  console.log("ACCEPTED FRIENDS ARE:" + listItems);
  return listItemstext;
}


// function removeFriend(username) {
//   let xmlhttp = new XMLHttpRequest();
//   xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
//       console.log("Removed...");
//     }
//   };
//   xmlhttp.open(
//     "DELETE",
//     backendURL + collectionID + "/friend/" + username,
//     true
//   );
//   xmlhttp.setRequestHeader("Content-type", "application/json");
//   xmlhttp.setRequestHeader("Authorization", "Bearer " + actualToken);
//   xmlhttp.send();
// }

// function updateIfUserExists() {
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState == 4) {
//       if (xmlhttp.status == 204) {
//         console.log("Exists");
//         updateBackend();
//       } else if (xmlhttp.status == 404) {
//         console.log("Does not exist");
//         alert("This user doesn't exist!");
//       }
//     }
//   };
//   currentUsername = input.value;
//   xmlhttp.open("GET", backendURL + collectionID + "/user/" + input.value, true);
//   xmlhttp.send();
// }

// function updateBackend() {
//   let xmlhttp = new XMLHttpRequest();
//   xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
//       console.log("Requested...");
//     }
//   };
//   xmlhttp.open("POST", backendURL + collectionID + "/friend", true);
//   xmlhttp.setRequestHeader("Content-type", "application/json");
//   xmlhttp.setRequestHeader("Authorization", "Bearer " + actualToken);

//   let data = {
//     username: currentUsername,
//   };

//   let jsonString = JSON.stringify(data);
//   xmlhttp.send(jsonString);
// }

// function addFriends(user) {
//   const username = user.username;
//   const number = user.unread ;
//   console.log(username, number)
//   const chatList = document.getElementById("chat_list");
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


//   const li = document.createElement("li");

//   const a = document.createElement("a");
//   a.innerText = username;
//   a.setAttribute("href", "chat.php?friend=" + username);

//   const span = document.createElement("span");
//   span.setAttribute("class", "count");
//   span.innerText = number;
//   a.appendChild(span);

//   li.appendChild(a);

//   chatList.appendChild(li);
// }

// function addRequestedFriends(list) {
//   const fList = document.getElementById("freind_req_accept");
//   // Clear the list to prevent duplicate rendering
//   fList.innerHTML = "";

//   list.forEach(function (friend) {
//     //Tabelle für New Requests
//     const p = document.createElement("p");
//     const span = document.createElement("span");

//     p.setAttribute("id", "freind_req_list");
//     p.innerText = " Friend request from ";
//     span.setAttribute("id", "ask_p");
//     span.setAttribute("name", "username");
//     span.innerText = friend;
//     p.appendChild(span);

//     //Accept Buttons
//     const a = document.createElement("a");
//     a.setAttribute("href", "");
//     const acceptButton = document.createElement("button");
//     acceptButton.innerText = "Accept";
//     acceptButton.setAttribute("type", "button");
//     acceptButton.classList.add("but_new_req_1");

//     a.appendChild(acceptButton);

//     //Reject Buttons
//     const a2 = document.createElement("a");
//     a2.setAttribute("href", "");
//     const rejectButton = document.createElement("button");
//     rejectButton.innerText = "Reject";
//     acceptButton.setAttribute("type", "reset");
//     rejectButton.classList.add("but_new_req_2");
    

//     a2.appendChild(rejectButton);

//     // Buttons zum Listeneintrag hinzufügen

//     p.appendChild(a);
//     p.appendChild(a2);
//     fList.appendChild(p);

//     acceptButton.addEventListener("click", function () {
      
//       //Event
//       friendsProbe.push(friend);
//       requestProbe.splice(requestProbe.indexOf(friend), 1);

//       p.removeChild(a2);
//       p.removeChild(a);
//       fList.removeChild(p);
     
//     });

//     rejectButton.addEventListener("click", function () {
//       //Event
      
//       fList.removeChild(p);

//       requestProbe.splice(requestProbe.indexOf(friend), 1);
//     });
//   });
// }

// document
//   .getElementById("but_add")
//   .addEventListener("click", function addButton(event) {
//     const text = input.value.trim(); // Trim whitespace

//     if (text === "") {
//       alert("Please enter a valid name!");
//       return;
//     }

//     // some every array element ne check kare
//     if (currentData.some((user) => user.username === text)) {
//       alert("This friend is already in your list!");
//       input.value = "";
//       return;
//     }
//     if (actualToken === tokenTom) {
//       if (text === "Tom") {
//         input.classList.add("error");
//         alert("You are Tom...");
//         return;
//       }
//     } else if (actualToken === tokenJerry) {
//       if (text === "Jerry") {
//         input.classList.add("error");
//         alert("You are Jerry...");
//         return;
//       }
//     }

//     updateIfUserExists();

//     input.value = ""; // Clear the input field
//   });

//   function loadFriends() {    
//     let xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function () {
//         if (xmlhttp.readyState == 4) {
//             if (xmlhttp.status == 200) {
//                 let response = xmlhttp.responseText;
//                 console.log(response);
//                updateFriendsAndRequests(response);
//             } else if (xmlhttp.status == 404) {

//             }
//         }
//     };
//     xmlhttp.open("GET", "ajax_load_friends.php", true);
//     xmlhttp.setRequestHeader('Content-type', 'application/json');
//     xmlhttp.send();
// }
function loadFriends() {    
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              let response = xmlhttp.responseText;
              console.log(response);
             updateFriendsAndRequests(response);
          } else if (xmlhttp.status == 404) {

          }
      }
  };
  xmlhttp.open("GET", "ajax_load_friends.php", true);
  xmlhttp.setRequestHeader('Content-type', 'application/json');
  xmlhttp.send();
}

function updateFriendsAndRequests(response) {  //THIS FUNCTION TAKES A GETFRIENDS RESPONSE AND FILLS BOTH LISTS ACCORDINGLY
  var startIndex = response.indexOf('[{');
  var jsonString = response.substring(startIndex);
  let friends = JSON.parse(jsonString);

  var acceptedFriends = friends.filter(item => item.status === 'accepted');
  var requestedFriends = friends.filter(item => item.status === 'requested');

  let acceptedList = document.getElementById('chat_list');
  let requestedList = document.getElementById('freind_req_accept');
  let name = document.getElementById('removeFriendModalLabel');
  console.log("freind_req_accept" + requestedList);
  acceptedList.innerHTML = "";
  requestedList.innerHTML = "";

for (let x of acceptedFriends) {
  let li = document.createElement("li");
  li.className ="list-group-item d-flex justify-content-between align-items-center";
  let a = document.createElement("a");
  let span = document.createElement("span");
  span.className ="badge badge-primary badge-pill count";
  a.innerText = x.username;
  span.innerText = x.unread;
  console.log(x.username);
  console.log(x.unread);
  a.setAttribute("href", "chat.php?friend=" + x.username);
  a.setAttribute("id", "chatname");
  a.className="list-group-item-action";
  
  
 
  li.appendChild(a);

  if (x.unread > 0) {
    a.appendChild(span);
  }  
    
  acceptedList.appendChild(li);
}

for (let x of requestedFriends) {

       let p = document.createElement("p");
    let span = document.createElement("a");
 
    p.setAttribute("id", "freind_req_list");
    
  //  span.setAttribute("id", "someText");
    //span.setAttribute("name", "username");
    span.addEventListener("click",()=> openModal(x.username));

    let reqname= document.createElement("p");
    reqname.setAttribute("id","reqname");
    reqname.innerText=x.username;
    span.innerText =" Friend request from ";
     span.setAttribute("id","req");
     span.className=" list-group-item list-group-item-action";
     span.setAttribute("data-toggle","list");
    span.setAttribute("href","#");
   
span.appendChild(reqname)
p.appendChild(span);
     
  


 //   span.setAttribute("onclick",showModal());

    //Accept Buttons
    let tform = document.createElement("form");
        tform.setAttribute("action", "");
        tform.setAttribute("method", "get");
      

    
    let acceptButton = document.createElement("button");
    acceptButton.setAttribute("type", "submit");
    acceptButton.setAttribute("name", "accept");
    acceptButton.classList.add("but_new_req_1");
    acceptButton.setAttribute("value", x.username);
    acceptButton.setAttribute("formaction", "friends.php");
    acceptButton.innerText = "Accept";
   
    

    

    //Reject Buttons
    
    let rejectButton = document.createElement("button");
    rejectButton.setAttribute("type", "submit");
    rejectButton.setAttribute("name", "deny");
    rejectButton.classList.add("but_new_req_2");

    rejectButton.setAttribute("value", x.username);
    rejectButton.setAttribute("formaction", "friends.php?deny="+ x.username);
    rejectButton.innerText = "Reject";
   

    
//  span2.innerText= x.username;
   // name.appendChild.apply(span2);

    // Buttons zum Listeneintrag hinzufügen
    tform.appendChild(p);
   // p.appendChild(span);
   
    //p.appendChild(acceptButton);
   // p.appendChild(rejectButton);
    requestedList.appendChild(tform);

  }
}


function openModal(username) {
  document.getElementById('friendRequestUser').value = username;
  document.getElementById('denyRequestUser').value = username;
  document.getElementById('modalFriendName').innerText = username;
  
  let rejectButton = document.getElementById("denyRequestUser");
  rejectButton.setAttribute("formaction", "friends.php?deny="+ username);
  let acceptButton  = document.getElementById('friendRequestUser');
  acceptButton.setAttribute("formaction", "friends.php?accept="+username);
  const modal = new bootstrap.Modal(document.getElementById('friendRequestModal'));
  modal.show();
}

// function showModal(username) {
//   var inputField = document.getElementById('someText');
//   var myModalElement = document.getElementById('myModal');
//   var myModal = new bootstrap.Modal(myModalElement);
//   // myModalElement.querySelector('.modal-body').innerHTML =
//   // `
//   // <p>${inputField.value}</p>
//   // `
//   // ;
//   myModal.show();
//   }

window.setInterval(function () {
  loadFriends();
}, 1000);

loadFriends();