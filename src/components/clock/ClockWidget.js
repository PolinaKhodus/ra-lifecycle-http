import { Component } from 'react';
import ClockForm from './ClockForm';
import ClockItem from './ClockItem';

export default class ClockWidget extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clocks: [],
    };
  }

  onSubmit = (clock) => {
    const [...arr] = this.state.clocks;
    arr.push(clock);
    this.setState((prev) => ({...prev, clocks: arr}));
  }

  onClockDel = (id) => {
    this.setState((prev) => {
      return {clocks: prev.clocks.filter((clock) => clock.id !== id)};
    });
  } 


  render() {
    return (
      <div className="clock-widget_container">
       <ClockForm onFormSubmit={this.onSubmit}/>

       <div className="clocks-box">
          {this.state.clocks.map((clock) => (
            <ClockItem clock={clock} key={clock.id} onDelClick={this.onClockDel}/>
          ))}
        </div>
      </div>
    );    
  }
}
