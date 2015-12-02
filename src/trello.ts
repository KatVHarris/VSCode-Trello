'use strict;'
import * as vscode from 'vscode';

var Trello = require("node-trello");

export default class TrelloClient {
	
	private _trello : any;
	private _key : string;
	private _token : string;
	
	public _boards : Array<any>;
	public _boardsIDs : Array<any>;
	
	public _lists : Array<any>;
	public _listsIDs : Array<any>;
	
	private _cards : Array<any>;
	
	private bID : string; 
	private lID : string; 
	private cID : string; 
	
	private currentCard : string; 

	
	constructor(key?: string, token?: string) {
		this._key = key;
		this._token = token;
		
		this._trello = new Trello(this._key, this._token);
	}
	
	public getMyBoards(){
		this._trello.get("/1/members/me/boards", (err, data) => {
  			if (err) throw err;
			this._boards = new Array<string>();
			this._boardsIDs = new Array<string>();
		  	
			for(var i = 0; i < data.length; i++){
				 this._boards.push(data[i].name);
				 this._boardsIDs.push(data[i].id);
			}
			
			vscode.window.showQuickPick(this._boards).then(x => {
				console.log(x);		
				//
				for (var j = 0; j <data.length; j++){
					if(this._boards[j] == x){
						this.bID = this._boardsIDs[j];
					}				 
				};
				
				this._getAllLists(this.bID);
			}, err => {});
		});
	}
	
	private _getAllLists(boardID: string){
		this._trello.get("/1/boards/"+boardID + "/lists", (err, data) => {
			if (err) throw err;
			console.log(data);
			this._lists = new Array<string>();
			this._listsIDs = new Array<string>();
		  	
			for(var i = 0; i < data.length; i++){
				 this._lists.push(data[i].name);
				 this._listsIDs.push(data[i].id);
				 console.log(data[i].name);
				 console.log(data[i].id);
			}
			
			vscode.window.showQuickPick(this._lists).then(x => {
				console.log(x);		
				//find ID for selected list
				for (var j = 0; j <data.length; j++){
					if(this._lists[j] == x){
						this.lID = this._listsIDs[j];
						console.log(this.bID);
					}				 
				};
				
				this._getAllCards(this.lID);
			}, err => {});
			  	
		});
	}
	
	private _getAllCards(listID: string){
		this._trello.get("/1/lists/"+listID + "/cards", (err, data) => {
			if (err) throw err;
			console.log(data);
			this._cards = new Array<string>();
		  	
			for(var i = 0; i < data.length; i++){
				 this._cards.push(data[i].name);
			}
			
			vscode.window.showQuickPick(this._cards).then(x => {	
				this.currentCard = x; 
				//currentCard
				console.log(this.currentCard);	
			}, err => {});
			  	
		});
	}
}

