import { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class ClockItem extends Component {
  static propTypes = {
    clock: PropTypes.object,
    onDelClick: PropTypes.func,
  };

  state = {
    time: '',
  }

  componentDidMount() {
    this.intId = setInterval(() => this.setState((prev) => (
      { ...prev, time: this.formatTime() })),
       1000)
  }

  componentWillUnmount() {
    clearInterval(this.intId);
  }

  formatTime() {
    let ts = +moment.utc().valueOf();
    ts += Number(this.props.clock.tz) * 3600000;

    return moment.utc(ts).format('HH:mm:ss');
  }

  onDelClick = (e) => {
    this.props.onDelClick(this.props.clock.id);
  }

  render() {
    const { place } = this.props.clock;
    
    return (
      <div className="clock-box">
        <h3>{place}</h3>
        <span className="time-field">{this.state.time}</span>
        <span className="del-btn" onClick={this.onDelClick}>x</span>
      </div>
    );
  }
}
