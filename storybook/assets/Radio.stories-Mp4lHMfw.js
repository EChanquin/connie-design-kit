import{j as e}from"./jsx-runtime-BO8uF4Og.js";import{av as c,a0 as u,a1 as r}from"./Grid-BROq60ts.js";import"./index-D4H_InIO.js";import"./index-CZVi18Wq.js";import"./index-Dd8bRu6S.js";import"./useMediaQuery-BLMSMJgh.js";const x={component:c,title:"SDS Primitives/Inputs",parameters:{layout:"centered"}},o={name:"Radio Field",args:{},render:i=>e.jsx(u,{children:e.jsx(r,{...i,value:"hello",label:"This is a radio",description:"This is a radio description"})})},a={name:"Radio Group",args:{},render:i=>e.jsxs(u,{label:"Hello",description:"I am a description",...i,onChange:console.log,children:[e.jsx(r,{value:"one",children:"Value one"}),e.jsx(r,{value:"two",children:"Value two"}),e.jsx(r,{value:"three",children:"Value three"})]})};var s,d,n;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: "Radio Field",
  args: {},
  render: args => {
    return <RadioGroup>
        <RadioField {...args} value="hello" label="This is a radio" description="This is a radio description" />
      </RadioGroup>;
  }
}`,...(n=(d=o.parameters)==null?void 0:d.docs)==null?void 0:n.source}}};var l,t,p;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Radio Group",
  args: {},
  render: args => <RadioGroup label="Hello" description="I am a description" {...args} onChange={console.log}>
      <RadioField value="one">Value one</RadioField>
      <RadioField value="two">Value two</RadioField>
      <RadioField value="three">Value three</RadioField>
    </RadioGroup>
}`,...(p=(t=a.parameters)==null?void 0:t.docs)==null?void 0:p.source}}};const G=["StoryRadioField","StoryRadioGroup"];export{o as StoryRadioField,a as StoryRadioGroup,G as __namedExportsOrder,x as default};
