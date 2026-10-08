import{j as e}from"./jsx-runtime-BO8uF4Og.js";import{b as i}from"./ClaimAnnotationCard-DYoDLLno.js";import{F as j}from"./Grid-DnCkeA5r.js";import"./index-D4H_InIO.js";import"./useMediaQuery-BLMSMJgh.js";import"./index-CZVi18Wq.js";import"./index-Dd8bRu6S.js";const k=[{sourceType:"cr",sourceName:"Consumer Reports",quote:"In 200 hours of lab testing, testers reported significant discomfort after 3-hour walks. Handlebar padding scored in the bottom quartile.",linkLabel:"CR Lab Results",href:"https://www.consumerreports.org"},{sourceType:"community",sourceName:"Reddit r/BabyBumps",quote:"The seat gets really firm after about an hour. My back was aching by the end of our walk. Wish I'd tested it longer in the store.",linkLabel:"See thread",href:"https://www.reddit.com/r/BabyBumps"}],L=[{sourceType:"cr",sourceName:"Consumer Reports",quote:"Testers rated the handlebar cushioning and push-force score in the top 10% of strollers we've tested. Shoulder strain minimal at 4 hours.",linkLabel:"CR Lab Results",href:"https://www.consumerreports.org"},{sourceType:"community",sourceName:"Instagram @mamaofthree",quote:"Honestly the most comfortable stroller I've ever pushed. We've done 5-mile hikes with this thing and I never feel it the next day.",linkLabel:"See post",href:"https://www.instagram.com"}],M=[{sourceType:"community",sourceName:"Reddit r/Strollers",quote:`We live in NYC and walk 6+ miles a day. Never had a complaint — it glides and the handle height is perfect for my 5'10" husband too.`,linkLabel:"See thread",href:"https://www.reddit.com/r/Strollers"},{sourceType:"community",sourceName:"Amazon Review",quote:"My toddler falls asleep on every single walk. Must be comfortable for them too! The ride is smooth even on our bumpy sidewalk.",linkLabel:"See review",href:"https://www.amazon.com"}],G={component:i,title:"Connie/Claim Annotation Card",parameters:{layout:"centered",docs:{description:{component:"Opens when a shopper hovers or tabs to a highlighted claim on a product page. Shows Connie's verdict and the evidence behind it. CR lab evidence and community evidence always sit in separate cards with the source labeled above the quote. Each state has its own icon shape and title, so the verdict never depends on color alone. All data in these stories is synthetic."}}},argTypes:{status:{control:{type:"select"},options:["misleading","verified","verified-community","unable-to-verify"]},onClose:{action:"close"},onAddSources:{action:"add sources"}},args:{claim:"all-day comfort"},decorators:[_=>e.jsx("div",{style:{width:520,maxWidth:"100%"},children:e.jsx(_,{})})]},t={args:{status:"misleading",evidence:k}},o={args:{status:"verified",evidence:L}},a={name:"Community verified",args:{status:"verified-community",evidence:M}},s={name:"Unable to verify",args:{status:"unable-to-verify",evidence:[]}},r={name:"All states",decorators:[()=>e.jsxs(j,{direction:"column",gap:"600",children:[e.jsx(i,{claim:"all-day comfort",status:"misleading",evidence:k,onClose:()=>{}}),e.jsx(i,{claim:"all-day comfort",status:"verified",evidence:L,onClose:()=>{}}),e.jsx(i,{claim:"all-day comfort",status:"verified-community",evidence:M,onClose:()=>{}}),e.jsx(i,{claim:"all-day comfort",status:"unable-to-verify",onClose:()=>{}})]})]};var n,c,d,l,m;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    status: "misleading",
    evidence: MISLEADING_EVIDENCE
  }
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source},description:{story:"CR lab data and community evidence both contradict the claim.",...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.description}}};var u,p,h,f,y;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    status: "verified",
    evidence: VERIFIED_EVIDENCE
  }
}`,...(h=(p=o.parameters)==null?void 0:p.docs)==null?void 0:h.source},description:{story:"CR lab data and community evidence both support the claim.",...(y=(f=o.parameters)==null?void 0:f.docs)==null?void 0:y.description}}};var v,C,g,b,E;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Community verified",
  args: {
    status: "verified-community",
    evidence: COMMUNITY_ONLY_EVIDENCE
  }
}`,...(g=(C=a.parameters)==null?void 0:C.docs)==null?void 0:g.source},description:{story:"No CR test yet, but community evidence agrees. Titled differently so it can't pass for a full verification.",...(E=(b=a.parameters)==null?void 0:b.docs)==null?void 0:E.description}}};var w,I,N,S,V;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Unable to verify",
  args: {
    status: "unable-to-verify",
    evidence: []
  }
}`,...(N=(I=s.parameters)==null?void 0:I.docs)==null?void 0:N.source},description:{story:"Not enough evidence. No evidence cards are shown, only a path to add sources.",...(V=(S=s.parameters)==null?void 0:S.docs)==null?void 0:V.description}}};var A,R,x,T,D;r.parameters={...r.parameters,docs:{...(A=r.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: "All states",
  decorators: [() => <Flex direction="column" gap="600">
        <ClaimAnnotationCard claim="all-day comfort" status="misleading" evidence={MISLEADING_EVIDENCE} onClose={() => {}} />
        <ClaimAnnotationCard claim="all-day comfort" status="verified" evidence={VERIFIED_EVIDENCE} onClose={() => {}} />
        <ClaimAnnotationCard claim="all-day comfort" status="verified-community" evidence={COMMUNITY_ONLY_EVIDENCE} onClose={() => {}} />
        <ClaimAnnotationCard claim="all-day comfort" status="unable-to-verify" onClose={() => {}} />
      </Flex>]
}`,...(x=(R=r.parameters)==null?void 0:R.docs)==null?void 0:x.source},description:{story:"All four states stacked, for comparing icon shape and title at a glance.",...(D=(T=r.parameters)==null?void 0:T.docs)==null?void 0:D.description}}};const z=["Misleading","Verified","CommunityVerified","UnableToVerify","AllStates"];export{r as AllStates,a as CommunityVerified,t as Misleading,s as UnableToVerify,o as Verified,z as __namedExportsOrder,G as default};
