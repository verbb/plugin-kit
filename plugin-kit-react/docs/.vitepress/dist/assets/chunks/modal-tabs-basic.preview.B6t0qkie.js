import{c as t}from"./schema-form-preview-harness.DdeKrtAz.js";import"./ToggleGroup.BLEH_C22.js";import"./index.B510BxOh.js";import"./theme.CX1_AN0S.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.CLB1UT6C.js";import"./docsPreviewHostBridge.Bj6XSM3D.js";import"./TiptapEditor.BaopvQOc.js";import"./Dialog.To6W9sCg.js";import"./EditableTable.Dub150ce.js";import"./CheckboxSelect.7KGy0_nb.js";import"./CheckboxInput.t19nshwM.js";import"./RadioGroup.Bqq_jt3F.js";import"./ModalTabs.BRfNG_ds.js";import"./TabsList.BkDsE5bh.js";const i=[{$cmp:"ModalTabs",children:[{$cmp:"ModalTabsList",children:[{$cmp:"ModalTabsTrigger",value:"settings",children:"Settings"},{$cmp:"ModalTabsTrigger",value:"notifications",children:"Notifications"}]},{$cmp:"ModalTabsContent",value:"settings",children:[{$field:"text",name:"title",label:"Title"}]},{$cmp:"ModalTabsContent",value:"notifications",children:[{$field:"lightswitch",name:"notifyTeam",label:"Notify team"}]}]}],g=t({code:`{
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
