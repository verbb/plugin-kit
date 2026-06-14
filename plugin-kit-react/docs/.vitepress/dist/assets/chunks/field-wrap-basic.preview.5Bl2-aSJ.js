import{j as i}from"./ToggleGroup.CbXzrbf8.js";import{S as l}from"./schema-form-preview-harness.BJm_7L5v.js";import"./index.D7EAvD9_.js";import"./theme.WRvqWW7S.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.DLfv9yq2.js";import"./docsPreviewHostBridge.Ciw0LMoz.js";import"./TiptapEditor.DLdBbQOf.js";import"./Dialog.NzRojvFD.js";import"./editorConfig.D5J106ci.js";import"./EditableTable.BR55jdkh.js";import"./CheckboxSelect.CiPTn6Qq.js";import"./CheckboxInput.CS8vLSA1.js";import"./RadioGroup.DGwgqqDM.js";import"./ModalTabs.BYVj2zdJ.js";import"./TabsList.CaFkzZ-V.js";const t=[{$cmp:"FieldWrap",name:"settings",label:"Settings",instructions:"Optional help text.",children:[{$field:"text",name:"settings.title",label:"Title"},{$field:"lightswitch",name:"settings.enabled",label:"Enabled"}]}],e=t[0].children,w={label:"Basic Usage",title:"Basic usage",language:"json",note:"Preview rendered inside a minimal SchemaFormEngine fixture.",code:`{
  "$cmp": "FieldWrap",
  "name": "settings",
  "label": "Settings",
  "instructions": "Optional help text.",
  "children": [
    { "$field": "text", "name": "settings.title", "label": "Title" },
    { "$field": "lightswitch", "name": "settings.enabled", "label": "Enabled" }
  ]
}`,render:()=>i.jsx(l,{schema:t,fieldEntries:[{path:"settings.title",field:e[0]},{path:"settings.enabled",field:e[1]}],defaultValues:{settings:{title:"My Widget",enabled:!0}}})};export{w as default};
