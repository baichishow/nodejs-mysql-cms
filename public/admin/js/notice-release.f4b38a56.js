(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["notice-release"],{"406f":function(e,t,r){"use strict";var o=r("8443"),a=r.n(o);a.a},8443:function(e,t,r){},9865:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-card",{staticClass:"box-card"},[r("div",{attrs:{slot:"header"},slot:"header"},[r("span",[e._v("发布公告")])]),r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"标题",prop:"title"}},[r("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),r("el-form-item",{attrs:{label:"置顶",prop:"is_sticky"}},[r("el-radio",{attrs:{label:1},model:{value:e.form.is_sticky,callback:function(t){e.$set(e.form,"is_sticky",t)},expression:"form.is_sticky"}},[e._v("是")]),r("el-radio",{attrs:{label:0},model:{value:e.form.is_sticky,callback:function(t){e.$set(e.form,"is_sticky",t)},expression:"form.is_sticky"}},[e._v("否")])],1),r("el-form-item",{attrs:{label:"内容",prop:"content"}},[r("div",{staticClass:"editor-box"},[r("Toolbar",{staticClass:"tool-bar",attrs:{editor:e.editor,defaultConfig:e.toolbarConfig,mode:e.mode}}),r("Editor",{staticClass:"editor",attrs:{defaultConfig:e.editorConfig,mode:e.mode},on:{onCreated:e.handleEditorCreated},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1)]),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("发布公告")])],1)],1)],1)],1)},a=[],i=(r("af93"),r("ac1f"),r("5319"),r("96cf"),r("1da1")),s=r("365c"),n=(r("560e"),r("4e15")),l={name:"Release",components:{Editor:n["a"],Toolbar:n["b"]},data:function(){return{form:{title:"",is_sticky:1,content:""},editor:null,toolbarConfig:{},mode:"default",editorConfig:{placeholder:"请输入内容...",MENU_CONF:{uploadImage:{server:"/upload/editor/",fieldName:"file",headers:{Authorization:"Bearer ".concat(sessionStorage.token)}}}},rules:{title:[{type:"string",required:!0,message:"请输入公告标题",trigger:"blur"},{min:2,max:40,message:"公告标题长度在 2 到 40 个字符",trigger:"blur"}],is_sticky:[{type:"number",required:!0,message:"请选择是否置顶",trigger:"change"}],content:[{type:"string",required:!0,message:"请填写公告内容",trigger:"blur"}]}}},created:function(){document.title="发布公告"},methods:{handleEditorCreated:function(e){this.editor=Object.seal(e)},handleSubmit:function(){var e=this;this.$refs.form.validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(r){var o,a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!r){t.next=7;break}return t.next=3,s["g"].release(e.form);case 3:o=t.sent,a=o.status,i=o.msg,a?(e.$message.success(i),e.$router.replace("/notice/list")):e.$message.error(i);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}},c=l,d=(r("406f"),r("2877")),u=Object(d["a"])(c,o,a,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=notice-release.f4b38a56.js.map