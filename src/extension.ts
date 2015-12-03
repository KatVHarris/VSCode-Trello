// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import TrelloClient from './trello';
import * as vsInterface from './vscodeInteractions';

var open = require('open');

var trelloClient : TrelloClient
var token, extensionKey


// TODO: Ensure that the usertoken is stored somewhere - and configured, so that the user
// doesn't have to do this all the time
const appKey = '03e153ce92addad232ddc24891e07c60';
const userToken = '26aeb9d035ad5c360ce55d7d9a56ce84420efff576d1105e4e641e2650ed6855';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "txc" is now active!'); 

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var disposable = vscode.commands.registerCommand('extension.sayHello', () => { //this is like function () {} //anonymos don't change function
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
		
	});
	
	
	context.subscriptions.push(disposable);

	var login = vscode.commands.registerCommand('extension.loginToTrello', () => loginTrelloTest());
	var getBoards = vscode.commands.registerCommand('extension.getAllBoards', () => getAllBoards());

	context.subscriptions.push(login);
	context.subscriptions.push(getBoards);
}

function loginTrello(){
	//need to authenticate user
	// Display a message box to the user
	//vscode.window.showInformationMessage('Trying To Login');
	let authUrl = 'https://trello.com/1/authorize?key=' + appKey + '&expiration=never&response_type=token&scope=read,write,account';
	open(authUrl);
	createClient();
}

function loginTrelloTest(){
	createClient();
}

function createClient() {
	trelloClient = trelloClient || new TrelloClient(appKey, userToken);
}

function getAllBoards() {
	//getBoards from TrelloAPI
	//UPdate the UI with vscodeInteractions
	//repeat
	
	// trelloClient.getMyBoards().then(() => {
	// 	return vsInterface.ShowBoards(trelloClient._boards, trelloClient._boardsIDs)
	// }).then(selectedBoard => {
	// 	return trelloClient.getBoardLists(selectedBoard);
	// }).then(() => {
	// 	return vsInterface.ShowLists(trelloClient._lists, trelloClient._listsIDs)
	// }).then(selectedList => {	
	// 	return trelloClient._getAllCards(selectedList);
	// }).then(() => {
	// 	return vsInterface.ShowCards(trelloClient._cards, trelloClient.cardsIDs)
	// }, err => {
	// 		
	// });
		
}

