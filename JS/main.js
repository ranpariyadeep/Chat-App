window.backendUrl = "https://online-lectures-cs.thi.de/chat/0c956458-1895-437b-be23-a7285ee1e0bf/user";
window.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNzMxMDgxNDU0fQ.MDCwFc_KFS5y-H7ervCN2PN_eBSfVKFmILbuaO03Nck";

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        let data = JSON.parse(xmlhttp.responseText);
        console.log(data);
    }
};
xmlhttp.open("GET", "https://online-lectures-cs.thi.de/chat/0c956458-1895-437b-be23-a7285ee1e0bf/user", true);
// Add token, e. g., from Tom
xmlhttp.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSmVycnkiLCJpYXQiOjE3MzEzOTc2NjB9.shCHxGlqF1n7ha5LRiwH3dpnrVA9NJxlwbCT26DTerQ');
xmlhttp.send();


