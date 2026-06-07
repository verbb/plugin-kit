import{j as i}from"./ToggleGroup.BP7HeO0j.js";import{S as l}from"./schema-form-preview-harness._s-C2lYk.js";import"./index.B1Ib6I2w.js";import"./theme.CdZ75Ngq.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.B4pTKSX5.js";import"./docsPreviewHostBridge.C_PuUc6M.js";import"./TiptapEditor.5k05OYEl.js";import"./Dialog.BKhaAnr9.js";import"./EditableTable.CnotQZO4.js";import"./CheckboxSelect.B2LJxZkF.js";import"./CheckboxInput.Bo-Dxe1v.js";import"./RadioGroup.DY5pNd4i.js";import"./ModalTabs.DzNSDy-7.js";import"./TabsList.C0gSxhMX.js";const t=[{$cmp:"FieldWrap",name:"settings",label:"Settings",instructions:"Optional help text.",children:[{$field:"text",name:"settings.title",label:"Title"},{$field:"lightswitch",name:"settings.enabled",label:"Enabled"}]}],e=t[0].children,$={label:"Basic Usage",title:"Basic usage",language:"json",note:"Preview rendered inside a minimal SchemaFormEngine fixture.",code:`{
  "$cmp": "FieldWrap",
  "name": "settings",
  "label": "Settings",
  "instructions": "Optional help text.",
  "children": [
    { "$field": "text", "name": "settings.title", "label": "Title" },
    { "$field": "lightswitch", "name": "settings.enabled", "label": "Enabled" }
  ]
}`,render:()=>i.jsx(l,{schema:t,fieldEntries:[{path:"settings.title",field:e[0]},{path:"settings.enabled",field:e[1]}],defaultValues:{settings:{title:"My Widget",enabled:!0}}})};export{$ as default};
