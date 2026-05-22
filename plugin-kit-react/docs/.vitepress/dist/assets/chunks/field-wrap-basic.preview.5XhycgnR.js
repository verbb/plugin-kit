import{j as i}from"./ToggleGroup.0MtzUVUT.js";import{S as l}from"./schema-form-preview-harness.BXJXZRNZ.js";import"./index.TP8L79fr.js";import"./theme.DNhug3om.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.BZBZYJl3.js";import"./docsPreviewHostBridge.DL_aMpn6.js";import"./TiptapEditor.BkQMn9wJ.js";import"./Dialog.7YRbI8Nr.js";import"./EditableTable.WvIa4PmD.js";import"./CheckboxSelect.B4xyaC-0.js";import"./CheckboxInput.D4xOurOK.js";import"./RadioGroup.D1T2rZCi.js";import"./ModalTabs.CYkjLOVM.js";import"./TabsList.DCtVYInX.js";const t=[{$cmp:"FieldWrap",name:"settings",label:"Settings",instructions:"Optional help text.",children:[{$field:"text",name:"settings.title",label:"Title"},{$field:"lightswitch",name:"settings.enabled",label:"Enabled"}]}],e=t[0].children,$={label:"Basic Usage",title:"Basic usage",language:"json",note:"Preview rendered inside a minimal SchemaFormEngine fixture.",code:`{
  "$cmp": "FieldWrap",
  "name": "settings",
  "label": "Settings",
  "instructions": "Optional help text.",
  "children": [
    { "$field": "text", "name": "settings.title", "label": "Title" },
    { "$field": "lightswitch", "name": "settings.enabled", "label": "Enabled" }
  ]
}`,render:()=>i.jsx(l,{schema:t,fieldEntries:[{path:"settings.title",field:e[0]},{path:"settings.enabled",field:e[1]}],defaultValues:{settings:{title:"My Widget",enabled:!0}}})};export{$ as default};
