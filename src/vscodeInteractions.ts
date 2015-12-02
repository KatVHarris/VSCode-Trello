import * as vscode from 'vscode';

//This is for interacting with TrelloClient Object and VS UI



var _cards : Array<any>;

export var currentBID : string; 
export var currentLID : string; 
export var currentCID : string; 

var currentCard : string; 

export function ShowBoards(boards: Array<string>, boardsID: Array<string>) : Thenable<string>{
	return vscode.window.showQuickPick(boards).then(x => {
		console.log(x);		
		//go through name list and get correesponding selected ID
		for (var j = 0; j <boards.length; j++){
			if(this.boards[j] == x){
				currentBID = boardsID[j];
			}				 
		}
		return currentBID; 
	}, err => {});
}


export function ShowLists(lists: Array<string>, listsID: Array<string>): Thenable<string> {
	return vscode.window.showQuickPick(lists).then(x => {
		console.log(x);		
		//find ID for selected list
		for (var j = 0; j <lists.length; j++){
			if(this.lists[j] == x){
				currentLID = listsID[j];
				console.log(currentLID);
			}				 
		}
		return currentLID;
		
		//this._getAllCards(this.lID);
	}, err => {});
}

export function ShowCards(cards: Array<string>, cardID: Array<string>) {
	return vscode.window.showQuickPick(cards).then(x => {
		console.log(x);		
		//find ID for selected list
		for (var j = 0; j <cards.length; j++){
			if(this._lists[j] == x){
				this.lID = this._listsIDs[j];
				console.log(this.bID);
			}				 
		};
		
		this._getAllCards(this.lID);
	}, err => {});
	console.log("getting list is called.");
}