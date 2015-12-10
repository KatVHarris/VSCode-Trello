import * as vscode from 'vscode';

//This is for interacting with TrelloClient Object and VS UI



var _cards : Array<any>;

export var currentBID : string; 
export var currentLID : string; 
export var currentCID : string; 

var currentCard : string; 
var currentList : string;
var currentBoard : string; 
var statusBarItem : vscode.StatusBarItem;

export function ShowBoards(boards: Array<string>, boardsID: Array<string>) : Thenable<string>{
	return vscode.window.showQuickPick(boards).then(x => {
		console.log("ShowBoards: " + x);
		currentBoard = x;	
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
		currentList = x; 	
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
		console.log(currentCID);
		return x;
	}, err => {});

}

export function AddToBar(message?:string, boardname?:string , listname?: string, cardname?: string, iconname?: string): void{
	if(!statusBarItem){
		statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
	}
	console.log("printing current cardname "+ cardname);
	console.log("printing current list" + currentList);
	console.log("printing current board " + currentBoard);
	statusBarItem.text = (cardname) ? 
			iconname + " " + message + " " + currentBoard + " $(chevron-right)" + 
			currentList + " $(chevron-right)" + cardname: iconname + " " + message;
	statusBarItem.show();
	//createStatusBarItem(alignment?: StatusBarAlignment, priority?: number): StatusBarItem
}

export function AddStatusIcon(iconName: string){
	if(!statusBarItem){
		statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
	}
	
}

export function InsertUserToken(){
	return vscode.window.showInputBox("Please paste in your user token, then hit 'Enter'.").then(x => {
		if(!x){
			return vscode.window.showErrorMessage("need to paste your token in");
		}
		else{
			return x; 
		}
	}, err => {});
}

export function ShowError(errMessage: string){
	vscode.window.showErrorMessage(errMessage);
}

export function ShowMessage(infoMessage: string){
	vscode.window.showInformationMessage(infoMessage);
}
