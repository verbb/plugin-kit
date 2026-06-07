import{j as e,B as c}from"./ToggleGroup.BP7HeO0j.js";import{r as i}from"./index.B1Ib6I2w.js";import{u as p,S as g}from"./SchemaFormEngine.B4pTKSX5.js";import"./theme.CdZ75Ngq.js";import"./framework.DV0oQ0OM.js";import"./docsPreviewHostBridge.C_PuUc6M.js";import"./TiptapEditor.5k05OYEl.js";import"./Dialog.BKhaAnr9.js";import"./EditableTable.CnotQZO4.js";import"./CheckboxSelect.B2LJxZkF.js";import"./CheckboxInput.Bo-Dxe1v.js";import"./RadioGroup.DY5pNd4i.js";import"./ModalTabs.DzNSDy-7.js";import"./TabsList.C0gSxhMX.js";const b={width:"100%"},a={marginTop:"16px",marginLeft:"-20px",marginRight:"-20px",marginBottom:"-16px",borderTop:"1px solid rgb(203 213 225)",background:"rgb(248 250 252)"},s={padding:"8px 20px",fontSize:"11px",fontWeight:600,color:"rgb(51 65 85)",borderBottom:"1px solid rgb(203 213 225)"},m={margin:0,padding:"16px 20px 18px",overflowX:"auto",fontFamily:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",fontSize:"12px",lineHeight:1.6,color:"rgb(51 65 85)",whiteSpace:"pre"},r=[{$field:"text",name:"title",label:"Title",instructions:"Required text field",required:!0},{$field:"select",name:"category",label:"Category",required:!0,placeholder:"Select a category",options:[{label:"Select an option",value:""},{label:"Marketing",value:"marketing"},{label:"Product",value:"product"},{label:"Support",value:"support"}]},{$field:"lightswitch",name:"enabled",label:"Enabled",instructions:"Toggle to reveal conditional field."},{$field:"text",name:"notes",label:"Notes",instructions:"Only visible when enabled.",if:"enabled == true"}],f={schema:r,fieldEntries:[{path:"title",field:r[0]},{path:"category",field:r[1]},{path:"enabled",field:r[2]},{path:"notes",field:r[3]}]},n={title:"",category:"",enabled:!1,notes:""};function x(){const t=p({schemaIndex:f,defaultValues:n}),[l,u]=i.useState(null),d=i.useSyncExternalStore(t.store.subscribe.bind(t.store),()=>t.store.state.values||n,()=>n);return i.useEffect(()=>(t.onSubmit(async o=>{u({...o})}),()=>{t.onSubmit(null)}),[t]),e.jsxs("div",{style:b,children:[e.jsxs("form",{className:"grid grid-cols-1 gap-4",onSubmit:o=>{o.preventDefault(),t.handleSubmit()},children:[e.jsx(g,{form:t,withoutForm:!0,className:"grid grid-cols-1 gap-4"}),e.jsx("div",{children:e.jsx(c,{type:"submit",variant:"primary",children:"Submit"})})]}),e.jsxs("div",{style:a,children:[e.jsx("div",{style:s,children:"Form Data (JSON)"}),e.jsx("pre",{style:m,children:JSON.stringify(d,null,2)})]}),l&&e.jsxs("div",{style:a,children:[e.jsx("div",{style:s,children:"Last Submitted Payload"}),e.jsx("pre",{style:m,children:JSON.stringify(l,null,2)})]})]})}const S=`const form = useSchemaFormEngine({
  schemaIndex,
  defaultValues: {
    title: "",
    category: "",
    enabled: false,
    notes: "",
  },
});

useEffect(() => {
  form.onSubmit(async (values) => {
    setSubmittedValues(values);
  });

  return () => {
    form.onSubmit(null);
  };
}, [form]);

return (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      form.handleSubmit();
    }}
    className="grid grid-cols-1 gap-4"
  >
    <SchemaFormEngine form={form} withoutForm className="grid grid-cols-1 gap-4" />

    <Button type="submit" variant="primary">
      Submit
    </Button>
  </form>
);`,P={label:"Working Form Example",title:"Working form example",language:"tsx",note:"Preview includes a native form wrapper, submit button, live values, and submitted payload.",code:S,render:()=>e.jsx(x,{})};export{P as default};
