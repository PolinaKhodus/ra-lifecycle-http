import { Component } from 'react';
import Type from 'prop-types';

export default class NoteCard extends Component {
  static propTypes = {
    note: Type.object,
    onDelClick: Type.func,
  };

  onDelClick = (e) => {
    this.props.onDelClick(this.props.note.id);
  }

  render() {
    const { content } = this.props.note;

    return (
      <div className='note-card'>
        {content}
        <span className="material-icon delete-btn"
          onClick={this.onDelClick}>clear</span>
      </div>
    );
  }
}
