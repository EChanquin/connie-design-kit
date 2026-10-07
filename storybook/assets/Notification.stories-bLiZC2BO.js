import{j as e}from"./jsx-runtime-BO8uF4Og.js";import{am as i,an as m,b as c,f as p,u as g,ao as u}from"./Grid-BWzH_FWd.js";import"./index-D4H_InIO.js";import"./index-CZVi18Wq.js";import"./index-Dd8bRu6S.js";import"./useMediaQuery-BLMSMJgh.js";const h={component:i,title:"SDS Primitives/Notification",parameters:{layout:"centered"}},t={name:"Notification",args:{isDismissible:!0,"[type]":"message"},argTypes:{"[type]":{control:{type:"select"},options:["message","alert"]}},render:({"[type]":s,...r})=>{const l=s==="message"?"message":"alert";return e.jsxs(i,{...r,variant:l,icon:e.jsx(u,{size:"20"}),children:[e.jsx(m,{children:"Notification Title"}),e.jsx(c,{children:"Hello there! This is a message"}),s==="message"?e.jsx(p,{size:"small",children:"Hello"}):e.jsx(g,{size:"small",children:"Hello"})]})}};var n,o,a;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Notification",
  args: {
    isDismissible: true,
    "[type]": "message"
  },
  argTypes: {
    "[type]": {
      control: {
        type: "select"
      },
      options: ["message", "alert"]
    }
  },
  render: ({
    "[type]": _type,
    ...args
  }) => {
    const variant = _type === "message" ? "message" : "alert";
    return <Notification {...args} variant={variant} icon={<IconInfo size="20" />}>
        <TextStrong>Notification Title</TextStrong>
        <Text>Hello there! This is a message</Text>
        {_type === "message" ? <Button size="small">Hello</Button> : <ButtonDanger size="small">Hello</ButtonDanger>}
      </Notification>;
  }
}`,...(a=(o=t.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const j=["StoryNotification"];export{t as StoryNotification,j as __namedExportsOrder,h as default};
