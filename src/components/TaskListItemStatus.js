import React from 'react';
import Lottie from '../lottie/Lottie';
import * as animationData from '../lottie/create.json';

export interface PropTypes {
	clickable: boolean;
	progress: number;
	stopped?: boolean;
	paused?: boolean;
	range: array<number>
}

export interface StateTypes {
	progress: number,
	stopped: boolean,
	paused: boolean,
	loop: boolean,
	played: boolean,
	range: array<number>
}

const STROKE_WIDTH = 4;
const BOX_SIZE = 50;
const KEYFRAMES = [0,30,45];

export default class TaskListItemStatus extends React.Component<PropTypes, StateTypes> {

    state = {
    	progress:0,
    	paused:true,
		anim:null,
		currentPosition:0
	}

	constructor() {
		super();
		this.didClick = this.didClick.bind(this);
		this.isReady = this.isReady.bind(this);
		this.didStart = this.didStart.bind(this);
		this.didComplete = this.didComplete.bind(this);
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.clickable === this.props.clickable) return;
		const { currentPosition, anim } = nextState;
		nextState.paused = false;
		if (nextProps.clickable) {
			anim.playSegments([KEYFRAMES[currentPosition],KEYFRAMES[currentPosition+1]]);
		} else {
			console.log("rewind");
			anim.setDirection(-1); // Rewind is not functioning
			anim.play();
		}
	}
	
	didClick() {
		// Escape if not clickable
		if (!this.props.clickable) return;
		// Play frames for the next fragment
		const { currentPosition } = this.state;
		this.state.anim.playSegments([KEYFRAMES[currentPosition],KEYFRAMES[currentPosition+1]]);
		this.setState({ paused:false });
		// Notify the parent
		if ('function' !== typeof this.props.onClick) return;
		this.props.onClick();
	}

    isReady(anim) {
		this.setState({ anim });
	}
	
	didStart({ firstFrame, totalFrames }) {
		const currentFrame = firstFrame;
		const nextFrame = currentFrame + totalFrames;
	}

    didComplete(animEvent) {
		let { currentPosition } = this.state;
		if (animEvent.direction == 1) {
			currentPosition++;
			this.setState({ currentPosition,paused:true });
		}
    }

    render() {
		// Lottie setup
    	const defaultOptions = {
			loop: false,
			autoplay: false,
			segments: null,
			animationData: animationData,
			segments: null,
			rendererSettings: {
				preserveAspectRatio: 'xMidYMid slice'
			}
		}
		// Progress indicator sizing
		const radius = (BOX_SIZE/2) - STROKE_WIDTH;
		const circ = Math.PI * (radius * 2);

    	return (
			<span style={{width:BOX_SIZE,height:BOX_SIZE,position:"relative"}}>
				<Lottie
					options={defaultOptions}
					height={BOX_SIZE} width={BOX_SIZE}
					isStopped={false}
					isPaused={this.state.paused}
					onReady={this.isReady}
					onStart={this.didStart}
					onEnd={this.didComplete}
				/>
				<svg height={BOX_SIZE} width={BOX_SIZE} style={{position:"absolute",top:0,left:0,transform:"rotate(-90deg)"}} onClick={this.didClick}>
					<defs>
						<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="rgb(255,82,107" />
							<stop offset="100%" stopColor="rgb(251,50,84)" />
						</linearGradient>
					</defs>
					<circle r={radius} cx={BOX_SIZE/2} cy={BOX_SIZE/2} fill="transparent" stroke="url(#gradient)" strokeDasharray={circ} strokeDashoffset={circ*((100-this.props.progress)/100)} strokeWidth={STROKE_WIDTH} strokeLinecap="round"></circle>
				</svg>
			</span>
		)
    }
}