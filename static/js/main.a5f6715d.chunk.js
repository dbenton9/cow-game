(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,a){e.exports=a(28)},26:function(e,t,a){},28:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(15),c=a.n(r),u=a(11),o=a(0);var m=function(){return console.log("am i rendering"),l.a.createElement("div",null,l.a.createElement("h1",null,"Welcome to the Home Page"))},i=function(){return l.a.createElement("div",null,l.a.createElement("h1",null,"404 - Not Found!"))},s=a(6),E=a(7),d=a(9),v=a(5),b=a(8);function p(e){return l.a.createElement("div",null,l.a.createElement("h4",null,e.player.name," "),l.a.createElement("button",{className:"decrement",onClick:function(){return e.onClick(-1)}},"-1"),l.a.createElement("div",{className:"score"},e.player.score+e.player.immortalScore," Cows"),l.a.createElement("button",{className:"increment",onClick:function(){return e.onClick(1)}},"+1"),l.a.createElement("button",{className:"increment",onClick:function(){return e.onClick("immortal")}},"Immortal Cows (",e.player.immortalScore,")"),l.a.createElement("button",{className:"graveyard",onClick:function(){return e.onClick("graveyard")}},"Graveyard"))}var h=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(d.a)(this,Object(v.a)(t).call(this,e))).state={players:[{name:"Berkley",score:0,immortalScore:0},{name:"Shelby",score:0,immortalScore:0}]},a}return Object(b.a)(t,e),Object(E.a)(t,[{key:"componentDidMount",value:function(){var e=window.localStorage.getItem("PLAYERS");null!=JSON.parse(e)&&this.setState({players:JSON.parse(e)})}},{key:"scoreChange",value:function(e,t){var a=this.state.players[t];Number.isInteger(e)?a.score=a.score+e:"immortal"==e?a.immortalScore+=1:"graveyard"==e&&(a.score=Math.ceil(.5*a.score)),this.state.players.splice(t,1,a),this.setState({players:this.state.players}),window.localStorage.setItem("PLAYERS",JSON.stringify(this.state.players))}},{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"handleSubmit",value:function(e){alert("A name was submitted: "+this.state.value),e.preventDefault()}},{key:"render",value:function(){var e=this,t=this.state.players.map(function(t,a){return l.a.createElement("li",{key:a},l.a.createElement(p,{player:t,onClick:function(t){return e.scoreChange(t,a)}}))});return l.a.createElement("div",null,l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement("label",null," Add Player "),l.a.createElement("input",{type:"text",value:this.state.value,onChange:this.handleChange}),l.a.createElement("input",{type:"submit",value:"submit"})),l.a.createElement("ul",null,t))}}]),t}(l.a.Component),y=a(4),f=a(3),g=function(e){var t=e.basePlayers,a=e.onRemove,r=Object(n.useState)(t),c=Object(f.a)(r,2),u=c[0],o=c[1],m=Object(n.useState)(0),i=Object(f.a)(m,2),s=i[0],E=i[1],d=Object(n.useState)(0),v=Object(f.a)(d,2),b=v[0],p=v[1],h=Object(n.useState)(0),y=Object(f.a)(h,2),g=y[0],C=y[1],S=Object(n.useState)(0),w=Object(f.a)(S,2),O=w[0],k=w[1];Object(n.useEffect)(function(){k(s+b+g)},[s,b,g]);var j=function(e,t){var a=parseInt(t.target.value);switch(e){case 1:E(a);break;case 2:p(a);break;case 3:C(a)}};return l.a.createElement("tr",{align:"center"},l.a.createElement("td",null,l.a.createElement("input",{type:"text",value:u,onChange:function(e){o(e.target.value)}})),l.a.createElement("td",null,l.a.createElement("input",{type:"number",value:s,onChange:function(e){return j(1,e)}})),l.a.createElement("td",null,l.a.createElement("input",{type:"number",value:b,onChange:function(e){return j(2,e)}})),l.a.createElement("td",null,l.a.createElement("input",{type:"number",value:g,onChange:function(e){return j(3,e)}})),l.a.createElement("td",null,O),l.a.createElement("td",null,l.a.createElement("button",{onClick:a},"Remove")))},C=function(){var e=Object(n.useState)(["Player 1","Player 2"]),t=Object(f.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(""),u=Object(f.a)(c,2),o=u[0],m=u[1];return l.a.createElement("div",null,l.a.createElement("h3",null,"Score Board"),l.a.createElement("table",null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("td",null,"Name"),l.a.createElement("td",null,"Round 1"),l.a.createElement("td",null,"Round 2"),l.a.createElement("td",null,"Round 3"),l.a.createElement("td",null,"Score"))),l.a.createElement("tbody",null,a.map(function(e,t){return l.a.createElement(g,{key:t,basePlayers:e,onRemove:function(){return function(e){var t=a[e];if(window.confirm("Are you sure you want to remove ".concat(t,"?"))){var n=Object(y.a)(a);n.splice(e,1),r(n)}}(t)}})}),l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("input",{type:"text",placeholder:"New Player",value:o,onChange:function(e){return m(e.target.value)}})),l.a.createElement("td",{colSpan:"5"},l.a.createElement("button",{onClick:function(){""!==o.trim()&&(r([].concat(Object(y.a)(a),[o])),m(""))}},"Add Player"))))))},S=function(){return l.a.createElement("div",null,l.a.createElement("h1",null,"Five Crowns"),l.a.createElement(C,null))};a(26);c.a.createRoot(document.getElementById("root")).render(l.a.createElement(u.a,null,l.a.createElement("nav",null,l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(u.b,{to:"/"},"Home")),l.a.createElement("li",null,l.a.createElement(u.b,{to:"/NotFoundPage"},"Not Found")),l.a.createElement("li",null,l.a.createElement(u.b,{to:"/CowPage"},"Cow Page")),l.a.createElement("li",null,l.a.createElement(u.b,{to:"/FiveCrowns"},"Five Crowns")))),l.a.createElement(o.c,null,l.a.createElement(o.a,{path:"/",element:l.a.createElement(m,null)}),l.a.createElement(o.a,{path:"/NotFoundPage",element:l.a.createElement(i,null)}),l.a.createElement(o.a,{path:"/CowPage",element:l.a.createElement(h,null)}),l.a.createElement(o.a,{path:"/FiveCrowns",element:l.a.createElement(S,null)}))))}},[[17,2,1]]]);
//# sourceMappingURL=main.a5f6715d.chunk.js.map