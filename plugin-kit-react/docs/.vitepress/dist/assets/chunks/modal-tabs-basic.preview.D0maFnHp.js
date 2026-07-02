import{c as t}from"./schema-form-preview-harness.xsId8PQ8.js";import"./ToggleGroup.CF7dP2VC.js";import"./index.BCWlT2Gm.js";import"./theme.D4mxPBOY.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.D7_q8_83.js";import"./docsPreviewHostBridge.Cs8BkZMr.js";import"./TiptapEditor.CKgfyQpo.js";import"./Dialog.Dy5Lqqja.js";import"./editorConfig.B1JB3OOh.js";import"./EditableTable.BOA4bs9y.js";import"./CheckboxSelect.COPNN7dW.js";import"./CheckboxInput.DlUCSLRm.js";import"./RadioGroup.MLNGQaSq.js";import"./ModalTabs.BQo5ZZFd.js";import"./TabsList.aXkmTjIW.js";const i=[{$cmp:"ModalTabs",children:[{$cmp:"ModalTabsList",children:[{$cmp:"ModalTabsTrigger",value:"settings",children:"Settings"},{$cmp:"ModalTabsTrigger",value:"notifications",children:"Notifications"}]},{$cmp:"ModalTabsContent",value:"settings",children:[{$field:"text",name:"title",label:"Title"}]},{$cmp:"ModalTabsContent",value:"notifications",children:[{$field:"lightswitch",name:"notifyTeam",label:"Notify team"}]}]}],$=t({code:`{
  "$cmp": "ModalTabs",
  "children": [
    {
      "$cmp": "ModalTabsList",
      "children": [
        { "$cmp": "ModalTabsTrigger", "value": "settings", "children": "Settings" },
        { "$cmp": "ModalTabsTrigger", "value": "notifications", "children": "Notifications" }
      ]
    },
    {
      "$cmp": "ModalTabsContent",
      "value": "settings",
      "children": [{ "$field": "text", "name": "title", "label": "Title" }]
    }
  ]
}`,schema:i,fieldEntries:[{path:"title",field:{$field:"text",name:"title",label:"Title"}},{path:"notifyTeam",field:{$field:"lightswitch",name:"notifyTeam",label:"Notify team"}}],defaultValues:{title:"Contact form",notifyTeam:!0}});export{$ as default};
