
const socket = io('http://3.110.142.16:8000', {
    transports: ['websocket']
  });

const form = document.getElementById('form');
const messageInput = document.getElementById('messageinput');
const messagecontainer = document.querySelector('.message');
const audio = new Audio('ting.mp3');
const append = (message , position)=>{
const messageElement = document.createElement('div');
messageElement.innerText = message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messagecontainer.append(messageElement);

if(position == 'left'){
    audio.play();
}
};

form.addEventListener('submit',(e) => {
    e.preventDefault();
    const messsage = messageInput.value;
    append(`You : ${messsage}` , 'right');
    socket.emit('send', messsage);
    messageInput.value = '';
});

const name = prompt('Enter Your Name To Join');
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} Joined the chat` , 'right');
})
socket.on('receive', data => {
    append(`${data.name} : ${data.message}` , 'left')

})
socket.on('left', name => {
    append(`${name} : left the chat` , 'left')

})



