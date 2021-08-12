// Memory class: Represent a Memory
class Memory {
  constructor(title, date, time, desc) {
    this.title = title;
    this.date = date;
    this.time = time;
    this.desc = desc;
  }
}


// UI Class: Handle UI Task

class UI {
  static displayMemory() {
    // const StoredMemory = [
    //   {
    //   title: 'My Bike',
    //   date: '2019-07-25',
    //   time: '04:00',
    //   desc: 'My first bike FZ25'
    //   },
    //   {
    //   title: 'My Car',
    //   date: '2018-11-12',
    //   time: '09:00',
    //   desc: 'My first car i20'
    //   }
    // ];

    // const memory = StoredMemory;

    const memories = Store.getMry();

    memories.forEach((memory) => UI.addMemeoryToList(memory));
  }
  static addMemeoryToList(memory) {
    const list = document.querySelector('#mry-list');

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${ memory.title }</td>
    <td>${ memory.date }</td>
    <td>${ memory.time }</td>
    <td>${ memory.desc }</td>
    <td><a href="#" class="btn  btn-danger bt-sm delete"> &nbsp;X &nbsp; </a></td>
    `;

    list.appendChild(row);
  }

  static deleteMry(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }


static showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#diary-form');
  container.insertBefore(div, form);

  // Vanish in 3 sec
  setTimeout(() => document.querySelector('.alert').remove(), 3000);

}

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#date').value = '';
    document.querySelector('#time').value = '';
    document.querySelector('#desc').value = '';
  }

}

// Diary Classs: Handle Storage
class Store {
  static getMry(){
    let memories;
    if(localStorage.getItem('memories') === null) {
      memories= [];
    } else {
      memories = JSON.parse(localStorage.getItem('memories'));
    }
    return memories;
  }
  static addMry(memory){
    const memories = Store.getMry();
    memories.push(memory);
    localStorage.setItem('memories', JSON.stringify(memories));
  }
  static removeMry(time){
    const memories = Store.getMry();

    memories.forEach((memory, index) => {
      if(memory.time === time){
        memories.splice(index, 1);
      }
    });
    localStorage.setItem('memories', JSON.stringify(memories));

  }
}


// Event: Display Memories
document.addEventListener('DOMContentLoaded', UI.displayMemory);

// Event: Add a New Memory
document.querySelector('#diaryForm').addEventListener('submit', (e) => {

  // Prevent actual submit
  e.preventDefault();
  // Get form values
  const title = document.querySelector('#title').value;
  const date = document.querySelector('#date').value;
  const time = document.querySelector('#time').value;
  const desc = document.querySelector('#desc').value;

  // validate
  if(title === '' || date === '' || time === '' || desc === '') {
    UI.showAlert('Please fill in all fields','danger');
  } else {

    // Instantate the memories
    const memory = new Memory(title, date, time, desc);
    // console.log(memory);

    // Add Diary to UI
    UI.addMemeoryToList(memory);

    // Add memory to diary
    Store.addMry(memory);

    // Show sucess message
    UI.showAlert('Memory saved', 'success');

    // Clear fields
    UI.clearFields()
  }

});

// Event: Remove a Memory
document.querySelector('#mry-list').addEventListener('click', (e) => {
  // console.log(e.target);

  // Remove diary from UI
  UI.deleteMry(e.target);

// Remove Memory from diary
 Store.removeMry(e.target.parentElement.previousElementSibling.textContent);

  // Show sucess message
  UI.showAlert('Memory Deleted', 'success');
});
