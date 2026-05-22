import{c as t}from"./schema-form-preview-harness.B9kibsJm.js";import"./ToggleGroup.Bz_hd_OE.js";import"./index.D2g0YXLG.js";import"./theme.ap5CT-cp.js";import"./framework.3syO9N_q.js";import"./SchemaFormEngine.R9p4Li7v.js";import"./docsPreviewHostBridge.BFbPtQhW.js";import"./TiptapEditor.C42M-iKO.js";import"./Dialog.Cb2Y5eVh.js";import"./EditableTable.TGU4FJZQ.js";import"./CheckboxSelect.tJ8D1fVm.js";import"./CheckboxInput.7xG0SXX4.js";import"./RadioGroup.D6PK719Q.js";import"./ModalTabs.9hjGlkrM.js";import"./TabsList.FjJctnxH.js";const i=[{$cmp:"ModalTabs",children:[{$cmp:"ModalTabsList",children:[{$cmp:"ModalTabsTrigger",value:"settings",children:"Settings"},{$cmp:"ModalTabsTrigger",value:"notifications",children:"Notifications"}]},{$cmp:"ModalTabsContent",value:"settings",children:[{$field:"text",name:"title",label:"Title"}]},{$cmp:"ModalTabsContent",value:"notifications",children:[{$field:"lightswitch",name:"notifyTeam",label:"Notify team"}]}]}],g=t({code:`{
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
