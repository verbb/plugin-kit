import{c as t}from"./schema-form-preview-harness.BMzq0N-D.js";import"./ToggleGroup.-Zy9nJcf.js";import"./index.DwzfNDRZ.js";import"./theme.DBm1QA7y.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.BtPJPmK_.js";import"./docsPreviewHostBridge.DB4xnsPI.js";import"./TiptapEditor.Bp2Sm4dH.js";import"./Dialog.Cwbd3Cu1.js";import"./editorConfig.DbpXyCPM.js";import"./EditableTable.Ci3AzMA7.js";import"./CheckboxSelect.6941WpHT.js";import"./CheckboxInput.COk9X1TN.js";import"./RadioGroup.B9Zb43hd.js";import"./ModalTabs.Bwg-P16C.js";import"./TabsList.C_9Iq2FX.js";const i=[{$cmp:"ModalTabs",children:[{$cmp:"ModalTabsList",children:[{$cmp:"ModalTabsTrigger",value:"settings",children:"Settings"},{$cmp:"ModalTabsTrigger",value:"notifications",children:"Notifications"}]},{$cmp:"ModalTabsContent",value:"settings",children:[{$field:"text",name:"title",label:"Title"}]},{$cmp:"ModalTabsContent",value:"notifications",children:[{$field:"lightswitch",name:"notifyTeam",label:"Notify team"}]}]}],$=t({code:`{
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
