import{c as t}from"./schema-form-preview-harness.doCr_Hty.js";import"./ToggleGroup.CDbN-DRa.js";import"./index.f8jfD1G1.js";import"./theme.B18BPMll.js";import"./framework.DV0oQ0OM.js";import"./SchemaFormEngine.0OoSM8ns.js";import"./docsPreviewHostBridge.By8Jgv1J.js";import"./TiptapEditor.ddjMhkE_.js";import"./Dialog.C1h8B7to.js";import"./EditableTable.ClatKWwp.js";import"./CheckboxSelect.D4awVaao.js";import"./CheckboxInput.CCf2-wBQ.js";import"./RadioGroup.CBqIFkYR.js";import"./ModalTabs.Ca9cfBnW.js";import"./TabsList.Ik3_m_yG.js";const i=[{$cmp:"ModalTabs",children:[{$cmp:"ModalTabsList",children:[{$cmp:"ModalTabsTrigger",value:"settings",children:"Settings"},{$cmp:"ModalTabsTrigger",value:"notifications",children:"Notifications"}]},{$cmp:"ModalTabsContent",value:"settings",children:[{$field:"text",name:"title",label:"Title"}]},{$cmp:"ModalTabsContent",value:"notifications",children:[{$field:"lightswitch",name:"notifyTeam",label:"Notify team"}]}]}],g=t({code:`{
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
