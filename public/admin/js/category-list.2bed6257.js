(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["category-list"],{"1b69":function(e,t,n){},"24c2":function(e,t,n){"use strict";var r=n("1b69"),i=n.n(r);i.a},e83f:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-card",{staticClass:"box-card"},[n("div",{attrs:{slot:"header"},slot:"header"},[n("span",[e._v("分类列表")])]),n("el-tree",{ref:"tree",attrs:{"node-key":"id",load:e.loadNode,"default-expanded-keys":[0],"highlight-current":"",lazy:"",props:e.defaultProps},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.node,i=t.data;return n("span",{staticClass:"custom-tree-node"},[n("span",[e._v(e._s(r.label))]),n("span",[n("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(t){return t.stopPropagation(),e.openEditModal(r,i)}}},[e._v(" 编辑 ")]),n("el-button",{attrs:{type:"text",icon:"el-icon-circle-plus-outline"},on:{click:function(t){return t.stopPropagation(),e.openInsertModal(r,i)}}},[e._v(" 添加 ")]),n("el-button",{attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(t){return t.stopPropagation(),e.openRemoveModal(r,i)}}},[e._v(" 删除 ")])],1)])}}])})],1),n("el-dialog",{attrs:{title:"添加分类",visible:e.insert_visible,width:"40%"},on:{"update:visible":function(t){e.insert_visible=t}}},[n("el-form",{ref:"insertForm",attrs:{model:e.insert_form,rules:e.rules,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"分类名称",prop:"name"}},[n("el-input",{model:{value:e.insert_form.name,callback:function(t){e.$set(e.insert_form,"name",t)},expression:"insert_form.name"}})],1)],1),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.insert_visible=!1}}},[e._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleInsert("insertForm")}}},[e._v("确 定")])],1)],1),n("el-dialog",{attrs:{title:"编辑分类",visible:e.edit_visible,width:"40%"},on:{"update:visible":function(t){e.edit_visible=t}}},[n("el-form",{ref:"editForm",attrs:{model:e.edit_form,rules:e.rules,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"分类名称",prop:"name"}},[n("el-input",{model:{value:e.edit_form.name,callback:function(t){e.$set(e.edit_form,"name",t)},expression:"edit_form.name"}})],1)],1),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.edit_visible=!1}}},[e._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleEdit("editForm")}}},[e._v("确 定")])],1)],1)],1)},i=[],a=n("5530"),s=(n("96cf"),n("1da1")),o=n("365c"),l={name:"List",data:function(){return{defaultProps:{label:"name"},insert_form:{name:"",parent_id:""},edit_form:{id:"",name:"",parent_id:""},rules:{name:[{required:!0,message:"请输入分类名称",trigger:"blur"}]},node:{},insert_visible:!1,edit_visible:!1}},created:function(){document.title="分类列表"},methods:{loadNode:function(e,t){return Object(s["a"])(regeneratorRuntime.mark((function n(){var r,i,a,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(0!==e.level){n.next=2;break}return n.abrupt("return",t([{name:"全部分类",id:0}]));case 2:return r=e.data.id,n.next=5,o["c"].subcate({id:r});case 5:i=n.sent,a=i.status,s=i.data,a&&t(s);case 9:case"end":return n.stop()}}),n)})))()},openEditModal:function(e,t){this.node=e,this.edit_form=Object(a["a"])({},t),this.edit_visible=!0},handleEdit:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(n){var r,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!n){e.next=7;break}return e.next=3,o["c"].edit(Object(a["a"])({},t.edit_form));case 3:r=e.sent,i=r.status,s=r.msg,i?(t.$message.success(s),t.edit_visible=!1,t.node.data=t.edit_form):t.$message.error(s);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},openInsertModal:function(e,t){this.insert_form.parent_id=t.id,this.node=e,this.insert_visible=!0},handleInsert:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(n){var r,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!n){e.next=8;break}return e.next=3,o["c"].insert(Object(a["a"])({},t.insert_form));case 3:r=e.sent,i=r.status,r.msg,s=r.data,i&&(t.insert_visible=!1,t.$refs.tree.append(Object(a["a"])({},t.insert_form,{},s),t.node));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},openRemoveModal:function(e,t){var n=this;this.$confirm("确定要删除此分类吗？",{type:"warning"}).then(Object(s["a"])(regeneratorRuntime.mark((function e(){var r,i,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["c"].remove({id:t.id});case 2:r=e.sent,i=r.status,a=r.msg,i?(n.$refs.tree.remove(t),n.$message.success(a)):n.$message.error(a);case 6:case"end":return e.stop()}}),e)})))).catch((function(){n.$message.info("取消成功！")}))}}},c=l,u=(n("24c2"),n("2877")),d=Object(u["a"])(c,r,i,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=category-list.2bed6257.js.map