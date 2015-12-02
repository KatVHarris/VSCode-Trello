import * as vscode from 'vscode';

var Trello = require("node-trello");

export default class TrelloClient {
	
	private _trello : any;
	private _key : string;
	private _token : string;
	
	public _boards : Array<any>;
	public _boardsIDs : Array<any>;
	
	public bID : string; 

	
	constructor(key?: string, token?: string) {
		this._key = key;
		this._token = token;
		
		this._trello = new Trello(this._key, this._token);
	}
	
	public getMyBoards(){
		this._trello.get("/1/members/me/boards", function(err, data) {
  			if (err) throw err;
  			console.log(data);
			this._boards = new Array<string>();
			this._boardsIDs = new Array<string>();
		  	
			for(var i = 0; i < data.length; i++){
				 this._boards.push(data[i].name);
				 this._boardsIDs.push(data[i].id);
			}
			
			vscode.window.showQuickPick(this._boards).then((x) => {
				console.log(x);		
				//
				for(var j = 0; j <data.length; j++){
					if(this._boards[j] == x){
						//getBoardsLists(this._boardsIDs[j]);
						this.bID = this._boardsIDs[j];
						console.log(this.bID);
					}				 
				}
				//this.getAllList(this.bID);
			});
			
		});
	}
	
	public getAllLists(boardID:  string){
		this._trello.get("/1/members/me/boards", function(err, data) {
  			if (err) throw err;
  			console.log(data);

		});

		
		//vscode.window.showQuickPick();
	}
}

function getBoardsLists(boardID: string){
	this._trello.get("/1/members/me/boards", function(err, data) {
		if (err) throw err;
		console.log(data);
		JSON.parse(data);
	});
}