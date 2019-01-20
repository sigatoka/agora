#!/bin/bash
NA='\033[0m'
CYAN='\033[1;36m'

echo -e "${CYAN}Installing required dependencies"
npm install

echo -e "${CYAN}Building source files"
npm run build

echo -e "${CYAN}Compiling distrbution"
npm run dist