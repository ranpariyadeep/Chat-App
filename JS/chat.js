

// function getChatPartner() {
//     const url = new URL(window.location.href);
//     // Access the query parameters using searchParams
//     const queryParams = url.searchParams;
//     // Retrieve the value of the "friend" parameter
//     const friendValue = queryParams.get("friend");
//     console.log("Friend:", friendValue);
//     return friendValue;
//   }

//   const chatPartner = getChatPartner();
// document.getElementById("chatHeader").textContent = `Chat with ${chatPartner}`;


// List Messages --      load messages form server---------------------------

// function loadMessages() {
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//       let data = JSON.parse(xmlhttp.responseText);
//       console.log(data);
//       displayMessages(data);
//     }
//   };
//   xmlhttp.open(
//     "GET",
//     `https://online-lectures-cs.thi.de/chat/d9b941eb-3d65-418d-bc00-e3f73ea0b291/message/${chatPartner}`,
//     true
//   );
//   // Add token, e. g., from Tom
//   xmlhttp.setRequestHeader(
//     "Authorization",
//     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNzMyMDA4Nzk0fQ.unJ8Q-L8zfHO4BmH2pjxT6fY_FVgg7cGLB7g5uIdWrs"
//   );
//   xmlhttp.send();
// }
function loadMessages() {
  fetch(`ajax_load_messages.php?to=${encodeURIComponent(chatPartner)}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to load messages');
          }
          return response.json();
      })
      .then(messages => {
          const container = document.getElementById('box');  //box
          container.innerHTML = '';

          if (!messages.length) {
              container.textContent = 'Keine Nachrichten verfügbar.';
              return;
          }

          messages.forEach(msg => {
              const sender = msg.from || 'Unbekannt'; // Fallback für fehlendes "from"
              const text = msg.msg || '';        // Fallback für fehlende "message"
              const time = msg.time ? new Date(msg.time).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : 'Unbekannte Zeit'; // Nur Uhrzeit anzeigen
  
              const messageDiv = document.createElement('p');   //p
              messageDiv.classList.add('chat-message');  //chat-message

              const messageText = document.createElement('span');
              messageText.textContent = `${sender}: ${text}`;
              messageDiv.appendChild(messageText);

              const timestamp = document.createElement('span');
              timestamp.classList.add('time');
              timestamp.textContent = time;
              messageDiv.appendChild(timestamp);

              container.appendChild(messageDiv);

          });
      })
      .catch(error => console.error('Error:', error));
}



function sendMessages() {
  const messageInput = document.getElementById('search_enter-text'); //search_enter-text
  const message = messageInput.value.trim();
  if (message === '') return;

  fetch('ajax_send_message.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msg: message, to: chatPartner })
  }).then(response => {
      if (response.status === 204) {
          messageInput.value = '';
          loadMessages(); // Aktualisiere Nachrichten nach dem Senden
      } else {
          throw new Error('Failed to send message');
      }
  }).catch(error => console.error('Error:', error));
}


// formate - How look messages in display 
// function displayMessages(messages) {
//     const messageContainer = document.getElementById("box");
//     messageContainer.innerHTML = ""; // Vorherige Nachricht löschen
  
//     messages.forEach((message) => {
//       const messageDiv = document.createElement("p");
//       messageDiv.classList.add("chat-message");
//       messageDiv.innerHTML = `<span> ${message.from}: ${
//         message.msg
//       }</span><span class="time">${new Date(
//         message.time * 1000
//       ).toLocaleTimeString()}</span>`;
//       box.appendChild(messageDiv);
//     });
//   }


  // send messages  using code form Chat-App API------------------------------------------------------------------
  // function sendMessages() {
  //   const messageText = document.getElementById("search_enter-text").value;
  //   if (messageText.trim() === "") return; // Leere Nachrichten ignorieren
  
  //   let xmlhttp = new XMLHttpRequest();
  //   xmlhttp.onreadystatechange = function () {
  //     if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
  //       console.log("done...");
  //       document.querySelector("input[name='message']").value = ""; // Eingabefeld leeren
  //       loadMessages(); // Nachrichten neu laden
  //     }
  //   };
  //   xmlhttp.open(
  //     "POST",
  //     `https://online-lectures-cs.thi.de/chat/d9b941eb-3d65-418d-bc00-e3f73ea0b291/message`,
  //     true
  //   );
  //   xmlhttp.setRequestHeader("Content-type", "application/json");
  //   // Add token, e. g., from Tom
  //   xmlhttp.setRequestHeader(
  //    "Authorization",
  //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNzMyMDA4Nzk0fQ.unJ8Q-L8zfHO4BmH2pjxT6fY_FVgg7cGLB7g5uIdWrs"
  //   );
  //   // Create request data with message and receiver
  //   let data = {
  //     message: messageText,         
  //     to: chatPartner,   // koni sathe chat karva ni che 
  //   };
  //   let jsonString = JSON.stringify(data); // Serialize as JSON
  //   xmlhttp.send(jsonString); // Send JSON-data to server
  // }

  
// Nachrichten alle Sekunde neu laden
setInterval(loadMessages, 1000);

// Beim Laden der Seite einmal die Nachrichten laden
loadMessages();