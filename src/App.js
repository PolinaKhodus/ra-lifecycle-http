import './App.css';
import ClockWidget from './components/clock/ClockWidget';
import NotesWidget from './components/crud/NotesWidget';

function App() {
  return (
    <>      
      <div className="task-title">Мировые часы</div>
      	<ClockWidget />

      <div className="task-title">CRUD</div>
      	<NotesWidget />
    </>    
  );
}

export default App;
