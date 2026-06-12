import{j as i}from"./ToggleGroup.C0MNVu4i.js";import{S as l}from"./schema-form-preview-harness.YJX_1m-8.js";import"./index.LyJX7yhU.js";import"./theme.vxErVau2.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.iCZiZzk3.js";import"./docsPreviewHostBridge.vLIAuktJ.js";import"./TiptapEditor.DGqj65hJ.js";import"./Dialog.DBim0Y2b.js";import"./editorConfig.DPpLIOU2.js";import"./EditableTable.BGd6L7DE.js";import"./CheckboxSelect.DrmbU1_Q.js";import"./CheckboxInput.CTuSJWKz.js";import"./RadioGroup.PilIJcMZ.js";import"./ModalTabs.BBx3P0yG.js";import"./TabsList.Dn2BbABS.js";const t=[{$cmp:"FieldWrap",name:"settings",label:"Settings",instructions:"Optional help text.",children:[{$field:"text",name:"settings.title",label:"Title"},{$field:"lightswitch",name:"settings.enabled",label:"Enabled"}]}],e=t[0].children,w={label:"Basic Usage",title:"Basic usage",language:"json",note:"Preview rendered inside a minimal SchemaFormEngine fixture.",code:`{
  "$cmp": "FieldWrap",
  "name": "settings",
  "label": "Settings",
  "instructions": "Optional help text.",
  "children": [
    { "$field": "text", "name": "settings.title", "label": "Title" },
    { "$field": "lightswitch", "name": "settings.enabled", "label": "Enabled" }
  ]
}`,render:()=>i.jsx(l,{schema:t,fieldEntries:[{path:"settings.title",field:e[0]},{path:"settings.enabled",field:e[1]}],defaultValues:{settings:{title:"My Widget",enabled:!0}}})};export{w as default};
