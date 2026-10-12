import{r as e}from"./rolldown-runtime-C0FnF6B9.js";import{B as t,V as n,b as r}from"./sys-DMfyjLlT.js";import{t as i}from"./pagination-DVzefm8X.js";function a(e){return e.replace(/[A-Z]/g,e=>`_${e.toLowerCase()}`)}function o(e){let t={};return Object.entries(e||{}).forEach(([e,n])=>{t[a(e)]=n}),t}function s(e){return e&&e in u?e:void 0}function c(e){return!Array.isArray(e)&&typeof e==`object`&&!!e}function l(e,t){let n=e.map(e=>({col:e.col,op:s(e.op),val:e.val}));return t?n.map(e=>({...e,col:f(e.col)})):n}var u={eq:(e,t,n)=>e.eq(t,n),neq:(e,t,n)=>e.neq(t,n),gt:(e,t,n)=>e.gt(t,n),gte:(e,t,n)=>e.gte(t,n),lt:(e,t,n)=>e.lt(t,n),lte:(e,t,n)=>e.lte(t,n),like:(e,t,n)=>e.like(t,String(n)),ilike:(e,t,n)=>e.ilike(t,String(n)),is:(e,t,n)=>e.is(t,n),in:(e,t,n)=>e.in(t,Array.isArray(n)?n:[n]),contains:(e,t,n)=>e.contains(t,n),containedBy:(e,t,n)=>e.containedBy(t,n),overlaps:(e,t,n)=>e.overlaps(t,n),textSearch:(e,t,n)=>e.textSearch(t,String(n))};function d(e,t,n={}){let{skipEmpty:r=!0,camelToSnake:i=!0}=n;return(Array.isArray(t)?l(t,i):Object.entries(i?o(t):t).map(([e,t])=>c(t)?{col:e,op:s(t.op),val:t.val}:{col:e,op:`eq`,val:t})).forEach(({col:t,op:n=`eq`,val:i})=>{i!=null&&(r&&typeof i==`string`&&i.trim()===``||(e=(u[n]??u.eq)(e,t,i)))}),e}function f(e){return e.replace(/[A-Z]/g,e=>`_${e.toLowerCase()}`)}var p=e({deleteResource:()=>S,fetchGetDictList:()=>v,fetchGetDictListByTypeCode:()=>y,fetchGetResourceList:()=>b,renameResource:()=>x}),{supabase:m,keysToSnakeDeep:h,responseHandle:g}=n(),_=500;new r({idKey:`id`,parentKey:`parentId`,childrenKey:`children`});async function v(){return await i(({from:e,to:t})=>{let n=m.from(`sys_dictionary`).select(`
          id,
          type_id,
          code,
          label,
          value,
          status,
          sort,
          color,
          tag_type,
          remark,
          parent_id,
          cascade_parent_id,
          dict_type_table:sys_dict_type!inner(
            code,
            name
          )
        `).eq(`status`,`1`).eq(`dict_type_table.status`,`1`).order(`sort`,{ascending:!0}).order(`id`,{ascending:!0}).range(e,t);return g(()=>n,{})},{pageSize:_})}async function y(e){return await g(()=>m.from(`sys_dictionary`).select(`
          id,
          type_id,
          code,
          label,
          value,
          status,
          sort,
          color,
          tag_type,
          remark,
          parent_id,
          cascade_parent_id,
          dict_type_table:sys_dict_type!inner(
            code,
            name
          )
        `).eq(`status`,`1`).eq(`dict_type_table.status`,`1`).eq(`dict_type_table.code`,e).order(`sort`,{ascending:!0}).order(`id`,{ascending:!0}),{})}async function b(e){let{originName:t=``,suffix:n=``,from:r=0,to:i=9}=e,a=[{col:`originName`,op:`ilike`,val:`%${t}%`}];if(n){let e=n.split(`,`).map(e=>e.trim()).filter(e=>e.length>0);e.length>0&&a.push({col:`suffix`,op:`in`,val:e})}let o=m.from(`sys_attachment`).select(`*`,{count:`exact`}).order(`create_time`,{ascending:!1}).range(r,i);return o=d(o,a,{skipEmpty:!0,camelToSnake:!0}),await g(()=>o,{showErrorMessage:!0})}async function x(e){let{id:n,originName:r}=e;return await g(()=>m.from(`sys_attachment`).update({origin_name:r},{count:`exact`}).eq(`id`,n),{breakReturn:!0,requireAffected:!0,noAffectedMessage:t,errorMessage:`附件重命名失败，请稍后重试`})}async function S(e){let{id:n}=e,{data:r}=await g(()=>m.from(`sys_attachment`).select().eq(`id`,n).single(),{});if(!r)throw Error(`未找到待删除的附件`);let{storagePath:i,objectName:a}=r;if(await g(()=>m.from(`sys_attachment`).delete({count:`exact`}).eq(`id`,n),{breakReturn:!0,requireAffected:!0,noAffectedMessage:t,errorMessage:`附件删除失败，请稍后重试`}),!i||!a)return{storageCleanupFailed:!1};let o=`${i}/${a}`,{error:s}=await m.storage.from(`attachments`).remove([o]);return s?(console.warn(`[AttachmentCleanup] 附件记录已删除，但存储对象清理失败:`,s),{storageCleanupFailed:!0}):{storageCleanupFailed:!1}}export{x as i,S as n,b as r,p as t};