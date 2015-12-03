var Trello = require("node-trello");

export default class TrelloClient {
	
	private _trello : any;
	private _key : string;
	private _token : string;
	
	public _boards : Array<any>;
	public _boardsIDs : Array<any>;
	
	public _lists : Array<any>;
	public _listsIDs : Array<any>;
	
	public _cards : Array<any>;
	public _cardsIDs : Array<any>;
	
	public currentBID : string; 
	public currentLID : string; 
	public currentCID : string; 
	
	public currentCard : string; 

	
	constructor(key?: string, token?: string) {
		this._key = key;
		this._token = token;
		
		this._trello = new Trello(this._key, this._token);
	}
	
	public testingT(): string{
		return "Hello!";
	}
	
	public getMyBoards() : Thenable<boolean> {
	return new Promise((resolve, reject) => {
		
		this._trello.get("/1/members/me/boards", (err, data) => {
  			if (err) reject(err);
			this._boards = new Array<string>();
			this._boardsIDs = new Array<string>();
		  	
			for(var i = 0; i < data.length; i++){
				 this._boards.push(data[i].name);
				 this._boardsIDs.push(data[i].id);
			}
					
			resolve(true);
		});


	});


	}
	
	public getBoardLists(boardID: string){
		return new Promise(( resolve, rejcet) =>{
			this._trello.get("/1/boards/"+boardID + "/lists", (err, data) => {
			if (err) throw err;
			console.log(data);
			this._lists = new Array<string>();
			this._listsIDs = new Array<string>();
			
			for(var i = 0; i < data.length; i++){
				this._lists.push(data[i].name);
				this._listsIDs.push(data[i].id);
			}
			resolve(true);			
			});
		});
	}
	// 
	public _getAllCards(listID: string){
		return new Promise((resolve, reject) => {
			this._trello.get("/1/lists/"+listID + "/cards", (err, data) => {
			if (err) throw err;
			console.log(data);
			this._cards = new Array<string>();
		  	
			for(var i = 0; i < data.length; i++){
				 this._cards.push(data[i].name);
			}
			resolve(true);
		});
		
		});
	}
	
	public getCurrentCard(){
		
	}

}