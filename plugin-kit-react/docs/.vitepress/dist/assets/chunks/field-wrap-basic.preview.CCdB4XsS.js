import{j as i}from"./ToggleGroup.Bz_hd_OE.js";import{S as l}from"./schema-form-preview-harness.B9kibsJm.js";import"./index.D2g0YXLG.js";import"./theme.ap5CT-cp.js";import"./framework.3syO9N_q.js";import"./SchemaFormEngine.R9p4Li7v.js";import"./docsPreviewHostBridge.BFbPtQhW.js";import"./TiptapEditor.C42M-iKO.js";import"./Dialog.Cb2Y5eVh.js";import"./EditableTable.TGU4FJZQ.js";import"./CheckboxSelect.tJ8D1fVm.js";import"./CheckboxInput.7xG0SXX4.js";import"./RadioGroup.D6PK719Q.js";import"./ModalTabs.9hjGlkrM.js";import"./TabsList.FjJctnxH.js";const t=[{$cmp:"FieldWrap",name:"settings",label:"Settings",instructions:"Optional help text.",children:[{$field:"text",name:"settings.title",label:"Title"},{$field:"lightswitch",name:"settings.enabled",label:"Enabled"}]}],e=t[0].children,$={label:"Basic Usage",title:"Basic usage",language:"json",note:"Preview rendered inside a minimal SchemaFormEngine fixture.",code:`{
  "$cmp": "FieldWrap",
  "name": "settings",
  "label": "Settings",
  "instructions": "Optional help text.",
  "children": [
    { "$field": "text", "name": "settings.title", "label": "Title" },
    { "$field": "lightswitch", "name": "settings.enabled", "label": "Enabled" }
  ]
}`,render:()=>i.jsx(l,{schema:t,fieldEntries:[{path:"settings.title",field:e[0]},{path:"settings.enabled",field:e[1]}],defaultValues:{settings:{title:"My Widget",enabled:!0}}})};export{$ as default};
