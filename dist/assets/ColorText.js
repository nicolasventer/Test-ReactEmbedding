import{r as a,j as f}from"./index.js";const r=t=>{const[e,x]=a.useState(t.state.text??""),n=a.useRef(null);return a.useEffect(()=>{t.state.text=e,t.state.setText=x,t.state.ref=n},[t.state,e]),a.useEffect(()=>{var s,u;return(u=(s=t.state).onTextChange)==null?void 0:u.call(s,e)},[t.state,e]),f.jsx("input",{ref:n,style:{color:e},type:"text",value:e,onChange:s=>x(s.target.value)})};export{r as ColorText};
