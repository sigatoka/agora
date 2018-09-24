import React from 'react';
import Lottie from '../lottie/Lottie';
import * as animationData from '../lottie/delete.json';

const defaultOptions = {
	loop: false,
	autoplay: false, 
	animationData: animationData,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
}

export default class FileListItemState extends React.Component {

    state = {
    	progress:0,
    	stopped:true,
    	paused:false
    }

    isReady() {
    	this.setState({ stopped:false });
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
                style={{color:"#8E8D8A",backgroundColor:"transparent",border:"1px solid rgba(142,141,138,0.1)",verticalAlign:"center",padding:"6px",borderRadius:"4px",cursor:"pointer"}}
                options={defaultOptions}
                height={24}
                width={24}
                isStopped={this.state.stopped}
                isPaused={this.state.paused}
                onReady={this.isReady.bind(this)}
                onStart={this.didStart.bind(this)}
                onEnd={this.didComplete.bind(this)}
                onClick={this.props.onClick.bind(this)}
            />
		)
    }
}