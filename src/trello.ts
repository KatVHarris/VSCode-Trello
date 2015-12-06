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
			this._cardsIDs = new Array<string>();
		  	
			for(var i = 0; i < data.length; i++){
				 this._cards.push(data[i].name);
				 this._cardsIDs.push(data[i].id);
			}
			resolve(true);
		});
		
		});
	}
	
	public _setCurCardID(currentCardName: string){
		for (var i = 0; i < this._cards.length; i++){
			if(currentCardName == this._cards[i]){
				var cid = this._cardsIDs[i];
			}
		}
		this.currentCID = cid; 

	}
	
	public _moveCurrentCardToList(newListID: string){
		var putstring = "/1/cards/" + this.currentCID + "/" ;

		this._trello.put(putstring, { idList: newListID },  (err, data) => {
			console.log("currentID "+ this.currentCID + " new list ID "+ newListID);
			console.log(err);
			 if (err) throw err; 
			 console.log(data); 
		 });
	}
	
	public _closeCard(){
		var putstring = "/1/cards/" + this.currentCID + "/" ;

		this._trello.put(putstring, { closed: true },  (err, data) => {
			console.log(err);
			 if (err) throw err; 
			 console.log(data); 
		 });
	}

}