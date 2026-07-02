import{j as i}from"./ToggleGroup.CF7dP2VC.js";import{S as l}from"./schema-form-preview-harness.xsId8PQ8.js";import"./index.BCWlT2Gm.js";import"./theme.D4mxPBOY.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.D7_q8_83.js";import"./docsPreviewHostBridge.Cs8BkZMr.js";import"./TiptapEditor.CKgfyQpo.js";import"./Dialog.Dy5Lqqja.js";import"./editorConfig.B1JB3OOh.js";import"./EditableTable.BOA4bs9y.js";import"./CheckboxSelect.COPNN7dW.js";import"./CheckboxInput.DlUCSLRm.js";import"./RadioGroup.MLNGQaSq.js";import"./ModalTabs.BQo5ZZFd.js";import"./TabsList.aXkmTjIW.js";const t=[{$cmp:"FieldWrap",name:"settings",label:"Settings",instructions:"Optional help text.",children:[{$field:"text",name:"settings.title",label:"Title"},{$field:"lightswitch",name:"settings.enabled",label:"Enabled"}]}],e=t[0].children,w={label:"Basic Usage",title:"Basic usage",language:"json",note:"Preview rendered inside a minimal SchemaFormEngine fixture.",code:`{
  "$cmp": "FieldWrap",
  "name": "settings",
  "label": "Settings",
  "instructions": "Optional help text.",
  "children": [
    { "$field": "text", "name": "settings.title", "label": "Title" },
    { "$field": "lightswitch", "name": "settings.enabled", "label": "Enabled" }
  ]
}`,render:()=>i.jsx(l,{schema:t,fieldEntries:[{path:"settings.title",field:e[0]},{path:"settings.enabled",field:e[1]}],defaultValues:{settings:{title:"My Widget",enabled:!0}}})};export{w as default};
