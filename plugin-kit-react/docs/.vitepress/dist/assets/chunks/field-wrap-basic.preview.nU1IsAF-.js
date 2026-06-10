import{j as i}from"./ToggleGroup.CE2O2VRs.js";import{S as l}from"./schema-form-preview-harness.C3azHaGx.js";import"./index.DuE81Mnq.js";import"./theme.CI5j0Rv3.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.DV2jIGxe.js";import"./docsPreviewHostBridge.o85P6-EV.js";import"./TiptapEditor.CSjtasqC.js";import"./Dialog.CD7wn-UB.js";import"./editorConfig.DhkijSu1.js";import"./EditableTable.tVCJ6vSk.js";import"./CheckboxSelect.BVN21T0E.js";import"./CheckboxInput.CMdpckwo.js";import"./RadioGroup.BRdXGbwy.js";import"./ModalTabs.B3bzyoev.js";import"./TabsList.C6cGQO7b.js";const t=[{$cmp:"FieldWrap",name:"settings",label:"Settings",instructions:"Optional help text.",children:[{$field:"text",name:"settings.title",label:"Title"},{$field:"lightswitch",name:"settings.enabled",label:"Enabled"}]}],e=t[0].children,w={label:"Basic Usage",title:"Basic usage",language:"json",note:"Preview rendered inside a minimal SchemaFormEngine fixture.",code:`{
  "$cmp": "FieldWrap",
  "name": "settings",
  "label": "Settings",
  "instructions": "Optional help text.",
  "children": [
    { "$field": "text", "name": "settings.title", "label": "Title" },
    { "$field": "lightswitch", "name": "settings.enabled", "label": "Enabled" }
  ]
}`,render:()=>i.jsx(l,{schema:t,fieldEntries:[{path:"settings.title",field:e[0]},{path:"settings.enabled",field:e[1]}],defaultValues:{settings:{title:"My Widget",enabled:!0}}})};export{w as default};
