import{c as t}from"./schema-form-preview-harness.BJm_7L5v.js";import"./ToggleGroup.CbXzrbf8.js";import"./index.D7EAvD9_.js";import"./theme.WRvqWW7S.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.DLfv9yq2.js";import"./docsPreviewHostBridge.Ciw0LMoz.js";import"./TiptapEditor.DLdBbQOf.js";import"./Dialog.NzRojvFD.js";import"./editorConfig.D5J106ci.js";import"./EditableTable.BR55jdkh.js";import"./CheckboxSelect.CiPTn6Qq.js";import"./CheckboxInput.CS8vLSA1.js";import"./RadioGroup.DGwgqqDM.js";import"./ModalTabs.BYVj2zdJ.js";import"./TabsList.CaFkzZ-V.js";const i=[{$cmp:"ModalTabs",children:[{$cmp:"ModalTabsList",children:[{$cmp:"ModalTabsTrigger",value:"settings",children:"Settings"},{$cmp:"ModalTabsTrigger",value:"notifications",children:"Notifications"}]},{$cmp:"ModalTabsContent",value:"settings",children:[{$field:"text",name:"title",label:"Title"}]},{$cmp:"ModalTabsContent",value:"notifications",children:[{$field:"lightswitch",name:"notifyTeam",label:"Notify team"}]}]}],$=t({code:`{
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
