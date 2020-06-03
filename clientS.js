var text = ""
const socket = io('http://localhost:3000');
    const button = document.getElementById("button");
    var result = document.getElementById("result");
    var handle = document.getElementById("handle");
    var main = document.getElementsByTagName("main")[0];
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (typeof SpeechRecognition === "undefined") {
      button.remove();
      var message = document.getElementById("message");
      message.removeAttribute("hidden");
      message.setAttribute("aria-hidden", "false");
    } else {
      // good stuff to come here
      var listening = false;
      var recognition = new SpeechRecognition();
var start = () => {
recognition.start();
button.textContent = "Stop listening";
main.classList.add("speaking");

};
var stop = () => {
recognition.stop();
button.textContent = "Start listening";
main.classList.remove("speaking");
};
var onResult = event => {
result.innerHTML = "";
for (var res of event.results) {
text = document.createTextNode(res[0].transcript);
  var p = document.createElement("p");
  if (res.isFinal) {
    p.classList.add("final");
    socket.emit('chat', {
    
        message: res[0].transcript,
        handle: handle.value
    });
  }
  p.appendChild(text);
  //result.appendChild(p);
  

}


};
recognition.continuous = true;
    recognition.interimResults = true;
    recognition.addEventListener("result", onResult);

 
    }
 
  


////
 //location of where server is hosting socket app

socket.on('chat-message', data =>{
    console.log(data)
});
var audiodata = []
// query DOM




// Emit events

button.addEventListener('click', () =>
{
    listening ? stop() : start();
    listening = !listening;
    
   
}) 

// Listen to events

socket.on('chat', (data)=>{
    result.innerHTML += '<p> <strong>' + data.handle + ': </strong>' + data.message + '</p>'
});

