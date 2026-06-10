import{c as t}from"./schema-form-preview-harness.C3azHaGx.js";import"./ToggleGroup.CE2O2VRs.js";import"./index.DuE81Mnq.js";import"./theme.CI5j0Rv3.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.DV2jIGxe.js";import"./docsPreviewHostBridge.o85P6-EV.js";import"./TiptapEditor.CSjtasqC.js";import"./Dialog.CD7wn-UB.js";import"./editorConfig.DhkijSu1.js";import"./EditableTable.tVCJ6vSk.js";import"./CheckboxSelect.BVN21T0E.js";import"./CheckboxInput.CMdpckwo.js";import"./RadioGroup.BRdXGbwy.js";import"./ModalTabs.B3bzyoev.js";import"./TabsList.C6cGQO7b.js";const i=[{$cmp:"ModalTabs",children:[{$cmp:"ModalTabsList",children:[{$cmp:"ModalTabsTrigger",value:"settings",children:"Settings"},{$cmp:"ModalTabsTrigger",value:"notifications",children:"Notifications"}]},{$cmp:"ModalTabsContent",value:"settings",children:[{$field:"text",name:"title",label:"Title"}]},{$cmp:"ModalTabsContent",value:"notifications",children:[{$field:"lightswitch",name:"notifyTeam",label:"Notify team"}]}]}],$=t({code:`{
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
