import{c as t}from"./schema-form-preview-harness.BXJXZRNZ.js";import"./ToggleGroup.0MtzUVUT.js";import"./index.TP8L79fr.js";import"./theme.DNhug3om.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.BZBZYJl3.js";import"./docsPreviewHostBridge.DL_aMpn6.js";import"./TiptapEditor.BkQMn9wJ.js";import"./Dialog.7YRbI8Nr.js";import"./EditableTable.WvIa4PmD.js";import"./CheckboxSelect.B4xyaC-0.js";import"./CheckboxInput.D4xOurOK.js";import"./RadioGroup.D1T2rZCi.js";import"./ModalTabs.CYkjLOVM.js";import"./TabsList.DCtVYInX.js";const i=[{$cmp:"ModalTabs",children:[{$cmp:"ModalTabsList",children:[{$cmp:"ModalTabsTrigger",value:"settings",children:"Settings"},{$cmp:"ModalTabsTrigger",value:"notifications",children:"Notifications"}]},{$cmp:"ModalTabsContent",value:"settings",children:[{$field:"text",name:"title",label:"Title"}]},{$cmp:"ModalTabsContent",value:"notifications",children:[{$field:"lightswitch",name:"notifyTeam",label:"Notify team"}]}]}],g=t({code:`{
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
}`,schema:i,fieldEntries:[{path:"title",field:{$field:"text",name:"title",label:"Title"}},{path:"notifyTeam",field:{$field:"lightswitch",name:"notifyTeam",label:"Notify team"}}],defaultValues:{title:"Contact form",notifyTeam:!0}});export{g as default};
