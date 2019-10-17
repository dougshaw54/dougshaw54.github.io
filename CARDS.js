// SOLITAIRE POKER V-2.0
// By: Brian Gosselin of http://scriptasylum.com
// Note: This script does NOT work in Netscape 4.x.

var beginMoney=200; // BEGINNING AMOUNT OF MONEY.
var cardWidth=40;   // CARD WIDTH IN PIXELS, THE CARD HEIGHT WILL BE 2X THIS VALUE.
var cardBGC="#0066AE";  // BACKGROUND COLOR OF CARD WHEN "FLIPPED" TO HIDE THE CARD.

// USE THE ARRAY BELOW TO CHANGE THE BET MULTIPIERS IF DESIRED.
var multipliers=[1,2,3,7,10,15,20,30,60];

// THE POSITIONS OF THE NUMBERS ABOVE CORRESPOND TO THE POSITIONS OF THE WIN TYPE IN THE LIST BELOW.
// [ ONE PAIR , TWO PAIR , THREE PAIR , STRAIGHT , FLUSH , FULL HOUSE , FOUR OF A KIND , STRAIGHT FLUSH , ROYAL STRIGHT FLUSH ]


//********** DO NOT EDIT BEYOND THIS POINT **********\\

var w3c=(document.getElementById)?true:false;
var ns4=(document.layers)?true:false;
var ie4=(document.all && !w3c)?true:false;
var ie5=(document.all && w3c)?true:false;
var ns6=(w3c && navigator.appName.indexOf("Netscape")>=0)?true:false;
var suits=[0,'&hearts;','&clubs;','&diams;','&spades;'];
var nums=['A','2','3','4','5','6','7','8','9','10','J','Q','K','A'];
//var cNum=[0,0,0,0,0,0];
//var cSuit=[0,0,0,0,0,0];
var cNum=new Array();
var hNum=new Array();   //current hand card number
var cSuit=new Array();
var hSuit=new Array();    //current hand card suit
var deck=new Array();
var replaceBusy=true;
var buttonBusy=false;
var isBegin=true;
var toRepl=[0,1,1,1,1,1];
var bet=Math.floor(beginMoney/4);
var pot, stats, button, cards, hcard, lsuit, tsuit;
var money=beginMoney;
var dlr=[0];
var tmpn;
var cards=new Array();
var hand=new Array(); // current hand being played
var arrows=new Array();
var textStyle="font-family:verdana; font-size:8pt; color:black";

// BUILD AND SHUFFLE THE DECK.
function buildShuffle(){
for(i=1;i<5;i++){
cards[i].innerHTML="";
cards[i].style.backgroundColor=cardBGC;
arrows[i].innerHTML="";
arrows[i].on=false;
hSuit[i]=0;hNum[i]=0;//clear
}
isBegin=true;
var x,y,xd,yd;
var A=new Array();
dlr++;if(dlr>4)dlr=1;
for(s=1;s<=4;s++){
for(c=1;c<=13;c++)A[s*13-13+c]=[s,c];
}
for(i=0;i<=300;i++){
x=Math.floor(Math.random()*52+1);
xd=A[x];
y=Math.floor(Math.random()*52+1);
yd=A[y];
A[y]=xd;  //swap 2 random cards over
A[x]=yd;
}
deck=A;  // alert(deck[51][0]);alert(deck[51][1]);
replaceBusy=true;
buttonBusy=true;
replaceCards();
}

// TOGGLES THE CHECKBOX UNDER THE CARD WHEN CLICKED.
function changeCard(n){
if(!replaceBusy){
arrows[n].on=!arrows[n].on;
arrows[n].innerHTML=(arrows[n].on)?"&Delta;":"&nbsp;";
cards[n].innerHTML="";
cards[n].style.backgroundColor=cardBGC;
sts=cSuit[n];
cards[5].style.backgroundColor="white";
cards[5].innerHTML='<span style="font-family:arial; font-size:'+(cardWidth-10)+'px; font-weight:bold; color:'+((sts==1||sts==2)?'black':'red')+'">'+nums[cNum[n]]+'</span><br><span style="font-family:arial; font-size:'+(cardWidth-2)+'px; color:'+((sts==1||sts==2)?'black':'red')+'">'+suits[cSuit[n]]+'</span>';

}}

// REPLACES THE CARDS CHECKED.
function replaceCards(){
for(i=1;i<5;i++){
if(arrows[i].on || isBegin)toRepl[i]=1;
 toRepl[i]=1;
}
//revert(1);
}
 // PLAYER CLICKED TO VIEW OTHER HAND
function changeView(p){
if (p>4)replaceBusy=true; else replaceBusy=false;
for(i=1;i<5;i++){
sts= cSuit[p];
cards[i].style.backgroundColor="white";
cards[i].innerHTML='<span style="font-family:arial; font-size:30px; font-weight:bold; color:'+((sts==1||sts==2)?'black':'red')+'">'+nums[cNum[p]]+'</span><br><span style="font-family:arial; font-size:30px; color:'+((sts==1||sts==2)?'black':'red')+'">'+suits[cSuit[p]]+'</span>';
p++;
}
}
// RETRIEVES AND ERROR CHECKS THE BET INPUT PROMPT.
function getBet(bs){
bet=parseInt(prompt(bs+'Enter Bet amount in dollars. You currently have $'+money+'.',Math.min(money,bet)));
if(isNaN(bet)){
bet=1;
getBet('Incorrect value or "Cancel" not allowed; use numbers only.\n');
}
else if(bet>money)getBet('Your bet of $'+bet+' was too high.\n');
else if(bet<1)getBet('Your bet of $'+bet+' was too low. The bet must be at least $1.\n');
else updatePot();
}

function updatePot(n){
pot.innerHTML='Wallet:<br><b>$'+money+'</b><br>Curr Bet:<br><b>$'+bet+'</b>';
}

// REVERTS THE CARDS TO "FACE DOWN" BEFORE PUTTING NEW ONES UP.
function revert(i){
if(i<5){
if(toRepl[i]==1){
cards[i].innerHTML="";
cards[i].style.backgroundColor=cardBGC;
setTimeout('revert('+(i+1)+')',100);
}else revert(i+1);
}else{
if(isBegin){
//money=money-bet;
Mancom.innerHTML='Click the card(s) you do not want<br>and click "Replace".';
setTimeout('subReplace(1)',200);
//getBet('');
}
else setTimeout('subReplace(1)',200);
}}

//SUB-FUNCTION TO REPLACE THE CARDS TO ACHIEVE THE "FLIPPING" DELAY.
function subReplace(i){
if(i>16){
if(isBegin){
isBegin=false;
buttonBusy=false;
replaceBusy=false;
}else testCards();
}else{
toRepl[i]=1;// dummy line to allow fill of 16 cards adjust later
if(toRepl[i]==1){
cSuit[i]=deck[deck.length-1][0];
cNum[i]=deck[deck.length-1][1];
var sts=deck[deck.length-1][0];
//cards[i].innerHTML='<span style="font-family:arial; font-size:'+(cardWidth-10)+'px; font-weight:bold; color:'+((sts==1||sts==2)?'black':'red')+'">'+nums[deck[deck.length-1][1]]+'</span><br><span style="font-family:arial; font-size:'+(cardWidth-2)+'px; color:'+((sts==1||sts==2)?'black':'red')+'">'+suits[sts]+'</span>';
if(i<5){
cards[i].style.backgroundColor="white";
cards[i].innerHTML='<span style="font-family:arial; font-size:30px; font-weight:bold; color:'+((sts==1||sts==3)?'red':'black')+'">'+nums[cNum[i]]+'</span><br><span style="font-family:arial; font-size:30px; color:'+((sts==1||sts==3)?'red':'black')+'">'+suits[cSuit[i]]+'</span>';
}
 if((i>8)&(i<13)){
cards[i].style.backgroundColor="pink";
cards[i].innerHTML='<span style="font-family:arial;font-size:30px; font-weight:bold;">'+cSuit[i]+'</span>';
}
if(i>12){
cards[i].style.backgroundColor="white";sts=i-12;
cards[i].innerHTML='<span style="font-family:arial; font-size:30px; color:'+((sts==1||sts==3)?'red':'black')+'">'+suits[i-12]+'</span>';
}
deck.length=deck.length-1;
//arrows[i].innerHTML="";
//arrows[i].on=false;
toRepl[i]=0;
setTimeout('subReplace('+(i+1)+')',200);
}else subReplace(i+1);
}}

// CHANGES THE BUTTON LOOK AND ACTION WHEN CLICKED.
function testStatus(){
if(!buttonBusy){
buttonBusy=true;
if(isBegin){
replaceBusy=true;
money=money-bet;
updatePot();
//stats.innerHTML='';
//button.innerHTML="Replace Cards";
buildShuffle();
}else{
replaceBusy=true;
//stats.innerHTML='';
Mancom.innerHTML="Deal";
replaceCards();
}}}

// CALLS THE FUNCTION TO TEST THE CARDS AND UPDATES MONEY, STATUS, ETC.
function testCards(){
isBegin=true;
buttonBusy=true;
replaceBusy=true;
var txt=testCombos();
updatePot();
if(money>0){
if(bet>money)getBet('You do not have enough money to cover your bet of $'+bet+'.\n');
button.innerHTML="Deal";
stats.innerHTML='You got '+txt+'.<br>Click "Deal" to start.';
}else{
isBegin=true;
money=beginMoney;
bet=Math.floor(money/4);
button.innerHTML="New Game";
stats.innerHTML='You got Nothing.<br>No money left to bet.<br><br> <b>** Game Over **</b>';
}
buttonBusy=false;
}

// GET ELEMENT REFERENCES
function getEl(s){
return (ie4)?document.all[s]:document.getElementById(s);
}

// TESTS THE FOR "FLUSH" CONDITION ON A SORTED DECK.
function testflush(){
return ( (cSuit[1]==cSuit[2])&&(cSuit[1]==cSuit[3])&&(cSuit[1]==cSuit[4])&&(cSuit[1]==cSuit[5]) );
}

// TESTS FOR "ROYAL STRAIGHT" CONDITION ON A SORTED DECK (USED WITH THE testflush() FUNCTION).
function testface(){
return ( ((cNum[1]>=10)||(cNum[1]==1))&&((cNum[2]>=10)||(cNum[2]==1))&&((cNum[3]>=10)||(cNum[3]==1))&&((cNum[4]>=10)||(cNum[4]==1))&&((cNum[5]>=10)||(cNum[5]==1)) )
}

// TESTS FOR "STRAIGHT" CONDITION ON A SORTED DECK.
function teststraight(){
var x=( (tmpn[1]+4==tmpn[5]) && (tmpn[2]+3==tmpn[5]) && (tmpn[3]+2==tmpn[5]) && (tmpn[4]+1==tmpn[5]) );
for(i=1;i<=5;i++){
if(tmpn[i]==1)tmpn[i]=14;
}
tmpn=new Array();
tmpn[0]=0;
for(i=1;i<=5;i++)tmpn[i]=cNum[i];
tmpn.sort(sortnumbs);
var y=( (tmpn[1]+4==tmpn[5]) && (tmpn[2]+3==tmpn[5]) && (tmpn[3]+2==tmpn[5]) && (tmpn[4]+1==tmpn[5]) );
return x||y;
}

// SUB-FUNCTION FOR THE "SORT()" METHOD
function sortnumbs(a,b){
return a-b;
}

// FUNCTION TO TEST ALL CARD POSSIBILITIES
function testCombos(){
tmpn=new Array();
tmpn[0]=0;
for(i=1;i<=5;i++)tmpn[i]=cNum[i];
tmpn.sort(sortnumbs);
var wtype='Nothing';
var wamount=0;
if( ((tmpn[1]==tmpn[2])&&(tmpn[1]>=10))||((tmpn[2]==tmpn[3])&&(tmpn[2]>=10))||((tmpn[3]==tmpn[4])&&(tmpn[3]>=10))||((tmpn[4]==tmpn[5])&&(tmpn[4]>=10)) ){
wtype='a Pair';
wamount=bet*multipliers[0];
}
if( ((tmpn[1]==tmpn[2])&&(tmpn[3]==tmpn[4]))||((tmpn[1]==tmpn[2])&&(tmpn[4]==tmpn[5]))||((tmpn[2]==tmpn[3])&&(tmpn[4]==tmpn[5])) ){
wtype='Two Pair';
wamount=bet*multipliers[1];
}
if( ((tmpn[1]==tmpn[2])&&(tmpn[1]==tmpn[3]))||((tmpn[2]==tmpn[3])&&(tmpn[2]==tmpn[4]))||((tmpn[3]==tmpn[4])&&(tmpn[3]==tmpn[5])) ){
wtype='3 of a Kind';
wamount=bet*multipliers[2];
}
if( teststraight() ){
wtype='a Straight';
wamount=bet*multipliers[3];
}
if( testflush() ){
wtype='a Flush';
wamount=bet*multipliers[4];
}
if( ((tmpn[1]==tmpn[2])&&(tmpn[3]==tmpn[4])&&(tmpn[3]==tmpn[5])&&(tmpn[1]!=tmpn[3]))||((tmpn[4]==tmpn[5])&&(tmpn[1]==tmpn[2])&&(tmpn[1]==tmpn[3])&&(tmpn[4]!=tmpn[1])) ){
wtype='a Full House';
wamount=bet*multipliers[5];
}
if( ((tmpn[1]==tmpn[2])&&(tmpn[1]==tmpn[3])&&(tmpn[1]==tmpn[4]))||((tmpn[2]==tmpn[3])&&(tmpn[2]==tmpn[4])&&(tmpn[2]==tmpn[5])) ){
wtype='4 of a Kind';
wamount=bet*multipliers[6];
}
// STRAIGHT FLUSH
if(testflush() && teststraight()){
wtype='a Straight Flush';
wamount=bet*multipliers[7];
}
// ROYAL STRAIGHT FLUSH
if(teststraight() && testface() && testflush()){
wtype='a Royal Straight Flush';
wamount=bet*multipliers[8];
}
money+=wamount;
return wtype;
}

// WRITES OUT THE GAME HTML
function writePoker(){
var t;
if(ns4)t='This Poker game script does not work in Netscape 4.x browsers.';
else{
t='<table cellpadding="3" cellspacing="0" border="1" rules="none" bgcolor="white"><tr valign="top" align="left"><td>';
t+='<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr height="55" valign="top">';
t+='<td colspan=5 align="left">';
t+='<div id="stats" style="font-family:verdana; font-size:8pt; color:black">Please wait while the<br>page loads...</div>';
t+='</td><td colspan=2 align="left">';
t+='<div id="pot" style="font-family:verdana; font-size:8pt; color:black; height:45px;">Wallet:<br><b>$'+money+'</b><br>Curr Bet:<br><b>$'+bet+'</b></div>';
t+='</td>';
t+='</tr><tr align="center" height="'+(cardWidth*2+30)+'">';
t+='<td width="25">&nbsp;</td>';
for(i=1;i<6;i++)t+='<td width="'+(cardWidth+10)+'"><div id="c'+i+'" style="border-style:solid; border-width:black; border-width:1px; background-color:'+cardBGC+'; cursor:default; width:'+cardWidth+'px; height:'+(cardWidth*2)+'px; text-align:center;" onmousedown="changeCard('+i+')"></div></td>';
t+='<td width="25">&nbsp;</td>';
t+='</tr><tr align="center">';
t+='<td>&nbsp;</td>';
for(i=1;i<6;i++)t+='<td><div id="b'+i+'" style="width:15px; height:25px; font-family:arial; font-size:18px; font-weight:bold; color:blue;"></div></td>';
t+='<td>&nbsp;</td>';
t+='</tr><tr align="center" height="40">';
t+='<td colspan="4"><div id="button" style="width:150px; padding:3px; border-color:gray; border-style:outset; border-width:3px; background-color:lightgrey; color:black; font-family:verdana; font-size:9pt; font-weight:bold; color:black; cursor:default" onmousedown="testStatus()">Deal</div></td>';
t+='<td colspan="3"><div style="width:90px; padding:3px; border-color:gray; border-style:outset; border-width:3px; background-color:lightgrey; color:black; font-family:verdana; font-size:9pt; font-weight:bold; color:black; cursor:default" onmousedown="if(isBegin&&replaceBusy&&!buttonBusy)getBet(\'\');">Change Bet</div></td>';
t+='</tr></table></td><td>';
t+='<table width="200" cellpadding="5" cellspacing="0" border="0">';
t+='<tr><td align="center" colspan="2"><font size=2><b>Bet Multipliers</b></font></td></tr>';
t+='<tr><td align="left"><font size=2>Royal Straight Flush</font></td><td align="right"><font size=2>x '+multipliers[8]+'</font></td></tr>';
t+='<tr><td align="left"><font size=2>Straight Flush</font></td><td align="right"><font size=2>x '+multipliers[7]+'</font></td></tr>';
t+='<tr><td align="left"><font size=2>Four of a Kind</font></td><td align="right"><font size=2>x '+multipliers[6]+'</font></td></tr>';
t+='<tr><td align="left"><font size=2>Full House</font></td><td align="right"><font size=2>x '+multipliers[5]+'</font></td></tr>';
t+='<tr><td align="left"><font size=2>Flush</font></td><td align="right"><font size=2>x '+multipliers[4]+'</font></td></tr>';
t+='<tr><td align="left"><font size=2>Straight</font></td><td align="right"><font size=2>x '+multipliers[3]+'</font></td></tr>';
t+='<tr><td align="left"><font size=2>Three of a Kind</font></td><td align="right"><font size=2>x '+multipliers[2]+'</font></td></tr>';
t+='<tr><td align="left"><font size=2>Two Pair</font></td><td align="right"><font size=2>x '+multipliers[1]+'</font></td></tr>';
t+='<tr><td align="left"><font size=2>One Pair (J or better)</font></td><td align="right"><font size=2>x '+multipliers[0]+'</font></td></tr>';
t+='</table>';
t+='</td></tr></table>';
}
document.write(t);
}
//writePoker(); THIS DRAWS THE ORIGINAL POKER GAME

// INITIALIZES ON GAMELOAD
window.onload=function(){
if(!ns4){
//pot=getEl('pot');
//stats=getEl('stats');
//button=getEl('button');
for(i=1;i<17;i++)cards[i]=getEl('c'+i);

for(i=1;i<5;i++){
arrows[i]=getEl('b'+i);
arrows[i].on=false;
}
buildShuffle();
subReplace(1);
Mancom.innerHTML='Click "Deal" to start.';
}}
