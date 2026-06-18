import{j as i}from"./ToggleGroup.BIz7NcRf.js";import{S as l}from"./schema-form-preview-harness.7v5c5koG.js";import"./index.BvSkjRqb.js";import"./theme.DDPH3nCY.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.DJJ2Wd4_.js";import"./docsPreviewHostBridge.0AjrYZau.js";import"./TiptapEditor.Cm96rMm5.js";import"./Dialog.DjcTfUtG.js";import"./editorConfig.B9KVnR8B.js";import"./EditableTable.ChzgrW99.js";import"./CheckboxSelect.le9SOUDA.js";import"./CheckboxInput.DKWGRcJ-.js";import"./RadioGroup.CSYD_IZj.js";import"./ModalTabs.DI-c9dIX.js";import"./TabsList.qE8E8qBO.js";const t=[{$cmp:"FieldWrap",name:"settings",label:"Settings",instructions:"Optional help text.",children:[{$field:"text",name:"settings.title",label:"Title"},{$field:"lightswitch",name:"settings.enabled",label:"Enabled"}]}],e=t[0].children,w={label:"Basic Usage",title:"Basic usage",language:"json",note:"Preview rendered inside a minimal SchemaFormEngine fixture.",code:`{
  "$cmp": "FieldWrap",
  "name": "settings",
  "label": "Settings",
  "instructions": "Optional help text.",
  "children": [
    { "$field": "text", "name": "settings.title", "label": "Title" },
    { "$field": "lightswitch", "name": "settings.enabled", "label": "Enabled" }
  ]
}`,render:()=>i.jsx(l,{schema:t,fieldEntries:[{path:"settings.title",field:e[0]},{path:"settings.enabled",field:e[1]}],defaultValues:{settings:{title:"My Widget",enabled:!0}}})};export{w as default};
