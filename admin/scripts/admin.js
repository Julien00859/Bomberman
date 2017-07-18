import Toast from './toast.js';
import cookies from 'js-cookie';

class Admin {
  constructor() {
    this.gamesUpdate = Array.from(document.querySelectorAll('.game-form'));
    this.gamesStatus = Array.from(document.querySelectorAll('.toggle-switch-checkbox'));

    this.updateGame = this.updateGame.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);

    this.addEventListeners();
  }

  updateGame(evt) {
    evt.preventDefault();

    const g_name = evt.target.querySelector('.game-name').dataset.gameName;
    const g_path = evt.target.g_path.value;
    const g_executable = evt.target.g_executable.value;

    fetch('/admin/update', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${cookies.get('token')}`
      },
      body: JSON.stringify({
        g_name,
        g_path,
        g_executable
      })
    }).then(response => response.json())
      .then(response => Toast.Push(response.success))
      .catch(error => console.error(error));
  }

  toggleStatus(evt) {
    const target = evt.target;

    fetch('/admin/update', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${cookies.get('token')}`
      },
      body: JSON.stringify({
        g_name : target.name,
        g_status: target.checked
      })
    }).then(response => response.json())
      .then(response => Toast.Push(response.success))
      .catch(error => console.error(error));
  }

  addEventListeners() {
    this.gamesUpdate.forEach(gameUpdate => gameUpdate.addEventListener('submit', this.updateGame));
    this.gamesStatus.forEach(gameStatus => gameStatus.addEventListener('click', this.toggleStatus));
  }
}

export default Admin;
