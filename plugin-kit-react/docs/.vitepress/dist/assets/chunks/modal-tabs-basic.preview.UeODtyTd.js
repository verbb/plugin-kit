import{c as t}from"./schema-form-preview-harness.YJX_1m-8.js";import"./ToggleGroup.C0MNVu4i.js";import"./index.LyJX7yhU.js";import"./theme.vxErVau2.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.iCZiZzk3.js";import"./docsPreviewHostBridge.vLIAuktJ.js";import"./TiptapEditor.DGqj65hJ.js";import"./Dialog.DBim0Y2b.js";import"./editorConfig.DPpLIOU2.js";import"./EditableTable.BGd6L7DE.js";import"./CheckboxSelect.DrmbU1_Q.js";import"./CheckboxInput.CTuSJWKz.js";import"./RadioGroup.PilIJcMZ.js";import"./ModalTabs.BBx3P0yG.js";import"./TabsList.Dn2BbABS.js";const i=[{$cmp:"ModalTabs",children:[{$cmp:"ModalTabsList",children:[{$cmp:"ModalTabsTrigger",value:"settings",children:"Settings"},{$cmp:"ModalTabsTrigger",value:"notifications",children:"Notifications"}]},{$cmp:"ModalTabsContent",value:"settings",children:[{$field:"text",name:"title",label:"Title"}]},{$cmp:"ModalTabsContent",value:"notifications",children:[{$field:"lightswitch",name:"notifyTeam",label:"Notify team"}]}]}],$=t({code:`{
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
