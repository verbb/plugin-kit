import{c as t}from"./schema-form-preview-harness.ODPYTut7.js";import"./ToggleGroup.ClUpCxpr.js";import"./index.GOAFyOtp.js";import"./theme.8PaQyg6i.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.B_rRzUSG.js";import"./docsPreviewHostBridge.DmF2JYoV.js";import"./TiptapEditor.beYZRenE.js";import"./Dialog.D_A8v2-T.js";import"./editorConfig.CK8qklXG.js";import"./EditableTable.Y_ATBtIc.js";import"./CheckboxSelect.CyVSTEnx.js";import"./CheckboxInput.CNgbcBqk.js";import"./RadioGroup.R2RahrzS.js";import"./ModalTabs.kkhnUshi.js";import"./TabsList.DcZntEFk.js";const i=[{$cmp:"ModalTabs",children:[{$cmp:"ModalTabsList",children:[{$cmp:"ModalTabsTrigger",value:"settings",children:"Settings"},{$cmp:"ModalTabsTrigger",value:"notifications",children:"Notifications"}]},{$cmp:"ModalTabsContent",value:"settings",children:[{$field:"text",name:"title",label:"Title"}]},{$cmp:"ModalTabsContent",value:"notifications",children:[{$field:"lightswitch",name:"notifyTeam",label:"Notify team"}]}]}],$=t({code:`{
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
