#!/bin/bash
NA='\033[0m'
CYAN='\033[1;36m'

echo -e "${CYAN}Installing required dependencies"
npm install

echo -e "${CYAN}Starting Foreman"
npm start