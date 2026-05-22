import{j as i}from"./ToggleGroup.CDbN-DRa.js";import{S as l}from"./schema-form-preview-harness.doCr_Hty.js";import"./index.f8jfD1G1.js";import"./theme.B18BPMll.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.0OoSM8ns.js";import"./docsPreviewHostBridge.By8Jgv1J.js";import"./TiptapEditor.ddjMhkE_.js";import"./Dialog.C1h8B7to.js";import"./EditableTable.ClatKWwp.js";import"./CheckboxSelect.D4awVaao.js";import"./CheckboxInput.CCf2-wBQ.js";import"./RadioGroup.CBqIFkYR.js";import"./ModalTabs.Ca9cfBnW.js";import"./TabsList.Ik3_m_yG.js";const t=[{$cmp:"FieldWrap",name:"settings",label:"Settings",instructions:"Optional help text.",children:[{$field:"text",name:"settings.title",label:"Title"},{$field:"lightswitch",name:"settings.enabled",label:"Enabled"}]}],e=t[0].children,$={label:"Basic Usage",title:"Basic usage",language:"json",note:"Preview rendered inside a minimal SchemaFormEngine fixture.",code:`{
  "$cmp": "FieldWrap",
  "name": "settings",
  "label": "Settings",
  "instructions": "Optional help text.",
  "children": [
    { "$field": "text", "name": "settings.title", "label": "Title" },
    { "$field": "lightswitch", "name": "settings.enabled", "label": "Enabled" }
  ]
}`,render:()=>i.jsx(l,{schema:t,fieldEntries:[{path:"settings.title",field:e[0]},{path:"settings.enabled",field:e[1]}],defaultValues:{settings:{title:"My Widget",enabled:!0}}})};export{$ as default};
