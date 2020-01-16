!function(e){function t(t){for(var a,i,o=t[0],l=t[1],c=t[2],u=0,m=[];u<o.length;u++)i=o[u],r[i]&&m.push(r[i][0]),r[i]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(d&&d(t);m.length;)m.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],a=!0,o=1;o<n.length;o++){var l=n[o];0!==r[l]&&(a=!1)}a&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},r={0:0},s=[];function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var d=l;s.push([454,1]),n()}({307:function(e,t,n){var a={"./af":103,"./af.js":103,"./ar":104,"./ar-dz":105,"./ar-dz.js":105,"./ar-kw":106,"./ar-kw.js":106,"./ar-ly":107,"./ar-ly.js":107,"./ar-ma":108,"./ar-ma.js":108,"./ar-sa":109,"./ar-sa.js":109,"./ar-tn":110,"./ar-tn.js":110,"./ar.js":104,"./az":111,"./az.js":111,"./be":112,"./be.js":112,"./bg":113,"./bg.js":113,"./bm":114,"./bm.js":114,"./bn":115,"./bn.js":115,"./bo":116,"./bo.js":116,"./br":117,"./br.js":117,"./bs":118,"./bs.js":118,"./ca":119,"./ca.js":119,"./cs":120,"./cs.js":120,"./cv":121,"./cv.js":121,"./cy":122,"./cy.js":122,"./da":123,"./da.js":123,"./de":124,"./de-at":125,"./de-at.js":125,"./de-ch":126,"./de-ch.js":126,"./de.js":124,"./dv":127,"./dv.js":127,"./el":128,"./el.js":128,"./en-SG":129,"./en-SG.js":129,"./en-au":130,"./en-au.js":130,"./en-ca":131,"./en-ca.js":131,"./en-gb":132,"./en-gb.js":132,"./en-ie":133,"./en-ie.js":133,"./en-il":134,"./en-il.js":134,"./en-nz":135,"./en-nz.js":135,"./eo":136,"./eo.js":136,"./es":137,"./es-do":138,"./es-do.js":138,"./es-us":139,"./es-us.js":139,"./es.js":137,"./et":140,"./et.js":140,"./eu":141,"./eu.js":141,"./fa":142,"./fa.js":142,"./fi":143,"./fi.js":143,"./fo":144,"./fo.js":144,"./fr":145,"./fr-ca":146,"./fr-ca.js":146,"./fr-ch":147,"./fr-ch.js":147,"./fr.js":145,"./fy":148,"./fy.js":148,"./ga":149,"./ga.js":149,"./gd":150,"./gd.js":150,"./gl":151,"./gl.js":151,"./gom-latn":152,"./gom-latn.js":152,"./gu":153,"./gu.js":153,"./he":154,"./he.js":154,"./hi":155,"./hi.js":155,"./hr":156,"./hr.js":156,"./hu":157,"./hu.js":157,"./hy-am":158,"./hy-am.js":158,"./id":159,"./id.js":159,"./is":160,"./is.js":160,"./it":161,"./it-ch":162,"./it-ch.js":162,"./it.js":161,"./ja":163,"./ja.js":163,"./jv":164,"./jv.js":164,"./ka":165,"./ka.js":165,"./kk":166,"./kk.js":166,"./km":167,"./km.js":167,"./kn":168,"./kn.js":168,"./ko":169,"./ko.js":169,"./ku":170,"./ku.js":170,"./ky":171,"./ky.js":171,"./lb":172,"./lb.js":172,"./lo":173,"./lo.js":173,"./lt":174,"./lt.js":174,"./lv":175,"./lv.js":175,"./me":176,"./me.js":176,"./mi":177,"./mi.js":177,"./mk":178,"./mk.js":178,"./ml":179,"./ml.js":179,"./mn":180,"./mn.js":180,"./mr":181,"./mr.js":181,"./ms":182,"./ms-my":183,"./ms-my.js":183,"./ms.js":182,"./mt":184,"./mt.js":184,"./my":185,"./my.js":185,"./nb":186,"./nb.js":186,"./ne":187,"./ne.js":187,"./nl":188,"./nl-be":189,"./nl-be.js":189,"./nl.js":188,"./nn":190,"./nn.js":190,"./pa-in":191,"./pa-in.js":191,"./pl":192,"./pl.js":192,"./pt":193,"./pt-br":194,"./pt-br.js":194,"./pt.js":193,"./ro":195,"./ro.js":195,"./ru":196,"./ru.js":196,"./sd":197,"./sd.js":197,"./se":198,"./se.js":198,"./si":199,"./si.js":199,"./sk":200,"./sk.js":200,"./sl":201,"./sl.js":201,"./sq":202,"./sq.js":202,"./sr":203,"./sr-cyrl":204,"./sr-cyrl.js":204,"./sr.js":203,"./ss":205,"./ss.js":205,"./sv":206,"./sv.js":206,"./sw":207,"./sw.js":207,"./ta":208,"./ta.js":208,"./te":209,"./te.js":209,"./tet":210,"./tet.js":210,"./tg":211,"./tg.js":211,"./th":212,"./th.js":212,"./tl-ph":213,"./tl-ph.js":213,"./tlh":214,"./tlh.js":214,"./tr":215,"./tr.js":215,"./tzl":216,"./tzl.js":216,"./tzm":217,"./tzm-latn":218,"./tzm-latn.js":218,"./tzm.js":217,"./ug-cn":219,"./ug-cn.js":219,"./uk":220,"./uk.js":220,"./ur":221,"./ur.js":221,"./uz":222,"./uz-latn":223,"./uz-latn.js":223,"./uz.js":222,"./vi":224,"./vi.js":224,"./x-pseudo":225,"./x-pseudo.js":225,"./yo":226,"./yo.js":226,"./zh-cn":227,"./zh-cn.js":227,"./zh-hk":228,"./zh-hk.js":228,"./zh-tw":229,"./zh-tw.js":229};function r(e){var t=s(e);return n(t)}function s(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=s,e.exports=r,r.id=307},454:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(85),i=n.n(s),o=n(12),l=n(25),c=n(8),d=n.n(c),u=n(2),m=n(4),p=n.n(m),g=n(1),f=n.n(g);function h(e){const t=e=>{const t=e.split(", ");return[t[1],t[0]].join(" ")},n=e.eventsArray.filter(e=>"cancelled"!==e.match_status);return r.a.createElement(w,{onClick:()=>e.history.push(`/season/${e.id}`)},r.a.createElement(b,null,e.name.replace(/\d{4}\s*$/,"")),r.a.createElement(y,null,f()(e.startDate).format("MMM Do, YYYY")),n.length?r.a.createElement(E,null,1===n.length?"Main Event":"5 Round Fights"):void 0,r.a.createElement(e=>r.a.createElement("div",null,e.eventsArray.map(e=>r.a.createElement(j,{key:e.id},t(e.sport_event.competitors[0].name)," vs ",t(e.sport_event.competitors[1].name)))),{eventsArray:n}),r.a.createElement(v,null,r.a.createElement("i",{className:"fas fa-caret-right"})))}const v=u.a.div`
  position: absolute;
  right: 1rem;
`,b=u.a.div`
  font-size: 1.2em;
  font-weight: bold;
`,E=u.a.div`
  font-size: .85em;
  font-weight: bold;
`,y=u.a.div`
  font-size: .95em;
  font-style: italic;
`,w=u.a.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  padding: .3rem;
  border: 1px solid #4d4d4d;
  box-shadow: 2px 2px 3px #7A7A7A;
  &:hover {
    cursor: pointer;
  }
  margin: .2rem 0;
  position: relative;
`,j=u.a.div`
  font-size: .9em;
  display: flex;
  justify-content: center;
`;h.propTypes={id:p.a.string,name:p.a.string,startDate:p.a.string,endDate:p.a.string,eventsArray:p.a.array};const x=u.a.div`
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin: 4rem auto;
  animation: spin 2s linear infinite;
`;function _(e){return r.a.createElement(x,null)}function k(){return(k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function O(e){const{seasons:t}=e;return t?r.a.createElement(D,null,t.map(t=>r.a.createElement(h,k({},e,{key:t.id,id:t.id,name:t.name,startDate:t.start_date,eventsArray:t.five_round_events||[]})))):r.a.createElement(_,null)}const D=u.a.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 576px;
  padding: .5rem;
`;var C=n(26),S=n.n(C);const $=Object(a.createContext)();n(309);var T=n(24),A=n.n(T),F=(n(321),n(43)),z=A.a;const I={pCol0:"#AA3939",pCol1:"#FFAAAA",pCol2:"#D46A6A",pCol3:"#801515",pCol4:"#550000",s1Col0:"#226666",s1Col1:"#669999",s1Col2:"#407F7F",s1Col3:"#0D4D4D",s1Col4:"#003333",s2Col0:"#7B9F35",s2Col1:"#D4EE9F",s2Col2:"#A5C663",s2Col3:"#567714",s2Col4:"#354F00"},M=(e,t)=>e===t?"even":e>t?"more":"less";function P(e){return r.a.createElement(J,null,e.statsHidden?null:r.a.createElement(B,{periods:e.periods,fighterOneTotals:e.fighterOneTotals,fighterTwoTotals:e.fighterTwoTotals}),e.statsHidden?r.a.createElement(N,{onClick:e.toggleStatsHidden},r.a.createElement("span",null,r.a.createElement("div",null,"Statistics"),r.a.createElement("div",null,r.a.createElement("i",{style:{marginBottom:".25rem"},className:"fas fa-sort-down"})))):r.a.createElement(N,{onClick:e.toggleStatsHidden},r.a.createElement("span",null,r.a.createElement("div",null,"Statistics"),r.a.createElement("div",null,r.a.createElement("i",{className:"fas fa-sort-up"})))))}const R=({statsObjectOne:e,statsObjectTwo:t,roundNumber:n,total:a})=>{const s=Object.keys(e);return console.log(s),r.a.createElement("div",null,r.a.createElement(q,null,a?null:"ROUND"," ",n),r.a.createElement(L,null,r.a.createElement("table",{cellSpacing:"0"},r.a.createElement("tbody",null,s.map(n=>r.a.createElement("tr",null,r.a.createElement(U,{more:M(e[n],t[n])},e[n]),r.a.createElement(Y,null,(e=>{switch(e){case"knockdowns":return"Knockdowns";case"total_strikes_attempted":return"Total Strikes ATT";case"total_strikes":return"Total Strikes";case"significant_strikes_attempted":return"Significant Strikes ATT";case"significant_strikes":return"Significant Strikes";case"takedowns_attempted":return"Takedowns ATT";case"takedowns":return"Takedowns";case"submission_attempts":return"Submission ATTs";case"total_strike_percentage":return"Total Strike %";case"significant_strike_percentage":return"Significant Strike %";case"takedown_percentage":return"Takedown %";default:return e}})(n)),r.a.createElement(U,{more:M(t[n],e[n])},t[n])))))),a?null:r.a.createElement(W,null))},B=e=>r.a.createElement(H,null,e.periods.map(e=>{const{statistics:t}=e.competitors[0],{statistics:n}=e.competitors[1];return r.a.createElement(R,{key:e.number,roundNumber:e.number,statsObjectOne:t,statsObjectTwo:n,total:!1})}),r.a.createElement(R,{key:"totalStats",roundNumber:"Totals",statsObjectOne:e.fighterOneTotals,statsObjectTwo:e.fighterTwoTotals,total:!0})),N=u.a.div`
  display: flex;
  justify-content: center;
  margin: .3rem auto;
  /* background-color: white; */
  span {
    display: flex;
    background-color: #DCDCDC;
    color: black;
    border-radius: 3px;
    padding: .3rem .6rem;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #BDBDBD;
    };
    transition: all .2s ease;
    div:first-child {
      margin-right: .5rem;
    };
    padding: .3rem auto;
  };
`,H=u.a.div`
  background-color: #BDBDBD;
  color: black;
  border-radius: 3px;
`,U=u.a.td`
  font-size: .92rem;
  color: ${e=>"even"===e.more?"#202020":"more"===e.more?I.s2Col4:I.pCol0};
  font-weight: 700;
`,q=u.a.div`
  font-size: 1.03rem;
  font-weight: bold;
`,Y=u.a.td`
  width: 13rem;
`,L=u.a.div`
  display: flex;
  justify-content: center;
  tr {
    text-decoration: none !important;
    td {
      border-bottom: 1px solid black;
    }
  }
  tbody {
    tr:last-child {
      td {
        border-bottom: none;
      }
    }
  }
`,W=u.a.div`
  border-bottom: 2px solid grey;
  margin: .3rem auto;
`,J=u.a.div`

`;P.propTypes={periods:p.a.array,fighterOneTotals:p.a.object,fighterTwoTotals:p.a.object,statsHidden:p.a.bool,toggleStatsHidden:p.a.func};const K=(e,t)=>{const n=e.split(", "),a=[n[1],n[0]].join(" ");return t?a.toUpperCase():a},V=e=>{if(!e.voteCount)return r.a.createElement("div",{style:{margin:".3rem"}},"No votes");const t=Object.values(e.voteCount).reduce((e,t)=>e+t)||0,n=e.voteCount[e.competitors[0].id]||0,a=e.voteCount[e.competitors[1].id]||0,s=(n/t*100).toFixed(0),i=(a/t*100).toFixed(0);return r.a.createElement(de,null,r.a.createElement(le,null,r.a.createElement(le,null,r.a.createElement("div",null,s,"%",r.a.createElement(ce,null,"(",n,"/",t,")"))),r.a.createElement(ie,{direction:"left"},r.a.createElement(oe,{percent:s,moreThan:n>a,direction:"left"}))),r.a.createElement(re,null,"Total Votes"),r.a.createElement(le,null,r.a.createElement(ie,{direction:"right"},r.a.createElement(oe,{percent:i,moreThan:n<a,direction:"right"})),r.a.createElement(le,null,r.a.createElement("div",null,r.a.createElement(ce,null,"(",a,"/",t,")"),i,"%"))))},G=e=>{const[t,n]=Object(a.useState)(null);return e.isDayBefore?null:r.a.createElement(r.a.Fragment,null,r.a.createElement(se,null,r.a.createElement(z,{onSelect:e=>{n(e)}},r.a.createElement(z.Toggle,{btnStyle:"flat"},null!==t?K(e.competitors[t].name):"Predict on your fighter"),r.a.createElement(z.Menu,null,r.a.createElement(T.MenuItem,{eventKey:0,active:0===t},K(e.competitors[0].name)," ",e.fighterOdds?e.fighterOdds[0]:null),r.a.createElement(T.MenuItem,{eventKey:1,active:1===t},K(e.competitors[1].name)," ",e.fighterOdds?e.fighterOdds[1]:null)))),null!==t?r.a.createElement(F.Button,{onClick:()=>{e.submitPrediction(t)}},"Submit"):null)};function Z(e){const[t,n]=Object(a.useState)(!1),[s,i]=Object(a.useState)(!0),{user:o}=Object(a.useContext)($),l=(e=>{let t;switch(e.match(/[a-z_]+/)[0]){case"bantamweight":t=["Bantamweight","135 lbs"];break;case"featherweight":t=["Featherweight","145 lbs"];break;case"lightweight":t=["Lightweight","155 lbs"];break;case"welterweight":t=["Welterweight","170 lbs"];break;case"light_heavyweight":t=["Light Heavyweight","205 lbs"];break;case"middleweight":t=["Middleweight","185 lbs"];break;case"heavyweight":t=["Heavyweight","265 lbs"];break;case"flyweight":t=["Flyweight","125 lbs"];break;case"strawweight":t=["Strawweight","115 lbs"]}return t})(e.weightClass),c=e=>{switch(e){case"ko_tko":return"KO/TKO";case"tko_doctors_stoppage":return"TKO (Doctor Stoppage)";case"decision_unanimous":return"Unanimous Decision";case"decision_split":return"Split Decision";case"submission":return"Submission"}},u=e.markets?[e.plusMinusOdds(e.markets[0].outcomes[0].probability),e.plusMinusOdds(e.markets[0].outcomes[1].probability)]:null;return r.a.createElement(me,{statsHidden:s},r.a.createElement(ne,{canceled:e.canceled},r.a.createElement(te,{direction:"left"},e.winner?e.winner===e.competitors[0].id?r.a.createElement(Q,{type:"W"},"W"):r.a.createElement(Q,{type:"L"},"L"):null,r.a.createElement(X,null,K(e.competitors[0].name,!0))),r.a.createElement(ee,null," vs "),r.a.createElement(te,{direction:"right"},r.a.createElement(X,null,K(e.competitors[1].name,!0)),e.winner?e.winner===e.competitors[1].id?r.a.createElement(Q,{type:"W"},"W"):r.a.createElement(Q,{type:"L"},"L"):null)),r.a.createElement(ue,{canceled:e.canceled},r.a.createElement("div",null,r.a.createElement("em",null,l[0])," - ",l[1]),r.a.createElement("div",null,e.scheduledRounds," Rounds")),e.winner||e.winMethod?r.a.createElement(()=>r.a.createElement("div",null,e.isDraw?"Draw":null,r.a.createElement("div",null,((e,t,n)=>{switch(e){case"decision_split":case"decision_unanimous":return`via ${c(e)}`;case"tko_doctors_stoppage":case"ko_tko":case"submission":return`via ${c(e)} at ${n} of RD ${t}`;default:return null}})(e.winMethod,e.finalRound,e.finalRoundTime))),null):null,r.a.createElement(V,{voteCount:e.voteCount,competitors:e.competitors}),e.predictedFighter?r.a.createElement(ae,{winner:e.winner,predictedFighter:e.predictedFighter},"Your pick: ",((e,t)=>{for(let n of t)if(n.id===e)return K(n.name);return null})(e.predictedFighter,e.competitors)," ",((e,t,n)=>{for(let a in t)if(e===t[a].id)return n?`(${n[a]})`:null;return null})(e.predictedFighter,e.competitors,u),e.finalRound&&!e.canceled?r.a.createElement(({correct:t})=>r.a.createElement("div",null,t?`You earned $${(e.payout-e.betAmount).toFixed(2)}`:`You lost your $${e.betAmount}`),{correct:e.predictedFighter===e.winner}):null):t?r.a.createElement(pe,null):o?r.a.createElement(G,{isDayBefore:e.isDayBefore,competitors:e.competitors,submitPrediction:async t=>{n(!0);const a=e.competitors[t].id;try{const r=await d.a.post("/api/summaries/predict",{seasonID:e.seasonID,summaryID:e.id,fighterID:e.competitors[t].id});r.data.success&&(n(!1),e.addPredictionHandler(e.index,r.data.id,a,e.stage))}catch(e){n(!1),console.error(e)}},fighterOdds:u}):null,e.statistics?r.a.createElement(P,{periods:e.statistics.periods,fighterOneTotals:e.statistics.totals.competitors[0].statistics,fighterTwoTotals:e.statistics.totals.competitors[1].statistics,toggleStatsHidden:()=>{i(!s)},statsHidden:s}):null)}const Q=u.a.span`
  color: ${e=>"W"===e.type?I.s2Col3:I.pCol0}
  font-size: 1.06rem;
`,X=u.a.div`
  margin: auto .4rem;
`,ee=u.a.div`
  width: 1rem;
  margin: auto .1rem;
  /* margin: auto; */
`,te=u.a.div`
  font-weight: bold;
  width: 15rem;
  display: flex;
  align-items: center;
  justify-content: ${e=>"left"===e.direction?"flex-end":"flex-start"};
`,ne=u.a.div`
  font-size: 1.03rem;
  display: flex;
  justify-content: center;
  text-decoration: ${e=>e.canceled?"line-through":null};
`,ae=u.a.div`
  padding: .3rem;
  border: 1px solid grey;
  border-radius: 3px;
  margin-bottom: .3rem;
  background-color: ${e=>e.winner?e.winner===e.predictedFighter?I.s2Col4:I.pCol0:"#7A7A7A"};
`,re=u.a.div`
  margin: auto .3rem;
`,se=u.a.span`
  margin: auto .5rem auto auto;
`,ie=u.a.div`
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: ${e=>"left"===e.direction?"flex-end":"flex-start"};
`,oe=u.a.span`
  display: inline-block;
  margin: auto 2px;
  height: 4px;
  width: ${e=>`${e.percent/25}rem`};
  background-color: ${e=>e.moreThan?I.pCol2:I.s2Col2};
  border-radius: ${e=>"left"===e.direction?"2px 0 0 2px":"0 2px 2px 0"};
`,le=u.a.div`
  display: flex;
  font-size: .9rem;
  justify-content: center;
  align-items: center;
`,ce=u.a.span`
  margin: auto 2px;
  @media(max-width: 576px) {
    display: none;
  };
`,de=u.a.div`
  display: flex;
  justify-content: center;
  margin: .5rem auto;
`,ue=u.a.div`
  font-size: .85rem;
  text-decoration: ${e=>e.canceled?"line-through":null};
`,me=u.a.div`
  display: block;
  text-align: center;
  border: 1px solid #4d4d4d;
  box-shadow: 2px 2px 3px #7A7A7A;
  margin: .2rem 0;
  padding: .3rem .7rem;
  @media(max-width: 767px) {
    font-size: .95em;
  }
  overflow: ${e=>e.statsHidden?null:"hidden"}
  max-height: ${e=>e.statsHidden?"400px":"1300px"};
  transition: max-height .5s cubic-bezier(1, 0, 0, 1);
`,pe=u.a.div`
  border: 3px solid #f3f3f3 !important;
  border-top: 3px solid #3498db !important;
  height: 10px !important;
  width: 10px !important;
  border-radius: 50%;
  margin: auto;
  animation: spin .5s linear infinite;
`;function ge(){return(ge=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}G.propTypes={isDayBefore:p.a.bool,competitors:p.a.array,submitPrediction:p.a.func,fighterOdds:p.a.array},Z.propTypes={id:p.a.string,seasonID:p.a.string,index:p.a.number,scheduledRounds:p.a.number,competitors:p.a.array,summaryOrder:p.a.number,payout:p.a.number,canceled:p.a.bool,weightClass:p.a.string,isDraw:p.a.bool,isDayBefore:p.a.bool,statistics:p.a.object,winner:p.a.string,predictionID:p.a.number,predictedFighter:p.a.string,seasonDate:p.a.object,addPredictionHandler:p.a.func,voteCount:p.a.object,markets:p.a.array,plusMinusOdds:p.a.func,winMethod:p.a.string,finalRound:p.a.number,finalRoundTime:p.a.string,stage:p.a.string};const fe=e=>!("closed"!==e.status||"cancelled"!==e.match_status);function he(e){const{id:t}=e.match.params,[n,s]=Object(a.useState)(null),[i,l]=Object(a.useState)(null),[c,u]=Object(a.useState)(null),m=["Main Card","Prelims","Early Prelims"],{user:p,setUser:g}=Object(a.useContext)($),h=new Date,v=(e,t,n,a)=>{const r=`${t+"-"+n}`;window.localStorage.setItem(r,JSON.stringify({data:e,time:a}))};Object(a.useEffect)(()=>{b()},[]);const b=async()=>{try{const e=JSON.parse(window.localStorage.getItem(`season-${t}`)||null);if(e)if(h-e.time>43200){const e=await d.a.get(`/api/seasons/${t}`);u(e.data.isEnded),s(e.data.summaries),l(e.data.summariesCount),v(e.data,"season",t,h)}else u(e.data.isEnded),s(e.data.summaries),l(e.data.summariesCount);else{const e=await d.a.get(`/api/seasons/${t}`);u(e.data.isEnded),s(e.data.summaries),l(e.data.summariesCount),v(e.data,"season",t,h)}}catch(e){u(!1),s([]),l(0),console.log(e.response.data.message)}};let E;n&&(i&&n.length?E=new Date(n[0].sport_event.start_time):i&&n["Main Card"]&&(E=new Date(n["Main Card"][0].sport_event.start_time)));const y=(E-h)/1e3<86400,w=(e,t,n,a)=>{if(!t)return null;const r=((e,t,n)=>{if(!n)return 50;let a;return t.forEach((t,n)=>{t.id===e&&(a=n)}),n[a].probability})(t,n,a);return j(r)},j=e=>{const t=x(e);return t>=0?t/100*100+100:100/(-1*t/100)+100},x=e=>{const t=(e=>e>=50?(-e/(100-e)*100).toFixed(0):((100-e)/e*100).toFixed(0))(e);return t>0?`+${t}`:t},k=e=>{if(!e)return null;return`${e.name}`},O=(e,t,a,r)=>{let i,o;if(r){const{votecount:t}=n[r][e];i=t}else{const{votecount:t}=n[e];i=t}i&&i[a]||(i={...i,[a]:0}),i[a]+=1,o=r?S()(n,{[r]:{[e]:{prediction_id:{$set:t},predicted_fighter:{$set:a},votecount:{$set:i}}}}):S()(n,{[e]:{prediction_id:{$set:t},predicted_fighter:{$set:a},votecount:{$set:i}}}),s(o)};if(!n)return r.a.createElement(_,null);if(0===i)return r.a.createElement(ke,null,"No fights to display");if(i){if(n.length)return r.a.createElement(ke,null,r.a.createElement(_e,null,n[0].sport_event.sport_event_context.season.name.replace(/\d{4}\s*$/,""),p&&35===p.userID?r.a.createElement(je,null,r.a.createElement(o.b,{to:`/edit/${t}`},"Edit")):null),r.a.createElement("div",null,n[0].sport_event.venue?n[0].sport_event.venue.country_name:null),r.a.createElement(ye,null,k(n[0].sport_event.venue)),r.a.createElement("div",null,f()(n[0].sport_event.start_time).format("hh:mm A MMM Do, YYYY")),c&&p?r.a.createElement(be,{summaries:n,isCanceled:fe}):null,r.a.createElement(ve,{returnFighterWinnings:w,isEnded:c,summariesArray:n}),r.a.createElement(xe,null),n.map((n,a)=>{const s=n.markets?n.markets[0].outcomes:null;return r.a.createElement(Z,ge({key:n.id},e,{id:n.id,index:a,seasonID:t,betAmount:100,competitors:n.sport_event.competitors,payout:w(0,n.sport_event_status.winner_id,n.sport_event.competitors,s),summaryOrder:n.s_order,scheduledRounds:n.sport_event_status.scheduled_length,canceled:fe(n.sport_event_status),weightClass:n.sport_event_status.weight_class,isDraw:"draw"===n.sport_event_status.winner,winner:n.sport_event_status.winner_id||null,isDayBefore:y,predictionID:n.prediction_id,predictedFighter:n.predicted_fighter,addPredictionHandler:O,voteCount:n.votecount,markets:n.markets,plusMinusOdds:x,winMethod:n.sport_event_status.method,finalRound:n.sport_event_status.final_round,finalRoundTime:n.sport_event_status.final_round_length}))}));const a=Object.values(n).reduce((e,t)=>[...e,...t]),s=a[0];return r.a.createElement(ke,null,r.a.createElement(_e,null,s.sport_event.sport_event_context.season.name.replace(/\d{4}\s*$/,""),p&&35===p.userID?r.a.createElement(je,null,r.a.createElement(o.b,{to:`/edit/${t}`},"Edit")):null),r.a.createElement("div",null,s.sport_event.venue?s.sport_event.venue.country_name:null),r.a.createElement(ye,null,k(s.sport_event.venue)),r.a.createElement("div",null,f()(s.sport_event.start_time).format("hh:mm A MMM Do, YYYY")),r.a.createElement(ve,{returnFighterWinnings:w,isEnded:c,summariesArray:a}),r.a.createElement(xe,null),m.map((a,s)=>{if(n[a])return r.a.createElement("div",{key:`${a}-i`},r.a.createElement(Ee,null,a.toUpperCase()),n[a].map((n,s)=>{const i=n.markets?n.markets[0].outcomes:null;return r.a.createElement(Z,ge({key:n.id},e,{id:n.id,index:s,stage:a,betAmount:100,seasonID:t,scheduledRounds:n.sport_event_status.scheduled_length,competitors:n.sport_event.competitors,summaryOrder:n.s_order,payout:w(0,n.sport_event_status.winner_id,n.sport_event.competitors,i),canceled:fe(n.sport_event_status),weightClass:n.sport_event_status.weight_class,isDraw:"draw"===n.sport_event_status.winner,winner:n.sport_event_status.winner_id||null,isDayBefore:y,predictionID:n.prediction_id,predictedFighter:n.predicted_fighter,addPredictionHandler:O,voteCount:n.votecount,statistics:n.statistics,markets:n.markets,plusMinusOdds:x,winMethod:n.sport_event_status.method,finalRound:n.sport_event_status.final_round,finalRoundTime:n.sport_event_status.final_round_length}))}))}))}return r.a.createElement(ke,null,"Nothing to show here")}const ve=({summariesArray:e,isEnded:t,returnFighterWinnings:n})=>{const a=(e=>{const t={correctPredictions:0,totalPredictions:0,totalFights:0,winningAmount:0,totalMoneyIn:0};for(let a of e)if(!fe(a.sport_event_status)){if(a.predicted_fighter&&(t.totalPredictions+=1,t.totalMoneyIn+=100,a.predicted_fighter===a.sport_event_status.winner_id)){t.correctPredictions+=1;const e=a.markets?a.markets[0].outcomes:null;t.winningAmount+=n(100,a.sport_event_status.winner_id,a.sport_event.competitors,e)}t.totalFights+=1}return{...t,winningAmount:t.winningAmount.toFixed(2)}})(e);return t?a.totalPredictions?r.a.createElement("div",null,r.a.createElement(xe,null),r.a.createElement(we,null,"On ",a.correctPredictions||0,"/",a.totalPredictions||0," predictions (",a.totalFights||0," total fights) your purse at the end of the night is $",a.winningAmount," from $",a.totalMoneyIn," put in.")):null:r.a.createElement("div",null,r.a.createElement(xe,null),r.a.createElement(we,null,"Predicted on ",a.totalPredictions||0,"/",a.totalFights||0," fights"))},be=e=>{let t=0,n=0,a=0;return e.summaries.forEach(r=>{if(!e.isCanceled(r.sport_event_status)&&(t+=1,r.prediction_id)){a+=1;const e=r.sport_event_status.winner_id;e&&r.predicted_fighter===e&&(n+=1)}}),r.a.createElement("div",null,r.a.createElement(xe,{style:{maxWidth:"300px",margin:"2px auto"}}),r.a.createElement("div",null,"Your Prediction Results"),n,"/",a," on your predictions ",r.a.createElement("span",null," out of ",t," fights"))},Ee=u.a.div`
  font-weight: bold;
  font-size: 1.2rem;
`,ye=u.a.div`
  font-style: italic;
`,we=u.a.div`
  font-size: .92em;
`,je=u.a.div`
  position: absolute;
  right: 1rem;
  top: 0;
`,xe=u.a.div`
  border-bottom: 2px solid grey;
  width: 85%;
  margin: .3rem auto;
`,_e=u.a.div`
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  position: relative;
`,ke=u.a.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: auto;
  max-width: 576px;
  padding: .5rem;
`;const Oe=new(n(281).a);function De(e){const{user:t,setUser:n}=Object(a.useContext)($),[s,i]=Object(a.useState)(!1);return r.a.createElement(Se,null,r.a.createElement(o.b,{to:"/"},r.a.createElement(Ce,null,r.a.createElement(Ae,null),r.a.createElement("div",null,"Guesser"))),r.a.createElement(Ce,null,t?r.a.createElement(o.b,{to:"/account"},"Account"):r.a.createElement(o.b,{to:"/login"},r.a.createElement("div",null,"Login")),r.a.createElement($e,{onClick:()=>{i(!s)}},r.a.createElement("i",{className:"fas fa-sort-down"})),r.a.createElement(Te,{menuVisible:s},t?r.a.createElement(o.b,{to:"/",onClick:()=>{window.localStorage.removeItem("userData"),Oe.remove("token"),n(null)}},"Signout"):r.a.createElement(o.b,{to:"/signup",style:{marginLeft:"1rem"}},r.a.createElement("div",null,"Signup")))))}const Ce=u.a.span`
  display: flex;
  justify-content: center;
  align-items: center;
`,Se=u.a.div`
  background-color: black;
  color: white;
  padding: .5rem 2rem .5rem 1rem;
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
`,$e=u.a.i`
  margin: 0 0 10px 5px;
  width: 15px;
  height: 15px;
  padding: 3px;
  background-color: black;
  transition: all ease .5s;
  /* :hover {
    background-color: white;
  } */
`,Te=u.a.div`
  display: ${e=>e.menuVisible?"flex":"none"};
  position: absolute;
  flex-direction: column;
  color: black;
  background-color: #DCDCDC;
  margin-top: 4rem;
  margin-right: .5rem;
  z-index: 2;
  padding: .5rem;
  border-radius: 5px;
`,Ae=u.a.div`
  width: 8rem;
  height: 6.5rem;
  background-image: url("assets/ufc-logo.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;var Fe=n(14),ze=n(20);Fe.addMethod(Fe.string,"equalTo",(function(e,t){return Fe.mixed().test({name:"equalTo",exclusive:!1,message:t,params:{reference:e.path},test:function(t){return t===this.resolve(e)}})}));const Ie=Fe.object().shape({username:Fe.string().min(6,"Username must be at least 6 characters long").max(32,"Username limited to 32 characters").required("Username Required"),password:Fe.string().min(8,"Password must be at least 6 characters long").max(32,"Password limited to 32 characters").matches(/\d/,"One digit required").matches(/[A-Z]/,"One capital letter required").matches(/[a-z]/,"One lowercase letter required").required("Password Required"),confirmPassword:Fe.string().equalTo(Fe.ref("password"),"Passwords must match")});function Me(e){const[t,n]=Object(a.useState)(!1),{user:s,setUser:i}=Object(a.useContext)($);return r.a.createElement(qe,null,r.a.createElement("h2",null,"Sign Up"),r.a.createElement(ze.d,{initialValues:{username:"",password:"",confirmPassword:""},validationSchema:Ie,validateOnChange:!1,validateOnBlur:!1,onSubmit:t=>{n(!1),(async t=>{try{const n=await d.a.post("/api/users/signup",{...t});if(n.data.success){const{userID:t,username:a}=n.data,r={userID:t,username:a};window.localStorage.setItem("userData",JSON.stringify(r)),i(r),e.history.push("/")}}catch(e){e.response&&"duplicate_username"===e.response.data.error&&n(!0),console.error(e)}})(t)}},r.a.createElement(He,{onChange:()=>{n(!1)}},r.a.createElement(Ue,null,r.a.createElement(Re,{name:"username",placeholder:"username"}),r.a.createElement(Be,{error:t},"Username unavailable"),r.a.createElement(Ne,{name:"username",component:"div"})),r.a.createElement(Ue,null,r.a.createElement(Re,{name:"password",placeholder:"********",type:"password"}),r.a.createElement(Ne,{name:"password",component:"div"})),r.a.createElement(Ue,null,r.a.createElement(Re,{name:"confirmPassword",placeholder:"********",type:"password"}),r.a.createElement(Ne,{name:"confirmPassword",component:"div"})),r.a.createElement(Pe,{type:"submit"},"Submit"))))}const Pe=u.a.button`
  padding: .3rem;
  border-radius: 7px;
  position: absolute;
  left: 0;
`,Re=Object(u.a)(ze.b)`
  width: 95%;
  padding: .5rem;
  border-radius: 7px;
  &:focus {
    border: 2px groove blue;
  }
`,Be=u.a.div`
  display: ${e=>e.error?"block":"none"}
  position: absolute;
  bottom: -1rem;
  font-size: .8em;
  color: red;
`,Ne=Object(u.a)(ze.a)`
  position: absolute;
  bottom: -1rem;
  font-size: .8em;
  color: red;
`,He=Object(u.a)(ze.c)`
  width: 80%;
  max-width: 25rem;
  position: relative;
  margin: auto;
`,Ue=u.a.div`
  position: relative;
  margin: .5rem auto 1.5rem auto;
`,qe=(u.a.div`
  border-bottom: 2px solid grey;
  width: 85%;
  margin: .3rem auto;
`,u.a.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: auto;
  max-width: 768px;
  padding: .5rem;
`),Ye=e=>{const t=e.split(", ");return[t[1],t[0]].join(" ")};function Le(e){return r.a.createElement(Ze,null,r.a.createElement(Ge,null,r.a.createElement(Ke,{winner:e.winner,competitorID:e.competitors[0].id,predictedFighter:e.predictedFighter},Ye(e.competitors[0].name)),r.a.createElement(We,null," - "),r.a.createElement(Ve,{winner:e.winner,competitorID:e.competitors[1].id,predictedFighter:e.predictedFighter},Ye(e.competitors[1].name))))}const We=u.a.div`
  width: 5%;
`,Je=u.a.div`
  border: ${e=>e.winner?e.winner===e.competitorID?" 1px solid #498a77;":"1px solid #bd6574":"none"};
  color: ${e=>e.predictedFighter===e.competitorID?"#498a77;":"#bd6574"};
  width: 47.5%;
  padding: .2rem;
`,Ke=Object(u.a)(Je)`
  text-align: start;
`,Ve=Object(u.a)(Je)`
  text-align: end;
`,Ge=u.a.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  /* justify-content: space-between; */
`,Ze=u.a.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin: .2rem auto;
  @media(max-width: 767px) {
    font-size: .95em;
  }
`;function Qe(e){return r.a.createElement(et,null,r.a.createElement(Xe,null,r.a.createElement(o.b,{to:`/season/${e.id}`},e.name)),r.a.createElement(e=>{let t=0,n=0;return e.eventsArray&&e.eventsArray.forEach(e=>{e.predictedFighter===e.sportEventStatus.winner_id&&(t+=1),n+=1}),r.a.createElement("div",null,t,"/",n)},{eventsArray:e.eventsArray}),e.eventsArray?e.eventsArray.map(e=>r.a.createElement(Le,{key:e.summaryID,competitors:e.sportEvent.competitors,predictedFighter:e.predictedFighter,winner:e.sportEventStatus.winner_id})):null)}Le.propTypes={competitors:p.a.array,predictedFighter:p.a.string,winner:p.a.string};const Xe=u.a.div`
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`,et=u.a.div`
`;function tt(e){const{user:t,setUser:n}=Object(a.useContext)($),[s,i]=Object(a.useState)(!1),o=(e,t,n)=>{if(!n)return 50;let a;return t.forEach((t,n)=>{t.id===e&&(a=n)}),n[a].probability},l=e=>{const t=(e=>{const t=(e=>e>=50?(-e/(100-e)*100).toFixed(0):((100-e)/e*100).toFixed(0))(e);return t>0?`+${t}`:t})(e);return t>=0?t/100*10+10:10/(-1*t/100)+10};Object(a.useEffect)(()=>{c()},[]);const c=async()=>{try{const e=await d.a.get(`/api/users/${t.userID}`);i(e.data.seasons)}catch(e){i([]),console.error(e)}};return t&&s?r.a.createElement(nt,null,r.a.createElement(at,null,"Account"),r.a.createElement(({seasonsArray:e})=>{let t=0,n=0,a=0,s=0;for(let r=0;r<e.length;r++){if(!e[r].seasonsummaries)continue;if(!e[[r]].seasonsummaries[0].sportEventStatus.winner)continue;const i=e[r].seasonsummaries;for(let e in i){if(i[e].predictedFighter===i[e].sportEventStatus.winner_id){const{outcomes:n}=i[e].markets?i[e].markets[0]:null,r=o(i[e].sportEventStatus.winner_id,i[e].sportEvent.competitors,n);a+=l(r),t+=1}n+=1,s+=10}}const i=(100*a/s).toFixed(2);return r.a.createElement("div",null,r.a.createElement("div",null,t,"/",n," so far"),r.a.createElement("div",null,"$",s," in, $",a.toFixed(2)," in yo pocket"),r.a.createElement("div",null,"Good for ",i,"% of initial earnings"))},{seasonsArray:s}),s.length?s.map(e=>r.a.createElement(Qe,{key:e.id,id:e.id,name:e.name,startDate:e.start_date,eventsArray:e.seasonsummaries})):r.a.createElement("div",null,"Make predictions for some data")):r.a.createElement(_,null)}Qe.propTypes={id:p.a.string,name:p.a.string,startDate:p.a.string,eventsArray:p.a.array};const nt=u.a.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: auto;
  max-width: 768px;
  padding: .5rem;
`,at=u.a.div`
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  position: relative;
`,rt=Fe.object().shape({username:Fe.string().required("* Required"),password:Fe.string().required("* Required")});function st(e){const{user:t,setUser:n}=Object(a.useContext)($),[s,i]=Object(a.useState)(!1);return r.a.createElement(mt,null,r.a.createElement("h2",null,"Login"),r.a.createElement(ze.d,{initialValues:{username:"",password:""},validationSchema:rt,onSubmit:async t=>{try{const a=await d.a.post("/api/users/login",t),r={userID:a.data.userID,username:a.data.username};window.localStorage.setItem("userData",JSON.stringify(r)),n(r),e.history.push("/")}catch(e){e.response&&"failed_credentials"===e.response.data.error&&i(!0)}}},r.a.createElement(dt,{onChange:()=>{i(!1)}},r.a.createElement(ut,null,r.a.createElement(ot,{name:"username",placeholder:"username"}),r.a.createElement(ct,{name:"username",component:"div"})),r.a.createElement(ut,null,r.a.createElement(ot,{name:"password",placeholder:"password",type:"password"}),r.a.createElement(ct,{name:"password",component:"div"}),r.a.createElement(lt,{error:s},"Login Failed")),r.a.createElement(it,{type:"submit"},"Submit"))))}const it=u.a.button`
  padding: .3rem;
  border-radius: 7px;
  position: absolute;
  left: 0;
`,ot=Object(u.a)(ze.b)`
  width: 95%;
  padding: .5rem;
  border-radius: 7px;
  &:focus {
    border: 2px groove blue;
  }
`,lt=u.a.div`
  display: ${e=>e.error?"block":"none"}
  position: absolute;
  bottom: -1rem;
  font-size: .8em;
  color: red;
`,ct=Object(u.a)(ze.a)`
  position: absolute;
  bottom: -1rem;
  font-size: .8em;
  color: red;
`,dt=Object(u.a)(ze.c)`
  width: 80%;
  max-width: 25rem;
  position: relative;
  margin: auto;
`,ut=u.a.div`
  position: relative;
  margin: .5rem auto 1.5rem auto;
`,mt=(u.a.div`
  border-bottom: 2px solid grey;
  width: 85%;
  margin: .3rem auto;
`,u.a.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: auto;
  max-width: 768px;
  padding: .5rem;
`);var pt=n(456),gt=n(280),ft=n(458),ht=n(457);const vt="summary",bt=u.a.div`
  width: 10%;
  margin: auto;
`,Et=u.a.div`
  width: 45%
  display: flex;
`,yt=Object(u.a)(Et)`
  justify-content: start;
`,wt=Object(u.a)(Et)`
  justify-content: end;
`,jt=u.a.div`
  display: flex;
  justify-content: center;
  padding: .3rem .7rem;
  text-decoration: ${e=>e.canceled?"line-through":null};
  @media(max-width: 767px) {
    font-size: .95em;
  }
`,xt=u.a.input`
  margin-right: 8px;
`,_t={border:"1px dashed gray",padding:"0.5rem 1rem",marginBottom:".5rem",backgroundColor:"white",cursor:"move"},kt=e=>{const t=e.split(", ");return[t[1],t[0]].join(" ")},Ot=r.a.forwardRef(({index:e,canceled:t,editFightCancel:n,competitors:s,isDragging:i,connectDragSource:o,connectDropTarget:l},c)=>{const d=Object(a.useRef)(null);o(d),l(d);const u=i?0:1;Object(a.useImperativeHandle)(c,()=>({getNode:()=>d.current}));return r.a.createElement(jt,{canceled:t,ref:d,style:{..._t,opacity:u}},r.a.createElement(xt,{onChange:()=>{n(e,t)},type:"checkbox",checked:t}),r.a.createElement(yt,null,kt(s[0].name)),r.a.createElement(bt,null,"vs"),r.a.createElement(wt,null,kt(s[1].name)))});var Dt=Object(ft.a)(vt,{hover(e,t,n){if(!n)return null;const a=n.getNode();if(!a)return null;const r=t.getItem().index,s=e.index;if(r===s)return;const i=a.getBoundingClientRect(),o=(i.bottom-i.top)/2,l=t.getClientOffset().y-i.top;r<s&&l<o||r>s&&l>o||(e.moveCard(r,s),t.getItem().index=s)}},e=>({connectDropTarget:e.dropTarget()}))(Object(ht.a)(vt,{beginDrag:e=>({id:e.id,index:e.index})},(e,t)=>({connectDragSource:e.dragSource(),isDragging:t.isDragging()}))(Ot));const Ct=u.a.button`
  padding: .5rem;
`,St=u.a.div`
  position: absolute;
  left: 0;
  top: .5rem
`,$t=u.a.div`
  border-bottom: 2px solid grey;
  width: 85%;
  margin: .3rem auto;
`,Tt=u.a.div`
  display: flex;
  text-align: center;
  position: relative;
  flex-direction: column;
  margin: auto;
  max-width: 768px;
  padding: .5rem;
`;var At=e=>{{const{id:t}=e.match.params,[n,s]=Object(a.useState)(null),[i,o]=Object(a.useState)(!1);Object(a.useEffect)(()=>{c()},[]);const l=async function(){o(!0);try{const e={seasonID:t,newOrder:n.map((e,t)=>({sportEventID:e.id,sortOrder:t,sportEventStatus:e.sport_event_status}))};(await d.a.post("/api/summaries/reorder",e)).data.success&&o(!1)}catch(e){o(!1),console.error(e)}},c=async()=>{try{const e=await d.a.get(`/api/seasons/${t}`);if(e.data.summaries&&!e.data.summaries.length)return s(Object.values(e.data.summaries).reduce((e,t)=>[...e,...t]));s(e.data.summaries)}catch(e){console.error(e)}},u=(e,t)=>{if(t){const t=new Date(n[e].sport_event.start_time),a=new Date;s(t>a?S()(n,{[e]:{sport_event_status:{status:{$set:"not_started"},match_status:{$set:"not_started"}}}}):S()(n,{[e]:{sport_event_status:{status:{$set:"closed"},match_status:{$set:"ended"}}}}))}else s(S()(n,{[e]:{sport_event_status:{status:{$set:"closed"},match_status:{$set:"cancelled"}}}}))},m=(e,t)=>{const a=n[e];s(S()(n,{$splice:[[e,1],[t,0,a]]}))},p=e=>!("closed"!==e.status||"cancelled"!==e.match_status);return n?r.a.createElement(Tt,null,r.a.createElement("div",null,n[0].sport_event.sport_event_context.season.name.replace(/\d{4}\s*$/,"")),r.a.createElement(St,null,"canceled"),r.a.createElement($t,null),r.a.createElement(pt.a,{backend:gt.a},r.a.createElement("div",null,n.map((e,t)=>r.a.createElement(Dt,{key:e.id,id:e.id,index:t,moveCard:m,competitors:e.sport_event.competitors,canceled:p(e.sport_event_status),summaryOrder:e.s_order,editFightCancel:u})))),i?r.a.createElement("div",null,"saving"):r.a.createElement(Ct,{onClick:l},"Save")):null}};function Ft(){return(Ft=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}i.a.render(r.a.createElement((function(e){const[t,n]=Object(a.useState)(JSON.parse(window.localStorage.getItem("userData"))||null),[s,i]=Object(a.useState)(null);Object(a.useEffect)(()=>{(async()=>{const e=await d.a.get("api/seasons");i(e.data.seasons)})()},[]);const c=Object(a.useMemo)(()=>({user:t,setUser:n}),[t,n]);return r.a.createElement(o.a,null,r.a.createElement($.Provider,{value:c},r.a.createElement(De,null),r.a.createElement(l.c,null,r.a.createElement(l.a,{exact:!0,path:"/",render:e=>r.a.createElement(O,Ft({},e,{seasons:s}))}),r.a.createElement(l.a,{exact:!0,path:"/season/:id",render:e=>r.a.createElement(he,e)}),r.a.createElement(l.a,{exact:!0,path:"/edit/:id",render:e=>r.a.createElement(At,e)}),r.a.createElement(l.a,{exact:!0,path:"/signup",render:e=>r.a.createElement(Me,e)}),r.a.createElement(l.a,{exact:!0,path:"/account",render:e=>r.a.createElement(tt,e)}),r.a.createElement(l.a,{exact:!0,path:"/login",render:e=>r.a.createElement(st,e)}))))}),null),document.getElementById("root"))}});
//# sourceMappingURL=main.js.map