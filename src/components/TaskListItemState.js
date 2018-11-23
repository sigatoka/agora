import React from 'react';
import Lottie from '../lottie/Lottie';
import * as animationData from '../lottie/data.json';

const defaultOptions = {
	loop: false,
	autoplay: false, 
	animationData: animationData,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
}

export default class TaskListItemState extends React.Component {

    state = {
    	progress:0,
    	stopped:true,
    	paused:false
    }

    isReady() {
    	setTimeout(() => {
    		this.setState({ stopped:false });
    	}, 500);
    }

    didStart(segment) {
    	//console.log("Started segment",segment)
    }

    didComplete() {
    	//console.log("Complete");
    }

    render() {
    	const { progress, completed } = this.state;

    	return (
			<Lottie
				options={defaultOptions}
				height={40}
				width={40}
				isStopped={this.state.stopped}
				isPaused={this.state.paused}
                onReady={this.isReady.bind(this)}
				onStart={this.didStart.bind(this)}
                onEnd={this.didComplete.bind(this)}
			/>
		)
    }
}