import{j as i}from"./ToggleGroup.BLEH_C22.js";import{S as l}from"./schema-form-preview-harness.DdeKrtAz.js";import"./index.B510BxOh.js";import"./theme.CX1_AN0S.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.CLB1UT6C.js";import"./docsPreviewHostBridge.Bj6XSM3D.js";import"./TiptapEditor.BaopvQOc.js";import"./Dialog.To6W9sCg.js";import"./EditableTable.Dub150ce.js";import"./CheckboxSelect.7KGy0_nb.js";import"./CheckboxInput.t19nshwM.js";import"./RadioGroup.Bqq_jt3F.js";import"./ModalTabs.BRfNG_ds.js";import"./TabsList.BkDsE5bh.js";const t=[{$cmp:"FieldWrap",name:"settings",label:"Settings",instructions:"Optional help text.",children:[{$field:"text",name:"settings.title",label:"Title"},{$field:"lightswitch",name:"settings.enabled",label:"Enabled"}]}],e=t[0].children,$={label:"Basic Usage",title:"Basic usage",language:"json",note:"Preview rendered inside a minimal SchemaFormEngine fixture.",code:`{
  "$cmp": "FieldWrap",
  "name": "settings",
  "label": "Settings",
  "instructions": "Optional help text.",
  "children": [
    { "$field": "text", "name": "settings.title", "label": "Title" },
    { "$field": "lightswitch", "name": "settings.enabled", "label": "Enabled" }
  ]
}`,render:()=>i.jsx(l,{schema:t,fieldEntries:[{path:"settings.title",field:e[0]},{path:"settings.enabled",field:e[1]}],defaultValues:{settings:{title:"My Widget",enabled:!0}}})};export{$ as default};
