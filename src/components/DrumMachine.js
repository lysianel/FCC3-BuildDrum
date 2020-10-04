import React, {Component} from 'react';
import {audioDatabase} from "../shared/audioDatabase";

const Display = (props) => {
	return (
		<div id="display" key="display">
			{props.display}
		</div>
	);
} 


const DrumPadContainer = (props) => {
	
	const drumpads = props.audioDatabase.map((pad) => {
		return(
			<div className="drum-pad" id={pad.display} key={pad.id} onClick={props.onClick} onKeyDown={props.onKeyDown}>
				{pad.id.toUpperCase()}
				<audio src={pad.audio} className="clip" id={pad.id.toUpperCase()}></audio>
			</div>
		);
	})

	return(
		<div id="drum-pad-container" onKeyDown={props.handleKeyDown} >
			{drumpads}
		</div>
	)
}

class DrumMachine extends Component {
	constructor(props){
		super(props);

		this.state = {
			audioDatabase: audioDatabase,
			selectedAudio:''
		};


		this.handleClick=this.handleClick.bind(this);
		this.handleKeyDown=this.handleKeyDown.bind(this);
	};

	componentDidMount() {
      document.addEventListener("keydown", this.handleKeyDown);
  	}

  	componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyDown);
  	}

	handleKeyDown(event){
		const databaseChecked = this.state.audioDatabase.filter((track) => track.keycode === event.keyCode)[0];
		if (databaseChecked == null){
			this.setState({
				selectedAudio: ''
			})
		} else {
			this.setState({
				selectedAudio: databaseChecked
			})
		this.playTrack(document.getElementById(this.state.selectedAudio.display));
		}
	}

	handleClick(event){
		this.setState({
			selectedAudio:this.state.audioDatabase.filter((track) => track.display === event.target.id)[0]
		})
		this.playTrack(event.target);
	}

	playTrack(track){
		//remove active pads
		let drumpads=document.getElementsByClassName('drum-pad active');
		if(drumpads.length !==0) {
			drumpads[0].classList.remove("active");
		}
		//play and activate current pad
			console.log("played");
			track.classList.add('active');
			track.querySelector("audio").play();
	}

	render(){
		return(
			<div id="drum-machine">
				<h1>Let's Play Drums</h1>
				<Display display={this.state.selectedAudio.display} />
				<DrumPadContainer audioDatabase={this.state.audioDatabase} onClick={this.handleClick} onKeyDown={this.handleKeyDown} />
			</div>
		)
	};
}

export default DrumMachine; 