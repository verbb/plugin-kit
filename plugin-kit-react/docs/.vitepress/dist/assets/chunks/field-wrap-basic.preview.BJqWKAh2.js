import{j as i}from"./ToggleGroup.ClUpCxpr.js";import{S as l}from"./schema-form-preview-harness.ODPYTut7.js";import"./index.GOAFyOtp.js";import"./theme.8PaQyg6i.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.B_rRzUSG.js";import"./docsPreviewHostBridge.DmF2JYoV.js";import"./TiptapEditor.beYZRenE.js";import"./Dialog.D_A8v2-T.js";import"./editorConfig.CK8qklXG.js";import"./EditableTable.Y_ATBtIc.js";import"./CheckboxSelect.CyVSTEnx.js";import"./CheckboxInput.CNgbcBqk.js";import"./RadioGroup.R2RahrzS.js";import"./ModalTabs.kkhnUshi.js";import"./TabsList.DcZntEFk.js";const t=[{$cmp:"FieldWrap",name:"settings",label:"Settings",instructions:"Optional help text.",children:[{$field:"text",name:"settings.title",label:"Title"},{$field:"lightswitch",name:"settings.enabled",label:"Enabled"}]}],e=t[0].children,w={label:"Basic Usage",title:"Basic usage",language:"json",note:"Preview rendered inside a minimal SchemaFormEngine fixture.",code:`{
  "$cmp": "FieldWrap",
  "name": "settings",
  "label": "Settings",
  "instructions": "Optional help text.",
  "children": [
    { "$field": "text", "name": "settings.title", "label": "Title" },
    { "$field": "lightswitch", "name": "settings.enabled", "label": "Enabled" }
  ]
}`,render:()=>i.jsx(l,{schema:t,fieldEntries:[{path:"settings.title",field:e[0]},{path:"settings.enabled",field:e[1]}],defaultValues:{settings:{title:"My Widget",enabled:!0}}})};export{w as default};
