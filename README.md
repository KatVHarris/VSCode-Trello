[![Build Status](https://travis-ci.org/KatVHarris/VSCode-Trello.svg?branch=master)](https://travis-ci.org/KatVHarris/VSCode-Trello)

# VSCode-Trello
Extension for Trello and VSCode

### Commands
Trello: Login - Logs the user into their Trello account. (currently being worked on)

Trello: Get A Card - Allows Users to select a board from their boards, then a particular list from the board they selected, and then a specific Card to work on

Trello: Move Card to a New List - Moves the current card the user has to a new list in the Current Board 

### Login
##### Step 1: Login and Authorize
To make this Trello Client work you first need to get your Client Token and add it to the trello.ts file. 
Then you must authorize the extension on Trellos side. I am currently trying to automate this so it's easier for the user to get authorize their token. 

![](https://github.com/KatVHarris/VSCode-Trello/blob/master/img/TrelloCommandBox.png)

![](https://github.com/KatVHarris/VSCode-Trello/blob/master/img/TrelloLoginSite.png)

#### Step 2: Copy User Token and Paste into InputBox

![](https://github.com/KatVHarris/VSCode-Trello/blob/master/img/TrelloLoginSiteToken.png)

![](https://github.com/KatVHarris/VSCode-Trello/blob/master/img/TrelloPasteLogin.png)

Press 'Enter'

#### You can now use other normal commands. 