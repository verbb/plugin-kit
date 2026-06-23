import{j as i}from"./ToggleGroup.-Zy9nJcf.js";import{S as l}from"./schema-form-preview-harness.BMzq0N-D.js";import"./index.DwzfNDRZ.js";import"./theme.DBm1QA7y.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.BtPJPmK_.js";import"./docsPreviewHostBridge.DB4xnsPI.js";import"./TiptapEditor.Bp2Sm4dH.js";import"./Dialog.Cwbd3Cu1.js";import"./editorConfig.DbpXyCPM.js";import"./EditableTable.Ci3AzMA7.js";import"./CheckboxSelect.6941WpHT.js";import"./CheckboxInput.COk9X1TN.js";import"./RadioGroup.B9Zb43hd.js";import"./ModalTabs.Bwg-P16C.js";import"./TabsList.C_9Iq2FX.js";const t=[{$cmp:"FieldWrap",name:"settings",label:"Settings",instructions:"Optional help text.",children:[{$field:"text",name:"settings.title",label:"Title"},{$field:"lightswitch",name:"settings.enabled",label:"Enabled"}]}],e=t[0].children,w={label:"Basic Usage",title:"Basic usage",language:"json",note:"Preview rendered inside a minimal SchemaFormEngine fixture.",code:`{
  "$cmp": "FieldWrap",
  "name": "settings",
  "label": "Settings",
  "instructions": "Optional help text.",
  "children": [
    { "$field": "text", "name": "settings.title", "label": "Title" },
    { "$field": "lightswitch", "name": "settings.enabled", "label": "Enabled" }
  ]
}`,render:()=>i.jsx(l,{schema:t,fieldEntries:[{path:"settings.title",field:e[0]},{path:"settings.enabled",field:e[1]}],defaultValues:{settings:{title:"My Widget",enabled:!0}}})};export{w as default};
