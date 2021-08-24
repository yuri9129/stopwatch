import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let playerList = [
  'player 1',
  'player 2',
];

class Timer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      myTime: null,
      intervalId : null,
      time:{
        second:0,
        minute:0,
        hour:0,
      },
      alert: false,
      playerId:null,
      limit: 30
    };
    this.handleSetLimit = this.handleSetLimit.bind(this);
  }

  handleStart() {
    if(this.state.intervalId !== null){
      return;
    }
    let intervalId = setInterval(() => {
      this.update();
    }, 1000);
    this.setState({
      startTime: new Date().getTime(),
      nowTime: new Date().getTime(),
      playerId: 0,
      time:{
        second:0,
        minute:0,
        hour:0,
      },
      alert: false,
      intervalId: intervalId,
    })
  }

  handleStop(){
    clearInterval(this.state.intervalId);
    this.setState({
      intervalId: null
    });
  }

  update(){
    const now = new Date().getTime();
    const start = this.state.startTime;
    const elapsed = now - start;
    let second = Math.floor(elapsed / 1000 % 60);
    let minute = Math.floor(elapsed / 1000 / 60 % 60);
    let hour   = Math.floor(elapsed / 1000 / 60 / 60);
    let alert = false;
    if(elapsed >= this.state.limit * 1000){
      alert = true;
      clearInterval(this.state.intervalId);
    }
    this.setState({
      time:{
        second,
        minute,
        hour,
      },
      alert
    })
  }

  handleChange(){
    clearInterval(this.state.intervalId);

    const nowPlayerId = this.state.playerId;
    let nextPlayerId = (nowPlayerId === null) ? 0
      : ((nowPlayerId + 1 >= playerList.length) ? 0 : nowPlayerId + 1);
    let intervalId = setInterval(() => {
      this.update();
    }, 1000);

    this.setState({
      startTime: new Date().getTime(),
      nowTime: new Date().getTime(),
      time:{
        second:0,
        minute:0,
        hour:0,
      },
      playerId: nextPlayerId,
      intervalId: intervalId,
      alert: false,
    })
  }

  handleSetLimit(event){
    this.setState({
      limit: event.target.value
    });
  }


  render(){
    let className = this.state.alert ? 'alert' : '';
    return (
      <div>
        <div>
          {this.state.playerId !== null ? playerList[this.state.playerId] : '-'}
        </div>
        <div className="timer_div">
          <button
            className={"timer_button " + className}
            onClick={() => this.handleChange()}
          >
            {/*{this.state.time.hour}:{this.state.time.minute}:{this.state.time.second}*/}
            {this.state.time.minute.toString().padStart(2, 0)}:{this.state.time.second.toString().padStart(2, 0)}
          </button>
        </div>
        <Buttons
          onClickStart={() => this.handleStart()}
          onClickStop={() => this.handleStop()}
        />
        <Setting
          limit={this.state.limit}
          onChangeLimit={this.handleSetLimit}
        />
      </div>
    );
  }
}

class Buttons extends React.Component{
  render(){
    return (
      <div>
        {/*<button onClick={() => this.props.onClickStart()}>START</button>*/}
        <button onClick={() => this.props.onClickStop()}>Stop</button>
      </div>
    );
  }
}
class Setting extends React.Component{
  render(){
    return (
      <div>
        <input name="limit" value={this.props.limit} onChange={this.props.onChangeLimit}/>
      </div>
    )
  }
}

class Board extends React.Component {
  render(){
    return(
      <div>
        <Timer/>
      </div>
    );
  }
}

ReactDOM.render(
  <Board/>,
  document.getElementById('root')
);