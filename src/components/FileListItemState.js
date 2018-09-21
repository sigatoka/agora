import React from 'react';

export default function FileListItemState({ progress, completed }) {
	
	let borderColor = "#727375";
	if (completed) borderColor = "#FFE4B1";

	const containerStyle = {
		flex:"none",
		width:((progress<=0)?"8px":"30px"),
		height:((progress<=0)?"8px":"30px"),
		margin:((progress<=0)?"16px":"0px"),
		display:"block",
		backgroundColor:((progress<=0)?borderColor:"transparent"),
		borderRadius:"50%",
		border:`${((progress<=0)?"0px":"4px")} solid ${borderColor}`,
		textAlign:"center",
		verticalAlign:"center"
	}

	return (
		<span style={containerStyle}>
			{(progress>0)?`${Math.floor(progress)}%`:''}
		</span>
	)
}