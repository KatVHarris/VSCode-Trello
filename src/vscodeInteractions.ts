import * as vscode from 'vscode';

//This is for interacting with TrelloClient Object and VS UI



var _cards : Array<any>;

export var currentBID : string; 
export var currentLID : string; 
export var currentCID : string; 

var currentCard : string; 

var statusBarItem : vscode.StatusBarItem;

export function ShowBoards(boards: Array<string>, boardsID: Array<string>) : Thenable<string>{
	return vscode.window.showQuickPick(boards).then(x => {
		console.log("ShowBoards: " + x);	
		//go through name list and get correesponding selected ID
		for (var j = 0; j <boards.length; j++){
			if(boards[j] == x){
				currentBID = boardsID[j];
			}				 
		}
		console.log("ShowBoards - current: " + currentBID);
		return currentBID; 
	}, err => console.log(err));
}


export function ShowLists(lists: Array<string>, listsID: Array<string>): Thenable<string> {
	return vscode.window.showQuickPick(lists).then(x => {
		console.log(x);		
		//find ID for selected list
		for (var j = 0; j <lists.length; j++){
			if(lists[j] == x){
				currentLID = listsID[j];
				console.log(currentLID);
			}				 
		}
		return currentLID;
		
		//this._getAllCards(this.lID);
	}, err => {});
}

export function ShowCards(cards: Array<string>, cardsID: Array<string>) {
	return vscode.window.showQuickPick(cards).then(x => {
		console.log("console display:" + x);	
		currentCard = x;	
		//find ID for selected list
		for (var j = 0; j <cards.length; j++){
			if(cards[j] == x){
				currentCID = cardsID[j];
			}				 
		}
		
		return currentCard;
	}, err => {});

}

export function AddCardToBar(cardname: string): void{
	if(!statusBarItem){
		statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
	}
	statusBarItem.text = (cardname) ? '-- '+ cardname + ' --': '';
	statusBarItem.show();
	//createStatusBarItem(alignment?: StatusBarAlignment, priority?: number): StatusBarItem
}