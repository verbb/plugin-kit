import{c as t}from"./schema-form-preview-harness._s-C2lYk.js";import"./ToggleGroup.BP7HeO0j.js";import"./index.B1Ib6I2w.js";import"./theme.CdZ75Ngq.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.B4pTKSX5.js";import"./docsPreviewHostBridge.C_PuUc6M.js";import"./TiptapEditor.5k05OYEl.js";import"./Dialog.BKhaAnr9.js";import"./EditableTable.CnotQZO4.js";import"./CheckboxSelect.B2LJxZkF.js";import"./CheckboxInput.Bo-Dxe1v.js";import"./RadioGroup.DY5pNd4i.js";import"./ModalTabs.DzNSDy-7.js";import"./TabsList.C0gSxhMX.js";const i=[{$cmp:"ModalTabs",children:[{$cmp:"ModalTabsList",children:[{$cmp:"ModalTabsTrigger",value:"settings",children:"Settings"},{$cmp:"ModalTabsTrigger",value:"notifications",children:"Notifications"}]},{$cmp:"ModalTabsContent",value:"settings",children:[{$field:"text",name:"title",label:"Title"}]},{$cmp:"ModalTabsContent",value:"notifications",children:[{$field:"lightswitch",name:"notifyTeam",label:"Notify team"}]}]}],g=t({code:`{
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
