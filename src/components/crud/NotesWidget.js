import { Component } from 'react';
import NoteCard from './NoteCard';

export default class NotesWidget extends Component {
  static propTypes = {};
  
  state = {
    notes: [],
    note: '',
  };

  onReloadClick = (e) => {
    this.loadNotes();
  }

  onSendClick = (e) => {
    e.preventDefault();    

    fetch('http://localhost:7777/notes', {
      method: 'POST',
      body: this.state.note,
    }).then(response => {
      if (response.status === 204) {
        this.loadNotes();
      }
    })

    this.setState((prev) => ({...prev, note: ''}));      
  }

  onNoteChange = (e) => {
    this.setState((prev) => ({...prev, note: e.target.value}));
  }  

  onCardDel = (id) => {
    fetch(`http://localhost:7777/notes/${id}`, {
      method: 'DELETE',
    }).then(response => {
      if (response.status === 204) {
        this.loadNotes();
      }
    })
  }

  loadNotes = () => {
    fetch('http://localhost:7777/notes')
      .then((response) => response.json())
      .then((result) => this.setState((prev) => (
        {...prev, notes: result}
      )));
  }

  filterByID = (id) => {
    return this.state.notes.filter((note) => note.id !== id);
  }

  componentDidMount() {
    this.loadNotes();
  }

  render() {
    return (
      <div className="notes-widget_container">
        <header className="widget-header">
          <h3 className="notes-widget_title">Notes</h3>
          <i className="reload_btn material-icon" onClick={this.onReloadClick}>autorenew</i>
        </header>

        <main className="notes_box">
          {this.state.notes.map((note) => 
            (<NoteCard note={note} 
                key={note.id}
                onDelClick={this.onCardDel}/>)
          )}
        </main>

        <form className="new-note_form">
          <label htmlFor="new-note">New Note</label>
          <textarea className="new-note_field" 
            id="new-note" 
            value={this.state.note}
            onChange={this.onNoteChange}></textarea>
          <button className="new-note_btn material-icon" 
            onClick={this.onSendClick}>send</button>
        </form>
      </div>    
    );
  }
}
