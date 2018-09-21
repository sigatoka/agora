import React from 'react';

export default function FileListItemState({ progress, completed }) {

	let borderColor = "#727375";
	if (completed) borderColor = "#FFE4B1";

	const containerStyle = {
		flex:"none",
		width:((completed)?"4px":"40px"),
		height:((completed)?"4px":"40px"),
		margin:((completed)?"14px":"0px"),
		display:"block",
		backgroundColor:"transparent",
		borderRadius:"50%",
		border:`4px solid ${borderColor}`,
		textAlign:"center",
		verticalAlign:"center"
	}

	return (
		<span style={containerStyle}>
			{(progress>0)?`${Math.floor(progress)}%`:''}
		</span>
	)
}