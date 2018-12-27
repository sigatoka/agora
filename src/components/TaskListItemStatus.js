import React from 'react';
import Lottie from '../lottie/Lottie';
import * as animationData from '../lottie/create.json';

export interface PropTypes {
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

export default class TaskListItemStatus extends React.Component<PropTypes, StateTypes> {

    state = {
    	progress:0,
    	stopped:true,
    	paused:false,
    	loop:false,
    	played:false,
    	range:[0,30]
    }

    isReady() {
    	setTimeout(() => {
    		this.setState({ stopped:false });
    	}, 500);
    }

    didStart(segment) {
    	//console.log("Started segment",segment)
    }

    didComplete(anim) {
    	//if (this.state.played) return;
    	//anim.playSegments([14,30]);
    	//this.setState({ played:true });
    }

    render() {

    	const { progress, completed } = this.state;

    	const defaultOptions = {
			loop: this.state.loop,
			autoplay: false,
			segments: this.props.range,
			animationData: animationData,
			segments:this.state.range,
			rendererSettings: {
				preserveAspectRatio: 'xMidYMid slice'
			}
		}

    	return (
			<Lottie
				options={defaultOptions}
				height={50}
				width={50}
				isStopped={this.state.stopped}
				isPaused={this.state.paused}
                onReady={this.isReady.bind(this)}
				onStart={this.didStart.bind(this)}
                onEnd={this.didComplete.bind(this)}
			/>
		)
    }
}