// @ts-nocheck -- generated Ajv validator source
import { resolveAjvFormatsRuntime, resolveAjvRuntimeFunction } from '../domain/ajvRuntimeInterop.ts';
import aigsRuntimeEqualModule from 'ajv/dist/runtime/equal.js';
import aigsRuntimeUcs2LengthModule from 'ajv/dist/runtime/ucs2length.js';
import aigsRuntimeFormatsModule from 'ajv-formats/dist/formats.js';
const aigsRuntimeEqual = resolveAjvRuntimeFunction('equal', aigsRuntimeEqualModule);
const aigsRuntimeUcs2Length = resolveAjvRuntimeFunction('ucs2length', aigsRuntimeUcs2LengthModule);
const aigsRuntimeFormats = resolveAjvFormatsRuntime(aigsRuntimeFormatsModule);
"use strict";
export const aigsValidator0 = validate20;
const schema31 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:action-definition","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.action.definition"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"action"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"executor_key":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},"parameters_schema_ref":{"type":"string","pattern":"^urn:aigs:schema:v1:[a-z0-9-]+$"},"preconditions":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:condition-expression"}},"failure_codes":{"type":"array","items":{"type":"string","pattern":"^[A-Z][A-Z0-9_]+$"},"uniqueItems":true},"emits":{"type":"array","items":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},"uniqueItems":true},"ai":{"type":"object","additionalProperties":false,"properties":{"summary":{"type":"string"}}}},"required":["schema_id","schema_version","id","kind","display_name","executor_key","parameters_schema_ref","failure_codes"]};
const func1 = Object.prototype.hasOwnProperty;
const func2 = aigsRuntimeUcs2Length;
const pattern4 = new RegExp("^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$", "u");
const pattern5 = new RegExp("^[a-z0-9][a-z0-9_-]*$", "u");
const pattern7 = new RegExp("^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$", "u");
const pattern8 = new RegExp("^urn:aigs:schema:v1:[a-z0-9-]+$", "u");
const pattern11 = new RegExp("^[A-Z][A-Z0-9_]+$", "u");
const schema32 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:condition-expression","$defs":{"operand":{"oneOf":[{"type":"object","additionalProperties":false,"properties":{"literal":{}},"required":["literal"]},{"type":"object","additionalProperties":false,"properties":{"source":{"enum":["actor_state","target_state","event_payload","project_variable"]},"path":{"type":"array","items":{"type":"string","minLength":1},"minItems":1}},"required":["source","path"]},{"type":"object","additionalProperties":false,"properties":{"source":{"const":"referenced_entity_state"},"entity_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"path":{"type":"array","items":{"type":"string","minLength":1},"minItems":1}},"required":["source","entity_ref","path"]}]},"eq":{"type":"object","additionalProperties":false,"properties":{"op":{"const":"eq"},"left":{"$ref":"#/$defs/operand"},"right":{"$ref":"#/$defs/operand"}},"required":["op","left","right"]},"neq":{"type":"object","additionalProperties":false,"properties":{"op":{"const":"neq"},"left":{"$ref":"#/$defs/operand"},"right":{"$ref":"#/$defs/operand"}},"required":["op","left","right"]},"gt":{"type":"object","additionalProperties":false,"properties":{"op":{"const":"gt"},"left":{"$ref":"#/$defs/operand"},"right":{"$ref":"#/$defs/operand"}},"required":["op","left","right"]},"gte":{"type":"object","additionalProperties":false,"properties":{"op":{"const":"gte"},"left":{"$ref":"#/$defs/operand"},"right":{"$ref":"#/$defs/operand"}},"required":["op","left","right"]},"lt":{"type":"object","additionalProperties":false,"properties":{"op":{"const":"lt"},"left":{"$ref":"#/$defs/operand"},"right":{"$ref":"#/$defs/operand"}},"required":["op","left","right"]},"lte":{"type":"object","additionalProperties":false,"properties":{"op":{"const":"lte"},"left":{"$ref":"#/$defs/operand"},"right":{"$ref":"#/$defs/operand"}},"required":["op","left","right"]},"all":{"type":"object","additionalProperties":false,"properties":{"op":{"const":"all"},"args":{"type":"array","items":{"$ref":"#/$defs/expression"},"minItems":1}},"required":["op","args"]},"any":{"type":"object","additionalProperties":false,"properties":{"op":{"const":"any"},"args":{"type":"array","items":{"$ref":"#/$defs/expression"},"minItems":1}},"required":["op","args"]},"not":{"type":"object","additionalProperties":false,"properties":{"op":{"const":"not"},"arg":{"$ref":"#/$defs/expression"}},"required":["op","arg"]},"exists":{"type":"object","additionalProperties":false,"properties":{"op":{"const":"exists"},"value":{"$ref":"#/$defs/operand"}},"required":["op","value"]},"has_tag":{"type":"object","additionalProperties":false,"properties":{"op":{"const":"has_tag"},"value":{"$ref":"#/$defs/operand"},"tag":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"}},"required":["op","value","tag"]},"expression":{"oneOf":[{"$ref":"#/$defs/eq"},{"$ref":"#/$defs/neq"},{"$ref":"#/$defs/gt"},{"$ref":"#/$defs/gte"},{"$ref":"#/$defs/lt"},{"$ref":"#/$defs/lte"},{"$ref":"#/$defs/all"},{"$ref":"#/$defs/any"},{"$ref":"#/$defs/not"},{"$ref":"#/$defs/exists"},{"$ref":"#/$defs/has_tag"}]}},"$ref":"#/$defs/expression"};
const schema33 = {"oneOf":[{"$ref":"#/$defs/eq"},{"$ref":"#/$defs/neq"},{"$ref":"#/$defs/gt"},{"$ref":"#/$defs/gte"},{"$ref":"#/$defs/lt"},{"$ref":"#/$defs/lte"},{"$ref":"#/$defs/all"},{"$ref":"#/$defs/any"},{"$ref":"#/$defs/not"},{"$ref":"#/$defs/exists"},{"$ref":"#/$defs/has_tag"}]};
const schema34 = {"type":"object","additionalProperties":false,"properties":{"op":{"const":"eq"},"left":{"$ref":"#/$defs/operand"},"right":{"$ref":"#/$defs/operand"}},"required":["op","left","right"]};
const schema35 = {"oneOf":[{"type":"object","additionalProperties":false,"properties":{"literal":{}},"required":["literal"]},{"type":"object","additionalProperties":false,"properties":{"source":{"enum":["actor_state","target_state","event_payload","project_variable"]},"path":{"type":"array","items":{"type":"string","minLength":1},"minItems":1}},"required":["source","path"]},{"type":"object","additionalProperties":false,"properties":{"source":{"const":"referenced_entity_state"},"entity_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"path":{"type":"array","items":{"type":"string","minLength":1},"minItems":1}},"required":["source","entity_ref","path"]}]};
const schema36 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:definition-ref","type":"object","additionalProperties":false,"properties":{"ref":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"}},"required":["ref"]};

function validate24(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate24.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
const _errs0 = errors;
let valid0 = false;
let passing0 = null;
const _errs1 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.literal === undefined){
const err0 = {instancePath,schemaPath:"#/oneOf/0/required",keyword:"required",params:{missingProperty: "literal"},message:"must have required property '"+"literal"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
for(const key0 in data){
if(!(key0 === "literal")){
const err1 = {instancePath,schemaPath:"#/oneOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
}
}
else {
const err2 = {instancePath,schemaPath:"#/oneOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
var _valid0 = _errs1 === errors;
if(_valid0){
valid0 = true;
passing0 = 0;
var props0 = true;
}
const _errs4 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.source === undefined){
const err3 = {instancePath,schemaPath:"#/oneOf/1/required",keyword:"required",params:{missingProperty: "source"},message:"must have required property '"+"source"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.path === undefined){
const err4 = {instancePath,schemaPath:"#/oneOf/1/required",keyword:"required",params:{missingProperty: "path"},message:"must have required property '"+"path"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
for(const key1 in data){
if(!((key1 === "source") || (key1 === "path"))){
const err5 = {instancePath,schemaPath:"#/oneOf/1/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.source !== undefined){
let data0 = data.source;
if(!((((data0 === "actor_state") || (data0 === "target_state")) || (data0 === "event_payload")) || (data0 === "project_variable"))){
const err6 = {instancePath:instancePath+"/source",schemaPath:"#/oneOf/1/properties/source/enum",keyword:"enum",params:{allowedValues: schema35.oneOf[1].properties.source.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.path !== undefined){
let data1 = data.path;
if(Array.isArray(data1)){
if(data1.length < 1){
const err7 = {instancePath:instancePath+"/path",schemaPath:"#/oneOf/1/properties/path/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
const len0 = data1.length;
for(let i0=0; i0<len0; i0++){
let data2 = data1[i0];
if(typeof data2 === "string"){
if(func2(data2) < 1){
const err8 = {instancePath:instancePath+"/path/" + i0,schemaPath:"#/oneOf/1/properties/path/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/path/" + i0,schemaPath:"#/oneOf/1/properties/path/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
}
else {
const err10 = {instancePath:instancePath+"/path",schemaPath:"#/oneOf/1/properties/path/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
}
else {
const err11 = {instancePath,schemaPath:"#/oneOf/1/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
var _valid0 = _errs4 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 1];
}
else {
if(_valid0){
valid0 = true;
passing0 = 1;
if(props0 !== true){
props0 = true;
}
}
const _errs12 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.source === undefined){
const err12 = {instancePath,schemaPath:"#/oneOf/2/required",keyword:"required",params:{missingProperty: "source"},message:"must have required property '"+"source"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(data.entity_ref === undefined){
const err13 = {instancePath,schemaPath:"#/oneOf/2/required",keyword:"required",params:{missingProperty: "entity_ref"},message:"must have required property '"+"entity_ref"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(data.path === undefined){
const err14 = {instancePath,schemaPath:"#/oneOf/2/required",keyword:"required",params:{missingProperty: "path"},message:"must have required property '"+"path"+"'"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
for(const key2 in data){
if(!(((key2 === "source") || (key2 === "entity_ref")) || (key2 === "path"))){
const err15 = {instancePath,schemaPath:"#/oneOf/2/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.source !== undefined){
if("referenced_entity_state" !== data.source){
const err16 = {instancePath:instancePath+"/source",schemaPath:"#/oneOf/2/properties/source/const",keyword:"const",params:{allowedValue: "referenced_entity_state"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.entity_ref !== undefined){
let data4 = data.entity_ref;
if(data4 && typeof data4 == "object" && !Array.isArray(data4)){
if(data4.ref === undefined){
const err17 = {instancePath:instancePath+"/entity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
for(const key3 in data4){
if(!(key3 === "ref")){
const err18 = {instancePath:instancePath+"/entity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data4.ref !== undefined){
let data5 = data4.ref;
if(typeof data5 === "string"){
if(!pattern4.test(data5)){
const err19 = {instancePath:instancePath+"/entity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
else {
const err20 = {instancePath:instancePath+"/entity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
}
else {
const err21 = {instancePath:instancePath+"/entity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.path !== undefined){
let data6 = data.path;
if(Array.isArray(data6)){
if(data6.length < 1){
const err22 = {instancePath:instancePath+"/path",schemaPath:"#/oneOf/2/properties/path/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
const len1 = data6.length;
for(let i1=0; i1<len1; i1++){
let data7 = data6[i1];
if(typeof data7 === "string"){
if(func2(data7) < 1){
const err23 = {instancePath:instancePath+"/path/" + i1,schemaPath:"#/oneOf/2/properties/path/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
else {
const err24 = {instancePath:instancePath+"/path/" + i1,schemaPath:"#/oneOf/2/properties/path/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
}
else {
const err25 = {instancePath:instancePath+"/path",schemaPath:"#/oneOf/2/properties/path/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
}
else {
const err26 = {instancePath,schemaPath:"#/oneOf/2/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
var _valid0 = _errs12 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 2];
}
else {
if(_valid0){
valid0 = true;
passing0 = 2;
if(props0 !== true){
props0 = true;
}
}
}
}
if(!valid0){
const err27 = {instancePath,schemaPath:"#/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
else {
errors = _errs0;
if(vErrors !== null){
if(_errs0){
vErrors.length = _errs0;
}
else {
vErrors = null;
}
}
}
validate24.errors = vErrors;
evaluated0.props = props0;
return errors === 0;
}
validate24.evaluated = {"dynamicProps":true,"dynamicItems":false};


function validate23(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate23.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.op === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "op"},message:"must have required property '"+"op"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.left === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "left"},message:"must have required property '"+"left"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.right === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "right"},message:"must have required property '"+"right"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
for(const key0 in data){
if(!(((key0 === "op") || (key0 === "left")) || (key0 === "right"))){
const err3 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.op !== undefined){
if("eq" !== data.op){
const err4 = {instancePath:instancePath+"/op",schemaPath:"#/properties/op/const",keyword:"const",params:{allowedValue: "eq"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.left !== undefined){
if(!(validate24(data.left, {instancePath:instancePath+"/left",parentData:data,parentDataProperty:"left",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
}
if(data.right !== undefined){
if(!(validate24(data.right, {instancePath:instancePath+"/right",parentData:data,parentDataProperty:"right",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
}
}
else {
const err5 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
validate23.errors = vErrors;
return errors === 0;
}
validate23.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema37 = {"type":"object","additionalProperties":false,"properties":{"op":{"const":"neq"},"left":{"$ref":"#/$defs/operand"},"right":{"$ref":"#/$defs/operand"}},"required":["op","left","right"]};

function validate28(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate28.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.op === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "op"},message:"must have required property '"+"op"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.left === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "left"},message:"must have required property '"+"left"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.right === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "right"},message:"must have required property '"+"right"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
for(const key0 in data){
if(!(((key0 === "op") || (key0 === "left")) || (key0 === "right"))){
const err3 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.op !== undefined){
if("neq" !== data.op){
const err4 = {instancePath:instancePath+"/op",schemaPath:"#/properties/op/const",keyword:"const",params:{allowedValue: "neq"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.left !== undefined){
if(!(validate24(data.left, {instancePath:instancePath+"/left",parentData:data,parentDataProperty:"left",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
}
if(data.right !== undefined){
if(!(validate24(data.right, {instancePath:instancePath+"/right",parentData:data,parentDataProperty:"right",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
}
}
else {
const err5 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
validate28.errors = vErrors;
return errors === 0;
}
validate28.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema38 = {"type":"object","additionalProperties":false,"properties":{"op":{"const":"gt"},"left":{"$ref":"#/$defs/operand"},"right":{"$ref":"#/$defs/operand"}},"required":["op","left","right"]};

function validate32(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate32.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.op === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "op"},message:"must have required property '"+"op"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.left === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "left"},message:"must have required property '"+"left"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.right === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "right"},message:"must have required property '"+"right"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
for(const key0 in data){
if(!(((key0 === "op") || (key0 === "left")) || (key0 === "right"))){
const err3 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.op !== undefined){
if("gt" !== data.op){
const err4 = {instancePath:instancePath+"/op",schemaPath:"#/properties/op/const",keyword:"const",params:{allowedValue: "gt"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.left !== undefined){
if(!(validate24(data.left, {instancePath:instancePath+"/left",parentData:data,parentDataProperty:"left",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
}
if(data.right !== undefined){
if(!(validate24(data.right, {instancePath:instancePath+"/right",parentData:data,parentDataProperty:"right",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
}
}
else {
const err5 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
validate32.errors = vErrors;
return errors === 0;
}
validate32.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema39 = {"type":"object","additionalProperties":false,"properties":{"op":{"const":"gte"},"left":{"$ref":"#/$defs/operand"},"right":{"$ref":"#/$defs/operand"}},"required":["op","left","right"]};

function validate36(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate36.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.op === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "op"},message:"must have required property '"+"op"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.left === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "left"},message:"must have required property '"+"left"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.right === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "right"},message:"must have required property '"+"right"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
for(const key0 in data){
if(!(((key0 === "op") || (key0 === "left")) || (key0 === "right"))){
const err3 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.op !== undefined){
if("gte" !== data.op){
const err4 = {instancePath:instancePath+"/op",schemaPath:"#/properties/op/const",keyword:"const",params:{allowedValue: "gte"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.left !== undefined){
if(!(validate24(data.left, {instancePath:instancePath+"/left",parentData:data,parentDataProperty:"left",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
}
if(data.right !== undefined){
if(!(validate24(data.right, {instancePath:instancePath+"/right",parentData:data,parentDataProperty:"right",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
}
}
else {
const err5 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
validate36.errors = vErrors;
return errors === 0;
}
validate36.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema40 = {"type":"object","additionalProperties":false,"properties":{"op":{"const":"lt"},"left":{"$ref":"#/$defs/operand"},"right":{"$ref":"#/$defs/operand"}},"required":["op","left","right"]};

function validate40(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate40.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.op === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "op"},message:"must have required property '"+"op"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.left === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "left"},message:"must have required property '"+"left"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.right === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "right"},message:"must have required property '"+"right"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
for(const key0 in data){
if(!(((key0 === "op") || (key0 === "left")) || (key0 === "right"))){
const err3 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.op !== undefined){
if("lt" !== data.op){
const err4 = {instancePath:instancePath+"/op",schemaPath:"#/properties/op/const",keyword:"const",params:{allowedValue: "lt"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.left !== undefined){
if(!(validate24(data.left, {instancePath:instancePath+"/left",parentData:data,parentDataProperty:"left",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
}
if(data.right !== undefined){
if(!(validate24(data.right, {instancePath:instancePath+"/right",parentData:data,parentDataProperty:"right",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
}
}
else {
const err5 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
validate40.errors = vErrors;
return errors === 0;
}
validate40.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema41 = {"type":"object","additionalProperties":false,"properties":{"op":{"const":"lte"},"left":{"$ref":"#/$defs/operand"},"right":{"$ref":"#/$defs/operand"}},"required":["op","left","right"]};

function validate44(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate44.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.op === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "op"},message:"must have required property '"+"op"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.left === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "left"},message:"must have required property '"+"left"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.right === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "right"},message:"must have required property '"+"right"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
for(const key0 in data){
if(!(((key0 === "op") || (key0 === "left")) || (key0 === "right"))){
const err3 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.op !== undefined){
if("lte" !== data.op){
const err4 = {instancePath:instancePath+"/op",schemaPath:"#/properties/op/const",keyword:"const",params:{allowedValue: "lte"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.left !== undefined){
if(!(validate24(data.left, {instancePath:instancePath+"/left",parentData:data,parentDataProperty:"left",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
}
if(data.right !== undefined){
if(!(validate24(data.right, {instancePath:instancePath+"/right",parentData:data,parentDataProperty:"right",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
}
}
else {
const err5 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
validate44.errors = vErrors;
return errors === 0;
}
validate44.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema42 = {"type":"object","additionalProperties":false,"properties":{"op":{"const":"all"},"args":{"type":"array","items":{"$ref":"#/$defs/expression"},"minItems":1}},"required":["op","args"]};
const wrapper0 = {validate: validate22};

function validate48(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate48.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.op === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "op"},message:"must have required property '"+"op"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.args === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "args"},message:"must have required property '"+"args"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
for(const key0 in data){
if(!((key0 === "op") || (key0 === "args"))){
const err2 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
if(data.op !== undefined){
if("all" !== data.op){
const err3 = {instancePath:instancePath+"/op",schemaPath:"#/properties/op/const",keyword:"const",params:{allowedValue: "all"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.args !== undefined){
let data1 = data.args;
if(Array.isArray(data1)){
if(data1.length < 1){
const err4 = {instancePath:instancePath+"/args",schemaPath:"#/properties/args/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
const len0 = data1.length;
for(let i0=0; i0<len0; i0++){
if(!(wrapper0.validate(data1[i0], {instancePath:instancePath+"/args/" + i0,parentData:data1,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? wrapper0.validate.errors : vErrors.concat(wrapper0.validate.errors);
errors = vErrors.length;
}
}
}
else {
const err5 = {instancePath:instancePath+"/args",schemaPath:"#/properties/args/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
}
else {
const err6 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
validate48.errors = vErrors;
return errors === 0;
}
validate48.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema43 = {"type":"object","additionalProperties":false,"properties":{"op":{"const":"any"},"args":{"type":"array","items":{"$ref":"#/$defs/expression"},"minItems":1}},"required":["op","args"]};

function validate50(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate50.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.op === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "op"},message:"must have required property '"+"op"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.args === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "args"},message:"must have required property '"+"args"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
for(const key0 in data){
if(!((key0 === "op") || (key0 === "args"))){
const err2 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
if(data.op !== undefined){
if("any" !== data.op){
const err3 = {instancePath:instancePath+"/op",schemaPath:"#/properties/op/const",keyword:"const",params:{allowedValue: "any"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.args !== undefined){
let data1 = data.args;
if(Array.isArray(data1)){
if(data1.length < 1){
const err4 = {instancePath:instancePath+"/args",schemaPath:"#/properties/args/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
const len0 = data1.length;
for(let i0=0; i0<len0; i0++){
if(!(wrapper0.validate(data1[i0], {instancePath:instancePath+"/args/" + i0,parentData:data1,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? wrapper0.validate.errors : vErrors.concat(wrapper0.validate.errors);
errors = vErrors.length;
}
}
}
else {
const err5 = {instancePath:instancePath+"/args",schemaPath:"#/properties/args/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
}
else {
const err6 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
validate50.errors = vErrors;
return errors === 0;
}
validate50.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema44 = {"type":"object","additionalProperties":false,"properties":{"op":{"const":"not"},"arg":{"$ref":"#/$defs/expression"}},"required":["op","arg"]};

function validate52(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate52.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.op === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "op"},message:"must have required property '"+"op"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.arg === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "arg"},message:"must have required property '"+"arg"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
for(const key0 in data){
if(!((key0 === "op") || (key0 === "arg"))){
const err2 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
if(data.op !== undefined){
if("not" !== data.op){
const err3 = {instancePath:instancePath+"/op",schemaPath:"#/properties/op/const",keyword:"const",params:{allowedValue: "not"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.arg !== undefined){
if(!(wrapper0.validate(data.arg, {instancePath:instancePath+"/arg",parentData:data,parentDataProperty:"arg",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? wrapper0.validate.errors : vErrors.concat(wrapper0.validate.errors);
errors = vErrors.length;
}
}
}
else {
const err4 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
validate52.errors = vErrors;
return errors === 0;
}
validate52.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema45 = {"type":"object","additionalProperties":false,"properties":{"op":{"const":"exists"},"value":{"$ref":"#/$defs/operand"}},"required":["op","value"]};

function validate54(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate54.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.op === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "op"},message:"must have required property '"+"op"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.value === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "value"},message:"must have required property '"+"value"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
for(const key0 in data){
if(!((key0 === "op") || (key0 === "value"))){
const err2 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
if(data.op !== undefined){
if("exists" !== data.op){
const err3 = {instancePath:instancePath+"/op",schemaPath:"#/properties/op/const",keyword:"const",params:{allowedValue: "exists"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.value !== undefined){
if(!(validate24(data.value, {instancePath:instancePath+"/value",parentData:data,parentDataProperty:"value",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
}
}
else {
const err4 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
validate54.errors = vErrors;
return errors === 0;
}
validate54.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema46 = {"type":"object","additionalProperties":false,"properties":{"op":{"const":"has_tag"},"value":{"$ref":"#/$defs/operand"},"tag":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"}},"required":["op","value","tag"]};

function validate57(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate57.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.op === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "op"},message:"must have required property '"+"op"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.value === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "value"},message:"must have required property '"+"value"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.tag === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "tag"},message:"must have required property '"+"tag"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
for(const key0 in data){
if(!(((key0 === "op") || (key0 === "value")) || (key0 === "tag"))){
const err3 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.op !== undefined){
if("has_tag" !== data.op){
const err4 = {instancePath:instancePath+"/op",schemaPath:"#/properties/op/const",keyword:"const",params:{allowedValue: "has_tag"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.value !== undefined){
if(!(validate24(data.value, {instancePath:instancePath+"/value",parentData:data,parentDataProperty:"value",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
}
if(data.tag !== undefined){
let data2 = data.tag;
if(typeof data2 === "string"){
if(!pattern5.test(data2)){
const err5 = {instancePath:instancePath+"/tag",schemaPath:"#/properties/tag/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
else {
const err6 = {instancePath:instancePath+"/tag",schemaPath:"#/properties/tag/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
}
else {
const err7 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
validate57.errors = vErrors;
return errors === 0;
}
validate57.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate22(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate22.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
const _errs0 = errors;
let valid0 = false;
let passing0 = null;
const _errs1 = errors;
if(!(validate23(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
errors = vErrors.length;
}
var _valid0 = _errs1 === errors;
if(_valid0){
valid0 = true;
passing0 = 0;
var props0 = true;
}
const _errs2 = errors;
if(!(validate28(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate28.errors : vErrors.concat(validate28.errors);
errors = vErrors.length;
}
var _valid0 = _errs2 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 1];
}
else {
if(_valid0){
valid0 = true;
passing0 = 1;
if(props0 !== true){
props0 = true;
}
}
const _errs3 = errors;
if(!(validate32(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate32.errors : vErrors.concat(validate32.errors);
errors = vErrors.length;
}
var _valid0 = _errs3 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 2];
}
else {
if(_valid0){
valid0 = true;
passing0 = 2;
if(props0 !== true){
props0 = true;
}
}
const _errs4 = errors;
if(!(validate36(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate36.errors : vErrors.concat(validate36.errors);
errors = vErrors.length;
}
var _valid0 = _errs4 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 3];
}
else {
if(_valid0){
valid0 = true;
passing0 = 3;
if(props0 !== true){
props0 = true;
}
}
const _errs5 = errors;
if(!(validate40(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate40.errors : vErrors.concat(validate40.errors);
errors = vErrors.length;
}
var _valid0 = _errs5 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 4];
}
else {
if(_valid0){
valid0 = true;
passing0 = 4;
if(props0 !== true){
props0 = true;
}
}
const _errs6 = errors;
if(!(validate44(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate44.errors : vErrors.concat(validate44.errors);
errors = vErrors.length;
}
var _valid0 = _errs6 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 5];
}
else {
if(_valid0){
valid0 = true;
passing0 = 5;
if(props0 !== true){
props0 = true;
}
}
const _errs7 = errors;
if(!(validate48(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate48.errors : vErrors.concat(validate48.errors);
errors = vErrors.length;
}
var _valid0 = _errs7 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 6];
}
else {
if(_valid0){
valid0 = true;
passing0 = 6;
if(props0 !== true){
props0 = true;
}
}
const _errs8 = errors;
if(!(validate50(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate50.errors : vErrors.concat(validate50.errors);
errors = vErrors.length;
}
var _valid0 = _errs8 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 7];
}
else {
if(_valid0){
valid0 = true;
passing0 = 7;
if(props0 !== true){
props0 = true;
}
}
const _errs9 = errors;
if(!(validate52(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate52.errors : vErrors.concat(validate52.errors);
errors = vErrors.length;
}
var _valid0 = _errs9 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 8];
}
else {
if(_valid0){
valid0 = true;
passing0 = 8;
if(props0 !== true){
props0 = true;
}
}
const _errs10 = errors;
if(!(validate54(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate54.errors : vErrors.concat(validate54.errors);
errors = vErrors.length;
}
var _valid0 = _errs10 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 9];
}
else {
if(_valid0){
valid0 = true;
passing0 = 9;
if(props0 !== true){
props0 = true;
}
}
const _errs11 = errors;
if(!(validate57(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate57.errors : vErrors.concat(validate57.errors);
errors = vErrors.length;
}
var _valid0 = _errs11 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 10];
}
else {
if(_valid0){
valid0 = true;
passing0 = 10;
if(props0 !== true){
props0 = true;
}
}
}
}
}
}
}
}
}
}
}
}
if(!valid0){
const err0 = {instancePath,schemaPath:"#/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
else {
errors = _errs0;
if(vErrors !== null){
if(_errs0){
vErrors.length = _errs0;
}
else {
vErrors = null;
}
}
}
validate22.errors = vErrors;
evaluated0.props = props0;
return errors === 0;
}
validate22.evaluated = {"dynamicProps":true,"dynamicItems":false};


function validate21(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:condition-expression" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate21.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate22(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate22.errors : vErrors.concat(validate22.errors);
errors = vErrors.length;
}
else {
var props0 = validate22.evaluated.props;
}
validate21.errors = vErrors;
evaluated0.props = props0;
return errors === 0;
}
validate21.evaluated = {"dynamicProps":true,"dynamicItems":false};


function validate20(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:action-definition" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate20.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.executor_key === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "executor_key"},message:"must have required property '"+"executor_key"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.parameters_schema_ref === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "parameters_schema_ref"},message:"must have required property '"+"parameters_schema_ref"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.failure_codes === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "failure_codes"},message:"must have required property '"+"failure_codes"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema31.properties, key0))){
const err8 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.action.definition" !== data.schema_id){
const err9 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.action.definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err10 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err11 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.kind !== undefined){
if("action" !== data.kind){
const err13 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "action"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err14 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err16 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err17 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
else {
const err18 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err19 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err20 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err21 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err22 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err23 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
}
else {
const err24 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data.executor_key !== undefined){
let data10 = data.executor_key;
if(typeof data10 === "string"){
if(!pattern7.test(data10)){
const err25 = {instancePath:instancePath+"/executor_key",schemaPath:"#/properties/executor_key/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"+"\""};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
else {
const err26 = {instancePath:instancePath+"/executor_key",schemaPath:"#/properties/executor_key/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(data.parameters_schema_ref !== undefined){
let data11 = data.parameters_schema_ref;
if(typeof data11 === "string"){
if(!pattern8.test(data11)){
const err27 = {instancePath:instancePath+"/parameters_schema_ref",schemaPath:"#/properties/parameters_schema_ref/pattern",keyword:"pattern",params:{pattern: "^urn:aigs:schema:v1:[a-z0-9-]+$"},message:"must match pattern \""+"^urn:aigs:schema:v1:[a-z0-9-]+$"+"\""};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
else {
const err28 = {instancePath:instancePath+"/parameters_schema_ref",schemaPath:"#/properties/parameters_schema_ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data.preconditions !== undefined){
let data12 = data.preconditions;
if(Array.isArray(data12)){
const len1 = data12.length;
for(let i2=0; i2<len1; i2++){
if(!(validate21(data12[i2], {instancePath:instancePath+"/preconditions/" + i2,parentData:data12,parentDataProperty:i2,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
errors = vErrors.length;
}
}
}
else {
const err29 = {instancePath:instancePath+"/preconditions",schemaPath:"#/properties/preconditions/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(data.failure_codes !== undefined){
let data14 = data.failure_codes;
if(Array.isArray(data14)){
const len2 = data14.length;
for(let i3=0; i3<len2; i3++){
let data15 = data14[i3];
if(typeof data15 === "string"){
if(!pattern11.test(data15)){
const err30 = {instancePath:instancePath+"/failure_codes/" + i3,schemaPath:"#/properties/failure_codes/items/pattern",keyword:"pattern",params:{pattern: "^[A-Z][A-Z0-9_]+$"},message:"must match pattern \""+"^[A-Z][A-Z0-9_]+$"+"\""};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
else {
const err31 = {instancePath:instancePath+"/failure_codes/" + i3,schemaPath:"#/properties/failure_codes/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
let i4 = data14.length;
let j1;
if(i4 > 1){
const indices1 = {};
for(;i4--;){
let item1 = data14[i4];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err32 = {instancePath:instancePath+"/failure_codes",schemaPath:"#/properties/failure_codes/uniqueItems",keyword:"uniqueItems",params:{i: i4, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i4+" are identical)"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
break;
}
indices1[item1] = i4;
}
}
}
else {
const err33 = {instancePath:instancePath+"/failure_codes",schemaPath:"#/properties/failure_codes/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
if(data.emits !== undefined){
let data16 = data.emits;
if(Array.isArray(data16)){
const len3 = data16.length;
for(let i5=0; i5<len3; i5++){
let data17 = data16[i5];
if(typeof data17 === "string"){
if(!pattern7.test(data17)){
const err34 = {instancePath:instancePath+"/emits/" + i5,schemaPath:"#/properties/emits/items/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"+"\""};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
else {
const err35 = {instancePath:instancePath+"/emits/" + i5,schemaPath:"#/properties/emits/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
let i6 = data16.length;
let j2;
if(i6 > 1){
const indices2 = {};
for(;i6--;){
let item2 = data16[i6];
if(typeof item2 !== "string"){
continue;
}
if(typeof indices2[item2] == "number"){
j2 = indices2[item2];
const err36 = {instancePath:instancePath+"/emits",schemaPath:"#/properties/emits/uniqueItems",keyword:"uniqueItems",params:{i: i6, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i6+" are identical)"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
break;
}
indices2[item2] = i6;
}
}
}
else {
const err37 = {instancePath:instancePath+"/emits",schemaPath:"#/properties/emits/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data.ai !== undefined){
let data18 = data.ai;
if(data18 && typeof data18 == "object" && !Array.isArray(data18)){
for(const key3 in data18){
if(!(key3 === "summary")){
const err38 = {instancePath:instancePath+"/ai",schemaPath:"#/properties/ai/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
if(data18.summary !== undefined){
if(typeof data18.summary !== "string"){
const err39 = {instancePath:instancePath+"/ai/summary",schemaPath:"#/properties/ai/properties/summary/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
}
else {
const err40 = {instancePath:instancePath+"/ai",schemaPath:"#/properties/ai/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
}
else {
const err41 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
validate20.errors = vErrors;
return errors === 0;
}
validate20.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator1 = validate62;
const schema47 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:action-request","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.action.request"},"schema_version":{"const":1},"request_id":{"type":"string","format":"uuid"},"action_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"actor_instance_id":{"type":"string","format":"uuid"},"parameters":{"type":"object"},"intent_source":{"enum":["human_controller","ai_controller","event_system","test_controller","replay_controller"]}},"required":["schema_id","schema_version","request_id","action_ref","actor_instance_id","parameters","intent_source"]};
const formats0 = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

function validate62(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:action-request" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate62.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.request_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "request_id"},message:"must have required property '"+"request_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.action_ref === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "action_ref"},message:"must have required property '"+"action_ref"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.actor_instance_id === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "actor_instance_id"},message:"must have required property '"+"actor_instance_id"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.parameters === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "parameters"},message:"must have required property '"+"parameters"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.intent_source === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "intent_source"},message:"must have required property '"+"intent_source"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
for(const key0 in data){
if(!(((((((key0 === "schema_id") || (key0 === "schema_version")) || (key0 === "request_id")) || (key0 === "action_ref")) || (key0 === "actor_instance_id")) || (key0 === "parameters")) || (key0 === "intent_source"))){
const err7 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.action.request" !== data.schema_id){
const err8 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.action.request"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err9 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.request_id !== undefined){
let data2 = data.request_id;
if(typeof data2 === "string"){
if(!(formats0.test(data2))){
const err10 = {instancePath:instancePath+"/request_id",schemaPath:"#/properties/request_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {instancePath:instancePath+"/request_id",schemaPath:"#/properties/request_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.action_ref !== undefined){
let data3 = data.action_ref;
if(data3 && typeof data3 == "object" && !Array.isArray(data3)){
if(data3.ref === undefined){
const err12 = {instancePath:instancePath+"/action_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
for(const key1 in data3){
if(!(key1 === "ref")){
const err13 = {instancePath:instancePath+"/action_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data3.ref !== undefined){
let data4 = data3.ref;
if(typeof data4 === "string"){
if(!pattern4.test(data4)){
const err14 = {instancePath:instancePath+"/action_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/action_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
}
else {
const err16 = {instancePath:instancePath+"/action_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.actor_instance_id !== undefined){
let data5 = data.actor_instance_id;
if(typeof data5 === "string"){
if(!(formats0.test(data5))){
const err17 = {instancePath:instancePath+"/actor_instance_id",schemaPath:"#/properties/actor_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
else {
const err18 = {instancePath:instancePath+"/actor_instance_id",schemaPath:"#/properties/actor_instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.parameters !== undefined){
let data6 = data.parameters;
if(!(data6 && typeof data6 == "object" && !Array.isArray(data6))){
const err19 = {instancePath:instancePath+"/parameters",schemaPath:"#/properties/parameters/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.intent_source !== undefined){
let data7 = data.intent_source;
if(!(((((data7 === "human_controller") || (data7 === "ai_controller")) || (data7 === "event_system")) || (data7 === "test_controller")) || (data7 === "replay_controller"))){
const err20 = {instancePath:instancePath+"/intent_source",schemaPath:"#/properties/intent_source/enum",keyword:"enum",params:{allowedValues: schema47.properties.intent_source.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
}
else {
const err21 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
validate62.errors = vErrors;
return errors === 0;
}
validate62.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator2 = validate63;
const schema49 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:action-result","oneOf":[{"type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.action.result"},"schema_version":{"const":1},"request_id":{"type":"string","format":"uuid"},"status":{"const":"success"},"failure":{"type":"null"},"emitted_event_ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"required":["schema_id","schema_version","request_id","status","failure","emitted_event_ids"]},{"type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.action.result"},"schema_version":{"const":1},"request_id":{"type":"string","format":"uuid"},"status":{"const":"failed"},"failure":{"type":"object","additionalProperties":false,"properties":{"code":{"type":"string","pattern":"^[A-Z][A-Z0-9_]+$"},"message_key":{"type":"string","pattern":"^[a-z][a-z0-9_.-]*$"},"details":{"type":"object"}},"required":["code","message_key","details"]},"emitted_event_ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"required":["schema_id","schema_version","request_id","status","failure","emitted_event_ids"]}]};
const pattern15 = new RegExp("^[a-z][a-z0-9_.-]*$", "u");

function validate63(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:action-result" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate63.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
const _errs0 = errors;
let valid0 = false;
let passing0 = null;
const _errs1 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/oneOf/0/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/oneOf/0/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.request_id === undefined){
const err2 = {instancePath,schemaPath:"#/oneOf/0/required",keyword:"required",params:{missingProperty: "request_id"},message:"must have required property '"+"request_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.status === undefined){
const err3 = {instancePath,schemaPath:"#/oneOf/0/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.failure === undefined){
const err4 = {instancePath,schemaPath:"#/oneOf/0/required",keyword:"required",params:{missingProperty: "failure"},message:"must have required property '"+"failure"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.emitted_event_ids === undefined){
const err5 = {instancePath,schemaPath:"#/oneOf/0/required",keyword:"required",params:{missingProperty: "emitted_event_ids"},message:"must have required property '"+"emitted_event_ids"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
for(const key0 in data){
if(!((((((key0 === "schema_id") || (key0 === "schema_version")) || (key0 === "request_id")) || (key0 === "status")) || (key0 === "failure")) || (key0 === "emitted_event_ids"))){
const err6 = {instancePath,schemaPath:"#/oneOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.action.result" !== data.schema_id){
const err7 = {instancePath:instancePath+"/schema_id",schemaPath:"#/oneOf/0/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.action.result"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err8 = {instancePath:instancePath+"/schema_version",schemaPath:"#/oneOf/0/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.request_id !== undefined){
let data2 = data.request_id;
if(typeof data2 === "string"){
if(!(formats0.test(data2))){
const err9 = {instancePath:instancePath+"/request_id",schemaPath:"#/oneOf/0/properties/request_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
else {
const err10 = {instancePath:instancePath+"/request_id",schemaPath:"#/oneOf/0/properties/request_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.status !== undefined){
if("success" !== data.status){
const err11 = {instancePath:instancePath+"/status",schemaPath:"#/oneOf/0/properties/status/const",keyword:"const",params:{allowedValue: "success"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.failure !== undefined){
if(data.failure !== null){
const err12 = {instancePath:instancePath+"/failure",schemaPath:"#/oneOf/0/properties/failure/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.emitted_event_ids !== undefined){
let data5 = data.emitted_event_ids;
if(Array.isArray(data5)){
const len0 = data5.length;
for(let i0=0; i0<len0; i0++){
let data6 = data5[i0];
if(typeof data6 === "string"){
if(!(formats0.test(data6))){
const err13 = {instancePath:instancePath+"/emitted_event_ids/" + i0,schemaPath:"#/oneOf/0/properties/emitted_event_ids/items/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/emitted_event_ids/" + i0,schemaPath:"#/oneOf/0/properties/emitted_event_ids/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
}
else {
const err15 = {instancePath:instancePath+"/emitted_event_ids",schemaPath:"#/oneOf/0/properties/emitted_event_ids/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
}
else {
const err16 = {instancePath,schemaPath:"#/oneOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
var _valid0 = _errs1 === errors;
if(_valid0){
valid0 = true;
passing0 = 0;
var props0 = true;
}
const _errs15 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err17 = {instancePath,schemaPath:"#/oneOf/1/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(data.schema_version === undefined){
const err18 = {instancePath,schemaPath:"#/oneOf/1/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(data.request_id === undefined){
const err19 = {instancePath,schemaPath:"#/oneOf/1/required",keyword:"required",params:{missingProperty: "request_id"},message:"must have required property '"+"request_id"+"'"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(data.status === undefined){
const err20 = {instancePath,schemaPath:"#/oneOf/1/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(data.failure === undefined){
const err21 = {instancePath,schemaPath:"#/oneOf/1/required",keyword:"required",params:{missingProperty: "failure"},message:"must have required property '"+"failure"+"'"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if(data.emitted_event_ids === undefined){
const err22 = {instancePath,schemaPath:"#/oneOf/1/required",keyword:"required",params:{missingProperty: "emitted_event_ids"},message:"must have required property '"+"emitted_event_ids"+"'"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
for(const key1 in data){
if(!((((((key1 === "schema_id") || (key1 === "schema_version")) || (key1 === "request_id")) || (key1 === "status")) || (key1 === "failure")) || (key1 === "emitted_event_ids"))){
const err23 = {instancePath,schemaPath:"#/oneOf/1/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.action.result" !== data.schema_id){
const err24 = {instancePath:instancePath+"/schema_id",schemaPath:"#/oneOf/1/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.action.result"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err25 = {instancePath:instancePath+"/schema_version",schemaPath:"#/oneOf/1/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data.request_id !== undefined){
let data9 = data.request_id;
if(typeof data9 === "string"){
if(!(formats0.test(data9))){
const err26 = {instancePath:instancePath+"/request_id",schemaPath:"#/oneOf/1/properties/request_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
else {
const err27 = {instancePath:instancePath+"/request_id",schemaPath:"#/oneOf/1/properties/request_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data.status !== undefined){
if("failed" !== data.status){
const err28 = {instancePath:instancePath+"/status",schemaPath:"#/oneOf/1/properties/status/const",keyword:"const",params:{allowedValue: "failed"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data.failure !== undefined){
let data11 = data.failure;
if(data11 && typeof data11 == "object" && !Array.isArray(data11)){
if(data11.code === undefined){
const err29 = {instancePath:instancePath+"/failure",schemaPath:"#/oneOf/1/properties/failure/required",keyword:"required",params:{missingProperty: "code"},message:"must have required property '"+"code"+"'"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(data11.message_key === undefined){
const err30 = {instancePath:instancePath+"/failure",schemaPath:"#/oneOf/1/properties/failure/required",keyword:"required",params:{missingProperty: "message_key"},message:"must have required property '"+"message_key"+"'"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
if(data11.details === undefined){
const err31 = {instancePath:instancePath+"/failure",schemaPath:"#/oneOf/1/properties/failure/required",keyword:"required",params:{missingProperty: "details"},message:"must have required property '"+"details"+"'"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
for(const key2 in data11){
if(!(((key2 === "code") || (key2 === "message_key")) || (key2 === "details"))){
const err32 = {instancePath:instancePath+"/failure",schemaPath:"#/oneOf/1/properties/failure/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
if(data11.code !== undefined){
let data12 = data11.code;
if(typeof data12 === "string"){
if(!pattern11.test(data12)){
const err33 = {instancePath:instancePath+"/failure/code",schemaPath:"#/oneOf/1/properties/failure/properties/code/pattern",keyword:"pattern",params:{pattern: "^[A-Z][A-Z0-9_]+$"},message:"must match pattern \""+"^[A-Z][A-Z0-9_]+$"+"\""};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
else {
const err34 = {instancePath:instancePath+"/failure/code",schemaPath:"#/oneOf/1/properties/failure/properties/code/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data11.message_key !== undefined){
let data13 = data11.message_key;
if(typeof data13 === "string"){
if(!pattern15.test(data13)){
const err35 = {instancePath:instancePath+"/failure/message_key",schemaPath:"#/oneOf/1/properties/failure/properties/message_key/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_.-]*$"},message:"must match pattern \""+"^[a-z][a-z0-9_.-]*$"+"\""};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
else {
const err36 = {instancePath:instancePath+"/failure/message_key",schemaPath:"#/oneOf/1/properties/failure/properties/message_key/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data11.details !== undefined){
let data14 = data11.details;
if(!(data14 && typeof data14 == "object" && !Array.isArray(data14))){
const err37 = {instancePath:instancePath+"/failure/details",schemaPath:"#/oneOf/1/properties/failure/properties/details/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
}
else {
const err38 = {instancePath:instancePath+"/failure",schemaPath:"#/oneOf/1/properties/failure/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
if(data.emitted_event_ids !== undefined){
let data15 = data.emitted_event_ids;
if(Array.isArray(data15)){
const len1 = data15.length;
for(let i1=0; i1<len1; i1++){
let data16 = data15[i1];
if(typeof data16 === "string"){
if(!(formats0.test(data16))){
const err39 = {instancePath:instancePath+"/emitted_event_ids/" + i1,schemaPath:"#/oneOf/1/properties/emitted_event_ids/items/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
else {
const err40 = {instancePath:instancePath+"/emitted_event_ids/" + i1,schemaPath:"#/oneOf/1/properties/emitted_event_ids/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
}
else {
const err41 = {instancePath:instancePath+"/emitted_event_ids",schemaPath:"#/oneOf/1/properties/emitted_event_ids/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
}
else {
const err42 = {instancePath,schemaPath:"#/oneOf/1/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
var _valid0 = _errs15 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 1];
}
else {
if(_valid0){
valid0 = true;
passing0 = 1;
if(props0 !== true){
props0 = true;
}
}
}
if(!valid0){
const err43 = {instancePath,schemaPath:"#/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
else {
errors = _errs0;
if(vErrors !== null){
if(_errs0){
vErrors.length = _errs0;
}
else {
vErrors = null;
}
}
}
validate63.errors = vErrors;
evaluated0.props = props0;
return errors === 0;
}
validate63.evaluated = {"dynamicProps":true,"dynamicItems":false};

export const aigsValidator3 = validate64;
const schema50 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:activity-definition","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.activity.definition"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"activity"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"executor_key":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},"parameters_schema_ref":{"type":"string","pattern":"^urn:aigs:schema:v1:[a-z0-9-]+$"},"cancel_policy":{"enum":["immediate","immediate_safe_point","not_cancelable"]},"progress_policy":{"enum":["event_driven","time_based","manual"]},"failure_codes":{"type":"array","items":{"type":"string","pattern":"^[A-Z][A-Z0-9_]+$"},"uniqueItems":true}},"required":["schema_id","schema_version","id","kind","display_name","executor_key","parameters_schema_ref","cancel_policy","progress_policy","failure_codes"]};

function validate64(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:activity-definition" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate64.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.executor_key === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "executor_key"},message:"must have required property '"+"executor_key"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.parameters_schema_ref === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "parameters_schema_ref"},message:"must have required property '"+"parameters_schema_ref"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.cancel_policy === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "cancel_policy"},message:"must have required property '"+"cancel_policy"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.progress_policy === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "progress_policy"},message:"must have required property '"+"progress_policy"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data.failure_codes === undefined){
const err9 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "failure_codes"},message:"must have required property '"+"failure_codes"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema50.properties, key0))){
const err10 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.activity.definition" !== data.schema_id){
const err11 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.activity.definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err12 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err13 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.kind !== undefined){
if("activity" !== data.kind){
const err15 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "activity"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err16 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err18 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err19 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
else {
const err20 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err21 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err22 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err23 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err24 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err25 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
}
else {
const err26 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(data.executor_key !== undefined){
let data10 = data.executor_key;
if(typeof data10 === "string"){
if(!pattern7.test(data10)){
const err27 = {instancePath:instancePath+"/executor_key",schemaPath:"#/properties/executor_key/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"+"\""};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
else {
const err28 = {instancePath:instancePath+"/executor_key",schemaPath:"#/properties/executor_key/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data.parameters_schema_ref !== undefined){
let data11 = data.parameters_schema_ref;
if(typeof data11 === "string"){
if(!pattern8.test(data11)){
const err29 = {instancePath:instancePath+"/parameters_schema_ref",schemaPath:"#/properties/parameters_schema_ref/pattern",keyword:"pattern",params:{pattern: "^urn:aigs:schema:v1:[a-z0-9-]+$"},message:"must match pattern \""+"^urn:aigs:schema:v1:[a-z0-9-]+$"+"\""};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
else {
const err30 = {instancePath:instancePath+"/parameters_schema_ref",schemaPath:"#/properties/parameters_schema_ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data.cancel_policy !== undefined){
let data12 = data.cancel_policy;
if(!(((data12 === "immediate") || (data12 === "immediate_safe_point")) || (data12 === "not_cancelable"))){
const err31 = {instancePath:instancePath+"/cancel_policy",schemaPath:"#/properties/cancel_policy/enum",keyword:"enum",params:{allowedValues: schema50.properties.cancel_policy.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
if(data.progress_policy !== undefined){
let data13 = data.progress_policy;
if(!(((data13 === "event_driven") || (data13 === "time_based")) || (data13 === "manual"))){
const err32 = {instancePath:instancePath+"/progress_policy",schemaPath:"#/properties/progress_policy/enum",keyword:"enum",params:{allowedValues: schema50.properties.progress_policy.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
if(data.failure_codes !== undefined){
let data14 = data.failure_codes;
if(Array.isArray(data14)){
const len1 = data14.length;
for(let i2=0; i2<len1; i2++){
let data15 = data14[i2];
if(typeof data15 === "string"){
if(!pattern11.test(data15)){
const err33 = {instancePath:instancePath+"/failure_codes/" + i2,schemaPath:"#/properties/failure_codes/items/pattern",keyword:"pattern",params:{pattern: "^[A-Z][A-Z0-9_]+$"},message:"must match pattern \""+"^[A-Z][A-Z0-9_]+$"+"\""};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
else {
const err34 = {instancePath:instancePath+"/failure_codes/" + i2,schemaPath:"#/properties/failure_codes/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
let i3 = data14.length;
let j1;
if(i3 > 1){
const indices1 = {};
for(;i3--;){
let item1 = data14[i3];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err35 = {instancePath:instancePath+"/failure_codes",schemaPath:"#/properties/failure_codes/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
break;
}
indices1[item1] = i3;
}
}
}
else {
const err36 = {instancePath:instancePath+"/failure_codes",schemaPath:"#/properties/failure_codes/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
}
else {
const err37 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
validate64.errors = vErrors;
return errors === 0;
}
validate64.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator4 = validate65;
const schema51 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:activity-instance","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.activity.instance"},"schema_version":{"const":1},"activity_instance_id":{"type":"string","format":"uuid"},"activity_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"actor_instance_id":{"type":"string","format":"uuid"},"status":{"enum":["pending","running","completed","canceled","failed"]},"started_at":{"type":["object","null"],"additionalProperties":false,"properties":{"game_time":{"type":"integer","minimum":0}},"required":["game_time"]},"progress":{"type":"number","minimum":0,"maximum":1},"parameters":{"type":"object"},"failure":{"oneOf":[{"type":"null"},{"type":"object","additionalProperties":false,"properties":{"code":{"type":"string","pattern":"^[A-Z][A-Z0-9_]+$"},"message_key":{"type":"string","pattern":"^[a-z][a-z0-9_.-]*$"},"details":{"type":"object"}},"required":["code","message_key","details"]}]}},"required":["schema_id","schema_version","activity_instance_id","activity_ref","actor_instance_id","status","started_at","progress","parameters","failure"]};

function validate65(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:activity-instance" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate65.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.activity_instance_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "activity_instance_id"},message:"must have required property '"+"activity_instance_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.activity_ref === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "activity_ref"},message:"must have required property '"+"activity_ref"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.actor_instance_id === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "actor_instance_id"},message:"must have required property '"+"actor_instance_id"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.status === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.started_at === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "started_at"},message:"must have required property '"+"started_at"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.progress === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "progress"},message:"must have required property '"+"progress"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.parameters === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "parameters"},message:"must have required property '"+"parameters"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data.failure === undefined){
const err9 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "failure"},message:"must have required property '"+"failure"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema51.properties, key0))){
const err10 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.activity.instance" !== data.schema_id){
const err11 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.activity.instance"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err12 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.activity_instance_id !== undefined){
let data2 = data.activity_instance_id;
if(typeof data2 === "string"){
if(!(formats0.test(data2))){
const err13 = {instancePath:instancePath+"/activity_instance_id",schemaPath:"#/properties/activity_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/activity_instance_id",schemaPath:"#/properties/activity_instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.activity_ref !== undefined){
let data3 = data.activity_ref;
if(data3 && typeof data3 == "object" && !Array.isArray(data3)){
if(data3.ref === undefined){
const err15 = {instancePath:instancePath+"/activity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
for(const key1 in data3){
if(!(key1 === "ref")){
const err16 = {instancePath:instancePath+"/activity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data3.ref !== undefined){
let data4 = data3.ref;
if(typeof data4 === "string"){
if(!pattern4.test(data4)){
const err17 = {instancePath:instancePath+"/activity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
else {
const err18 = {instancePath:instancePath+"/activity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
}
else {
const err19 = {instancePath:instancePath+"/activity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.actor_instance_id !== undefined){
let data5 = data.actor_instance_id;
if(typeof data5 === "string"){
if(!(formats0.test(data5))){
const err20 = {instancePath:instancePath+"/actor_instance_id",schemaPath:"#/properties/actor_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
else {
const err21 = {instancePath:instancePath+"/actor_instance_id",schemaPath:"#/properties/actor_instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.status !== undefined){
let data6 = data.status;
if(!(((((data6 === "pending") || (data6 === "running")) || (data6 === "completed")) || (data6 === "canceled")) || (data6 === "failed"))){
const err22 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/enum",keyword:"enum",params:{allowedValues: schema51.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data.started_at !== undefined){
let data7 = data.started_at;
if((!(data7 && typeof data7 == "object" && !Array.isArray(data7))) && (data7 !== null)){
const err23 = {instancePath:instancePath+"/started_at",schemaPath:"#/properties/started_at/type",keyword:"type",params:{type: schema51.properties.started_at.type},message:"must be object,null"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
if(data7 && typeof data7 == "object" && !Array.isArray(data7)){
if(data7.game_time === undefined){
const err24 = {instancePath:instancePath+"/started_at",schemaPath:"#/properties/started_at/required",keyword:"required",params:{missingProperty: "game_time"},message:"must have required property '"+"game_time"+"'"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
for(const key2 in data7){
if(!(key2 === "game_time")){
const err25 = {instancePath:instancePath+"/started_at",schemaPath:"#/properties/started_at/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data7.game_time !== undefined){
let data8 = data7.game_time;
if(!(((typeof data8 == "number") && (!(data8 % 1) && !isNaN(data8))) && (isFinite(data8)))){
const err26 = {instancePath:instancePath+"/started_at/game_time",schemaPath:"#/properties/started_at/properties/game_time/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
if((typeof data8 == "number") && (isFinite(data8))){
if(data8 < 0 || isNaN(data8)){
const err27 = {instancePath:instancePath+"/started_at/game_time",schemaPath:"#/properties/started_at/properties/game_time/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
}
}
}
if(data.progress !== undefined){
let data9 = data.progress;
if((typeof data9 == "number") && (isFinite(data9))){
if(data9 > 1 || isNaN(data9)){
const err28 = {instancePath:instancePath+"/progress",schemaPath:"#/properties/progress/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
if(data9 < 0 || isNaN(data9)){
const err29 = {instancePath:instancePath+"/progress",schemaPath:"#/properties/progress/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
else {
const err30 = {instancePath:instancePath+"/progress",schemaPath:"#/properties/progress/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data.parameters !== undefined){
let data10 = data.parameters;
if(!(data10 && typeof data10 == "object" && !Array.isArray(data10))){
const err31 = {instancePath:instancePath+"/parameters",schemaPath:"#/properties/parameters/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
if(data.failure !== undefined){
let data11 = data.failure;
const _errs25 = errors;
let valid4 = false;
let passing0 = null;
const _errs26 = errors;
if(data11 !== null){
const err32 = {instancePath:instancePath+"/failure",schemaPath:"#/properties/failure/oneOf/0/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
var _valid0 = _errs26 === errors;
if(_valid0){
valid4 = true;
passing0 = 0;
}
const _errs28 = errors;
if(data11 && typeof data11 == "object" && !Array.isArray(data11)){
if(data11.code === undefined){
const err33 = {instancePath:instancePath+"/failure",schemaPath:"#/properties/failure/oneOf/1/required",keyword:"required",params:{missingProperty: "code"},message:"must have required property '"+"code"+"'"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
if(data11.message_key === undefined){
const err34 = {instancePath:instancePath+"/failure",schemaPath:"#/properties/failure/oneOf/1/required",keyword:"required",params:{missingProperty: "message_key"},message:"must have required property '"+"message_key"+"'"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
if(data11.details === undefined){
const err35 = {instancePath:instancePath+"/failure",schemaPath:"#/properties/failure/oneOf/1/required",keyword:"required",params:{missingProperty: "details"},message:"must have required property '"+"details"+"'"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
for(const key3 in data11){
if(!(((key3 === "code") || (key3 === "message_key")) || (key3 === "details"))){
const err36 = {instancePath:instancePath+"/failure",schemaPath:"#/properties/failure/oneOf/1/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data11.code !== undefined){
let data12 = data11.code;
if(typeof data12 === "string"){
if(!pattern11.test(data12)){
const err37 = {instancePath:instancePath+"/failure/code",schemaPath:"#/properties/failure/oneOf/1/properties/code/pattern",keyword:"pattern",params:{pattern: "^[A-Z][A-Z0-9_]+$"},message:"must match pattern \""+"^[A-Z][A-Z0-9_]+$"+"\""};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
else {
const err38 = {instancePath:instancePath+"/failure/code",schemaPath:"#/properties/failure/oneOf/1/properties/code/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
if(data11.message_key !== undefined){
let data13 = data11.message_key;
if(typeof data13 === "string"){
if(!pattern15.test(data13)){
const err39 = {instancePath:instancePath+"/failure/message_key",schemaPath:"#/properties/failure/oneOf/1/properties/message_key/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_.-]*$"},message:"must match pattern \""+"^[a-z][a-z0-9_.-]*$"+"\""};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
else {
const err40 = {instancePath:instancePath+"/failure/message_key",schemaPath:"#/properties/failure/oneOf/1/properties/message_key/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data11.details !== undefined){
let data14 = data11.details;
if(!(data14 && typeof data14 == "object" && !Array.isArray(data14))){
const err41 = {instancePath:instancePath+"/failure/details",schemaPath:"#/properties/failure/oneOf/1/properties/details/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
}
else {
const err42 = {instancePath:instancePath+"/failure",schemaPath:"#/properties/failure/oneOf/1/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
var _valid0 = _errs28 === errors;
if(_valid0 && valid4){
valid4 = false;
passing0 = [passing0, 1];
}
else {
if(_valid0){
valid4 = true;
passing0 = 1;
}
}
if(!valid4){
const err43 = {instancePath:instancePath+"/failure",schemaPath:"#/properties/failure/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
else {
errors = _errs25;
if(vErrors !== null){
if(_errs25){
vErrors.length = _errs25;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err44 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
validate65.errors = vErrors;
return errors === 0;
}
validate65.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator5 = validate66;
const schema53 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:affordance-definition","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.affordance.definition"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"affordance"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"interaction_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"target_kinds":{"type":"array","items":{"enum":["character","object","item","room","location"]},"minItems":1,"uniqueItems":true},"target_tags_all":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"availability_condition":{"$ref":"urn:aigs:schema:v1:condition-expression"},"bindings":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_.-]*$"},"additionalProperties":{"type":"object","additionalProperties":false,"properties":{"source":{"enum":["actor_instance","target_instance","literal"]},"value":{}},"required":["source"]}},"ai":{"type":"object","additionalProperties":false,"properties":{"summary":{"type":"string"},"categories":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true}}}},"required":["schema_id","schema_version","id","kind","display_name","interaction_ref","target_kinds"]};
const func0 = aigsRuntimeEqual;

function validate66(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:affordance-definition" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate66.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.interaction_ref === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "interaction_ref"},message:"must have required property '"+"interaction_ref"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.target_kinds === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "target_kinds"},message:"must have required property '"+"target_kinds"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema53.properties, key0))){
const err7 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.affordance.definition" !== data.schema_id){
const err8 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.affordance.definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err9 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err10 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.kind !== undefined){
if("affordance" !== data.kind){
const err12 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "affordance"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err13 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err15 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err16 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err18 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err19 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err20 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err21 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err22 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
}
else {
const err23 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data.interaction_ref !== undefined){
let data10 = data.interaction_ref;
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
if(data10.ref === undefined){
const err24 = {instancePath:instancePath+"/interaction_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
for(const key3 in data10){
if(!(key3 === "ref")){
const err25 = {instancePath:instancePath+"/interaction_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data10.ref !== undefined){
let data11 = data10.ref;
if(typeof data11 === "string"){
if(!pattern4.test(data11)){
const err26 = {instancePath:instancePath+"/interaction_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
else {
const err27 = {instancePath:instancePath+"/interaction_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
}
else {
const err28 = {instancePath:instancePath+"/interaction_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data.target_kinds !== undefined){
let data12 = data.target_kinds;
if(Array.isArray(data12)){
if(data12.length < 1){
const err29 = {instancePath:instancePath+"/target_kinds",schemaPath:"#/properties/target_kinds/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
const len1 = data12.length;
for(let i2=0; i2<len1; i2++){
let data13 = data12[i2];
if(!(((((data13 === "character") || (data13 === "object")) || (data13 === "item")) || (data13 === "room")) || (data13 === "location"))){
const err30 = {instancePath:instancePath+"/target_kinds/" + i2,schemaPath:"#/properties/target_kinds/items/enum",keyword:"enum",params:{allowedValues: schema53.properties.target_kinds.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
let i3 = data12.length;
let j1;
if(i3 > 1){
outer0:
for(;i3--;){
for(j1 = i3; j1--;){
if(func0(data12[i3], data12[j1])){
const err31 = {instancePath:instancePath+"/target_kinds",schemaPath:"#/properties/target_kinds/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
break outer0;
}
}
}
}
}
else {
const err32 = {instancePath:instancePath+"/target_kinds",schemaPath:"#/properties/target_kinds/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
if(data.target_tags_all !== undefined){
let data14 = data.target_tags_all;
if(Array.isArray(data14)){
const len2 = data14.length;
for(let i4=0; i4<len2; i4++){
let data15 = data14[i4];
if(typeof data15 === "string"){
if(!pattern5.test(data15)){
const err33 = {instancePath:instancePath+"/target_tags_all/" + i4,schemaPath:"#/properties/target_tags_all/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
else {
const err34 = {instancePath:instancePath+"/target_tags_all/" + i4,schemaPath:"#/properties/target_tags_all/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
let i5 = data14.length;
let j2;
if(i5 > 1){
const indices1 = {};
for(;i5--;){
let item1 = data14[i5];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j2 = indices1[item1];
const err35 = {instancePath:instancePath+"/target_tags_all",schemaPath:"#/properties/target_tags_all/uniqueItems",keyword:"uniqueItems",params:{i: i5, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i5+" are identical)"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
break;
}
indices1[item1] = i5;
}
}
}
else {
const err36 = {instancePath:instancePath+"/target_tags_all",schemaPath:"#/properties/target_tags_all/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data.availability_condition !== undefined){
if(!(validate21(data.availability_condition, {instancePath:instancePath+"/availability_condition",parentData:data,parentDataProperty:"availability_condition",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
errors = vErrors.length;
}
}
if(data.bindings !== undefined){
let data17 = data.bindings;
if(data17 && typeof data17 == "object" && !Array.isArray(data17)){
for(const key4 in data17){
const _errs37 = errors;
if(typeof key4 === "string"){
if(!pattern15.test(key4)){
const err37 = {instancePath:instancePath+"/bindings",schemaPath:"#/properties/bindings/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_.-]*$"},message:"must match pattern \""+"^[a-z][a-z0-9_.-]*$"+"\"",propertyName:key4};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
var valid14 = _errs37 === errors;
if(!valid14){
const err38 = {instancePath:instancePath+"/bindings",schemaPath:"#/properties/bindings/propertyNames",keyword:"propertyNames",params:{propertyName: key4},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
for(const key5 in data17){
let data18 = data17[key5];
if(data18 && typeof data18 == "object" && !Array.isArray(data18)){
if(data18.source === undefined){
const err39 = {instancePath:instancePath+"/bindings/" + key5.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/bindings/additionalProperties/required",keyword:"required",params:{missingProperty: "source"},message:"must have required property '"+"source"+"'"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
for(const key6 in data18){
if(!((key6 === "source") || (key6 === "value"))){
const err40 = {instancePath:instancePath+"/bindings/" + key5.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/bindings/additionalProperties/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key6},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data18.source !== undefined){
let data19 = data18.source;
if(!(((data19 === "actor_instance") || (data19 === "target_instance")) || (data19 === "literal"))){
const err41 = {instancePath:instancePath+"/bindings/" + key5.replace(/~/g, "~0").replace(/\//g, "~1")+"/source",schemaPath:"#/properties/bindings/additionalProperties/properties/source/enum",keyword:"enum",params:{allowedValues: schema53.properties.bindings.additionalProperties.properties.source.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
}
else {
const err42 = {instancePath:instancePath+"/bindings/" + key5.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/bindings/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
}
else {
const err43 = {instancePath:instancePath+"/bindings",schemaPath:"#/properties/bindings/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
if(data.ai !== undefined){
let data20 = data.ai;
if(data20 && typeof data20 == "object" && !Array.isArray(data20)){
for(const key7 in data20){
if(!((key7 === "summary") || (key7 === "categories"))){
const err44 = {instancePath:instancePath+"/ai",schemaPath:"#/properties/ai/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key7},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
if(data20.summary !== undefined){
if(typeof data20.summary !== "string"){
const err45 = {instancePath:instancePath+"/ai/summary",schemaPath:"#/properties/ai/properties/summary/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
}
if(data20.categories !== undefined){
let data22 = data20.categories;
if(Array.isArray(data22)){
const len3 = data22.length;
for(let i6=0; i6<len3; i6++){
let data23 = data22[i6];
if(typeof data23 === "string"){
if(!pattern5.test(data23)){
const err46 = {instancePath:instancePath+"/ai/categories/" + i6,schemaPath:"#/properties/ai/properties/categories/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
}
else {
const err47 = {instancePath:instancePath+"/ai/categories/" + i6,schemaPath:"#/properties/ai/properties/categories/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
let i7 = data22.length;
let j3;
if(i7 > 1){
const indices2 = {};
for(;i7--;){
let item2 = data22[i7];
if(typeof item2 !== "string"){
continue;
}
if(typeof indices2[item2] == "number"){
j3 = indices2[item2];
const err48 = {instancePath:instancePath+"/ai/categories",schemaPath:"#/properties/ai/properties/categories/uniqueItems",keyword:"uniqueItems",params:{i: i7, j: j3},message:"must NOT have duplicate items (items ## "+j3+" and "+i7+" are identical)"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
break;
}
indices2[item2] = i7;
}
}
}
else {
const err49 = {instancePath:instancePath+"/ai/categories",schemaPath:"#/properties/ai/properties/categories/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
}
}
else {
const err50 = {instancePath:instancePath+"/ai",schemaPath:"#/properties/ai/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
}
}
else {
const err51 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
validate66.errors = vErrors;
return errors === 0;
}
validate66.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator6 = validate68;
const schema55 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:affordance-offer","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.affordance.offer"},"schema_version":{"const":1},"offer_id":{"type":"string","format":"uuid"},"affordance_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"actor_instance_id":{"type":"string","format":"uuid"},"target_instance_id":{"type":["string","null"],"format":"uuid"},"interaction_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"bound_parameters":{"type":"object"}},"required":["schema_id","schema_version","offer_id","affordance_ref","actor_instance_id","target_instance_id","interaction_ref","bound_parameters"]};

function validate68(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:affordance-offer" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate68.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.offer_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "offer_id"},message:"must have required property '"+"offer_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.affordance_ref === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "affordance_ref"},message:"must have required property '"+"affordance_ref"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.actor_instance_id === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "actor_instance_id"},message:"must have required property '"+"actor_instance_id"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.target_instance_id === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "target_instance_id"},message:"must have required property '"+"target_instance_id"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.interaction_ref === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "interaction_ref"},message:"must have required property '"+"interaction_ref"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.bound_parameters === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "bound_parameters"},message:"must have required property '"+"bound_parameters"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
for(const key0 in data){
if(!((((((((key0 === "schema_id") || (key0 === "schema_version")) || (key0 === "offer_id")) || (key0 === "affordance_ref")) || (key0 === "actor_instance_id")) || (key0 === "target_instance_id")) || (key0 === "interaction_ref")) || (key0 === "bound_parameters"))){
const err8 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.affordance.offer" !== data.schema_id){
const err9 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.affordance.offer"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err10 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.offer_id !== undefined){
let data2 = data.offer_id;
if(typeof data2 === "string"){
if(!(formats0.test(data2))){
const err11 = {instancePath:instancePath+"/offer_id",schemaPath:"#/properties/offer_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/offer_id",schemaPath:"#/properties/offer_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.affordance_ref !== undefined){
let data3 = data.affordance_ref;
if(data3 && typeof data3 == "object" && !Array.isArray(data3)){
if(data3.ref === undefined){
const err13 = {instancePath:instancePath+"/affordance_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
for(const key1 in data3){
if(!(key1 === "ref")){
const err14 = {instancePath:instancePath+"/affordance_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data3.ref !== undefined){
let data4 = data3.ref;
if(typeof data4 === "string"){
if(!pattern4.test(data4)){
const err15 = {instancePath:instancePath+"/affordance_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
else {
const err16 = {instancePath:instancePath+"/affordance_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
}
else {
const err17 = {instancePath:instancePath+"/affordance_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.actor_instance_id !== undefined){
let data5 = data.actor_instance_id;
if(typeof data5 === "string"){
if(!(formats0.test(data5))){
const err18 = {instancePath:instancePath+"/actor_instance_id",schemaPath:"#/properties/actor_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
else {
const err19 = {instancePath:instancePath+"/actor_instance_id",schemaPath:"#/properties/actor_instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.target_instance_id !== undefined){
let data6 = data.target_instance_id;
if((typeof data6 !== "string") && (data6 !== null)){
const err20 = {instancePath:instancePath+"/target_instance_id",schemaPath:"#/properties/target_instance_id/type",keyword:"type",params:{type: schema55.properties.target_instance_id.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(typeof data6 === "string"){
if(!(formats0.test(data6))){
const err21 = {instancePath:instancePath+"/target_instance_id",schemaPath:"#/properties/target_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
}
if(data.interaction_ref !== undefined){
let data7 = data.interaction_ref;
if(data7 && typeof data7 == "object" && !Array.isArray(data7)){
if(data7.ref === undefined){
const err22 = {instancePath:instancePath+"/interaction_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
for(const key2 in data7){
if(!(key2 === "ref")){
const err23 = {instancePath:instancePath+"/interaction_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data7.ref !== undefined){
let data8 = data7.ref;
if(typeof data8 === "string"){
if(!pattern4.test(data8)){
const err24 = {instancePath:instancePath+"/interaction_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
else {
const err25 = {instancePath:instancePath+"/interaction_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
}
else {
const err26 = {instancePath:instancePath+"/interaction_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(data.bound_parameters !== undefined){
let data9 = data.bound_parameters;
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err27 = {instancePath:instancePath+"/bound_parameters",schemaPath:"#/properties/bound_parameters/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
}
else {
const err28 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
validate68.errors = vErrors;
return errors === 0;
}
validate68.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator7 = validate69;
const schema58 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:provider-profile","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.ai.provider_profile"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"ai_provider_profile"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"adapter_key":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},"capabilities":{"type":"object","additionalProperties":false,"properties":{"text":{"type":"boolean"},"structured_output":{"type":"boolean"},"tools":{"type":"boolean"},"streaming":{"type":"boolean"},"vision":{"type":"boolean"},"embeddings":{"type":"boolean"},"speech_to_text":{"type":"boolean"},"text_to_speech":{"type":"boolean"}},"required":["text","structured_output","tools","streaming","vision","embeddings","speech_to_text","text_to_speech"]},"provider_config":{"type":"object","propertyNames":{"pattern":"^(?!(?:[Aa][Pp][Ii][_-]?[Kk][Ee][Yy]|[Ss][Ee][Cc][Rr][Ee][Tt](?:[_-]?[Kk][Ee][Yy])?|[Tt][Oo][Kk][Ee][Nn]|[Aa][Cc][Cc][Ee][Ss][Ss][_-]?[Tt][Oo][Kk][Ee][Nn]|[Aa][Uu][Tt][Hh][_-]?[Tt][Oo][Kk][Ee][Nn]|[Bb][Ee][Aa][Rr][Ee][Rr][_-]?[Tt][Oo][Kk][Ee][Nn]|[Pp][Aa][Ss][Ss][Ww][Oo][Rr][Dd]|[Cc][Rr][Ee][Dd][Ee][Nn][Tt][Ii][Aa][Ll][Ss]?|[Cc][Ll][Ii][Ee][Nn][Tt][_-]?[Ss][Ee][Cc][Rr][Ee][Tt]|[Pp][Rr][Ii][Vv][Aa][Tt][Ee][_-]?[Kk][Ee][Yy])$).+$"},"additionalProperties":{"$ref":"urn:aigs:schema:v1:safe-config-value"}}},"required":["schema_id","schema_version","id","kind","display_name","adapter_key","capabilities"]};
const pattern38 = new RegExp("^(?!(?:[Aa][Pp][Ii][_-]?[Kk][Ee][Yy]|[Ss][Ee][Cc][Rr][Ee][Tt](?:[_-]?[Kk][Ee][Yy])?|[Tt][Oo][Kk][Ee][Nn]|[Aa][Cc][Cc][Ee][Ss][Ss][_-]?[Tt][Oo][Kk][Ee][Nn]|[Aa][Uu][Tt][Hh][_-]?[Tt][Oo][Kk][Ee][Nn]|[Bb][Ee][Aa][Rr][Ee][Rr][_-]?[Tt][Oo][Kk][Ee][Nn]|[Pp][Aa][Ss][Ss][Ww][Oo][Rr][Dd]|[Cc][Rr][Ee][Dd][Ee][Nn][Tt][Ii][Aa][Ll][Ss]?|[Cc][Ll][Ii][Ee][Nn][Tt][_-]?[Ss][Ee][Cc][Rr][Ee][Tt]|[Pp][Rr][Ii][Vv][Aa][Tt][Ee][_-]?[Kk][Ee][Yy])$).+$", "u");
const schema59 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:safe-config-value","oneOf":[{"type":["string","number","boolean","null"]},{"type":"array","items":{"$ref":"urn:aigs:schema:v1:safe-config-value"}},{"type":"object","propertyNames":{"pattern":"^(?!(?:[Aa][Pp][Ii][_-]?[Kk][Ee][Yy]|[Ss][Ee][Cc][Rr][Ee][Tt](?:[_-]?[Kk][Ee][Yy])?|[Tt][Oo][Kk][Ee][Nn]|[Aa][Cc][Cc][Ee][Ss][Ss][_-]?[Tt][Oo][Kk][Ee][Nn]|[Aa][Uu][Tt][Hh][_-]?[Tt][Oo][Kk][Ee][Nn]|[Bb][Ee][Aa][Rr][Ee][Rr][_-]?[Tt][Oo][Kk][Ee][Nn]|[Pp][Aa][Ss][Ss][Ww][Oo][Rr][Dd]|[Cc][Rr][Ee][Dd][Ee][Nn][Tt][Ii][Aa][Ll][Ss]?|[Cc][Ll][Ii][Ee][Nn][Tt][_-]?[Ss][Ee][Cc][Rr][Ee][Tt]|[Pp][Rr][Ii][Vv][Aa][Tt][Ee][_-]?[Kk][Ee][Yy])$).+$"},"additionalProperties":{"$ref":"urn:aigs:schema:v1:safe-config-value"}}]};
const wrapper3 = {validate: validate70};

function validate70(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:safe-config-value" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate70.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
const _errs0 = errors;
let valid0 = false;
let passing0 = null;
const _errs1 = errors;
if((((typeof data !== "string") && (!((typeof data == "number") && (isFinite(data))))) && (typeof data !== "boolean")) && (data !== null)){
const err0 = {instancePath,schemaPath:"#/oneOf/0/type",keyword:"type",params:{type: schema59.oneOf[0].type},message:"must be string,number,boolean,null"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
var _valid0 = _errs1 === errors;
if(_valid0){
valid0 = true;
passing0 = 0;
}
const _errs3 = errors;
if(Array.isArray(data)){
const len0 = data.length;
for(let i0=0; i0<len0; i0++){
if(!(wrapper3.validate(data[i0], {instancePath:instancePath+"/" + i0,parentData:data,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? wrapper3.validate.errors : vErrors.concat(wrapper3.validate.errors);
errors = vErrors.length;
}
}
}
else {
const err1 = {instancePath,schemaPath:"#/oneOf/1/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
var _valid0 = _errs3 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 1];
}
else {
if(_valid0){
valid0 = true;
passing0 = 1;
var items1 = true;
}
const _errs6 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
for(const key0 in data){
const _errs8 = errors;
if(typeof key0 === "string"){
if(!pattern38.test(key0)){
const err2 = {instancePath,schemaPath:"#/oneOf/2/propertyNames/pattern",keyword:"pattern",params:{pattern: "^(?!(?:[Aa][Pp][Ii][_-]?[Kk][Ee][Yy]|[Ss][Ee][Cc][Rr][Ee][Tt](?:[_-]?[Kk][Ee][Yy])?|[Tt][Oo][Kk][Ee][Nn]|[Aa][Cc][Cc][Ee][Ss][Ss][_-]?[Tt][Oo][Kk][Ee][Nn]|[Aa][Uu][Tt][Hh][_-]?[Tt][Oo][Kk][Ee][Nn]|[Bb][Ee][Aa][Rr][Ee][Rr][_-]?[Tt][Oo][Kk][Ee][Nn]|[Pp][Aa][Ss][Ss][Ww][Oo][Rr][Dd]|[Cc][Rr][Ee][Dd][Ee][Nn][Tt][Ii][Aa][Ll][Ss]?|[Cc][Ll][Ii][Ee][Nn][Tt][_-]?[Ss][Ee][Cc][Rr][Ee][Tt]|[Pp][Rr][Ii][Vv][Aa][Tt][Ee][_-]?[Kk][Ee][Yy])$).+$"},message:"must match pattern \""+"^(?!(?:[Aa][Pp][Ii][_-]?[Kk][Ee][Yy]|[Ss][Ee][Cc][Rr][Ee][Tt](?:[_-]?[Kk][Ee][Yy])?|[Tt][Oo][Kk][Ee][Nn]|[Aa][Cc][Cc][Ee][Ss][Ss][_-]?[Tt][Oo][Kk][Ee][Nn]|[Aa][Uu][Tt][Hh][_-]?[Tt][Oo][Kk][Ee][Nn]|[Bb][Ee][Aa][Rr][Ee][Rr][_-]?[Tt][Oo][Kk][Ee][Nn]|[Pp][Aa][Ss][Ss][Ww][Oo][Rr][Dd]|[Cc][Rr][Ee][Dd][Ee][Nn][Tt][Ii][Aa][Ll][Ss]?|[Cc][Ll][Ii][Ee][Nn][Tt][_-]?[Ss][Ee][Cc][Rr][Ee][Tt]|[Pp][Rr][Ii][Vv][Aa][Tt][Ee][_-]?[Kk][Ee][Yy])$).+$"+"\"",propertyName:key0};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
var valid3 = _errs8 === errors;
if(!valid3){
const err3 = {instancePath,schemaPath:"#/oneOf/2/propertyNames",keyword:"propertyNames",params:{propertyName: key0},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
for(const key1 in data){
if(!(wrapper3.validate(data[key1], {instancePath:instancePath+"/" + key1.replace(/~/g, "~0").replace(/\//g, "~1"),parentData:data,parentDataProperty:key1,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? wrapper3.validate.errors : vErrors.concat(wrapper3.validate.errors);
errors = vErrors.length;
}
}
}
else {
const err4 = {instancePath,schemaPath:"#/oneOf/2/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
var _valid0 = _errs6 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 2];
}
else {
if(_valid0){
valid0 = true;
passing0 = 2;
var props2 = true;
}
}
}
if(!valid0){
const err5 = {instancePath,schemaPath:"#/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
else {
errors = _errs0;
if(vErrors !== null){
if(_errs0){
vErrors.length = _errs0;
}
else {
vErrors = null;
}
}
}
validate70.errors = vErrors;
evaluated0.props = props2;
evaluated0.items = items1;
return errors === 0;
}
validate70.evaluated = {"dynamicProps":true,"dynamicItems":true};


function validate69(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:provider-profile" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate69.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.adapter_key === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "adapter_key"},message:"must have required property '"+"adapter_key"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.capabilities === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "capabilities"},message:"must have required property '"+"capabilities"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema58.properties, key0))){
const err7 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.ai.provider_profile" !== data.schema_id){
const err8 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.ai.provider_profile"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err9 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err10 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.kind !== undefined){
if("ai_provider_profile" !== data.kind){
const err12 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "ai_provider_profile"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err13 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err15 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err16 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err18 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err19 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err20 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err21 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err22 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
}
else {
const err23 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data.adapter_key !== undefined){
let data10 = data.adapter_key;
if(typeof data10 === "string"){
if(!pattern7.test(data10)){
const err24 = {instancePath:instancePath+"/adapter_key",schemaPath:"#/properties/adapter_key/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"+"\""};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
else {
const err25 = {instancePath:instancePath+"/adapter_key",schemaPath:"#/properties/adapter_key/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data.capabilities !== undefined){
let data11 = data.capabilities;
if(data11 && typeof data11 == "object" && !Array.isArray(data11)){
if(data11.text === undefined){
const err26 = {instancePath:instancePath+"/capabilities",schemaPath:"#/properties/capabilities/required",keyword:"required",params:{missingProperty: "text"},message:"must have required property '"+"text"+"'"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
if(data11.structured_output === undefined){
const err27 = {instancePath:instancePath+"/capabilities",schemaPath:"#/properties/capabilities/required",keyword:"required",params:{missingProperty: "structured_output"},message:"must have required property '"+"structured_output"+"'"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if(data11.tools === undefined){
const err28 = {instancePath:instancePath+"/capabilities",schemaPath:"#/properties/capabilities/required",keyword:"required",params:{missingProperty: "tools"},message:"must have required property '"+"tools"+"'"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
if(data11.streaming === undefined){
const err29 = {instancePath:instancePath+"/capabilities",schemaPath:"#/properties/capabilities/required",keyword:"required",params:{missingProperty: "streaming"},message:"must have required property '"+"streaming"+"'"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(data11.vision === undefined){
const err30 = {instancePath:instancePath+"/capabilities",schemaPath:"#/properties/capabilities/required",keyword:"required",params:{missingProperty: "vision"},message:"must have required property '"+"vision"+"'"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
if(data11.embeddings === undefined){
const err31 = {instancePath:instancePath+"/capabilities",schemaPath:"#/properties/capabilities/required",keyword:"required",params:{missingProperty: "embeddings"},message:"must have required property '"+"embeddings"+"'"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
if(data11.speech_to_text === undefined){
const err32 = {instancePath:instancePath+"/capabilities",schemaPath:"#/properties/capabilities/required",keyword:"required",params:{missingProperty: "speech_to_text"},message:"must have required property '"+"speech_to_text"+"'"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
if(data11.text_to_speech === undefined){
const err33 = {instancePath:instancePath+"/capabilities",schemaPath:"#/properties/capabilities/required",keyword:"required",params:{missingProperty: "text_to_speech"},message:"must have required property '"+"text_to_speech"+"'"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
for(const key3 in data11){
if(!((((((((key3 === "text") || (key3 === "structured_output")) || (key3 === "tools")) || (key3 === "streaming")) || (key3 === "vision")) || (key3 === "embeddings")) || (key3 === "speech_to_text")) || (key3 === "text_to_speech"))){
const err34 = {instancePath:instancePath+"/capabilities",schemaPath:"#/properties/capabilities/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data11.text !== undefined){
if(typeof data11.text !== "boolean"){
const err35 = {instancePath:instancePath+"/capabilities/text",schemaPath:"#/properties/capabilities/properties/text/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
if(data11.structured_output !== undefined){
if(typeof data11.structured_output !== "boolean"){
const err36 = {instancePath:instancePath+"/capabilities/structured_output",schemaPath:"#/properties/capabilities/properties/structured_output/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data11.tools !== undefined){
if(typeof data11.tools !== "boolean"){
const err37 = {instancePath:instancePath+"/capabilities/tools",schemaPath:"#/properties/capabilities/properties/tools/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data11.streaming !== undefined){
if(typeof data11.streaming !== "boolean"){
const err38 = {instancePath:instancePath+"/capabilities/streaming",schemaPath:"#/properties/capabilities/properties/streaming/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
if(data11.vision !== undefined){
if(typeof data11.vision !== "boolean"){
const err39 = {instancePath:instancePath+"/capabilities/vision",schemaPath:"#/properties/capabilities/properties/vision/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
if(data11.embeddings !== undefined){
if(typeof data11.embeddings !== "boolean"){
const err40 = {instancePath:instancePath+"/capabilities/embeddings",schemaPath:"#/properties/capabilities/properties/embeddings/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data11.speech_to_text !== undefined){
if(typeof data11.speech_to_text !== "boolean"){
const err41 = {instancePath:instancePath+"/capabilities/speech_to_text",schemaPath:"#/properties/capabilities/properties/speech_to_text/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
if(data11.text_to_speech !== undefined){
if(typeof data11.text_to_speech !== "boolean"){
const err42 = {instancePath:instancePath+"/capabilities/text_to_speech",schemaPath:"#/properties/capabilities/properties/text_to_speech/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
}
else {
const err43 = {instancePath:instancePath+"/capabilities",schemaPath:"#/properties/capabilities/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
if(data.provider_config !== undefined){
let data20 = data.provider_config;
if(data20 && typeof data20 == "object" && !Array.isArray(data20)){
for(const key4 in data20){
const _errs44 = errors;
if(typeof key4 === "string"){
if(!pattern38.test(key4)){
const err44 = {instancePath:instancePath+"/provider_config",schemaPath:"#/properties/provider_config/propertyNames/pattern",keyword:"pattern",params:{pattern: "^(?!(?:[Aa][Pp][Ii][_-]?[Kk][Ee][Yy]|[Ss][Ee][Cc][Rr][Ee][Tt](?:[_-]?[Kk][Ee][Yy])?|[Tt][Oo][Kk][Ee][Nn]|[Aa][Cc][Cc][Ee][Ss][Ss][_-]?[Tt][Oo][Kk][Ee][Nn]|[Aa][Uu][Tt][Hh][_-]?[Tt][Oo][Kk][Ee][Nn]|[Bb][Ee][Aa][Rr][Ee][Rr][_-]?[Tt][Oo][Kk][Ee][Nn]|[Pp][Aa][Ss][Ss][Ww][Oo][Rr][Dd]|[Cc][Rr][Ee][Dd][Ee][Nn][Tt][Ii][Aa][Ll][Ss]?|[Cc][Ll][Ii][Ee][Nn][Tt][_-]?[Ss][Ee][Cc][Rr][Ee][Tt]|[Pp][Rr][Ii][Vv][Aa][Tt][Ee][_-]?[Kk][Ee][Yy])$).+$"},message:"must match pattern \""+"^(?!(?:[Aa][Pp][Ii][_-]?[Kk][Ee][Yy]|[Ss][Ee][Cc][Rr][Ee][Tt](?:[_-]?[Kk][Ee][Yy])?|[Tt][Oo][Kk][Ee][Nn]|[Aa][Cc][Cc][Ee][Ss][Ss][_-]?[Tt][Oo][Kk][Ee][Nn]|[Aa][Uu][Tt][Hh][_-]?[Tt][Oo][Kk][Ee][Nn]|[Bb][Ee][Aa][Rr][Ee][Rr][_-]?[Tt][Oo][Kk][Ee][Nn]|[Pp][Aa][Ss][Ss][Ww][Oo][Rr][Dd]|[Cc][Rr][Ee][Dd][Ee][Nn][Tt][Ii][Aa][Ll][Ss]?|[Cc][Ll][Ii][Ee][Nn][Tt][_-]?[Ss][Ee][Cc][Rr][Ee][Tt]|[Pp][Rr][Ii][Vv][Aa][Tt][Ee][_-]?[Kk][Ee][Yy])$).+$"+"\"",propertyName:key4};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
var valid7 = _errs44 === errors;
if(!valid7){
const err45 = {instancePath:instancePath+"/provider_config",schemaPath:"#/properties/provider_config/propertyNames",keyword:"propertyNames",params:{propertyName: key4},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
}
for(const key5 in data20){
if(!(validate70(data20[key5], {instancePath:instancePath+"/provider_config/" + key5.replace(/~/g, "~0").replace(/\//g, "~1"),parentData:data20,parentDataProperty:key5,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate70.errors : vErrors.concat(validate70.errors);
errors = vErrors.length;
}
}
}
else {
const err46 = {instancePath:instancePath+"/provider_config",schemaPath:"#/properties/provider_config/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
}
}
else {
const err47 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
validate69.errors = vErrors;
return errors === 0;
}
validate69.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator8 = validate72;
const schema60 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:ai-role-profile","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.ai.role_profile"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"ai_role"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"provider_profile_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"model_candidates":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"model":{"type":"string","minLength":1},"priority":{"type":"integer","minimum":0},"max_cost_per_million_tokens":{"type":["number","null"],"minimum":0}},"required":["model","priority"]},"minItems":1},"tool_allowlist":{"type":"array","items":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},"uniqueItems":true},"context_policy":{"type":"object","additionalProperties":false,"properties":{"max_context_tokens":{"type":"integer","minimum":1},"include_raw_world_truth":{"type":"boolean"},"memory_mode":{"enum":["none","relevant","summary","full_allowed"]}},"required":["max_context_tokens","include_raw_world_truth","memory_mode"]},"latency_budget_ms":{"type":["integer","null"],"minimum":1},"cost_budget_usd_per_call":{"type":["number","null"],"minimum":0}},"required":["schema_id","schema_version","id","kind","display_name","provider_profile_ref","model_candidates","tool_allowlist","context_policy"]};

function validate72(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:ai-role-profile" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate72.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.provider_profile_ref === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "provider_profile_ref"},message:"must have required property '"+"provider_profile_ref"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.model_candidates === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "model_candidates"},message:"must have required property '"+"model_candidates"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.tool_allowlist === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "tool_allowlist"},message:"must have required property '"+"tool_allowlist"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.context_policy === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "context_policy"},message:"must have required property '"+"context_policy"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema60.properties, key0))){
const err9 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.ai.role_profile" !== data.schema_id){
const err10 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.ai.role_profile"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err11 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err12 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.kind !== undefined){
if("ai_role" !== data.kind){
const err14 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "ai_role"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err15 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
else {
const err16 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err17 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err18 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
else {
const err19 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err20 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err21 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err22 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err23 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err24 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
}
else {
const err25 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data.provider_profile_ref !== undefined){
let data10 = data.provider_profile_ref;
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
if(data10.ref === undefined){
const err26 = {instancePath:instancePath+"/provider_profile_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
for(const key3 in data10){
if(!(key3 === "ref")){
const err27 = {instancePath:instancePath+"/provider_profile_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data10.ref !== undefined){
let data11 = data10.ref;
if(typeof data11 === "string"){
if(!pattern4.test(data11)){
const err28 = {instancePath:instancePath+"/provider_profile_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
else {
const err29 = {instancePath:instancePath+"/provider_profile_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
}
else {
const err30 = {instancePath:instancePath+"/provider_profile_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data.model_candidates !== undefined){
let data12 = data.model_candidates;
if(Array.isArray(data12)){
if(data12.length < 1){
const err31 = {instancePath:instancePath+"/model_candidates",schemaPath:"#/properties/model_candidates/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
const len1 = data12.length;
for(let i2=0; i2<len1; i2++){
let data13 = data12[i2];
if(data13 && typeof data13 == "object" && !Array.isArray(data13)){
if(data13.model === undefined){
const err32 = {instancePath:instancePath+"/model_candidates/" + i2,schemaPath:"#/properties/model_candidates/items/required",keyword:"required",params:{missingProperty: "model"},message:"must have required property '"+"model"+"'"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
if(data13.priority === undefined){
const err33 = {instancePath:instancePath+"/model_candidates/" + i2,schemaPath:"#/properties/model_candidates/items/required",keyword:"required",params:{missingProperty: "priority"},message:"must have required property '"+"priority"+"'"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
for(const key4 in data13){
if(!(((key4 === "model") || (key4 === "priority")) || (key4 === "max_cost_per_million_tokens"))){
const err34 = {instancePath:instancePath+"/model_candidates/" + i2,schemaPath:"#/properties/model_candidates/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data13.model !== undefined){
let data14 = data13.model;
if(typeof data14 === "string"){
if(func2(data14) < 1){
const err35 = {instancePath:instancePath+"/model_candidates/" + i2+"/model",schemaPath:"#/properties/model_candidates/items/properties/model/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
else {
const err36 = {instancePath:instancePath+"/model_candidates/" + i2+"/model",schemaPath:"#/properties/model_candidates/items/properties/model/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data13.priority !== undefined){
let data15 = data13.priority;
if(!(((typeof data15 == "number") && (!(data15 % 1) && !isNaN(data15))) && (isFinite(data15)))){
const err37 = {instancePath:instancePath+"/model_candidates/" + i2+"/priority",schemaPath:"#/properties/model_candidates/items/properties/priority/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
if((typeof data15 == "number") && (isFinite(data15))){
if(data15 < 0 || isNaN(data15)){
const err38 = {instancePath:instancePath+"/model_candidates/" + i2+"/priority",schemaPath:"#/properties/model_candidates/items/properties/priority/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
}
if(data13.max_cost_per_million_tokens !== undefined){
let data16 = data13.max_cost_per_million_tokens;
if((!((typeof data16 == "number") && (isFinite(data16)))) && (data16 !== null)){
const err39 = {instancePath:instancePath+"/model_candidates/" + i2+"/max_cost_per_million_tokens",schemaPath:"#/properties/model_candidates/items/properties/max_cost_per_million_tokens/type",keyword:"type",params:{type: schema60.properties.model_candidates.items.properties.max_cost_per_million_tokens.type},message:"must be number,null"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
if((typeof data16 == "number") && (isFinite(data16))){
if(data16 < 0 || isNaN(data16)){
const err40 = {instancePath:instancePath+"/model_candidates/" + i2+"/max_cost_per_million_tokens",schemaPath:"#/properties/model_candidates/items/properties/max_cost_per_million_tokens/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
}
}
else {
const err41 = {instancePath:instancePath+"/model_candidates/" + i2,schemaPath:"#/properties/model_candidates/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
}
else {
const err42 = {instancePath:instancePath+"/model_candidates",schemaPath:"#/properties/model_candidates/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
if(data.tool_allowlist !== undefined){
let data17 = data.tool_allowlist;
if(Array.isArray(data17)){
const len2 = data17.length;
for(let i3=0; i3<len2; i3++){
let data18 = data17[i3];
if(typeof data18 === "string"){
if(!pattern7.test(data18)){
const err43 = {instancePath:instancePath+"/tool_allowlist/" + i3,schemaPath:"#/properties/tool_allowlist/items/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"+"\""};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
else {
const err44 = {instancePath:instancePath+"/tool_allowlist/" + i3,schemaPath:"#/properties/tool_allowlist/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
let i4 = data17.length;
let j1;
if(i4 > 1){
const indices1 = {};
for(;i4--;){
let item1 = data17[i4];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err45 = {instancePath:instancePath+"/tool_allowlist",schemaPath:"#/properties/tool_allowlist/uniqueItems",keyword:"uniqueItems",params:{i: i4, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i4+" are identical)"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
break;
}
indices1[item1] = i4;
}
}
}
else {
const err46 = {instancePath:instancePath+"/tool_allowlist",schemaPath:"#/properties/tool_allowlist/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
}
if(data.context_policy !== undefined){
let data19 = data.context_policy;
if(data19 && typeof data19 == "object" && !Array.isArray(data19)){
if(data19.max_context_tokens === undefined){
const err47 = {instancePath:instancePath+"/context_policy",schemaPath:"#/properties/context_policy/required",keyword:"required",params:{missingProperty: "max_context_tokens"},message:"must have required property '"+"max_context_tokens"+"'"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
if(data19.include_raw_world_truth === undefined){
const err48 = {instancePath:instancePath+"/context_policy",schemaPath:"#/properties/context_policy/required",keyword:"required",params:{missingProperty: "include_raw_world_truth"},message:"must have required property '"+"include_raw_world_truth"+"'"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
if(data19.memory_mode === undefined){
const err49 = {instancePath:instancePath+"/context_policy",schemaPath:"#/properties/context_policy/required",keyword:"required",params:{missingProperty: "memory_mode"},message:"must have required property '"+"memory_mode"+"'"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
for(const key5 in data19){
if(!(((key5 === "max_context_tokens") || (key5 === "include_raw_world_truth")) || (key5 === "memory_mode"))){
const err50 = {instancePath:instancePath+"/context_policy",schemaPath:"#/properties/context_policy/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
}
if(data19.max_context_tokens !== undefined){
let data20 = data19.max_context_tokens;
if(!(((typeof data20 == "number") && (!(data20 % 1) && !isNaN(data20))) && (isFinite(data20)))){
const err51 = {instancePath:instancePath+"/context_policy/max_context_tokens",schemaPath:"#/properties/context_policy/properties/max_context_tokens/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
if((typeof data20 == "number") && (isFinite(data20))){
if(data20 < 1 || isNaN(data20)){
const err52 = {instancePath:instancePath+"/context_policy/max_context_tokens",schemaPath:"#/properties/context_policy/properties/max_context_tokens/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
}
}
if(data19.include_raw_world_truth !== undefined){
if(typeof data19.include_raw_world_truth !== "boolean"){
const err53 = {instancePath:instancePath+"/context_policy/include_raw_world_truth",schemaPath:"#/properties/context_policy/properties/include_raw_world_truth/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
}
if(data19.memory_mode !== undefined){
let data22 = data19.memory_mode;
if(!((((data22 === "none") || (data22 === "relevant")) || (data22 === "summary")) || (data22 === "full_allowed"))){
const err54 = {instancePath:instancePath+"/context_policy/memory_mode",schemaPath:"#/properties/context_policy/properties/memory_mode/enum",keyword:"enum",params:{allowedValues: schema60.properties.context_policy.properties.memory_mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
}
}
else {
const err55 = {instancePath:instancePath+"/context_policy",schemaPath:"#/properties/context_policy/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
}
if(data.latency_budget_ms !== undefined){
let data23 = data.latency_budget_ms;
if((!(((typeof data23 == "number") && (!(data23 % 1) && !isNaN(data23))) && (isFinite(data23)))) && (data23 !== null)){
const err56 = {instancePath:instancePath+"/latency_budget_ms",schemaPath:"#/properties/latency_budget_ms/type",keyword:"type",params:{type: schema60.properties.latency_budget_ms.type},message:"must be integer,null"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
if((typeof data23 == "number") && (isFinite(data23))){
if(data23 < 1 || isNaN(data23)){
const err57 = {instancePath:instancePath+"/latency_budget_ms",schemaPath:"#/properties/latency_budget_ms/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
}
}
if(data.cost_budget_usd_per_call !== undefined){
let data24 = data.cost_budget_usd_per_call;
if((!((typeof data24 == "number") && (isFinite(data24)))) && (data24 !== null)){
const err58 = {instancePath:instancePath+"/cost_budget_usd_per_call",schemaPath:"#/properties/cost_budget_usd_per_call/type",keyword:"type",params:{type: schema60.properties.cost_budget_usd_per_call.type},message:"must be number,null"};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
if((typeof data24 == "number") && (isFinite(data24))){
if(data24 < 0 || isNaN(data24)){
const err59 = {instancePath:instancePath+"/cost_budget_usd_per_call",schemaPath:"#/properties/cost_budget_usd_per_call/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
}
}
}
else {
const err60 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
validate72.errors = vErrors;
return errors === 0;
}
validate72.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator9 = validate73;
const schema62 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:asset-catalog-definition","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.asset_catalog.definition"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"asset_catalog"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"identity_refs":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:definition-ref"},"uniqueItems":true},"variant_refs":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:asset-variant-ref"},"uniqueItems":true}},"required":["schema_id","schema_version","id","kind","display_name"]};
const schema64 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:asset-variant-ref","type":"object","additionalProperties":false,"properties":{"variant_id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"}},"required":["variant_id"]};

function validate73(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:asset-catalog-definition" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate73.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema62.properties, key0))){
const err5 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.asset_catalog.definition" !== data.schema_id){
const err6 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.asset_catalog.definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err7 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err8 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.kind !== undefined){
if("asset_catalog" !== data.kind){
const err10 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "asset_catalog"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err11 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err13 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err14 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err16 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err17 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err18 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err19 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err20 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
}
else {
const err21 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.identity_refs !== undefined){
let data10 = data.identity_refs;
if(Array.isArray(data10)){
const len1 = data10.length;
for(let i2=0; i2<len1; i2++){
let data11 = data10[i2];
if(data11 && typeof data11 == "object" && !Array.isArray(data11)){
if(data11.ref === undefined){
const err22 = {instancePath:instancePath+"/identity_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
for(const key3 in data11){
if(!(key3 === "ref")){
const err23 = {instancePath:instancePath+"/identity_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data11.ref !== undefined){
let data12 = data11.ref;
if(typeof data12 === "string"){
if(!pattern4.test(data12)){
const err24 = {instancePath:instancePath+"/identity_refs/" + i2+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
else {
const err25 = {instancePath:instancePath+"/identity_refs/" + i2+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
}
else {
const err26 = {instancePath:instancePath+"/identity_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
let i3 = data10.length;
let j1;
if(i3 > 1){
outer0:
for(;i3--;){
for(j1 = i3; j1--;){
if(func0(data10[i3], data10[j1])){
const err27 = {instancePath:instancePath+"/identity_refs",schemaPath:"#/properties/identity_refs/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
break outer0;
}
}
}
}
}
else {
const err28 = {instancePath:instancePath+"/identity_refs",schemaPath:"#/properties/identity_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data.variant_refs !== undefined){
let data13 = data.variant_refs;
if(Array.isArray(data13)){
const len2 = data13.length;
for(let i4=0; i4<len2; i4++){
let data14 = data13[i4];
if(data14 && typeof data14 == "object" && !Array.isArray(data14)){
if(data14.variant_id === undefined){
const err29 = {instancePath:instancePath+"/variant_refs/" + i4,schemaPath:"urn:aigs:schema:v1:asset-variant-ref/required",keyword:"required",params:{missingProperty: "variant_id"},message:"must have required property '"+"variant_id"+"'"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
for(const key4 in data14){
if(!(key4 === "variant_id")){
const err30 = {instancePath:instancePath+"/variant_refs/" + i4,schemaPath:"urn:aigs:schema:v1:asset-variant-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data14.variant_id !== undefined){
let data15 = data14.variant_id;
if(typeof data15 === "string"){
if(!pattern4.test(data15)){
const err31 = {instancePath:instancePath+"/variant_refs/" + i4+"/variant_id",schemaPath:"urn:aigs:schema:v1:asset-variant-ref/properties/variant_id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
else {
const err32 = {instancePath:instancePath+"/variant_refs/" + i4+"/variant_id",schemaPath:"urn:aigs:schema:v1:asset-variant-ref/properties/variant_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
}
else {
const err33 = {instancePath:instancePath+"/variant_refs/" + i4,schemaPath:"urn:aigs:schema:v1:asset-variant-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
let i5 = data13.length;
let j2;
if(i5 > 1){
outer1:
for(;i5--;){
for(j2 = i5; j2--;){
if(func0(data13[i5], data13[j2])){
const err34 = {instancePath:instancePath+"/variant_refs",schemaPath:"#/properties/variant_refs/uniqueItems",keyword:"uniqueItems",params:{i: i5, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i5+" are identical)"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
break outer1;
}
}
}
}
}
else {
const err35 = {instancePath:instancePath+"/variant_refs",schemaPath:"#/properties/variant_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
}
else {
const err36 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
validate73.errors = vErrors;
return errors === 0;
}
validate73.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator10 = validate74;
const schema65 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:asset-generation-record","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.asset_generation.record"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"asset_generation_record"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"provider_adapter":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},"model_identifier":{"type":"string","minLength":1},"prompt_recipe_version":{"type":"integer","minimum":1},"prompt":{"type":"string"},"reference_variant_ids":{"type":"array","items":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"uniqueItems":true},"parameters":{"type":"object","propertyNames":{"pattern":"^(?!(?:[Aa][Pp][Ii][_-]?[Kk][Ee][Yy]|[Ss][Ee][Cc][Rr][Ee][Tt](?:[_-]?[Kk][Ee][Yy])?|[Tt][Oo][Kk][Ee][Nn]|[Aa][Cc][Cc][Ee][Ss][Ss][_-]?[Tt][Oo][Kk][Ee][Nn]|[Aa][Uu][Tt][Hh][_-]?[Tt][Oo][Kk][Ee][Nn]|[Bb][Ee][Aa][Rr][Ee][Rr][_-]?[Tt][Oo][Kk][Ee][Nn]|[Pp][Aa][Ss][Ss][Ww][Oo][Rr][Dd]|[Cc][Rr][Ee][Dd][Ee][Nn][Tt][Ii][Aa][Ll][Ss]?|[Cc][Ll][Ii][Ee][Nn][Tt][_-]?[Ss][Ee][Cc][Rr][Ee][Tt]|[Pp][Rr][Ii][Vv][Aa][Tt][Ee][_-]?[Kk][Ee][Yy])$).+$"},"additionalProperties":{"$ref":"urn:aigs:schema:v1:safe-config-value"}},"parent_generation_ref":{"oneOf":[{"type":"null"},{"$ref":"urn:aigs:schema:v1:definition-ref"}]},"created_at":{"type":"string","format":"date-time"}},"required":["schema_id","schema_version","id","kind","display_name","provider_adapter","model_identifier","prompt_recipe_version","prompt","reference_variant_ids","parameters","parent_generation_ref","created_at"]};
const formats22 = aigsRuntimeFormats.fullFormats["date-time"];

function validate74(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:asset-generation-record" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate74.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.provider_adapter === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "provider_adapter"},message:"must have required property '"+"provider_adapter"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.model_identifier === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "model_identifier"},message:"must have required property '"+"model_identifier"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.prompt_recipe_version === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "prompt_recipe_version"},message:"must have required property '"+"prompt_recipe_version"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.prompt === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "prompt"},message:"must have required property '"+"prompt"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data.reference_variant_ids === undefined){
const err9 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "reference_variant_ids"},message:"must have required property '"+"reference_variant_ids"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data.parameters === undefined){
const err10 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "parameters"},message:"must have required property '"+"parameters"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(data.parent_generation_ref === undefined){
const err11 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "parent_generation_ref"},message:"must have required property '"+"parent_generation_ref"+"'"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data.created_at === undefined){
const err12 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "created_at"},message:"must have required property '"+"created_at"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema65.properties, key0))){
const err13 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.asset_generation.record" !== data.schema_id){
const err14 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.asset_generation.record"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err15 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err16 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.kind !== undefined){
if("asset_generation_record" !== data.kind){
const err18 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "asset_generation_record"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err19 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
else {
const err20 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err21 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err22 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
else {
const err23 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err24 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err25 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err26 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err27 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err28 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
}
else {
const err29 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(data.provider_adapter !== undefined){
let data10 = data.provider_adapter;
if(typeof data10 === "string"){
if(!pattern7.test(data10)){
const err30 = {instancePath:instancePath+"/provider_adapter",schemaPath:"#/properties/provider_adapter/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"+"\""};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
else {
const err31 = {instancePath:instancePath+"/provider_adapter",schemaPath:"#/properties/provider_adapter/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
if(data.model_identifier !== undefined){
let data11 = data.model_identifier;
if(typeof data11 === "string"){
if(func2(data11) < 1){
const err32 = {instancePath:instancePath+"/model_identifier",schemaPath:"#/properties/model_identifier/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
else {
const err33 = {instancePath:instancePath+"/model_identifier",schemaPath:"#/properties/model_identifier/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
if(data.prompt_recipe_version !== undefined){
let data12 = data.prompt_recipe_version;
if(!(((typeof data12 == "number") && (!(data12 % 1) && !isNaN(data12))) && (isFinite(data12)))){
const err34 = {instancePath:instancePath+"/prompt_recipe_version",schemaPath:"#/properties/prompt_recipe_version/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
if((typeof data12 == "number") && (isFinite(data12))){
if(data12 < 1 || isNaN(data12)){
const err35 = {instancePath:instancePath+"/prompt_recipe_version",schemaPath:"#/properties/prompt_recipe_version/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
}
if(data.prompt !== undefined){
if(typeof data.prompt !== "string"){
const err36 = {instancePath:instancePath+"/prompt",schemaPath:"#/properties/prompt/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data.reference_variant_ids !== undefined){
let data14 = data.reference_variant_ids;
if(Array.isArray(data14)){
const len1 = data14.length;
for(let i2=0; i2<len1; i2++){
let data15 = data14[i2];
if(typeof data15 === "string"){
if(!pattern4.test(data15)){
const err37 = {instancePath:instancePath+"/reference_variant_ids/" + i2,schemaPath:"#/properties/reference_variant_ids/items/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
else {
const err38 = {instancePath:instancePath+"/reference_variant_ids/" + i2,schemaPath:"#/properties/reference_variant_ids/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
let i3 = data14.length;
let j1;
if(i3 > 1){
const indices1 = {};
for(;i3--;){
let item1 = data14[i3];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err39 = {instancePath:instancePath+"/reference_variant_ids",schemaPath:"#/properties/reference_variant_ids/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
break;
}
indices1[item1] = i3;
}
}
}
else {
const err40 = {instancePath:instancePath+"/reference_variant_ids",schemaPath:"#/properties/reference_variant_ids/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data.parameters !== undefined){
let data16 = data.parameters;
if(data16 && typeof data16 == "object" && !Array.isArray(data16)){
for(const key3 in data16){
const _errs35 = errors;
if(typeof key3 === "string"){
if(!pattern38.test(key3)){
const err41 = {instancePath:instancePath+"/parameters",schemaPath:"#/properties/parameters/propertyNames/pattern",keyword:"pattern",params:{pattern: "^(?!(?:[Aa][Pp][Ii][_-]?[Kk][Ee][Yy]|[Ss][Ee][Cc][Rr][Ee][Tt](?:[_-]?[Kk][Ee][Yy])?|[Tt][Oo][Kk][Ee][Nn]|[Aa][Cc][Cc][Ee][Ss][Ss][_-]?[Tt][Oo][Kk][Ee][Nn]|[Aa][Uu][Tt][Hh][_-]?[Tt][Oo][Kk][Ee][Nn]|[Bb][Ee][Aa][Rr][Ee][Rr][_-]?[Tt][Oo][Kk][Ee][Nn]|[Pp][Aa][Ss][Ss][Ww][Oo][Rr][Dd]|[Cc][Rr][Ee][Dd][Ee][Nn][Tt][Ii][Aa][Ll][Ss]?|[Cc][Ll][Ii][Ee][Nn][Tt][_-]?[Ss][Ee][Cc][Rr][Ee][Tt]|[Pp][Rr][Ii][Vv][Aa][Tt][Ee][_-]?[Kk][Ee][Yy])$).+$"},message:"must match pattern \""+"^(?!(?:[Aa][Pp][Ii][_-]?[Kk][Ee][Yy]|[Ss][Ee][Cc][Rr][Ee][Tt](?:[_-]?[Kk][Ee][Yy])?|[Tt][Oo][Kk][Ee][Nn]|[Aa][Cc][Cc][Ee][Ss][Ss][_-]?[Tt][Oo][Kk][Ee][Nn]|[Aa][Uu][Tt][Hh][_-]?[Tt][Oo][Kk][Ee][Nn]|[Bb][Ee][Aa][Rr][Ee][Rr][_-]?[Tt][Oo][Kk][Ee][Nn]|[Pp][Aa][Ss][Ss][Ww][Oo][Rr][Dd]|[Cc][Rr][Ee][Dd][Ee][Nn][Tt][Ii][Aa][Ll][Ss]?|[Cc][Ll][Ii][Ee][Nn][Tt][_-]?[Ss][Ee][Cc][Rr][Ee][Tt]|[Pp][Rr][Ii][Vv][Aa][Tt][Ee][_-]?[Kk][Ee][Yy])$).+$"+"\"",propertyName:key3};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
var valid9 = _errs35 === errors;
if(!valid9){
const err42 = {instancePath:instancePath+"/parameters",schemaPath:"#/properties/parameters/propertyNames",keyword:"propertyNames",params:{propertyName: key3},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
for(const key4 in data16){
if(!(validate70(data16[key4], {instancePath:instancePath+"/parameters/" + key4.replace(/~/g, "~0").replace(/\//g, "~1"),parentData:data16,parentDataProperty:key4,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate70.errors : vErrors.concat(validate70.errors);
errors = vErrors.length;
}
}
}
else {
const err43 = {instancePath:instancePath+"/parameters",schemaPath:"#/properties/parameters/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
if(data.parent_generation_ref !== undefined){
let data18 = data.parent_generation_ref;
const _errs39 = errors;
let valid11 = false;
let passing0 = null;
const _errs40 = errors;
if(data18 !== null){
const err44 = {instancePath:instancePath+"/parent_generation_ref",schemaPath:"#/properties/parent_generation_ref/oneOf/0/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
var _valid0 = _errs40 === errors;
if(_valid0){
valid11 = true;
passing0 = 0;
}
const _errs42 = errors;
if(data18 && typeof data18 == "object" && !Array.isArray(data18)){
if(data18.ref === undefined){
const err45 = {instancePath:instancePath+"/parent_generation_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
for(const key5 in data18){
if(!(key5 === "ref")){
const err46 = {instancePath:instancePath+"/parent_generation_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
}
if(data18.ref !== undefined){
let data19 = data18.ref;
if(typeof data19 === "string"){
if(!pattern4.test(data19)){
const err47 = {instancePath:instancePath+"/parent_generation_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
else {
const err48 = {instancePath:instancePath+"/parent_generation_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
}
}
else {
const err49 = {instancePath:instancePath+"/parent_generation_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
var _valid0 = _errs42 === errors;
if(_valid0 && valid11){
valid11 = false;
passing0 = [passing0, 1];
}
else {
if(_valid0){
valid11 = true;
passing0 = 1;
}
}
if(!valid11){
const err50 = {instancePath:instancePath+"/parent_generation_ref",schemaPath:"#/properties/parent_generation_ref/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
else {
errors = _errs39;
if(vErrors !== null){
if(_errs39){
vErrors.length = _errs39;
}
else {
vErrors = null;
}
}
}
}
if(data.created_at !== undefined){
let data20 = data.created_at;
if(typeof data20 === "string"){
if(!(formats22.validate(data20))){
const err51 = {instancePath:instancePath+"/created_at",schemaPath:"#/properties/created_at/format",keyword:"format",params:{format: "date-time"},message:"must match format \""+"date-time"+"\""};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
}
else {
const err52 = {instancePath:instancePath+"/created_at",schemaPath:"#/properties/created_at/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
}
}
else {
const err53 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
validate74.errors = vErrors;
return errors === 0;
}
validate74.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator11 = validate76;
const schema67 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:asset-identity-definition","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.asset_identity.definition"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"asset_identity"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"subject_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"asset_type":{"enum":["character_visual","location_visual","object_visual","item_visual","tileset","background","ui","audio","other"]},"canonical_profile":{"type":"object","additionalProperties":false,"properties":{"age_band":{"type":"string"},"build":{"type":"string"},"hair":{"type":"string"},"eyes":{"type":"string"},"style_notes":{"type":"string"},"architecture_style":{"type":"string"},"complexity":{"type":"string"},"palette":{"type":"array","items":{"type":"string"}},"materials":{"type":"array","items":{"type":"string"}}}},"variant_specs":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","pattern":"^[a-z][a-z0-9_-]*(\\.[a-z0-9_-]+)*$"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true}},"required":["id","tags"]},"uniqueItems":true}},"required":["schema_id","schema_version","id","kind","display_name","subject_ref","asset_type","canonical_profile","variant_specs"]};
const pattern61 = new RegExp("^[a-z][a-z0-9_-]*(\\.[a-z0-9_-]+)*$", "u");

function validate76(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:asset-identity-definition" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate76.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.subject_ref === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "subject_ref"},message:"must have required property '"+"subject_ref"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.asset_type === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "asset_type"},message:"must have required property '"+"asset_type"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.canonical_profile === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "canonical_profile"},message:"must have required property '"+"canonical_profile"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.variant_specs === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "variant_specs"},message:"must have required property '"+"variant_specs"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema67.properties, key0))){
const err9 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.asset_identity.definition" !== data.schema_id){
const err10 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.asset_identity.definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err11 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err12 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.kind !== undefined){
if("asset_identity" !== data.kind){
const err14 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "asset_identity"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err15 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
else {
const err16 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err17 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err18 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
else {
const err19 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err20 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err21 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err22 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err23 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err24 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
}
else {
const err25 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data.subject_ref !== undefined){
let data10 = data.subject_ref;
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
if(data10.ref === undefined){
const err26 = {instancePath:instancePath+"/subject_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
for(const key3 in data10){
if(!(key3 === "ref")){
const err27 = {instancePath:instancePath+"/subject_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data10.ref !== undefined){
let data11 = data10.ref;
if(typeof data11 === "string"){
if(!pattern4.test(data11)){
const err28 = {instancePath:instancePath+"/subject_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
else {
const err29 = {instancePath:instancePath+"/subject_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
}
else {
const err30 = {instancePath:instancePath+"/subject_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data.asset_type !== undefined){
let data12 = data.asset_type;
if(!(((((((((data12 === "character_visual") || (data12 === "location_visual")) || (data12 === "object_visual")) || (data12 === "item_visual")) || (data12 === "tileset")) || (data12 === "background")) || (data12 === "ui")) || (data12 === "audio")) || (data12 === "other"))){
const err31 = {instancePath:instancePath+"/asset_type",schemaPath:"#/properties/asset_type/enum",keyword:"enum",params:{allowedValues: schema67.properties.asset_type.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
if(data.canonical_profile !== undefined){
let data13 = data.canonical_profile;
if(data13 && typeof data13 == "object" && !Array.isArray(data13)){
for(const key4 in data13){
if(!(func1.call(schema67.properties.canonical_profile.properties, key4))){
const err32 = {instancePath:instancePath+"/canonical_profile",schemaPath:"#/properties/canonical_profile/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
if(data13.age_band !== undefined){
if(typeof data13.age_band !== "string"){
const err33 = {instancePath:instancePath+"/canonical_profile/age_band",schemaPath:"#/properties/canonical_profile/properties/age_band/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
if(data13.build !== undefined){
if(typeof data13.build !== "string"){
const err34 = {instancePath:instancePath+"/canonical_profile/build",schemaPath:"#/properties/canonical_profile/properties/build/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data13.hair !== undefined){
if(typeof data13.hair !== "string"){
const err35 = {instancePath:instancePath+"/canonical_profile/hair",schemaPath:"#/properties/canonical_profile/properties/hair/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
if(data13.eyes !== undefined){
if(typeof data13.eyes !== "string"){
const err36 = {instancePath:instancePath+"/canonical_profile/eyes",schemaPath:"#/properties/canonical_profile/properties/eyes/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data13.style_notes !== undefined){
if(typeof data13.style_notes !== "string"){
const err37 = {instancePath:instancePath+"/canonical_profile/style_notes",schemaPath:"#/properties/canonical_profile/properties/style_notes/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data13.architecture_style !== undefined){
if(typeof data13.architecture_style !== "string"){
const err38 = {instancePath:instancePath+"/canonical_profile/architecture_style",schemaPath:"#/properties/canonical_profile/properties/architecture_style/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
if(data13.complexity !== undefined){
if(typeof data13.complexity !== "string"){
const err39 = {instancePath:instancePath+"/canonical_profile/complexity",schemaPath:"#/properties/canonical_profile/properties/complexity/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
if(data13.palette !== undefined){
let data21 = data13.palette;
if(Array.isArray(data21)){
const len1 = data21.length;
for(let i2=0; i2<len1; i2++){
if(typeof data21[i2] !== "string"){
const err40 = {instancePath:instancePath+"/canonical_profile/palette/" + i2,schemaPath:"#/properties/canonical_profile/properties/palette/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
}
else {
const err41 = {instancePath:instancePath+"/canonical_profile/palette",schemaPath:"#/properties/canonical_profile/properties/palette/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
if(data13.materials !== undefined){
let data23 = data13.materials;
if(Array.isArray(data23)){
const len2 = data23.length;
for(let i3=0; i3<len2; i3++){
if(typeof data23[i3] !== "string"){
const err42 = {instancePath:instancePath+"/canonical_profile/materials/" + i3,schemaPath:"#/properties/canonical_profile/properties/materials/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
}
else {
const err43 = {instancePath:instancePath+"/canonical_profile/materials",schemaPath:"#/properties/canonical_profile/properties/materials/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
}
else {
const err44 = {instancePath:instancePath+"/canonical_profile",schemaPath:"#/properties/canonical_profile/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
if(data.variant_specs !== undefined){
let data25 = data.variant_specs;
if(Array.isArray(data25)){
const len3 = data25.length;
for(let i4=0; i4<len3; i4++){
let data26 = data25[i4];
if(data26 && typeof data26 == "object" && !Array.isArray(data26)){
if(data26.id === undefined){
const err45 = {instancePath:instancePath+"/variant_specs/" + i4,schemaPath:"#/properties/variant_specs/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
if(data26.tags === undefined){
const err46 = {instancePath:instancePath+"/variant_specs/" + i4,schemaPath:"#/properties/variant_specs/items/required",keyword:"required",params:{missingProperty: "tags"},message:"must have required property '"+"tags"+"'"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
for(const key5 in data26){
if(!((key5 === "id") || (key5 === "tags"))){
const err47 = {instancePath:instancePath+"/variant_specs/" + i4,schemaPath:"#/properties/variant_specs/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
if(data26.id !== undefined){
let data27 = data26.id;
if(typeof data27 === "string"){
if(!pattern61.test(data27)){
const err48 = {instancePath:instancePath+"/variant_specs/" + i4+"/id",schemaPath:"#/properties/variant_specs/items/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_-]*(\\.[a-z0-9_-]+)*$"},message:"must match pattern \""+"^[a-z][a-z0-9_-]*(\\.[a-z0-9_-]+)*$"+"\""};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
}
else {
const err49 = {instancePath:instancePath+"/variant_specs/" + i4+"/id",schemaPath:"#/properties/variant_specs/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
}
if(data26.tags !== undefined){
let data28 = data26.tags;
if(Array.isArray(data28)){
const len4 = data28.length;
for(let i5=0; i5<len4; i5++){
let data29 = data28[i5];
if(typeof data29 === "string"){
if(!pattern5.test(data29)){
const err50 = {instancePath:instancePath+"/variant_specs/" + i4+"/tags/" + i5,schemaPath:"#/properties/variant_specs/items/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
}
else {
const err51 = {instancePath:instancePath+"/variant_specs/" + i4+"/tags/" + i5,schemaPath:"#/properties/variant_specs/items/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
}
let i6 = data28.length;
let j1;
if(i6 > 1){
const indices1 = {};
for(;i6--;){
let item1 = data28[i6];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err52 = {instancePath:instancePath+"/variant_specs/" + i4+"/tags",schemaPath:"#/properties/variant_specs/items/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i6, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i6+" are identical)"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
break;
}
indices1[item1] = i6;
}
}
}
else {
const err53 = {instancePath:instancePath+"/variant_specs/" + i4+"/tags",schemaPath:"#/properties/variant_specs/items/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
}
}
else {
const err54 = {instancePath:instancePath+"/variant_specs/" + i4,schemaPath:"#/properties/variant_specs/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
}
let i7 = data25.length;
let j2;
if(i7 > 1){
outer0:
for(;i7--;){
for(j2 = i7; j2--;){
if(func0(data25[i7], data25[j2])){
const err55 = {instancePath:instancePath+"/variant_specs",schemaPath:"#/properties/variant_specs/uniqueItems",keyword:"uniqueItems",params:{i: i7, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i7+" are identical)"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
break outer0;
}
}
}
}
}
else {
const err56 = {instancePath:instancePath+"/variant_specs",schemaPath:"#/properties/variant_specs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
}
}
else {
const err57 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
validate76.errors = vErrors;
return errors === 0;
}
validate76.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator12 = validate77;
const schema69 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:asset-variant-record","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.asset_variant.record"},"schema_version":{"const":1},"variant_id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"asset_identity_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"variant_spec_id":{"type":"string","minLength":1},"storage":{"type":"object","additionalProperties":false,"properties":{"project_path":{"type":"string","minLength":1},"content_sha256":{"type":"string","pattern":"^[a-f0-9]{64}$"}},"required":["project_path","content_sha256"]},"generation_record_ref":{"oneOf":[{"type":"null"},{"$ref":"urn:aigs:schema:v1:definition-ref"}]},"status":{"enum":["active","candidate","superseded","rejected"]}},"required":["schema_id","schema_version","variant_id","asset_identity_ref","variant_spec_id","storage","generation_record_ref","status"]};
const pattern65 = new RegExp("^[a-f0-9]{64}$", "u");

function validate77(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:asset-variant-record" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate77.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.variant_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "variant_id"},message:"must have required property '"+"variant_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.asset_identity_ref === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "asset_identity_ref"},message:"must have required property '"+"asset_identity_ref"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.variant_spec_id === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "variant_spec_id"},message:"must have required property '"+"variant_spec_id"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.storage === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "storage"},message:"must have required property '"+"storage"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.generation_record_ref === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "generation_record_ref"},message:"must have required property '"+"generation_record_ref"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.status === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
for(const key0 in data){
if(!((((((((key0 === "schema_id") || (key0 === "schema_version")) || (key0 === "variant_id")) || (key0 === "asset_identity_ref")) || (key0 === "variant_spec_id")) || (key0 === "storage")) || (key0 === "generation_record_ref")) || (key0 === "status"))){
const err8 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.asset_variant.record" !== data.schema_id){
const err9 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.asset_variant.record"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err10 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.variant_id !== undefined){
let data2 = data.variant_id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err11 = {instancePath:instancePath+"/variant_id",schemaPath:"#/properties/variant_id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/variant_id",schemaPath:"#/properties/variant_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.asset_identity_ref !== undefined){
let data3 = data.asset_identity_ref;
if(data3 && typeof data3 == "object" && !Array.isArray(data3)){
if(data3.ref === undefined){
const err13 = {instancePath:instancePath+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
for(const key1 in data3){
if(!(key1 === "ref")){
const err14 = {instancePath:instancePath+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data3.ref !== undefined){
let data4 = data3.ref;
if(typeof data4 === "string"){
if(!pattern4.test(data4)){
const err15 = {instancePath:instancePath+"/asset_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
else {
const err16 = {instancePath:instancePath+"/asset_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
}
else {
const err17 = {instancePath:instancePath+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.variant_spec_id !== undefined){
let data5 = data.variant_spec_id;
if(typeof data5 === "string"){
if(func2(data5) < 1){
const err18 = {instancePath:instancePath+"/variant_spec_id",schemaPath:"#/properties/variant_spec_id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
else {
const err19 = {instancePath:instancePath+"/variant_spec_id",schemaPath:"#/properties/variant_spec_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.storage !== undefined){
let data6 = data.storage;
if(data6 && typeof data6 == "object" && !Array.isArray(data6)){
if(data6.project_path === undefined){
const err20 = {instancePath:instancePath+"/storage",schemaPath:"#/properties/storage/required",keyword:"required",params:{missingProperty: "project_path"},message:"must have required property '"+"project_path"+"'"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(data6.content_sha256 === undefined){
const err21 = {instancePath:instancePath+"/storage",schemaPath:"#/properties/storage/required",keyword:"required",params:{missingProperty: "content_sha256"},message:"must have required property '"+"content_sha256"+"'"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
for(const key2 in data6){
if(!((key2 === "project_path") || (key2 === "content_sha256"))){
const err22 = {instancePath:instancePath+"/storage",schemaPath:"#/properties/storage/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data6.project_path !== undefined){
let data7 = data6.project_path;
if(typeof data7 === "string"){
if(func2(data7) < 1){
const err23 = {instancePath:instancePath+"/storage/project_path",schemaPath:"#/properties/storage/properties/project_path/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
else {
const err24 = {instancePath:instancePath+"/storage/project_path",schemaPath:"#/properties/storage/properties/project_path/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data6.content_sha256 !== undefined){
let data8 = data6.content_sha256;
if(typeof data8 === "string"){
if(!pattern65.test(data8)){
const err25 = {instancePath:instancePath+"/storage/content_sha256",schemaPath:"#/properties/storage/properties/content_sha256/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
else {
const err26 = {instancePath:instancePath+"/storage/content_sha256",schemaPath:"#/properties/storage/properties/content_sha256/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
}
else {
const err27 = {instancePath:instancePath+"/storage",schemaPath:"#/properties/storage/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data.generation_record_ref !== undefined){
let data9 = data.generation_record_ref;
const _errs22 = errors;
let valid4 = false;
let passing0 = null;
const _errs23 = errors;
if(data9 !== null){
const err28 = {instancePath:instancePath+"/generation_record_ref",schemaPath:"#/properties/generation_record_ref/oneOf/0/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
var _valid0 = _errs23 === errors;
if(_valid0){
valid4 = true;
passing0 = 0;
}
const _errs25 = errors;
if(data9 && typeof data9 == "object" && !Array.isArray(data9)){
if(data9.ref === undefined){
const err29 = {instancePath:instancePath+"/generation_record_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
for(const key3 in data9){
if(!(key3 === "ref")){
const err30 = {instancePath:instancePath+"/generation_record_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data9.ref !== undefined){
let data10 = data9.ref;
if(typeof data10 === "string"){
if(!pattern4.test(data10)){
const err31 = {instancePath:instancePath+"/generation_record_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
else {
const err32 = {instancePath:instancePath+"/generation_record_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
}
else {
const err33 = {instancePath:instancePath+"/generation_record_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
var _valid0 = _errs25 === errors;
if(_valid0 && valid4){
valid4 = false;
passing0 = [passing0, 1];
}
else {
if(_valid0){
valid4 = true;
passing0 = 1;
}
}
if(!valid4){
const err34 = {instancePath:instancePath+"/generation_record_ref",schemaPath:"#/properties/generation_record_ref/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
else {
errors = _errs22;
if(vErrors !== null){
if(_errs22){
vErrors.length = _errs22;
}
else {
vErrors = null;
}
}
}
}
if(data.status !== undefined){
let data11 = data.status;
if(!((((data11 === "active") || (data11 === "candidate")) || (data11 === "superseded")) || (data11 === "rejected"))){
const err35 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/enum",keyword:"enum",params:{allowedValues: schema69.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
}
else {
const err36 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
validate77.errors = vErrors;
return errors === 0;
}
validate77.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator13 = validate78;
const schema72 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:belief-record","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.belief.record"},"schema_version":{"const":1},"belief_id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"owner_instance_id":{"type":"string","format":"uuid"},"claim":{"$ref":"urn:aigs:schema:v1:fact"},"confidence":{"type":"number","minimum":0,"maximum":1},"source_refs":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"type":{"enum":["perception","memory","report","inference","system"]},"id":{"type":"string","minLength":1}},"required":["type","id"]},"minItems":1},"last_updated_game_time":{"type":"integer","minimum":0}},"required":["schema_id","schema_version","belief_id","owner_instance_id","claim","confidence","source_refs","last_updated_game_time"]};
const schema73 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:fact","type":"object","additionalProperties":false,"properties":{"subject":{"$ref":"urn:aigs:schema:v1:entity-handle"},"predicate":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},"value":{},"qualifiers":{"type":"object"}},"required":["subject","predicate","value","qualifiers"]};
const schema74 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:entity-handle","type":"object","additionalProperties":false,"properties":{"definition_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"instance_id":{"type":"string","format":"uuid"}},"required":["definition_ref","instance_id"]};

function validate80(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:entity-handle" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate80.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.definition_ref === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "definition_ref"},message:"must have required property '"+"definition_ref"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.instance_id === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "instance_id"},message:"must have required property '"+"instance_id"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
for(const key0 in data){
if(!((key0 === "definition_ref") || (key0 === "instance_id"))){
const err2 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
if(data.definition_ref !== undefined){
let data0 = data.definition_ref;
if(data0 && typeof data0 == "object" && !Array.isArray(data0)){
if(data0.ref === undefined){
const err3 = {instancePath:instancePath+"/definition_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
for(const key1 in data0){
if(!(key1 === "ref")){
const err4 = {instancePath:instancePath+"/definition_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data0.ref !== undefined){
let data1 = data0.ref;
if(typeof data1 === "string"){
if(!pattern4.test(data1)){
const err5 = {instancePath:instancePath+"/definition_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
else {
const err6 = {instancePath:instancePath+"/definition_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
}
else {
const err7 = {instancePath:instancePath+"/definition_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.instance_id !== undefined){
let data2 = data.instance_id;
if(typeof data2 === "string"){
if(!(formats0.test(data2))){
const err8 = {instancePath:instancePath+"/instance_id",schemaPath:"#/properties/instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/instance_id",schemaPath:"#/properties/instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
}
else {
const err10 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
validate80.errors = vErrors;
return errors === 0;
}
validate80.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate79(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:fact" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate79.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.subject === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "subject"},message:"must have required property '"+"subject"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.predicate === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "predicate"},message:"must have required property '"+"predicate"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.value === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "value"},message:"must have required property '"+"value"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.qualifiers === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "qualifiers"},message:"must have required property '"+"qualifiers"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
for(const key0 in data){
if(!((((key0 === "subject") || (key0 === "predicate")) || (key0 === "value")) || (key0 === "qualifiers"))){
const err4 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.subject !== undefined){
if(!(validate80(data.subject, {instancePath:instancePath+"/subject",parentData:data,parentDataProperty:"subject",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate80.errors : vErrors.concat(validate80.errors);
errors = vErrors.length;
}
}
if(data.predicate !== undefined){
let data1 = data.predicate;
if(typeof data1 === "string"){
if(!pattern7.test(data1)){
const err5 = {instancePath:instancePath+"/predicate",schemaPath:"#/properties/predicate/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"+"\""};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
else {
const err6 = {instancePath:instancePath+"/predicate",schemaPath:"#/properties/predicate/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.qualifiers !== undefined){
let data2 = data.qualifiers;
if(!(data2 && typeof data2 == "object" && !Array.isArray(data2))){
const err7 = {instancePath:instancePath+"/qualifiers",schemaPath:"#/properties/qualifiers/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
}
else {
const err8 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
validate79.errors = vErrors;
return errors === 0;
}
validate79.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate78(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:belief-record" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate78.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.belief_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "belief_id"},message:"must have required property '"+"belief_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.owner_instance_id === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "owner_instance_id"},message:"must have required property '"+"owner_instance_id"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.claim === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "claim"},message:"must have required property '"+"claim"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.confidence === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "confidence"},message:"must have required property '"+"confidence"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.source_refs === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "source_refs"},message:"must have required property '"+"source_refs"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.last_updated_game_time === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "last_updated_game_time"},message:"must have required property '"+"last_updated_game_time"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
for(const key0 in data){
if(!((((((((key0 === "schema_id") || (key0 === "schema_version")) || (key0 === "belief_id")) || (key0 === "owner_instance_id")) || (key0 === "claim")) || (key0 === "confidence")) || (key0 === "source_refs")) || (key0 === "last_updated_game_time"))){
const err8 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.belief.record" !== data.schema_id){
const err9 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.belief.record"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err10 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.belief_id !== undefined){
let data2 = data.belief_id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err11 = {instancePath:instancePath+"/belief_id",schemaPath:"#/properties/belief_id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/belief_id",schemaPath:"#/properties/belief_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.owner_instance_id !== undefined){
let data3 = data.owner_instance_id;
if(typeof data3 === "string"){
if(!(formats0.test(data3))){
const err13 = {instancePath:instancePath+"/owner_instance_id",schemaPath:"#/properties/owner_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/owner_instance_id",schemaPath:"#/properties/owner_instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.claim !== undefined){
if(!(validate79(data.claim, {instancePath:instancePath+"/claim",parentData:data,parentDataProperty:"claim",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate79.errors : vErrors.concat(validate79.errors);
errors = vErrors.length;
}
}
if(data.confidence !== undefined){
let data5 = data.confidence;
if((typeof data5 == "number") && (isFinite(data5))){
if(data5 > 1 || isNaN(data5)){
const err15 = {instancePath:instancePath+"/confidence",schemaPath:"#/properties/confidence/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(data5 < 0 || isNaN(data5)){
const err16 = {instancePath:instancePath+"/confidence",schemaPath:"#/properties/confidence/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/confidence",schemaPath:"#/properties/confidence/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.source_refs !== undefined){
let data6 = data.source_refs;
if(Array.isArray(data6)){
if(data6.length < 1){
const err18 = {instancePath:instancePath+"/source_refs",schemaPath:"#/properties/source_refs/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(data7 && typeof data7 == "object" && !Array.isArray(data7)){
if(data7.type === undefined){
const err19 = {instancePath:instancePath+"/source_refs/" + i0,schemaPath:"#/properties/source_refs/items/required",keyword:"required",params:{missingProperty: "type"},message:"must have required property '"+"type"+"'"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(data7.id === undefined){
const err20 = {instancePath:instancePath+"/source_refs/" + i0,schemaPath:"#/properties/source_refs/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
for(const key1 in data7){
if(!((key1 === "type") || (key1 === "id"))){
const err21 = {instancePath:instancePath+"/source_refs/" + i0,schemaPath:"#/properties/source_refs/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data7.type !== undefined){
let data8 = data7.type;
if(!(((((data8 === "perception") || (data8 === "memory")) || (data8 === "report")) || (data8 === "inference")) || (data8 === "system"))){
const err22 = {instancePath:instancePath+"/source_refs/" + i0+"/type",schemaPath:"#/properties/source_refs/items/properties/type/enum",keyword:"enum",params:{allowedValues: schema72.properties.source_refs.items.properties.type.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data7.id !== undefined){
let data9 = data7.id;
if(typeof data9 === "string"){
if(func2(data9) < 1){
const err23 = {instancePath:instancePath+"/source_refs/" + i0+"/id",schemaPath:"#/properties/source_refs/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
else {
const err24 = {instancePath:instancePath+"/source_refs/" + i0+"/id",schemaPath:"#/properties/source_refs/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
}
else {
const err25 = {instancePath:instancePath+"/source_refs/" + i0,schemaPath:"#/properties/source_refs/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
}
else {
const err26 = {instancePath:instancePath+"/source_refs",schemaPath:"#/properties/source_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(data.last_updated_game_time !== undefined){
let data10 = data.last_updated_game_time;
if(!(((typeof data10 == "number") && (!(data10 % 1) && !isNaN(data10))) && (isFinite(data10)))){
const err27 = {instancePath:instancePath+"/last_updated_game_time",schemaPath:"#/properties/last_updated_game_time/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if((typeof data10 == "number") && (isFinite(data10))){
if(data10 < 0 || isNaN(data10)){
const err28 = {instancePath:instancePath+"/last_updated_game_time",schemaPath:"#/properties/last_updated_game_time/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
}
}
else {
const err29 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
validate78.errors = vErrors;
return errors === 0;
}
validate78.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator14 = validate83;
const schema76 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:change-receipt","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.change_receipt"},"schema_version":{"const":1},"receipt_id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"changeset_id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"status":{"enum":["applied","rejected","rolled_back"]},"applied_operation_ids":{"type":"array","items":{"type":"string","pattern":"^op-[A-Za-z0-9_-]+$"},"uniqueItems":true},"snapshot_ref":{"type":["string","null"],"minLength":1},"errors":{"type":"array","items":{"type":"object"}}},"required":["schema_id","schema_version","receipt_id","changeset_id","status","applied_operation_ids","snapshot_ref","errors"]};
const pattern72 = new RegExp("^op-[A-Za-z0-9_-]+$", "u");

function validate83(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:change-receipt" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate83.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.receipt_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "receipt_id"},message:"must have required property '"+"receipt_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.changeset_id === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "changeset_id"},message:"must have required property '"+"changeset_id"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.status === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.applied_operation_ids === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "applied_operation_ids"},message:"must have required property '"+"applied_operation_ids"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.snapshot_ref === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "snapshot_ref"},message:"must have required property '"+"snapshot_ref"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.errors === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "errors"},message:"must have required property '"+"errors"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
for(const key0 in data){
if(!((((((((key0 === "schema_id") || (key0 === "schema_version")) || (key0 === "receipt_id")) || (key0 === "changeset_id")) || (key0 === "status")) || (key0 === "applied_operation_ids")) || (key0 === "snapshot_ref")) || (key0 === "errors"))){
const err8 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.change_receipt" !== data.schema_id){
const err9 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.change_receipt"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err10 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.receipt_id !== undefined){
let data2 = data.receipt_id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err11 = {instancePath:instancePath+"/receipt_id",schemaPath:"#/properties/receipt_id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/receipt_id",schemaPath:"#/properties/receipt_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.changeset_id !== undefined){
let data3 = data.changeset_id;
if(typeof data3 === "string"){
if(!pattern4.test(data3)){
const err13 = {instancePath:instancePath+"/changeset_id",schemaPath:"#/properties/changeset_id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/changeset_id",schemaPath:"#/properties/changeset_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.status !== undefined){
let data4 = data.status;
if(!(((data4 === "applied") || (data4 === "rejected")) || (data4 === "rolled_back"))){
const err15 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/enum",keyword:"enum",params:{allowedValues: schema76.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.applied_operation_ids !== undefined){
let data5 = data.applied_operation_ids;
if(Array.isArray(data5)){
const len0 = data5.length;
for(let i0=0; i0<len0; i0++){
let data6 = data5[i0];
if(typeof data6 === "string"){
if(!pattern72.test(data6)){
const err16 = {instancePath:instancePath+"/applied_operation_ids/" + i0,schemaPath:"#/properties/applied_operation_ids/items/pattern",keyword:"pattern",params:{pattern: "^op-[A-Za-z0-9_-]+$"},message:"must match pattern \""+"^op-[A-Za-z0-9_-]+$"+"\""};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/applied_operation_ids/" + i0,schemaPath:"#/properties/applied_operation_ids/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
let i1 = data5.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data5[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err18 = {instancePath:instancePath+"/applied_operation_ids",schemaPath:"#/properties/applied_operation_ids/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err19 = {instancePath:instancePath+"/applied_operation_ids",schemaPath:"#/properties/applied_operation_ids/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.snapshot_ref !== undefined){
let data7 = data.snapshot_ref;
if((typeof data7 !== "string") && (data7 !== null)){
const err20 = {instancePath:instancePath+"/snapshot_ref",schemaPath:"#/properties/snapshot_ref/type",keyword:"type",params:{type: schema76.properties.snapshot_ref.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(typeof data7 === "string"){
if(func2(data7) < 1){
const err21 = {instancePath:instancePath+"/snapshot_ref",schemaPath:"#/properties/snapshot_ref/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
}
if(data.errors !== undefined){
let data8 = data.errors;
if(Array.isArray(data8)){
const len1 = data8.length;
for(let i2=0; i2<len1; i2++){
let data9 = data8[i2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err22 = {instancePath:instancePath+"/errors/" + i2,schemaPath:"#/properties/errors/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
}
else {
const err23 = {instancePath:instancePath+"/errors",schemaPath:"#/properties/errors/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
}
else {
const err24 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
validate83.errors = vErrors;
return errors === 0;
}
validate83.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator15 = validate84;
const schema77 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:changeset","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.changeset"},"schema_version":{"const":1},"changeset_id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"request_summary":{"type":"string","minLength":1},"mode":{"const":"atomic"},"operations":{"type":"array","items":{"oneOf":[{"type":"object","additionalProperties":false,"properties":{"operation_id":{"type":"string","pattern":"^op-[A-Za-z0-9_-]+$"},"depends_on":{"type":"array","items":{"type":"string","pattern":"^op-[A-Za-z0-9_-]+$"},"uniqueItems":true},"destructive":{"type":"boolean"},"operation_type":{"const":"create_definition"},"definition":{"type":"object"}},"required":["operation_id","operation_type","depends_on","destructive","definition"]},{"type":"object","additionalProperties":false,"properties":{"operation_id":{"type":"string","pattern":"^op-[A-Za-z0-9_-]+$"},"depends_on":{"type":"array","items":{"type":"string","pattern":"^op-[A-Za-z0-9_-]+$"},"uniqueItems":true},"destructive":{"type":"boolean"},"operation_type":{"const":"update_definition"},"target_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"patch":{"type":"object"}},"required":["operation_id","operation_type","depends_on","destructive","target_ref","patch"]},{"type":"object","additionalProperties":false,"properties":{"operation_id":{"type":"string","pattern":"^op-[A-Za-z0-9_-]+$"},"depends_on":{"type":"array","items":{"type":"string","pattern":"^op-[A-Za-z0-9_-]+$"},"uniqueItems":true},"destructive":{"type":"boolean"},"operation_type":{"const":"delete_definition"},"target_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"}},"required":["operation_id","operation_type","depends_on","destructive","target_ref"]},{"type":"object","additionalProperties":false,"properties":{"operation_id":{"type":"string","pattern":"^op-[A-Za-z0-9_-]+$"},"depends_on":{"type":"array","items":{"type":"string","pattern":"^op-[A-Za-z0-9_-]+$"},"uniqueItems":true},"destructive":{"type":"boolean"},"operation_type":{"const":"move_asset_variant"},"variant_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"new_project_path":{"type":"string","minLength":1}},"required":["operation_id","operation_type","depends_on","destructive","variant_ref","new_project_path"]},{"type":"object","additionalProperties":false,"properties":{"operation_id":{"type":"string","pattern":"^op-[A-Za-z0-9_-]+$"},"depends_on":{"type":"array","items":{"type":"string","pattern":"^op-[A-Za-z0-9_-]+$"},"uniqueItems":true},"destructive":{"type":"boolean"},"operation_type":{"const":"generate_asset_request"},"asset_identity_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"variant_spec_ids":{"type":"array","items":{"type":"string","minLength":1},"minItems":1}},"required":["operation_id","operation_type","depends_on","destructive","asset_identity_ref","variant_spec_ids"]}]},"minItems":1},"provenance":{"type":"object","additionalProperties":false,"properties":{"actor":{"enum":["creator","creator_copilot","system","migration"]},"ai_role_ref":{"oneOf":[{"type":"null"},{"$ref":"urn:aigs:schema:v1:definition-ref"}]}},"required":["actor","ai_role_ref"]}},"required":["schema_id","schema_version","changeset_id","request_summary","mode","operations","provenance"]};

function validate84(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:changeset" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate84.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.changeset_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "changeset_id"},message:"must have required property '"+"changeset_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.request_summary === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "request_summary"},message:"must have required property '"+"request_summary"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.mode === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.operations === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "operations"},message:"must have required property '"+"operations"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.provenance === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "provenance"},message:"must have required property '"+"provenance"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
for(const key0 in data){
if(!(((((((key0 === "schema_id") || (key0 === "schema_version")) || (key0 === "changeset_id")) || (key0 === "request_summary")) || (key0 === "mode")) || (key0 === "operations")) || (key0 === "provenance"))){
const err7 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.changeset" !== data.schema_id){
const err8 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.changeset"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err9 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.changeset_id !== undefined){
let data2 = data.changeset_id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err10 = {instancePath:instancePath+"/changeset_id",schemaPath:"#/properties/changeset_id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {instancePath:instancePath+"/changeset_id",schemaPath:"#/properties/changeset_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.request_summary !== undefined){
let data3 = data.request_summary;
if(typeof data3 === "string"){
if(func2(data3) < 1){
const err12 = {instancePath:instancePath+"/request_summary",schemaPath:"#/properties/request_summary/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/request_summary",schemaPath:"#/properties/request_summary/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.mode !== undefined){
if("atomic" !== data.mode){
const err14 = {instancePath:instancePath+"/mode",schemaPath:"#/properties/mode/const",keyword:"const",params:{allowedValue: "atomic"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.operations !== undefined){
let data5 = data.operations;
if(Array.isArray(data5)){
if(data5.length < 1){
const err15 = {instancePath:instancePath+"/operations",schemaPath:"#/properties/operations/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
const len0 = data5.length;
for(let i0=0; i0<len0; i0++){
let data6 = data5[i0];
const _errs12 = errors;
let valid3 = false;
let passing0 = null;
const _errs13 = errors;
if(data6 && typeof data6 == "object" && !Array.isArray(data6)){
if(data6.operation_id === undefined){
const err16 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/0/required",keyword:"required",params:{missingProperty: "operation_id"},message:"must have required property '"+"operation_id"+"'"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(data6.operation_type === undefined){
const err17 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/0/required",keyword:"required",params:{missingProperty: "operation_type"},message:"must have required property '"+"operation_type"+"'"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(data6.depends_on === undefined){
const err18 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/0/required",keyword:"required",params:{missingProperty: "depends_on"},message:"must have required property '"+"depends_on"+"'"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(data6.destructive === undefined){
const err19 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/0/required",keyword:"required",params:{missingProperty: "destructive"},message:"must have required property '"+"destructive"+"'"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(data6.definition === undefined){
const err20 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/0/required",keyword:"required",params:{missingProperty: "definition"},message:"must have required property '"+"definition"+"'"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
for(const key1 in data6){
if(!(((((key1 === "operation_id") || (key1 === "depends_on")) || (key1 === "destructive")) || (key1 === "operation_type")) || (key1 === "definition"))){
const err21 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data6.operation_id !== undefined){
let data7 = data6.operation_id;
if(typeof data7 === "string"){
if(!pattern72.test(data7)){
const err22 = {instancePath:instancePath+"/operations/" + i0+"/operation_id",schemaPath:"#/properties/operations/items/oneOf/0/properties/operation_id/pattern",keyword:"pattern",params:{pattern: "^op-[A-Za-z0-9_-]+$"},message:"must match pattern \""+"^op-[A-Za-z0-9_-]+$"+"\""};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
else {
const err23 = {instancePath:instancePath+"/operations/" + i0+"/operation_id",schemaPath:"#/properties/operations/items/oneOf/0/properties/operation_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data6.depends_on !== undefined){
let data8 = data6.depends_on;
if(Array.isArray(data8)){
const len1 = data8.length;
for(let i1=0; i1<len1; i1++){
let data9 = data8[i1];
if(typeof data9 === "string"){
if(!pattern72.test(data9)){
const err24 = {instancePath:instancePath+"/operations/" + i0+"/depends_on/" + i1,schemaPath:"#/properties/operations/items/oneOf/0/properties/depends_on/items/pattern",keyword:"pattern",params:{pattern: "^op-[A-Za-z0-9_-]+$"},message:"must match pattern \""+"^op-[A-Za-z0-9_-]+$"+"\""};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
else {
const err25 = {instancePath:instancePath+"/operations/" + i0+"/depends_on/" + i1,schemaPath:"#/properties/operations/items/oneOf/0/properties/depends_on/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
let i2 = data8.length;
let j0;
if(i2 > 1){
const indices0 = {};
for(;i2--;){
let item0 = data8[i2];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err26 = {instancePath:instancePath+"/operations/" + i0+"/depends_on",schemaPath:"#/properties/operations/items/oneOf/0/properties/depends_on/uniqueItems",keyword:"uniqueItems",params:{i: i2, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i2+" are identical)"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
break;
}
indices0[item0] = i2;
}
}
}
else {
const err27 = {instancePath:instancePath+"/operations/" + i0+"/depends_on",schemaPath:"#/properties/operations/items/oneOf/0/properties/depends_on/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data6.destructive !== undefined){
if(typeof data6.destructive !== "boolean"){
const err28 = {instancePath:instancePath+"/operations/" + i0+"/destructive",schemaPath:"#/properties/operations/items/oneOf/0/properties/destructive/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data6.operation_type !== undefined){
if("create_definition" !== data6.operation_type){
const err29 = {instancePath:instancePath+"/operations/" + i0+"/operation_type",schemaPath:"#/properties/operations/items/oneOf/0/properties/operation_type/const",keyword:"const",params:{allowedValue: "create_definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(data6.definition !== undefined){
let data12 = data6.definition;
if(!(data12 && typeof data12 == "object" && !Array.isArray(data12))){
const err30 = {instancePath:instancePath+"/operations/" + i0+"/definition",schemaPath:"#/properties/operations/items/oneOf/0/properties/definition/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
}
else {
const err31 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
var _valid0 = _errs13 === errors;
if(_valid0){
valid3 = true;
passing0 = 0;
var props0 = true;
}
const _errs27 = errors;
if(data6 && typeof data6 == "object" && !Array.isArray(data6)){
if(data6.operation_id === undefined){
const err32 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/1/required",keyword:"required",params:{missingProperty: "operation_id"},message:"must have required property '"+"operation_id"+"'"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
if(data6.operation_type === undefined){
const err33 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/1/required",keyword:"required",params:{missingProperty: "operation_type"},message:"must have required property '"+"operation_type"+"'"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
if(data6.depends_on === undefined){
const err34 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/1/required",keyword:"required",params:{missingProperty: "depends_on"},message:"must have required property '"+"depends_on"+"'"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
if(data6.destructive === undefined){
const err35 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/1/required",keyword:"required",params:{missingProperty: "destructive"},message:"must have required property '"+"destructive"+"'"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
if(data6.target_ref === undefined){
const err36 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/1/required",keyword:"required",params:{missingProperty: "target_ref"},message:"must have required property '"+"target_ref"+"'"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
if(data6.patch === undefined){
const err37 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/1/required",keyword:"required",params:{missingProperty: "patch"},message:"must have required property '"+"patch"+"'"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
for(const key2 in data6){
if(!((((((key2 === "operation_id") || (key2 === "depends_on")) || (key2 === "destructive")) || (key2 === "operation_type")) || (key2 === "target_ref")) || (key2 === "patch"))){
const err38 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/1/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
if(data6.operation_id !== undefined){
let data13 = data6.operation_id;
if(typeof data13 === "string"){
if(!pattern72.test(data13)){
const err39 = {instancePath:instancePath+"/operations/" + i0+"/operation_id",schemaPath:"#/properties/operations/items/oneOf/1/properties/operation_id/pattern",keyword:"pattern",params:{pattern: "^op-[A-Za-z0-9_-]+$"},message:"must match pattern \""+"^op-[A-Za-z0-9_-]+$"+"\""};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
else {
const err40 = {instancePath:instancePath+"/operations/" + i0+"/operation_id",schemaPath:"#/properties/operations/items/oneOf/1/properties/operation_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data6.depends_on !== undefined){
let data14 = data6.depends_on;
if(Array.isArray(data14)){
const len2 = data14.length;
for(let i3=0; i3<len2; i3++){
let data15 = data14[i3];
if(typeof data15 === "string"){
if(!pattern72.test(data15)){
const err41 = {instancePath:instancePath+"/operations/" + i0+"/depends_on/" + i3,schemaPath:"#/properties/operations/items/oneOf/1/properties/depends_on/items/pattern",keyword:"pattern",params:{pattern: "^op-[A-Za-z0-9_-]+$"},message:"must match pattern \""+"^op-[A-Za-z0-9_-]+$"+"\""};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
else {
const err42 = {instancePath:instancePath+"/operations/" + i0+"/depends_on/" + i3,schemaPath:"#/properties/operations/items/oneOf/1/properties/depends_on/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
let i4 = data14.length;
let j1;
if(i4 > 1){
const indices1 = {};
for(;i4--;){
let item1 = data14[i4];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err43 = {instancePath:instancePath+"/operations/" + i0+"/depends_on",schemaPath:"#/properties/operations/items/oneOf/1/properties/depends_on/uniqueItems",keyword:"uniqueItems",params:{i: i4, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i4+" are identical)"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
break;
}
indices1[item1] = i4;
}
}
}
else {
const err44 = {instancePath:instancePath+"/operations/" + i0+"/depends_on",schemaPath:"#/properties/operations/items/oneOf/1/properties/depends_on/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
if(data6.destructive !== undefined){
if(typeof data6.destructive !== "boolean"){
const err45 = {instancePath:instancePath+"/operations/" + i0+"/destructive",schemaPath:"#/properties/operations/items/oneOf/1/properties/destructive/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
}
if(data6.operation_type !== undefined){
if("update_definition" !== data6.operation_type){
const err46 = {instancePath:instancePath+"/operations/" + i0+"/operation_type",schemaPath:"#/properties/operations/items/oneOf/1/properties/operation_type/const",keyword:"const",params:{allowedValue: "update_definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
}
if(data6.target_ref !== undefined){
let data18 = data6.target_ref;
if(data18 && typeof data18 == "object" && !Array.isArray(data18)){
if(data18.ref === undefined){
const err47 = {instancePath:instancePath+"/operations/" + i0+"/target_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
for(const key3 in data18){
if(!(key3 === "ref")){
const err48 = {instancePath:instancePath+"/operations/" + i0+"/target_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
}
if(data18.ref !== undefined){
let data19 = data18.ref;
if(typeof data19 === "string"){
if(!pattern4.test(data19)){
const err49 = {instancePath:instancePath+"/operations/" + i0+"/target_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
}
else {
const err50 = {instancePath:instancePath+"/operations/" + i0+"/target_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
}
}
else {
const err51 = {instancePath:instancePath+"/operations/" + i0+"/target_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
}
if(data6.patch !== undefined){
let data20 = data6.patch;
if(!(data20 && typeof data20 == "object" && !Array.isArray(data20))){
const err52 = {instancePath:instancePath+"/operations/" + i0+"/patch",schemaPath:"#/properties/operations/items/oneOf/1/properties/patch/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
}
}
else {
const err53 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/1/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
var _valid0 = _errs27 === errors;
if(_valid0 && valid3){
valid3 = false;
passing0 = [passing0, 1];
}
else {
if(_valid0){
valid3 = true;
passing0 = 1;
if(props0 !== true){
props0 = true;
}
}
const _errs47 = errors;
if(data6 && typeof data6 == "object" && !Array.isArray(data6)){
if(data6.operation_id === undefined){
const err54 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/2/required",keyword:"required",params:{missingProperty: "operation_id"},message:"must have required property '"+"operation_id"+"'"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
if(data6.operation_type === undefined){
const err55 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/2/required",keyword:"required",params:{missingProperty: "operation_type"},message:"must have required property '"+"operation_type"+"'"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
if(data6.depends_on === undefined){
const err56 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/2/required",keyword:"required",params:{missingProperty: "depends_on"},message:"must have required property '"+"depends_on"+"'"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
if(data6.destructive === undefined){
const err57 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/2/required",keyword:"required",params:{missingProperty: "destructive"},message:"must have required property '"+"destructive"+"'"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
if(data6.target_ref === undefined){
const err58 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/2/required",keyword:"required",params:{missingProperty: "target_ref"},message:"must have required property '"+"target_ref"+"'"};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
for(const key4 in data6){
if(!(((((key4 === "operation_id") || (key4 === "depends_on")) || (key4 === "destructive")) || (key4 === "operation_type")) || (key4 === "target_ref"))){
const err59 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/2/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
}
if(data6.operation_id !== undefined){
let data21 = data6.operation_id;
if(typeof data21 === "string"){
if(!pattern72.test(data21)){
const err60 = {instancePath:instancePath+"/operations/" + i0+"/operation_id",schemaPath:"#/properties/operations/items/oneOf/2/properties/operation_id/pattern",keyword:"pattern",params:{pattern: "^op-[A-Za-z0-9_-]+$"},message:"must match pattern \""+"^op-[A-Za-z0-9_-]+$"+"\""};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
}
else {
const err61 = {instancePath:instancePath+"/operations/" + i0+"/operation_id",schemaPath:"#/properties/operations/items/oneOf/2/properties/operation_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
}
}
if(data6.depends_on !== undefined){
let data22 = data6.depends_on;
if(Array.isArray(data22)){
const len3 = data22.length;
for(let i5=0; i5<len3; i5++){
let data23 = data22[i5];
if(typeof data23 === "string"){
if(!pattern72.test(data23)){
const err62 = {instancePath:instancePath+"/operations/" + i0+"/depends_on/" + i5,schemaPath:"#/properties/operations/items/oneOf/2/properties/depends_on/items/pattern",keyword:"pattern",params:{pattern: "^op-[A-Za-z0-9_-]+$"},message:"must match pattern \""+"^op-[A-Za-z0-9_-]+$"+"\""};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
}
else {
const err63 = {instancePath:instancePath+"/operations/" + i0+"/depends_on/" + i5,schemaPath:"#/properties/operations/items/oneOf/2/properties/depends_on/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err63];
}
else {
vErrors.push(err63);
}
errors++;
}
}
let i6 = data22.length;
let j2;
if(i6 > 1){
const indices2 = {};
for(;i6--;){
let item2 = data22[i6];
if(typeof item2 !== "string"){
continue;
}
if(typeof indices2[item2] == "number"){
j2 = indices2[item2];
const err64 = {instancePath:instancePath+"/operations/" + i0+"/depends_on",schemaPath:"#/properties/operations/items/oneOf/2/properties/depends_on/uniqueItems",keyword:"uniqueItems",params:{i: i6, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i6+" are identical)"};
if(vErrors === null){
vErrors = [err64];
}
else {
vErrors.push(err64);
}
errors++;
break;
}
indices2[item2] = i6;
}
}
}
else {
const err65 = {instancePath:instancePath+"/operations/" + i0+"/depends_on",schemaPath:"#/properties/operations/items/oneOf/2/properties/depends_on/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err65];
}
else {
vErrors.push(err65);
}
errors++;
}
}
if(data6.destructive !== undefined){
if(typeof data6.destructive !== "boolean"){
const err66 = {instancePath:instancePath+"/operations/" + i0+"/destructive",schemaPath:"#/properties/operations/items/oneOf/2/properties/destructive/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err66];
}
else {
vErrors.push(err66);
}
errors++;
}
}
if(data6.operation_type !== undefined){
if("delete_definition" !== data6.operation_type){
const err67 = {instancePath:instancePath+"/operations/" + i0+"/operation_type",schemaPath:"#/properties/operations/items/oneOf/2/properties/operation_type/const",keyword:"const",params:{allowedValue: "delete_definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err67];
}
else {
vErrors.push(err67);
}
errors++;
}
}
if(data6.target_ref !== undefined){
let data26 = data6.target_ref;
if(data26 && typeof data26 == "object" && !Array.isArray(data26)){
if(data26.ref === undefined){
const err68 = {instancePath:instancePath+"/operations/" + i0+"/target_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err68];
}
else {
vErrors.push(err68);
}
errors++;
}
for(const key5 in data26){
if(!(key5 === "ref")){
const err69 = {instancePath:instancePath+"/operations/" + i0+"/target_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err69];
}
else {
vErrors.push(err69);
}
errors++;
}
}
if(data26.ref !== undefined){
let data27 = data26.ref;
if(typeof data27 === "string"){
if(!pattern4.test(data27)){
const err70 = {instancePath:instancePath+"/operations/" + i0+"/target_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err70];
}
else {
vErrors.push(err70);
}
errors++;
}
}
else {
const err71 = {instancePath:instancePath+"/operations/" + i0+"/target_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err71];
}
else {
vErrors.push(err71);
}
errors++;
}
}
}
else {
const err72 = {instancePath:instancePath+"/operations/" + i0+"/target_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err72];
}
else {
vErrors.push(err72);
}
errors++;
}
}
}
else {
const err73 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/2/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err73];
}
else {
vErrors.push(err73);
}
errors++;
}
var _valid0 = _errs47 === errors;
if(_valid0 && valid3){
valid3 = false;
passing0 = [passing0, 2];
}
else {
if(_valid0){
valid3 = true;
passing0 = 2;
if(props0 !== true){
props0 = true;
}
}
const _errs65 = errors;
if(data6 && typeof data6 == "object" && !Array.isArray(data6)){
if(data6.operation_id === undefined){
const err74 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/3/required",keyword:"required",params:{missingProperty: "operation_id"},message:"must have required property '"+"operation_id"+"'"};
if(vErrors === null){
vErrors = [err74];
}
else {
vErrors.push(err74);
}
errors++;
}
if(data6.operation_type === undefined){
const err75 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/3/required",keyword:"required",params:{missingProperty: "operation_type"},message:"must have required property '"+"operation_type"+"'"};
if(vErrors === null){
vErrors = [err75];
}
else {
vErrors.push(err75);
}
errors++;
}
if(data6.depends_on === undefined){
const err76 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/3/required",keyword:"required",params:{missingProperty: "depends_on"},message:"must have required property '"+"depends_on"+"'"};
if(vErrors === null){
vErrors = [err76];
}
else {
vErrors.push(err76);
}
errors++;
}
if(data6.destructive === undefined){
const err77 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/3/required",keyword:"required",params:{missingProperty: "destructive"},message:"must have required property '"+"destructive"+"'"};
if(vErrors === null){
vErrors = [err77];
}
else {
vErrors.push(err77);
}
errors++;
}
if(data6.variant_ref === undefined){
const err78 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/3/required",keyword:"required",params:{missingProperty: "variant_ref"},message:"must have required property '"+"variant_ref"+"'"};
if(vErrors === null){
vErrors = [err78];
}
else {
vErrors.push(err78);
}
errors++;
}
if(data6.new_project_path === undefined){
const err79 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/3/required",keyword:"required",params:{missingProperty: "new_project_path"},message:"must have required property '"+"new_project_path"+"'"};
if(vErrors === null){
vErrors = [err79];
}
else {
vErrors.push(err79);
}
errors++;
}
for(const key6 in data6){
if(!((((((key6 === "operation_id") || (key6 === "depends_on")) || (key6 === "destructive")) || (key6 === "operation_type")) || (key6 === "variant_ref")) || (key6 === "new_project_path"))){
const err80 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/3/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key6},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err80];
}
else {
vErrors.push(err80);
}
errors++;
}
}
if(data6.operation_id !== undefined){
let data28 = data6.operation_id;
if(typeof data28 === "string"){
if(!pattern72.test(data28)){
const err81 = {instancePath:instancePath+"/operations/" + i0+"/operation_id",schemaPath:"#/properties/operations/items/oneOf/3/properties/operation_id/pattern",keyword:"pattern",params:{pattern: "^op-[A-Za-z0-9_-]+$"},message:"must match pattern \""+"^op-[A-Za-z0-9_-]+$"+"\""};
if(vErrors === null){
vErrors = [err81];
}
else {
vErrors.push(err81);
}
errors++;
}
}
else {
const err82 = {instancePath:instancePath+"/operations/" + i0+"/operation_id",schemaPath:"#/properties/operations/items/oneOf/3/properties/operation_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err82];
}
else {
vErrors.push(err82);
}
errors++;
}
}
if(data6.depends_on !== undefined){
let data29 = data6.depends_on;
if(Array.isArray(data29)){
const len4 = data29.length;
for(let i7=0; i7<len4; i7++){
let data30 = data29[i7];
if(typeof data30 === "string"){
if(!pattern72.test(data30)){
const err83 = {instancePath:instancePath+"/operations/" + i0+"/depends_on/" + i7,schemaPath:"#/properties/operations/items/oneOf/3/properties/depends_on/items/pattern",keyword:"pattern",params:{pattern: "^op-[A-Za-z0-9_-]+$"},message:"must match pattern \""+"^op-[A-Za-z0-9_-]+$"+"\""};
if(vErrors === null){
vErrors = [err83];
}
else {
vErrors.push(err83);
}
errors++;
}
}
else {
const err84 = {instancePath:instancePath+"/operations/" + i0+"/depends_on/" + i7,schemaPath:"#/properties/operations/items/oneOf/3/properties/depends_on/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err84];
}
else {
vErrors.push(err84);
}
errors++;
}
}
let i8 = data29.length;
let j3;
if(i8 > 1){
const indices3 = {};
for(;i8--;){
let item3 = data29[i8];
if(typeof item3 !== "string"){
continue;
}
if(typeof indices3[item3] == "number"){
j3 = indices3[item3];
const err85 = {instancePath:instancePath+"/operations/" + i0+"/depends_on",schemaPath:"#/properties/operations/items/oneOf/3/properties/depends_on/uniqueItems",keyword:"uniqueItems",params:{i: i8, j: j3},message:"must NOT have duplicate items (items ## "+j3+" and "+i8+" are identical)"};
if(vErrors === null){
vErrors = [err85];
}
else {
vErrors.push(err85);
}
errors++;
break;
}
indices3[item3] = i8;
}
}
}
else {
const err86 = {instancePath:instancePath+"/operations/" + i0+"/depends_on",schemaPath:"#/properties/operations/items/oneOf/3/properties/depends_on/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err86];
}
else {
vErrors.push(err86);
}
errors++;
}
}
if(data6.destructive !== undefined){
if(typeof data6.destructive !== "boolean"){
const err87 = {instancePath:instancePath+"/operations/" + i0+"/destructive",schemaPath:"#/properties/operations/items/oneOf/3/properties/destructive/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err87];
}
else {
vErrors.push(err87);
}
errors++;
}
}
if(data6.operation_type !== undefined){
if("move_asset_variant" !== data6.operation_type){
const err88 = {instancePath:instancePath+"/operations/" + i0+"/operation_type",schemaPath:"#/properties/operations/items/oneOf/3/properties/operation_type/const",keyword:"const",params:{allowedValue: "move_asset_variant"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err88];
}
else {
vErrors.push(err88);
}
errors++;
}
}
if(data6.variant_ref !== undefined){
let data33 = data6.variant_ref;
if(data33 && typeof data33 == "object" && !Array.isArray(data33)){
if(data33.ref === undefined){
const err89 = {instancePath:instancePath+"/operations/" + i0+"/variant_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err89];
}
else {
vErrors.push(err89);
}
errors++;
}
for(const key7 in data33){
if(!(key7 === "ref")){
const err90 = {instancePath:instancePath+"/operations/" + i0+"/variant_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key7},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err90];
}
else {
vErrors.push(err90);
}
errors++;
}
}
if(data33.ref !== undefined){
let data34 = data33.ref;
if(typeof data34 === "string"){
if(!pattern4.test(data34)){
const err91 = {instancePath:instancePath+"/operations/" + i0+"/variant_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err91];
}
else {
vErrors.push(err91);
}
errors++;
}
}
else {
const err92 = {instancePath:instancePath+"/operations/" + i0+"/variant_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err92];
}
else {
vErrors.push(err92);
}
errors++;
}
}
}
else {
const err93 = {instancePath:instancePath+"/operations/" + i0+"/variant_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err93];
}
else {
vErrors.push(err93);
}
errors++;
}
}
if(data6.new_project_path !== undefined){
let data35 = data6.new_project_path;
if(typeof data35 === "string"){
if(func2(data35) < 1){
const err94 = {instancePath:instancePath+"/operations/" + i0+"/new_project_path",schemaPath:"#/properties/operations/items/oneOf/3/properties/new_project_path/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err94];
}
else {
vErrors.push(err94);
}
errors++;
}
}
else {
const err95 = {instancePath:instancePath+"/operations/" + i0+"/new_project_path",schemaPath:"#/properties/operations/items/oneOf/3/properties/new_project_path/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err95];
}
else {
vErrors.push(err95);
}
errors++;
}
}
}
else {
const err96 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/3/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err96];
}
else {
vErrors.push(err96);
}
errors++;
}
var _valid0 = _errs65 === errors;
if(_valid0 && valid3){
valid3 = false;
passing0 = [passing0, 3];
}
else {
if(_valid0){
valid3 = true;
passing0 = 3;
if(props0 !== true){
props0 = true;
}
}
const _errs85 = errors;
if(data6 && typeof data6 == "object" && !Array.isArray(data6)){
if(data6.operation_id === undefined){
const err97 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/4/required",keyword:"required",params:{missingProperty: "operation_id"},message:"must have required property '"+"operation_id"+"'"};
if(vErrors === null){
vErrors = [err97];
}
else {
vErrors.push(err97);
}
errors++;
}
if(data6.operation_type === undefined){
const err98 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/4/required",keyword:"required",params:{missingProperty: "operation_type"},message:"must have required property '"+"operation_type"+"'"};
if(vErrors === null){
vErrors = [err98];
}
else {
vErrors.push(err98);
}
errors++;
}
if(data6.depends_on === undefined){
const err99 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/4/required",keyword:"required",params:{missingProperty: "depends_on"},message:"must have required property '"+"depends_on"+"'"};
if(vErrors === null){
vErrors = [err99];
}
else {
vErrors.push(err99);
}
errors++;
}
if(data6.destructive === undefined){
const err100 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/4/required",keyword:"required",params:{missingProperty: "destructive"},message:"must have required property '"+"destructive"+"'"};
if(vErrors === null){
vErrors = [err100];
}
else {
vErrors.push(err100);
}
errors++;
}
if(data6.asset_identity_ref === undefined){
const err101 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/4/required",keyword:"required",params:{missingProperty: "asset_identity_ref"},message:"must have required property '"+"asset_identity_ref"+"'"};
if(vErrors === null){
vErrors = [err101];
}
else {
vErrors.push(err101);
}
errors++;
}
if(data6.variant_spec_ids === undefined){
const err102 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/4/required",keyword:"required",params:{missingProperty: "variant_spec_ids"},message:"must have required property '"+"variant_spec_ids"+"'"};
if(vErrors === null){
vErrors = [err102];
}
else {
vErrors.push(err102);
}
errors++;
}
for(const key8 in data6){
if(!((((((key8 === "operation_id") || (key8 === "depends_on")) || (key8 === "destructive")) || (key8 === "operation_type")) || (key8 === "asset_identity_ref")) || (key8 === "variant_spec_ids"))){
const err103 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/4/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key8},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err103];
}
else {
vErrors.push(err103);
}
errors++;
}
}
if(data6.operation_id !== undefined){
let data36 = data6.operation_id;
if(typeof data36 === "string"){
if(!pattern72.test(data36)){
const err104 = {instancePath:instancePath+"/operations/" + i0+"/operation_id",schemaPath:"#/properties/operations/items/oneOf/4/properties/operation_id/pattern",keyword:"pattern",params:{pattern: "^op-[A-Za-z0-9_-]+$"},message:"must match pattern \""+"^op-[A-Za-z0-9_-]+$"+"\""};
if(vErrors === null){
vErrors = [err104];
}
else {
vErrors.push(err104);
}
errors++;
}
}
else {
const err105 = {instancePath:instancePath+"/operations/" + i0+"/operation_id",schemaPath:"#/properties/operations/items/oneOf/4/properties/operation_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err105];
}
else {
vErrors.push(err105);
}
errors++;
}
}
if(data6.depends_on !== undefined){
let data37 = data6.depends_on;
if(Array.isArray(data37)){
const len5 = data37.length;
for(let i9=0; i9<len5; i9++){
let data38 = data37[i9];
if(typeof data38 === "string"){
if(!pattern72.test(data38)){
const err106 = {instancePath:instancePath+"/operations/" + i0+"/depends_on/" + i9,schemaPath:"#/properties/operations/items/oneOf/4/properties/depends_on/items/pattern",keyword:"pattern",params:{pattern: "^op-[A-Za-z0-9_-]+$"},message:"must match pattern \""+"^op-[A-Za-z0-9_-]+$"+"\""};
if(vErrors === null){
vErrors = [err106];
}
else {
vErrors.push(err106);
}
errors++;
}
}
else {
const err107 = {instancePath:instancePath+"/operations/" + i0+"/depends_on/" + i9,schemaPath:"#/properties/operations/items/oneOf/4/properties/depends_on/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err107];
}
else {
vErrors.push(err107);
}
errors++;
}
}
let i10 = data37.length;
let j4;
if(i10 > 1){
const indices4 = {};
for(;i10--;){
let item4 = data37[i10];
if(typeof item4 !== "string"){
continue;
}
if(typeof indices4[item4] == "number"){
j4 = indices4[item4];
const err108 = {instancePath:instancePath+"/operations/" + i0+"/depends_on",schemaPath:"#/properties/operations/items/oneOf/4/properties/depends_on/uniqueItems",keyword:"uniqueItems",params:{i: i10, j: j4},message:"must NOT have duplicate items (items ## "+j4+" and "+i10+" are identical)"};
if(vErrors === null){
vErrors = [err108];
}
else {
vErrors.push(err108);
}
errors++;
break;
}
indices4[item4] = i10;
}
}
}
else {
const err109 = {instancePath:instancePath+"/operations/" + i0+"/depends_on",schemaPath:"#/properties/operations/items/oneOf/4/properties/depends_on/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err109];
}
else {
vErrors.push(err109);
}
errors++;
}
}
if(data6.destructive !== undefined){
if(typeof data6.destructive !== "boolean"){
const err110 = {instancePath:instancePath+"/operations/" + i0+"/destructive",schemaPath:"#/properties/operations/items/oneOf/4/properties/destructive/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err110];
}
else {
vErrors.push(err110);
}
errors++;
}
}
if(data6.operation_type !== undefined){
if("generate_asset_request" !== data6.operation_type){
const err111 = {instancePath:instancePath+"/operations/" + i0+"/operation_type",schemaPath:"#/properties/operations/items/oneOf/4/properties/operation_type/const",keyword:"const",params:{allowedValue: "generate_asset_request"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err111];
}
else {
vErrors.push(err111);
}
errors++;
}
}
if(data6.asset_identity_ref !== undefined){
let data41 = data6.asset_identity_ref;
if(data41 && typeof data41 == "object" && !Array.isArray(data41)){
if(data41.ref === undefined){
const err112 = {instancePath:instancePath+"/operations/" + i0+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err112];
}
else {
vErrors.push(err112);
}
errors++;
}
for(const key9 in data41){
if(!(key9 === "ref")){
const err113 = {instancePath:instancePath+"/operations/" + i0+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key9},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err113];
}
else {
vErrors.push(err113);
}
errors++;
}
}
if(data41.ref !== undefined){
let data42 = data41.ref;
if(typeof data42 === "string"){
if(!pattern4.test(data42)){
const err114 = {instancePath:instancePath+"/operations/" + i0+"/asset_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err114];
}
else {
vErrors.push(err114);
}
errors++;
}
}
else {
const err115 = {instancePath:instancePath+"/operations/" + i0+"/asset_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err115];
}
else {
vErrors.push(err115);
}
errors++;
}
}
}
else {
const err116 = {instancePath:instancePath+"/operations/" + i0+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err116];
}
else {
vErrors.push(err116);
}
errors++;
}
}
if(data6.variant_spec_ids !== undefined){
let data43 = data6.variant_spec_ids;
if(Array.isArray(data43)){
if(data43.length < 1){
const err117 = {instancePath:instancePath+"/operations/" + i0+"/variant_spec_ids",schemaPath:"#/properties/operations/items/oneOf/4/properties/variant_spec_ids/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"};
if(vErrors === null){
vErrors = [err117];
}
else {
vErrors.push(err117);
}
errors++;
}
const len6 = data43.length;
for(let i11=0; i11<len6; i11++){
let data44 = data43[i11];
if(typeof data44 === "string"){
if(func2(data44) < 1){
const err118 = {instancePath:instancePath+"/operations/" + i0+"/variant_spec_ids/" + i11,schemaPath:"#/properties/operations/items/oneOf/4/properties/variant_spec_ids/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err118];
}
else {
vErrors.push(err118);
}
errors++;
}
}
else {
const err119 = {instancePath:instancePath+"/operations/" + i0+"/variant_spec_ids/" + i11,schemaPath:"#/properties/operations/items/oneOf/4/properties/variant_spec_ids/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err119];
}
else {
vErrors.push(err119);
}
errors++;
}
}
}
else {
const err120 = {instancePath:instancePath+"/operations/" + i0+"/variant_spec_ids",schemaPath:"#/properties/operations/items/oneOf/4/properties/variant_spec_ids/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err120];
}
else {
vErrors.push(err120);
}
errors++;
}
}
}
else {
const err121 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf/4/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err121];
}
else {
vErrors.push(err121);
}
errors++;
}
var _valid0 = _errs85 === errors;
if(_valid0 && valid3){
valid3 = false;
passing0 = [passing0, 4];
}
else {
if(_valid0){
valid3 = true;
passing0 = 4;
if(props0 !== true){
props0 = true;
}
}
}
}
}
}
if(!valid3){
const err122 = {instancePath:instancePath+"/operations/" + i0,schemaPath:"#/properties/operations/items/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err122];
}
else {
vErrors.push(err122);
}
errors++;
}
else {
errors = _errs12;
if(vErrors !== null){
if(_errs12){
vErrors.length = _errs12;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err123 = {instancePath:instancePath+"/operations",schemaPath:"#/properties/operations/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err123];
}
else {
vErrors.push(err123);
}
errors++;
}
}
if(data.provenance !== undefined){
let data45 = data.provenance;
if(data45 && typeof data45 == "object" && !Array.isArray(data45)){
if(data45.actor === undefined){
const err124 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/required",keyword:"required",params:{missingProperty: "actor"},message:"must have required property '"+"actor"+"'"};
if(vErrors === null){
vErrors = [err124];
}
else {
vErrors.push(err124);
}
errors++;
}
if(data45.ai_role_ref === undefined){
const err125 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/required",keyword:"required",params:{missingProperty: "ai_role_ref"},message:"must have required property '"+"ai_role_ref"+"'"};
if(vErrors === null){
vErrors = [err125];
}
else {
vErrors.push(err125);
}
errors++;
}
for(const key10 in data45){
if(!((key10 === "actor") || (key10 === "ai_role_ref"))){
const err126 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key10},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err126];
}
else {
vErrors.push(err126);
}
errors++;
}
}
if(data45.actor !== undefined){
let data46 = data45.actor;
if(!((((data46 === "creator") || (data46 === "creator_copilot")) || (data46 === "system")) || (data46 === "migration"))){
const err127 = {instancePath:instancePath+"/provenance/actor",schemaPath:"#/properties/provenance/properties/actor/enum",keyword:"enum",params:{allowedValues: schema77.properties.provenance.properties.actor.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err127];
}
else {
vErrors.push(err127);
}
errors++;
}
}
if(data45.ai_role_ref !== undefined){
let data47 = data45.ai_role_ref;
const _errs112 = errors;
let valid35 = false;
let passing1 = null;
const _errs113 = errors;
if(data47 !== null){
const err128 = {instancePath:instancePath+"/provenance/ai_role_ref",schemaPath:"#/properties/provenance/properties/ai_role_ref/oneOf/0/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err128];
}
else {
vErrors.push(err128);
}
errors++;
}
var _valid1 = _errs113 === errors;
if(_valid1){
valid35 = true;
passing1 = 0;
}
const _errs115 = errors;
if(data47 && typeof data47 == "object" && !Array.isArray(data47)){
if(data47.ref === undefined){
const err129 = {instancePath:instancePath+"/provenance/ai_role_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err129];
}
else {
vErrors.push(err129);
}
errors++;
}
for(const key11 in data47){
if(!(key11 === "ref")){
const err130 = {instancePath:instancePath+"/provenance/ai_role_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key11},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err130];
}
else {
vErrors.push(err130);
}
errors++;
}
}
if(data47.ref !== undefined){
let data48 = data47.ref;
if(typeof data48 === "string"){
if(!pattern4.test(data48)){
const err131 = {instancePath:instancePath+"/provenance/ai_role_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err131];
}
else {
vErrors.push(err131);
}
errors++;
}
}
else {
const err132 = {instancePath:instancePath+"/provenance/ai_role_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err132];
}
else {
vErrors.push(err132);
}
errors++;
}
}
}
else {
const err133 = {instancePath:instancePath+"/provenance/ai_role_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err133];
}
else {
vErrors.push(err133);
}
errors++;
}
var _valid1 = _errs115 === errors;
if(_valid1 && valid35){
valid35 = false;
passing1 = [passing1, 1];
}
else {
if(_valid1){
valid35 = true;
passing1 = 1;
}
}
if(!valid35){
const err134 = {instancePath:instancePath+"/provenance/ai_role_ref",schemaPath:"#/properties/provenance/properties/ai_role_ref/oneOf",keyword:"oneOf",params:{passingSchemas: passing1},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err134];
}
else {
vErrors.push(err134);
}
errors++;
}
else {
errors = _errs112;
if(vErrors !== null){
if(_errs112){
vErrors.length = _errs112;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err135 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err135];
}
else {
vErrors.push(err135);
}
errors++;
}
}
}
else {
const err136 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err136];
}
else {
vErrors.push(err136);
}
errors++;
}
validate84.errors = vErrors;
return errors === 0;
}
validate84.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator16 = validate85;
const schema83 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:character-definition","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.character.definition"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"character"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"persona":{"type":"object","additionalProperties":false,"properties":{"summary":{"type":"string"},"background":{"type":"string"},"personality":{"type":"array","items":{"type":"string"},"uniqueItems":true},"speech":{"type":"object","additionalProperties":false,"properties":{"register":{"type":"string"},"notes":{"type":"string"}}},"values":{"type":"array","items":{"type":"string"},"uniqueItems":true},"fears":{"type":"array","items":{"type":"string"},"uniqueItems":true},"desires":{"type":"array","items":{"type":"string"},"uniqueItems":true},"secrets":{"type":"array","items":{"type":"string"}}}},"visual_identity_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"component_config_refs":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:definition-ref"},"uniqueItems":true},"default_controller_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"initial_location_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"}},"required":["schema_id","schema_version","id","kind","display_name","persona"]};

function validate85(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:character-definition" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate85.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.persona === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "persona"},message:"must have required property '"+"persona"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema83.properties, key0))){
const err6 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.character.definition" !== data.schema_id){
const err7 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.character.definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err8 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err9 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
else {
const err10 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.kind !== undefined){
if("character" !== data.kind){
const err11 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "character"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err12 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err14 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err15 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
else {
const err16 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err17 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err18 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err19 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err20 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err21 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
}
else {
const err22 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data.persona !== undefined){
let data10 = data.persona;
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
for(const key3 in data10){
if(!((((((((key3 === "summary") || (key3 === "background")) || (key3 === "personality")) || (key3 === "speech")) || (key3 === "values")) || (key3 === "fears")) || (key3 === "desires")) || (key3 === "secrets"))){
const err23 = {instancePath:instancePath+"/persona",schemaPath:"#/properties/persona/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data10.summary !== undefined){
if(typeof data10.summary !== "string"){
const err24 = {instancePath:instancePath+"/persona/summary",schemaPath:"#/properties/persona/properties/summary/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data10.background !== undefined){
if(typeof data10.background !== "string"){
const err25 = {instancePath:instancePath+"/persona/background",schemaPath:"#/properties/persona/properties/background/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data10.personality !== undefined){
let data13 = data10.personality;
if(Array.isArray(data13)){
const len1 = data13.length;
for(let i2=0; i2<len1; i2++){
if(typeof data13[i2] !== "string"){
const err26 = {instancePath:instancePath+"/persona/personality/" + i2,schemaPath:"#/properties/persona/properties/personality/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
let i3 = data13.length;
let j1;
if(i3 > 1){
const indices1 = {};
for(;i3--;){
let item1 = data13[i3];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err27 = {instancePath:instancePath+"/persona/personality",schemaPath:"#/properties/persona/properties/personality/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
break;
}
indices1[item1] = i3;
}
}
}
else {
const err28 = {instancePath:instancePath+"/persona/personality",schemaPath:"#/properties/persona/properties/personality/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data10.speech !== undefined){
let data15 = data10.speech;
if(data15 && typeof data15 == "object" && !Array.isArray(data15)){
for(const key4 in data15){
if(!((key4 === "register") || (key4 === "notes"))){
const err29 = {instancePath:instancePath+"/persona/speech",schemaPath:"#/properties/persona/properties/speech/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(data15.register !== undefined){
if(typeof data15.register !== "string"){
const err30 = {instancePath:instancePath+"/persona/speech/register",schemaPath:"#/properties/persona/properties/speech/properties/register/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data15.notes !== undefined){
if(typeof data15.notes !== "string"){
const err31 = {instancePath:instancePath+"/persona/speech/notes",schemaPath:"#/properties/persona/properties/speech/properties/notes/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
}
else {
const err32 = {instancePath:instancePath+"/persona/speech",schemaPath:"#/properties/persona/properties/speech/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
if(data10.values !== undefined){
let data18 = data10.values;
if(Array.isArray(data18)){
const len2 = data18.length;
for(let i4=0; i4<len2; i4++){
if(typeof data18[i4] !== "string"){
const err33 = {instancePath:instancePath+"/persona/values/" + i4,schemaPath:"#/properties/persona/properties/values/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
let i5 = data18.length;
let j2;
if(i5 > 1){
const indices2 = {};
for(;i5--;){
let item2 = data18[i5];
if(typeof item2 !== "string"){
continue;
}
if(typeof indices2[item2] == "number"){
j2 = indices2[item2];
const err34 = {instancePath:instancePath+"/persona/values",schemaPath:"#/properties/persona/properties/values/uniqueItems",keyword:"uniqueItems",params:{i: i5, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i5+" are identical)"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
break;
}
indices2[item2] = i5;
}
}
}
else {
const err35 = {instancePath:instancePath+"/persona/values",schemaPath:"#/properties/persona/properties/values/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
if(data10.fears !== undefined){
let data20 = data10.fears;
if(Array.isArray(data20)){
const len3 = data20.length;
for(let i6=0; i6<len3; i6++){
if(typeof data20[i6] !== "string"){
const err36 = {instancePath:instancePath+"/persona/fears/" + i6,schemaPath:"#/properties/persona/properties/fears/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
let i7 = data20.length;
let j3;
if(i7 > 1){
const indices3 = {};
for(;i7--;){
let item3 = data20[i7];
if(typeof item3 !== "string"){
continue;
}
if(typeof indices3[item3] == "number"){
j3 = indices3[item3];
const err37 = {instancePath:instancePath+"/persona/fears",schemaPath:"#/properties/persona/properties/fears/uniqueItems",keyword:"uniqueItems",params:{i: i7, j: j3},message:"must NOT have duplicate items (items ## "+j3+" and "+i7+" are identical)"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
break;
}
indices3[item3] = i7;
}
}
}
else {
const err38 = {instancePath:instancePath+"/persona/fears",schemaPath:"#/properties/persona/properties/fears/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
if(data10.desires !== undefined){
let data22 = data10.desires;
if(Array.isArray(data22)){
const len4 = data22.length;
for(let i8=0; i8<len4; i8++){
if(typeof data22[i8] !== "string"){
const err39 = {instancePath:instancePath+"/persona/desires/" + i8,schemaPath:"#/properties/persona/properties/desires/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
let i9 = data22.length;
let j4;
if(i9 > 1){
const indices4 = {};
for(;i9--;){
let item4 = data22[i9];
if(typeof item4 !== "string"){
continue;
}
if(typeof indices4[item4] == "number"){
j4 = indices4[item4];
const err40 = {instancePath:instancePath+"/persona/desires",schemaPath:"#/properties/persona/properties/desires/uniqueItems",keyword:"uniqueItems",params:{i: i9, j: j4},message:"must NOT have duplicate items (items ## "+j4+" and "+i9+" are identical)"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
break;
}
indices4[item4] = i9;
}
}
}
else {
const err41 = {instancePath:instancePath+"/persona/desires",schemaPath:"#/properties/persona/properties/desires/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
if(data10.secrets !== undefined){
let data24 = data10.secrets;
if(Array.isArray(data24)){
const len5 = data24.length;
for(let i10=0; i10<len5; i10++){
if(typeof data24[i10] !== "string"){
const err42 = {instancePath:instancePath+"/persona/secrets/" + i10,schemaPath:"#/properties/persona/properties/secrets/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
}
else {
const err43 = {instancePath:instancePath+"/persona/secrets",schemaPath:"#/properties/persona/properties/secrets/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
}
else {
const err44 = {instancePath:instancePath+"/persona",schemaPath:"#/properties/persona/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
if(data.visual_identity_ref !== undefined){
let data26 = data.visual_identity_ref;
if(data26 && typeof data26 == "object" && !Array.isArray(data26)){
if(data26.ref === undefined){
const err45 = {instancePath:instancePath+"/visual_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
for(const key5 in data26){
if(!(key5 === "ref")){
const err46 = {instancePath:instancePath+"/visual_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
}
if(data26.ref !== undefined){
let data27 = data26.ref;
if(typeof data27 === "string"){
if(!pattern4.test(data27)){
const err47 = {instancePath:instancePath+"/visual_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
else {
const err48 = {instancePath:instancePath+"/visual_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
}
}
else {
const err49 = {instancePath:instancePath+"/visual_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
}
if(data.component_config_refs !== undefined){
let data28 = data.component_config_refs;
if(Array.isArray(data28)){
const len6 = data28.length;
for(let i11=0; i11<len6; i11++){
let data29 = data28[i11];
if(data29 && typeof data29 == "object" && !Array.isArray(data29)){
if(data29.ref === undefined){
const err50 = {instancePath:instancePath+"/component_config_refs/" + i11,schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
for(const key6 in data29){
if(!(key6 === "ref")){
const err51 = {instancePath:instancePath+"/component_config_refs/" + i11,schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key6},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
}
if(data29.ref !== undefined){
let data30 = data29.ref;
if(typeof data30 === "string"){
if(!pattern4.test(data30)){
const err52 = {instancePath:instancePath+"/component_config_refs/" + i11+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
}
else {
const err53 = {instancePath:instancePath+"/component_config_refs/" + i11+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
}
}
else {
const err54 = {instancePath:instancePath+"/component_config_refs/" + i11,schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
}
let i12 = data28.length;
let j5;
if(i12 > 1){
outer0:
for(;i12--;){
for(j5 = i12; j5--;){
if(func0(data28[i12], data28[j5])){
const err55 = {instancePath:instancePath+"/component_config_refs",schemaPath:"#/properties/component_config_refs/uniqueItems",keyword:"uniqueItems",params:{i: i12, j: j5},message:"must NOT have duplicate items (items ## "+j5+" and "+i12+" are identical)"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
break outer0;
}
}
}
}
}
else {
const err56 = {instancePath:instancePath+"/component_config_refs",schemaPath:"#/properties/component_config_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
}
if(data.default_controller_ref !== undefined){
let data31 = data.default_controller_ref;
if(data31 && typeof data31 == "object" && !Array.isArray(data31)){
if(data31.ref === undefined){
const err57 = {instancePath:instancePath+"/default_controller_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
for(const key7 in data31){
if(!(key7 === "ref")){
const err58 = {instancePath:instancePath+"/default_controller_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key7},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
}
if(data31.ref !== undefined){
let data32 = data31.ref;
if(typeof data32 === "string"){
if(!pattern4.test(data32)){
const err59 = {instancePath:instancePath+"/default_controller_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
}
else {
const err60 = {instancePath:instancePath+"/default_controller_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
}
}
else {
const err61 = {instancePath:instancePath+"/default_controller_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
}
}
if(data.initial_location_ref !== undefined){
let data33 = data.initial_location_ref;
if(data33 && typeof data33 == "object" && !Array.isArray(data33)){
if(data33.ref === undefined){
const err62 = {instancePath:instancePath+"/initial_location_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
for(const key8 in data33){
if(!(key8 === "ref")){
const err63 = {instancePath:instancePath+"/initial_location_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key8},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err63];
}
else {
vErrors.push(err63);
}
errors++;
}
}
if(data33.ref !== undefined){
let data34 = data33.ref;
if(typeof data34 === "string"){
if(!pattern4.test(data34)){
const err64 = {instancePath:instancePath+"/initial_location_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err64];
}
else {
vErrors.push(err64);
}
errors++;
}
}
else {
const err65 = {instancePath:instancePath+"/initial_location_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err65];
}
else {
vErrors.push(err65);
}
errors++;
}
}
}
else {
const err66 = {instancePath:instancePath+"/initial_location_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err66];
}
else {
vErrors.push(err66);
}
errors++;
}
}
}
else {
const err67 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err67];
}
else {
vErrors.push(err67);
}
errors++;
}
validate85.errors = vErrors;
return errors === 0;
}
validate85.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator17 = validate86;
const schema88 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:character-state","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.character.state"},"schema_version":{"const":1},"instance_id":{"type":"string","format":"uuid"},"definition_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"location_instance_id":{"type":["string","null"],"format":"uuid"},"active_activity_id":{"type":["string","null"],"format":"uuid"},"controller_binding_id":{"type":["string","null"],"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"}},"required":["schema_id","schema_version","instance_id","definition_ref","location_instance_id","active_activity_id","controller_binding_id"]};

function validate86(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:character-state" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate86.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.instance_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "instance_id"},message:"must have required property '"+"instance_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.definition_ref === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "definition_ref"},message:"must have required property '"+"definition_ref"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.location_instance_id === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "location_instance_id"},message:"must have required property '"+"location_instance_id"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.active_activity_id === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "active_activity_id"},message:"must have required property '"+"active_activity_id"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.controller_binding_id === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "controller_binding_id"},message:"must have required property '"+"controller_binding_id"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
for(const key0 in data){
if(!(((((((key0 === "schema_id") || (key0 === "schema_version")) || (key0 === "instance_id")) || (key0 === "definition_ref")) || (key0 === "location_instance_id")) || (key0 === "active_activity_id")) || (key0 === "controller_binding_id"))){
const err7 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.character.state" !== data.schema_id){
const err8 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.character.state"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err9 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.instance_id !== undefined){
let data2 = data.instance_id;
if(typeof data2 === "string"){
if(!(formats0.test(data2))){
const err10 = {instancePath:instancePath+"/instance_id",schemaPath:"#/properties/instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {instancePath:instancePath+"/instance_id",schemaPath:"#/properties/instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.definition_ref !== undefined){
let data3 = data.definition_ref;
if(data3 && typeof data3 == "object" && !Array.isArray(data3)){
if(data3.ref === undefined){
const err12 = {instancePath:instancePath+"/definition_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
for(const key1 in data3){
if(!(key1 === "ref")){
const err13 = {instancePath:instancePath+"/definition_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data3.ref !== undefined){
let data4 = data3.ref;
if(typeof data4 === "string"){
if(!pattern4.test(data4)){
const err14 = {instancePath:instancePath+"/definition_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/definition_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
}
else {
const err16 = {instancePath:instancePath+"/definition_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.location_instance_id !== undefined){
let data5 = data.location_instance_id;
if((typeof data5 !== "string") && (data5 !== null)){
const err17 = {instancePath:instancePath+"/location_instance_id",schemaPath:"#/properties/location_instance_id/type",keyword:"type",params:{type: schema88.properties.location_instance_id.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(typeof data5 === "string"){
if(!(formats0.test(data5))){
const err18 = {instancePath:instancePath+"/location_instance_id",schemaPath:"#/properties/location_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
}
if(data.active_activity_id !== undefined){
let data6 = data.active_activity_id;
if((typeof data6 !== "string") && (data6 !== null)){
const err19 = {instancePath:instancePath+"/active_activity_id",schemaPath:"#/properties/active_activity_id/type",keyword:"type",params:{type: schema88.properties.active_activity_id.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(typeof data6 === "string"){
if(!(formats0.test(data6))){
const err20 = {instancePath:instancePath+"/active_activity_id",schemaPath:"#/properties/active_activity_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
}
if(data.controller_binding_id !== undefined){
let data7 = data.controller_binding_id;
if((typeof data7 !== "string") && (data7 !== null)){
const err21 = {instancePath:instancePath+"/controller_binding_id",schemaPath:"#/properties/controller_binding_id/type",keyword:"type",params:{type: schema88.properties.controller_binding_id.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if(typeof data7 === "string"){
if(!pattern4.test(data7)){
const err22 = {instancePath:instancePath+"/controller_binding_id",schemaPath:"#/properties/controller_binding_id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
}
}
else {
const err23 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
validate86.errors = vErrors;
return errors === 0;
}
validate86.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator18 = validate87;
const schema90 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:controller-binding","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.controller.binding"},"schema_version":{"const":1},"binding_id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"character_instance_id":{"type":"string","format":"uuid"},"controller_profile_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"}},"required":["schema_id","schema_version","binding_id","character_instance_id","controller_profile_ref"]};

function validate87(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:controller-binding" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate87.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.binding_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "binding_id"},message:"must have required property '"+"binding_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.character_instance_id === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "character_instance_id"},message:"must have required property '"+"character_instance_id"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.controller_profile_ref === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "controller_profile_ref"},message:"must have required property '"+"controller_profile_ref"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
for(const key0 in data){
if(!(((((key0 === "schema_id") || (key0 === "schema_version")) || (key0 === "binding_id")) || (key0 === "character_instance_id")) || (key0 === "controller_profile_ref"))){
const err5 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.controller.binding" !== data.schema_id){
const err6 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.controller.binding"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err7 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.binding_id !== undefined){
let data2 = data.binding_id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err8 = {instancePath:instancePath+"/binding_id",schemaPath:"#/properties/binding_id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/binding_id",schemaPath:"#/properties/binding_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.character_instance_id !== undefined){
let data3 = data.character_instance_id;
if(typeof data3 === "string"){
if(!(formats0.test(data3))){
const err10 = {instancePath:instancePath+"/character_instance_id",schemaPath:"#/properties/character_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {instancePath:instancePath+"/character_instance_id",schemaPath:"#/properties/character_instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.controller_profile_ref !== undefined){
let data4 = data.controller_profile_ref;
if(data4 && typeof data4 == "object" && !Array.isArray(data4)){
if(data4.ref === undefined){
const err12 = {instancePath:instancePath+"/controller_profile_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
for(const key1 in data4){
if(!(key1 === "ref")){
const err13 = {instancePath:instancePath+"/controller_profile_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data4.ref !== undefined){
let data5 = data4.ref;
if(typeof data5 === "string"){
if(!pattern4.test(data5)){
const err14 = {instancePath:instancePath+"/controller_profile_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/controller_profile_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
}
else {
const err16 = {instancePath:instancePath+"/controller_profile_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
}
else {
const err17 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
validate87.errors = vErrors;
return errors === 0;
}
validate87.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator19 = validate88;
const schema92 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:controller-profile","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.controller.profile"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"controller_profile"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"controller_type":{"enum":["human","ai","replay","test","remote"]},"ai_role_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"decision_policy":{"type":"object","additionalProperties":false,"properties":{"decision_mode":{"enum":["event_driven","manual","replay","test"]},"minimum_replan_interval_ms":{"type":"integer","minimum":0},"allow_routine_shortcuts":{"type":"boolean"}},"required":["decision_mode"]}},"required":["schema_id","schema_version","id","kind","display_name","controller_type","decision_policy"]};

function validate88(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:controller-profile" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate88.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.controller_type === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "controller_type"},message:"must have required property '"+"controller_type"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.decision_policy === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "decision_policy"},message:"must have required property '"+"decision_policy"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema92.properties, key0))){
const err7 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.controller.profile" !== data.schema_id){
const err8 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.controller.profile"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err9 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err10 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.kind !== undefined){
if("controller_profile" !== data.kind){
const err12 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "controller_profile"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err13 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err15 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err16 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err18 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err19 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err20 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err21 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err22 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
}
else {
const err23 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data.controller_type !== undefined){
let data10 = data.controller_type;
if(!(((((data10 === "human") || (data10 === "ai")) || (data10 === "replay")) || (data10 === "test")) || (data10 === "remote"))){
const err24 = {instancePath:instancePath+"/controller_type",schemaPath:"#/properties/controller_type/enum",keyword:"enum",params:{allowedValues: schema92.properties.controller_type.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data.ai_role_ref !== undefined){
let data11 = data.ai_role_ref;
if(data11 && typeof data11 == "object" && !Array.isArray(data11)){
if(data11.ref === undefined){
const err25 = {instancePath:instancePath+"/ai_role_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
for(const key3 in data11){
if(!(key3 === "ref")){
const err26 = {instancePath:instancePath+"/ai_role_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(data11.ref !== undefined){
let data12 = data11.ref;
if(typeof data12 === "string"){
if(!pattern4.test(data12)){
const err27 = {instancePath:instancePath+"/ai_role_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
else {
const err28 = {instancePath:instancePath+"/ai_role_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
}
else {
const err29 = {instancePath:instancePath+"/ai_role_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(data.decision_policy !== undefined){
let data13 = data.decision_policy;
if(data13 && typeof data13 == "object" && !Array.isArray(data13)){
if(data13.decision_mode === undefined){
const err30 = {instancePath:instancePath+"/decision_policy",schemaPath:"#/properties/decision_policy/required",keyword:"required",params:{missingProperty: "decision_mode"},message:"must have required property '"+"decision_mode"+"'"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
for(const key4 in data13){
if(!(((key4 === "decision_mode") || (key4 === "minimum_replan_interval_ms")) || (key4 === "allow_routine_shortcuts"))){
const err31 = {instancePath:instancePath+"/decision_policy",schemaPath:"#/properties/decision_policy/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
if(data13.decision_mode !== undefined){
let data14 = data13.decision_mode;
if(!((((data14 === "event_driven") || (data14 === "manual")) || (data14 === "replay")) || (data14 === "test"))){
const err32 = {instancePath:instancePath+"/decision_policy/decision_mode",schemaPath:"#/properties/decision_policy/properties/decision_mode/enum",keyword:"enum",params:{allowedValues: schema92.properties.decision_policy.properties.decision_mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
if(data13.minimum_replan_interval_ms !== undefined){
let data15 = data13.minimum_replan_interval_ms;
if(!(((typeof data15 == "number") && (!(data15 % 1) && !isNaN(data15))) && (isFinite(data15)))){
const err33 = {instancePath:instancePath+"/decision_policy/minimum_replan_interval_ms",schemaPath:"#/properties/decision_policy/properties/minimum_replan_interval_ms/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
if((typeof data15 == "number") && (isFinite(data15))){
if(data15 < 0 || isNaN(data15)){
const err34 = {instancePath:instancePath+"/decision_policy/minimum_replan_interval_ms",schemaPath:"#/properties/decision_policy/properties/minimum_replan_interval_ms/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
}
if(data13.allow_routine_shortcuts !== undefined){
if(typeof data13.allow_routine_shortcuts !== "boolean"){
const err35 = {instancePath:instancePath+"/decision_policy/allow_routine_shortcuts",schemaPath:"#/properties/decision_policy/properties/allow_routine_shortcuts/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
}
else {
const err36 = {instancePath:instancePath+"/decision_policy",schemaPath:"#/properties/decision_policy/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
}
else {
const err37 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
validate88.errors = vErrors;
return errors === 0;
}
validate88.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator20 = validate89;
const schema94 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:event-definition","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.event.definition"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"event"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"trigger":{"$ref":"urn:aigs:schema:v1:trigger-definition"},"condition":{"oneOf":[{"type":"null"},{"$ref":"urn:aigs:schema:v1:condition-expression"}]},"effects":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:effect-operation"},"minItems":1},"repeat":{"type":"object","additionalProperties":false,"properties":{"mode":{"enum":["once","unlimited","limited"]},"max_occurrences":{"type":["integer","null"],"minimum":1},"cooldown_game_seconds":{"type":"integer","minimum":0}},"required":["mode","cooldown_game_seconds"]},"priority":{"type":"integer","minimum":-1000,"maximum":1000}},"required":["schema_id","schema_version","id","kind","display_name","trigger","condition","effects","repeat"]};
const schema98 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:effect-operation","type":"object","additionalProperties":false,"properties":{"effect_type":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},"parameters":{"type":"object"}},"required":["effect_type","parameters"]};
const schema95 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:trigger-definition","oneOf":[{"type":"object","additionalProperties":false,"properties":{"trigger_type":{"const":"world_event"},"event_type":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},"filters":{"type":"object","additionalProperties":false,"properties":{"actor_definition_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"target_definition_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"}}}},"required":["trigger_type","event_type"]},{"type":"object","additionalProperties":false,"properties":{"trigger_type":{"const":"game_time"},"at_game_time":{"type":"integer","minimum":0},"repeat_every_game_seconds":{"type":["integer","null"],"minimum":1}},"required":["trigger_type","at_game_time","repeat_every_game_seconds"]},{"type":"object","additionalProperties":false,"properties":{"trigger_type":{"const":"threshold"},"condition":{"$ref":"urn:aigs:schema:v1:condition-expression"},"edge":{"enum":["rising","falling","either"]}},"required":["trigger_type","condition","edge"]}]};

function validate90(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:trigger-definition" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate90.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
const _errs0 = errors;
let valid0 = false;
let passing0 = null;
const _errs1 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.trigger_type === undefined){
const err0 = {instancePath,schemaPath:"#/oneOf/0/required",keyword:"required",params:{missingProperty: "trigger_type"},message:"must have required property '"+"trigger_type"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.event_type === undefined){
const err1 = {instancePath,schemaPath:"#/oneOf/0/required",keyword:"required",params:{missingProperty: "event_type"},message:"must have required property '"+"event_type"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
for(const key0 in data){
if(!(((key0 === "trigger_type") || (key0 === "event_type")) || (key0 === "filters"))){
const err2 = {instancePath,schemaPath:"#/oneOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
if(data.trigger_type !== undefined){
if("world_event" !== data.trigger_type){
const err3 = {instancePath:instancePath+"/trigger_type",schemaPath:"#/oneOf/0/properties/trigger_type/const",keyword:"const",params:{allowedValue: "world_event"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.event_type !== undefined){
let data1 = data.event_type;
if(typeof data1 === "string"){
if(!pattern7.test(data1)){
const err4 = {instancePath:instancePath+"/event_type",schemaPath:"#/oneOf/0/properties/event_type/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"+"\""};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
else {
const err5 = {instancePath:instancePath+"/event_type",schemaPath:"#/oneOf/0/properties/event_type/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.filters !== undefined){
let data2 = data.filters;
if(data2 && typeof data2 == "object" && !Array.isArray(data2)){
for(const key1 in data2){
if(!((key1 === "actor_definition_ref") || (key1 === "target_definition_ref"))){
const err6 = {instancePath:instancePath+"/filters",schemaPath:"#/oneOf/0/properties/filters/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data2.actor_definition_ref !== undefined){
let data3 = data2.actor_definition_ref;
if(data3 && typeof data3 == "object" && !Array.isArray(data3)){
if(data3.ref === undefined){
const err7 = {instancePath:instancePath+"/filters/actor_definition_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
for(const key2 in data3){
if(!(key2 === "ref")){
const err8 = {instancePath:instancePath+"/filters/actor_definition_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data3.ref !== undefined){
let data4 = data3.ref;
if(typeof data4 === "string"){
if(!pattern4.test(data4)){
const err9 = {instancePath:instancePath+"/filters/actor_definition_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
else {
const err10 = {instancePath:instancePath+"/filters/actor_definition_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
}
else {
const err11 = {instancePath:instancePath+"/filters/actor_definition_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data2.target_definition_ref !== undefined){
let data5 = data2.target_definition_ref;
if(data5 && typeof data5 == "object" && !Array.isArray(data5)){
if(data5.ref === undefined){
const err12 = {instancePath:instancePath+"/filters/target_definition_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
for(const key3 in data5){
if(!(key3 === "ref")){
const err13 = {instancePath:instancePath+"/filters/target_definition_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data5.ref !== undefined){
let data6 = data5.ref;
if(typeof data6 === "string"){
if(!pattern4.test(data6)){
const err14 = {instancePath:instancePath+"/filters/target_definition_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/filters/target_definition_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
}
else {
const err16 = {instancePath:instancePath+"/filters/target_definition_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
}
else {
const err17 = {instancePath:instancePath+"/filters",schemaPath:"#/oneOf/0/properties/filters/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
}
else {
const err18 = {instancePath,schemaPath:"#/oneOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
var _valid0 = _errs1 === errors;
if(_valid0){
valid0 = true;
passing0 = 0;
var props0 = true;
}
const _errs22 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.trigger_type === undefined){
const err19 = {instancePath,schemaPath:"#/oneOf/1/required",keyword:"required",params:{missingProperty: "trigger_type"},message:"must have required property '"+"trigger_type"+"'"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(data.at_game_time === undefined){
const err20 = {instancePath,schemaPath:"#/oneOf/1/required",keyword:"required",params:{missingProperty: "at_game_time"},message:"must have required property '"+"at_game_time"+"'"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(data.repeat_every_game_seconds === undefined){
const err21 = {instancePath,schemaPath:"#/oneOf/1/required",keyword:"required",params:{missingProperty: "repeat_every_game_seconds"},message:"must have required property '"+"repeat_every_game_seconds"+"'"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
for(const key4 in data){
if(!(((key4 === "trigger_type") || (key4 === "at_game_time")) || (key4 === "repeat_every_game_seconds"))){
const err22 = {instancePath,schemaPath:"#/oneOf/1/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data.trigger_type !== undefined){
if("game_time" !== data.trigger_type){
const err23 = {instancePath:instancePath+"/trigger_type",schemaPath:"#/oneOf/1/properties/trigger_type/const",keyword:"const",params:{allowedValue: "game_time"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data.at_game_time !== undefined){
let data8 = data.at_game_time;
if(!(((typeof data8 == "number") && (!(data8 % 1) && !isNaN(data8))) && (isFinite(data8)))){
const err24 = {instancePath:instancePath+"/at_game_time",schemaPath:"#/oneOf/1/properties/at_game_time/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if((typeof data8 == "number") && (isFinite(data8))){
if(data8 < 0 || isNaN(data8)){
const err25 = {instancePath:instancePath+"/at_game_time",schemaPath:"#/oneOf/1/properties/at_game_time/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
}
if(data.repeat_every_game_seconds !== undefined){
let data9 = data.repeat_every_game_seconds;
if((!(((typeof data9 == "number") && (!(data9 % 1) && !isNaN(data9))) && (isFinite(data9)))) && (data9 !== null)){
const err26 = {instancePath:instancePath+"/repeat_every_game_seconds",schemaPath:"#/oneOf/1/properties/repeat_every_game_seconds/type",keyword:"type",params:{type: schema95.oneOf[1].properties.repeat_every_game_seconds.type},message:"must be integer,null"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
if((typeof data9 == "number") && (isFinite(data9))){
if(data9 < 1 || isNaN(data9)){
const err27 = {instancePath:instancePath+"/repeat_every_game_seconds",schemaPath:"#/oneOf/1/properties/repeat_every_game_seconds/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
}
}
else {
const err28 = {instancePath,schemaPath:"#/oneOf/1/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
var _valid0 = _errs22 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 1];
}
else {
if(_valid0){
valid0 = true;
passing0 = 1;
if(props0 !== true){
props0 = true;
}
}
const _errs30 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.trigger_type === undefined){
const err29 = {instancePath,schemaPath:"#/oneOf/2/required",keyword:"required",params:{missingProperty: "trigger_type"},message:"must have required property '"+"trigger_type"+"'"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(data.condition === undefined){
const err30 = {instancePath,schemaPath:"#/oneOf/2/required",keyword:"required",params:{missingProperty: "condition"},message:"must have required property '"+"condition"+"'"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
if(data.edge === undefined){
const err31 = {instancePath,schemaPath:"#/oneOf/2/required",keyword:"required",params:{missingProperty: "edge"},message:"must have required property '"+"edge"+"'"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
for(const key5 in data){
if(!(((key5 === "trigger_type") || (key5 === "condition")) || (key5 === "edge"))){
const err32 = {instancePath,schemaPath:"#/oneOf/2/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
if(data.trigger_type !== undefined){
if("threshold" !== data.trigger_type){
const err33 = {instancePath:instancePath+"/trigger_type",schemaPath:"#/oneOf/2/properties/trigger_type/const",keyword:"const",params:{allowedValue: "threshold"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
if(data.condition !== undefined){
if(!(validate21(data.condition, {instancePath:instancePath+"/condition",parentData:data,parentDataProperty:"condition",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
errors = vErrors.length;
}
}
if(data.edge !== undefined){
let data12 = data.edge;
if(!(((data12 === "rising") || (data12 === "falling")) || (data12 === "either"))){
const err34 = {instancePath:instancePath+"/edge",schemaPath:"#/oneOf/2/properties/edge/enum",keyword:"enum",params:{allowedValues: schema95.oneOf[2].properties.edge.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
}
else {
const err35 = {instancePath,schemaPath:"#/oneOf/2/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
var _valid0 = _errs30 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 2];
}
else {
if(_valid0){
valid0 = true;
passing0 = 2;
if(props0 !== true){
props0 = true;
}
}
}
}
if(!valid0){
const err36 = {instancePath,schemaPath:"#/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
else {
errors = _errs0;
if(vErrors !== null){
if(_errs0){
vErrors.length = _errs0;
}
else {
vErrors = null;
}
}
}
validate90.errors = vErrors;
evaluated0.props = props0;
return errors === 0;
}
validate90.evaluated = {"dynamicProps":true,"dynamicItems":false};


function validate89(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:event-definition" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate89.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.trigger === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "trigger"},message:"must have required property '"+"trigger"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.condition === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "condition"},message:"must have required property '"+"condition"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.effects === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "effects"},message:"must have required property '"+"effects"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.repeat === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "repeat"},message:"must have required property '"+"repeat"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema94.properties, key0))){
const err9 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.event.definition" !== data.schema_id){
const err10 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.event.definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err11 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err12 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.kind !== undefined){
if("event" !== data.kind){
const err14 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "event"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err15 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
else {
const err16 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err17 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err18 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
else {
const err19 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err20 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err21 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err22 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err23 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err24 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
}
else {
const err25 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data.trigger !== undefined){
if(!(validate90(data.trigger, {instancePath:instancePath+"/trigger",parentData:data,parentDataProperty:"trigger",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate90.errors : vErrors.concat(validate90.errors);
errors = vErrors.length;
}
}
if(data.condition !== undefined){
let data11 = data.condition;
const _errs23 = errors;
let valid6 = false;
let passing0 = null;
const _errs24 = errors;
if(data11 !== null){
const err26 = {instancePath:instancePath+"/condition",schemaPath:"#/properties/condition/oneOf/0/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
var _valid0 = _errs24 === errors;
if(_valid0){
valid6 = true;
passing0 = 0;
}
const _errs26 = errors;
if(!(validate21(data11, {instancePath:instancePath+"/condition",parentData:data,parentDataProperty:"condition",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
errors = vErrors.length;
}
var _valid0 = _errs26 === errors;
if(_valid0 && valid6){
valid6 = false;
passing0 = [passing0, 1];
}
else {
if(_valid0){
valid6 = true;
passing0 = 1;
}
}
if(!valid6){
const err27 = {instancePath:instancePath+"/condition",schemaPath:"#/properties/condition/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
else {
errors = _errs23;
if(vErrors !== null){
if(_errs23){
vErrors.length = _errs23;
}
else {
vErrors = null;
}
}
}
}
if(data.effects !== undefined){
let data12 = data.effects;
if(Array.isArray(data12)){
if(data12.length < 1){
const err28 = {instancePath:instancePath+"/effects",schemaPath:"#/properties/effects/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
const len1 = data12.length;
for(let i2=0; i2<len1; i2++){
let data13 = data12[i2];
if(data13 && typeof data13 == "object" && !Array.isArray(data13)){
if(data13.effect_type === undefined){
const err29 = {instancePath:instancePath+"/effects/" + i2,schemaPath:"urn:aigs:schema:v1:effect-operation/required",keyword:"required",params:{missingProperty: "effect_type"},message:"must have required property '"+"effect_type"+"'"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(data13.parameters === undefined){
const err30 = {instancePath:instancePath+"/effects/" + i2,schemaPath:"urn:aigs:schema:v1:effect-operation/required",keyword:"required",params:{missingProperty: "parameters"},message:"must have required property '"+"parameters"+"'"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
for(const key3 in data13){
if(!((key3 === "effect_type") || (key3 === "parameters"))){
const err31 = {instancePath:instancePath+"/effects/" + i2,schemaPath:"urn:aigs:schema:v1:effect-operation/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
if(data13.effect_type !== undefined){
let data14 = data13.effect_type;
if(typeof data14 === "string"){
if(!pattern7.test(data14)){
const err32 = {instancePath:instancePath+"/effects/" + i2+"/effect_type",schemaPath:"urn:aigs:schema:v1:effect-operation/properties/effect_type/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"+"\""};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
else {
const err33 = {instancePath:instancePath+"/effects/" + i2+"/effect_type",schemaPath:"urn:aigs:schema:v1:effect-operation/properties/effect_type/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
if(data13.parameters !== undefined){
let data15 = data13.parameters;
if(!(data15 && typeof data15 == "object" && !Array.isArray(data15))){
const err34 = {instancePath:instancePath+"/effects/" + i2+"/parameters",schemaPath:"urn:aigs:schema:v1:effect-operation/properties/parameters/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
}
else {
const err35 = {instancePath:instancePath+"/effects/" + i2,schemaPath:"urn:aigs:schema:v1:effect-operation/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
}
else {
const err36 = {instancePath:instancePath+"/effects",schemaPath:"#/properties/effects/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data.repeat !== undefined){
let data16 = data.repeat;
if(data16 && typeof data16 == "object" && !Array.isArray(data16)){
if(data16.mode === undefined){
const err37 = {instancePath:instancePath+"/repeat",schemaPath:"#/properties/repeat/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
if(data16.cooldown_game_seconds === undefined){
const err38 = {instancePath:instancePath+"/repeat",schemaPath:"#/properties/repeat/required",keyword:"required",params:{missingProperty: "cooldown_game_seconds"},message:"must have required property '"+"cooldown_game_seconds"+"'"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
for(const key4 in data16){
if(!(((key4 === "mode") || (key4 === "max_occurrences")) || (key4 === "cooldown_game_seconds"))){
const err39 = {instancePath:instancePath+"/repeat",schemaPath:"#/properties/repeat/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
if(data16.mode !== undefined){
let data17 = data16.mode;
if(!(((data17 === "once") || (data17 === "unlimited")) || (data17 === "limited"))){
const err40 = {instancePath:instancePath+"/repeat/mode",schemaPath:"#/properties/repeat/properties/mode/enum",keyword:"enum",params:{allowedValues: schema94.properties.repeat.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data16.max_occurrences !== undefined){
let data18 = data16.max_occurrences;
if((!(((typeof data18 == "number") && (!(data18 % 1) && !isNaN(data18))) && (isFinite(data18)))) && (data18 !== null)){
const err41 = {instancePath:instancePath+"/repeat/max_occurrences",schemaPath:"#/properties/repeat/properties/max_occurrences/type",keyword:"type",params:{type: schema94.properties.repeat.properties.max_occurrences.type},message:"must be integer,null"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
if((typeof data18 == "number") && (isFinite(data18))){
if(data18 < 1 || isNaN(data18)){
const err42 = {instancePath:instancePath+"/repeat/max_occurrences",schemaPath:"#/properties/repeat/properties/max_occurrences/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
}
if(data16.cooldown_game_seconds !== undefined){
let data19 = data16.cooldown_game_seconds;
if(!(((typeof data19 == "number") && (!(data19 % 1) && !isNaN(data19))) && (isFinite(data19)))){
const err43 = {instancePath:instancePath+"/repeat/cooldown_game_seconds",schemaPath:"#/properties/repeat/properties/cooldown_game_seconds/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
if((typeof data19 == "number") && (isFinite(data19))){
if(data19 < 0 || isNaN(data19)){
const err44 = {instancePath:instancePath+"/repeat/cooldown_game_seconds",schemaPath:"#/properties/repeat/properties/cooldown_game_seconds/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
}
}
else {
const err45 = {instancePath:instancePath+"/repeat",schemaPath:"#/properties/repeat/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
}
if(data.priority !== undefined){
let data20 = data.priority;
if(!(((typeof data20 == "number") && (!(data20 % 1) && !isNaN(data20))) && (isFinite(data20)))){
const err46 = {instancePath:instancePath+"/priority",schemaPath:"#/properties/priority/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
if((typeof data20 == "number") && (isFinite(data20))){
if(data20 > 1000 || isNaN(data20)){
const err47 = {instancePath:instancePath+"/priority",schemaPath:"#/properties/priority/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1000},message:"must be <= 1000"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
if(data20 < -1000 || isNaN(data20)){
const err48 = {instancePath:instancePath+"/priority",schemaPath:"#/properties/priority/minimum",keyword:"minimum",params:{comparison: ">=", limit: -1000},message:"must be >= -1000"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
}
}
}
else {
const err49 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
validate89.errors = vErrors;
return errors === 0;
}
validate89.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator21 = validate94;
const schema99 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:item-definition","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.item.definition"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"item"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"stacking":{"type":"object","additionalProperties":false,"properties":{"stackable":{"type":"boolean"},"max_stack":{"type":"integer","minimum":1}},"required":["stackable","max_stack"]},"affordance_refs":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:definition-ref"},"uniqueItems":true},"asset_identity_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"}},"required":["schema_id","schema_version","id","kind","display_name","stacking"]};

function validate94(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:item-definition" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate94.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.stacking === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "stacking"},message:"must have required property '"+"stacking"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema99.properties, key0))){
const err6 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.item.definition" !== data.schema_id){
const err7 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.item.definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err8 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err9 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
else {
const err10 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.kind !== undefined){
if("item" !== data.kind){
const err11 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "item"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err12 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err14 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err15 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
else {
const err16 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err17 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err18 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err19 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err20 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err21 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
}
else {
const err22 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data.stacking !== undefined){
let data10 = data.stacking;
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
if(data10.stackable === undefined){
const err23 = {instancePath:instancePath+"/stacking",schemaPath:"#/properties/stacking/required",keyword:"required",params:{missingProperty: "stackable"},message:"must have required property '"+"stackable"+"'"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
if(data10.max_stack === undefined){
const err24 = {instancePath:instancePath+"/stacking",schemaPath:"#/properties/stacking/required",keyword:"required",params:{missingProperty: "max_stack"},message:"must have required property '"+"max_stack"+"'"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
for(const key3 in data10){
if(!((key3 === "stackable") || (key3 === "max_stack"))){
const err25 = {instancePath:instancePath+"/stacking",schemaPath:"#/properties/stacking/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data10.stackable !== undefined){
if(typeof data10.stackable !== "boolean"){
const err26 = {instancePath:instancePath+"/stacking/stackable",schemaPath:"#/properties/stacking/properties/stackable/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(data10.max_stack !== undefined){
let data12 = data10.max_stack;
if(!(((typeof data12 == "number") && (!(data12 % 1) && !isNaN(data12))) && (isFinite(data12)))){
const err27 = {instancePath:instancePath+"/stacking/max_stack",schemaPath:"#/properties/stacking/properties/max_stack/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if((typeof data12 == "number") && (isFinite(data12))){
if(data12 < 1 || isNaN(data12)){
const err28 = {instancePath:instancePath+"/stacking/max_stack",schemaPath:"#/properties/stacking/properties/max_stack/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
}
}
else {
const err29 = {instancePath:instancePath+"/stacking",schemaPath:"#/properties/stacking/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(data.affordance_refs !== undefined){
let data13 = data.affordance_refs;
if(Array.isArray(data13)){
const len1 = data13.length;
for(let i2=0; i2<len1; i2++){
let data14 = data13[i2];
if(data14 && typeof data14 == "object" && !Array.isArray(data14)){
if(data14.ref === undefined){
const err30 = {instancePath:instancePath+"/affordance_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
for(const key4 in data14){
if(!(key4 === "ref")){
const err31 = {instancePath:instancePath+"/affordance_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
if(data14.ref !== undefined){
let data15 = data14.ref;
if(typeof data15 === "string"){
if(!pattern4.test(data15)){
const err32 = {instancePath:instancePath+"/affordance_refs/" + i2+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
else {
const err33 = {instancePath:instancePath+"/affordance_refs/" + i2+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
}
else {
const err34 = {instancePath:instancePath+"/affordance_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
let i3 = data13.length;
let j1;
if(i3 > 1){
outer0:
for(;i3--;){
for(j1 = i3; j1--;){
if(func0(data13[i3], data13[j1])){
const err35 = {instancePath:instancePath+"/affordance_refs",schemaPath:"#/properties/affordance_refs/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
break outer0;
}
}
}
}
}
else {
const err36 = {instancePath:instancePath+"/affordance_refs",schemaPath:"#/properties/affordance_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data.asset_identity_ref !== undefined){
let data16 = data.asset_identity_ref;
if(data16 && typeof data16 == "object" && !Array.isArray(data16)){
if(data16.ref === undefined){
const err37 = {instancePath:instancePath+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
for(const key5 in data16){
if(!(key5 === "ref")){
const err38 = {instancePath:instancePath+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
if(data16.ref !== undefined){
let data17 = data16.ref;
if(typeof data17 === "string"){
if(!pattern4.test(data17)){
const err39 = {instancePath:instancePath+"/asset_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
else {
const err40 = {instancePath:instancePath+"/asset_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
}
else {
const err41 = {instancePath:instancePath+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
}
else {
const err42 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
validate94.errors = vErrors;
return errors === 0;
}
validate94.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator22 = validate95;
const schema102 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:knowledge-view","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.knowledge.view"},"schema_version":{"const":1},"owner_instance_id":{"type":"string","format":"uuid"},"generated_game_time":{"type":"integer","minimum":0},"entries":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"classification":{"enum":["known","believed","suspected","remembered","reported_by_other"]},"fact":{"$ref":"urn:aigs:schema:v1:fact"},"confidence":{"type":"number","minimum":0,"maximum":1},"source_refs":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"type":{"enum":["perception","memory","report","inference","system"]},"id":{"type":"string","minLength":1}},"required":["type","id"]}}},"required":["classification","fact","confidence","source_refs"]}}},"required":["schema_id","schema_version","owner_instance_id","generated_game_time","entries"]};

function validate95(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:knowledge-view" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate95.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.owner_instance_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "owner_instance_id"},message:"must have required property '"+"owner_instance_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.generated_game_time === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "generated_game_time"},message:"must have required property '"+"generated_game_time"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.entries === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "entries"},message:"must have required property '"+"entries"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
for(const key0 in data){
if(!(((((key0 === "schema_id") || (key0 === "schema_version")) || (key0 === "owner_instance_id")) || (key0 === "generated_game_time")) || (key0 === "entries"))){
const err5 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.knowledge.view" !== data.schema_id){
const err6 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.knowledge.view"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err7 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.owner_instance_id !== undefined){
let data2 = data.owner_instance_id;
if(typeof data2 === "string"){
if(!(formats0.test(data2))){
const err8 = {instancePath:instancePath+"/owner_instance_id",schemaPath:"#/properties/owner_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/owner_instance_id",schemaPath:"#/properties/owner_instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.generated_game_time !== undefined){
let data3 = data.generated_game_time;
if(!(((typeof data3 == "number") && (!(data3 % 1) && !isNaN(data3))) && (isFinite(data3)))){
const err10 = {instancePath:instancePath+"/generated_game_time",schemaPath:"#/properties/generated_game_time/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if((typeof data3 == "number") && (isFinite(data3))){
if(data3 < 0 || isNaN(data3)){
const err11 = {instancePath:instancePath+"/generated_game_time",schemaPath:"#/properties/generated_game_time/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
}
if(data.entries !== undefined){
let data4 = data.entries;
if(Array.isArray(data4)){
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
let data5 = data4[i0];
if(data5 && typeof data5 == "object" && !Array.isArray(data5)){
if(data5.classification === undefined){
const err12 = {instancePath:instancePath+"/entries/" + i0,schemaPath:"#/properties/entries/items/required",keyword:"required",params:{missingProperty: "classification"},message:"must have required property '"+"classification"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(data5.fact === undefined){
const err13 = {instancePath:instancePath+"/entries/" + i0,schemaPath:"#/properties/entries/items/required",keyword:"required",params:{missingProperty: "fact"},message:"must have required property '"+"fact"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(data5.confidence === undefined){
const err14 = {instancePath:instancePath+"/entries/" + i0,schemaPath:"#/properties/entries/items/required",keyword:"required",params:{missingProperty: "confidence"},message:"must have required property '"+"confidence"+"'"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if(data5.source_refs === undefined){
const err15 = {instancePath:instancePath+"/entries/" + i0,schemaPath:"#/properties/entries/items/required",keyword:"required",params:{missingProperty: "source_refs"},message:"must have required property '"+"source_refs"+"'"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
for(const key1 in data5){
if(!((((key1 === "classification") || (key1 === "fact")) || (key1 === "confidence")) || (key1 === "source_refs"))){
const err16 = {instancePath:instancePath+"/entries/" + i0,schemaPath:"#/properties/entries/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data5.classification !== undefined){
let data6 = data5.classification;
if(!(((((data6 === "known") || (data6 === "believed")) || (data6 === "suspected")) || (data6 === "remembered")) || (data6 === "reported_by_other"))){
const err17 = {instancePath:instancePath+"/entries/" + i0+"/classification",schemaPath:"#/properties/entries/items/properties/classification/enum",keyword:"enum",params:{allowedValues: schema102.properties.entries.items.properties.classification.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data5.fact !== undefined){
if(!(validate79(data5.fact, {instancePath:instancePath+"/entries/" + i0+"/fact",parentData:data5,parentDataProperty:"fact",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate79.errors : vErrors.concat(validate79.errors);
errors = vErrors.length;
}
}
if(data5.confidence !== undefined){
let data8 = data5.confidence;
if((typeof data8 == "number") && (isFinite(data8))){
if(data8 > 1 || isNaN(data8)){
const err18 = {instancePath:instancePath+"/entries/" + i0+"/confidence",schemaPath:"#/properties/entries/items/properties/confidence/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(data8 < 0 || isNaN(data8)){
const err19 = {instancePath:instancePath+"/entries/" + i0+"/confidence",schemaPath:"#/properties/entries/items/properties/confidence/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
else {
const err20 = {instancePath:instancePath+"/entries/" + i0+"/confidence",schemaPath:"#/properties/entries/items/properties/confidence/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
if(data5.source_refs !== undefined){
let data9 = data5.source_refs;
if(Array.isArray(data9)){
const len1 = data9.length;
for(let i1=0; i1<len1; i1++){
let data10 = data9[i1];
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
if(data10.type === undefined){
const err21 = {instancePath:instancePath+"/entries/" + i0+"/source_refs/" + i1,schemaPath:"#/properties/entries/items/properties/source_refs/items/required",keyword:"required",params:{missingProperty: "type"},message:"must have required property '"+"type"+"'"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if(data10.id === undefined){
const err22 = {instancePath:instancePath+"/entries/" + i0+"/source_refs/" + i1,schemaPath:"#/properties/entries/items/properties/source_refs/items/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
for(const key2 in data10){
if(!((key2 === "type") || (key2 === "id"))){
const err23 = {instancePath:instancePath+"/entries/" + i0+"/source_refs/" + i1,schemaPath:"#/properties/entries/items/properties/source_refs/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data10.type !== undefined){
let data11 = data10.type;
if(!(((((data11 === "perception") || (data11 === "memory")) || (data11 === "report")) || (data11 === "inference")) || (data11 === "system"))){
const err24 = {instancePath:instancePath+"/entries/" + i0+"/source_refs/" + i1+"/type",schemaPath:"#/properties/entries/items/properties/source_refs/items/properties/type/enum",keyword:"enum",params:{allowedValues: schema102.properties.entries.items.properties.source_refs.items.properties.type.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data10.id !== undefined){
let data12 = data10.id;
if(typeof data12 === "string"){
if(func2(data12) < 1){
const err25 = {instancePath:instancePath+"/entries/" + i0+"/source_refs/" + i1+"/id",schemaPath:"#/properties/entries/items/properties/source_refs/items/properties/id/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
else {
const err26 = {instancePath:instancePath+"/entries/" + i0+"/source_refs/" + i1+"/id",schemaPath:"#/properties/entries/items/properties/source_refs/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
}
else {
const err27 = {instancePath:instancePath+"/entries/" + i0+"/source_refs/" + i1,schemaPath:"#/properties/entries/items/properties/source_refs/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
}
else {
const err28 = {instancePath:instancePath+"/entries/" + i0+"/source_refs",schemaPath:"#/properties/entries/items/properties/source_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
}
else {
const err29 = {instancePath:instancePath+"/entries/" + i0,schemaPath:"#/properties/entries/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
}
else {
const err30 = {instancePath:instancePath+"/entries",schemaPath:"#/properties/entries/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
}
else {
const err31 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
validate95.errors = vErrors;
return errors === 0;
}
validate95.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator23 = validate97;
const schema103 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:location-definition","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.location.definition"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"location"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"child_location_refs":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:definition-ref"},"uniqueItems":true},"visual_identity_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"component_config_refs":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:definition-ref"},"uniqueItems":true}},"required":["schema_id","schema_version","id","kind","display_name"]};

function validate97(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:location-definition" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate97.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema103.properties, key0))){
const err5 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.location.definition" !== data.schema_id){
const err6 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.location.definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err7 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err8 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.kind !== undefined){
if("location" !== data.kind){
const err10 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "location"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err11 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err13 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err14 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err16 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err17 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err18 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err19 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err20 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
}
else {
const err21 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.child_location_refs !== undefined){
let data10 = data.child_location_refs;
if(Array.isArray(data10)){
const len1 = data10.length;
for(let i2=0; i2<len1; i2++){
let data11 = data10[i2];
if(data11 && typeof data11 == "object" && !Array.isArray(data11)){
if(data11.ref === undefined){
const err22 = {instancePath:instancePath+"/child_location_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
for(const key3 in data11){
if(!(key3 === "ref")){
const err23 = {instancePath:instancePath+"/child_location_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data11.ref !== undefined){
let data12 = data11.ref;
if(typeof data12 === "string"){
if(!pattern4.test(data12)){
const err24 = {instancePath:instancePath+"/child_location_refs/" + i2+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
else {
const err25 = {instancePath:instancePath+"/child_location_refs/" + i2+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
}
else {
const err26 = {instancePath:instancePath+"/child_location_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
let i3 = data10.length;
let j1;
if(i3 > 1){
outer0:
for(;i3--;){
for(j1 = i3; j1--;){
if(func0(data10[i3], data10[j1])){
const err27 = {instancePath:instancePath+"/child_location_refs",schemaPath:"#/properties/child_location_refs/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
break outer0;
}
}
}
}
}
else {
const err28 = {instancePath:instancePath+"/child_location_refs",schemaPath:"#/properties/child_location_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data.visual_identity_ref !== undefined){
let data13 = data.visual_identity_ref;
if(data13 && typeof data13 == "object" && !Array.isArray(data13)){
if(data13.ref === undefined){
const err29 = {instancePath:instancePath+"/visual_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
for(const key4 in data13){
if(!(key4 === "ref")){
const err30 = {instancePath:instancePath+"/visual_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data13.ref !== undefined){
let data14 = data13.ref;
if(typeof data14 === "string"){
if(!pattern4.test(data14)){
const err31 = {instancePath:instancePath+"/visual_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
else {
const err32 = {instancePath:instancePath+"/visual_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
}
else {
const err33 = {instancePath:instancePath+"/visual_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
if(data.component_config_refs !== undefined){
let data15 = data.component_config_refs;
if(Array.isArray(data15)){
const len2 = data15.length;
for(let i4=0; i4<len2; i4++){
let data16 = data15[i4];
if(data16 && typeof data16 == "object" && !Array.isArray(data16)){
if(data16.ref === undefined){
const err34 = {instancePath:instancePath+"/component_config_refs/" + i4,schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
for(const key5 in data16){
if(!(key5 === "ref")){
const err35 = {instancePath:instancePath+"/component_config_refs/" + i4,schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
if(data16.ref !== undefined){
let data17 = data16.ref;
if(typeof data17 === "string"){
if(!pattern4.test(data17)){
const err36 = {instancePath:instancePath+"/component_config_refs/" + i4+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
else {
const err37 = {instancePath:instancePath+"/component_config_refs/" + i4+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
}
else {
const err38 = {instancePath:instancePath+"/component_config_refs/" + i4,schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
let i5 = data15.length;
let j2;
if(i5 > 1){
outer1:
for(;i5--;){
for(j2 = i5; j2--;){
if(func0(data15[i5], data15[j2])){
const err39 = {instancePath:instancePath+"/component_config_refs",schemaPath:"#/properties/component_config_refs/uniqueItems",keyword:"uniqueItems",params:{i: i5, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i5+" are identical)"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
break outer1;
}
}
}
}
}
else {
const err40 = {instancePath:instancePath+"/component_config_refs",schemaPath:"#/properties/component_config_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
}
else {
const err41 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
validate97.errors = vErrors;
return errors === 0;
}
validate97.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator24 = validate98;
const schema107 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:memory-record","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.memory.record"},"schema_version":{"const":1},"memory_id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"owner_instance_id":{"type":"string","format":"uuid"},"memory_type":{"enum":["episodic","semantic","reported","procedural_hint"]},"summary":{"type":"string","minLength":1},"participants":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:runtime-instance-ref"},"uniqueItems":true},"source_event_ids":{"type":"array","items":{"type":"string","format":"uuid"},"uniqueItems":true},"learned_facts":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:fact"}},"salience":{"type":"number","minimum":0,"maximum":1},"affect":{"type":"object","additionalProperties":false,"properties":{"valence":{"type":"number","minimum":-1,"maximum":1},"arousal":{"type":"number","minimum":0,"maximum":1}},"required":["valence","arousal"]},"created_game_time":{"type":"integer","minimum":0},"retention":{"type":"object","additionalProperties":false,"properties":{"policy":{"enum":["short","normal","long","permanent"]}},"required":["policy"]}},"required":["schema_id","schema_version","memory_id","owner_instance_id","memory_type","summary","participants","source_event_ids","learned_facts","salience","affect","created_game_time","retention"]};
const schema108 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:runtime-instance-ref","type":"object","additionalProperties":false,"properties":{"instance_id":{"type":"string","format":"uuid"}},"required":["instance_id"]};

function validate98(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:memory-record" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate98.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.memory_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "memory_id"},message:"must have required property '"+"memory_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.owner_instance_id === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "owner_instance_id"},message:"must have required property '"+"owner_instance_id"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.memory_type === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "memory_type"},message:"must have required property '"+"memory_type"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.summary === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "summary"},message:"must have required property '"+"summary"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.participants === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "participants"},message:"must have required property '"+"participants"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.source_event_ids === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "source_event_ids"},message:"must have required property '"+"source_event_ids"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.learned_facts === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "learned_facts"},message:"must have required property '"+"learned_facts"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data.salience === undefined){
const err9 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "salience"},message:"must have required property '"+"salience"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data.affect === undefined){
const err10 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "affect"},message:"must have required property '"+"affect"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(data.created_game_time === undefined){
const err11 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "created_game_time"},message:"must have required property '"+"created_game_time"+"'"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data.retention === undefined){
const err12 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "retention"},message:"must have required property '"+"retention"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema107.properties, key0))){
const err13 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.memory.record" !== data.schema_id){
const err14 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.memory.record"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err15 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.memory_id !== undefined){
let data2 = data.memory_id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err16 = {instancePath:instancePath+"/memory_id",schemaPath:"#/properties/memory_id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/memory_id",schemaPath:"#/properties/memory_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.owner_instance_id !== undefined){
let data3 = data.owner_instance_id;
if(typeof data3 === "string"){
if(!(formats0.test(data3))){
const err18 = {instancePath:instancePath+"/owner_instance_id",schemaPath:"#/properties/owner_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
else {
const err19 = {instancePath:instancePath+"/owner_instance_id",schemaPath:"#/properties/owner_instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.memory_type !== undefined){
let data4 = data.memory_type;
if(!((((data4 === "episodic") || (data4 === "semantic")) || (data4 === "reported")) || (data4 === "procedural_hint"))){
const err20 = {instancePath:instancePath+"/memory_type",schemaPath:"#/properties/memory_type/enum",keyword:"enum",params:{allowedValues: schema107.properties.memory_type.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
if(data.summary !== undefined){
let data5 = data.summary;
if(typeof data5 === "string"){
if(func2(data5) < 1){
const err21 = {instancePath:instancePath+"/summary",schemaPath:"#/properties/summary/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
else {
const err22 = {instancePath:instancePath+"/summary",schemaPath:"#/properties/summary/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data.participants !== undefined){
let data6 = data.participants;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(data7 && typeof data7 == "object" && !Array.isArray(data7)){
if(data7.instance_id === undefined){
const err23 = {instancePath:instancePath+"/participants/" + i0,schemaPath:"urn:aigs:schema:v1:runtime-instance-ref/required",keyword:"required",params:{missingProperty: "instance_id"},message:"must have required property '"+"instance_id"+"'"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
for(const key1 in data7){
if(!(key1 === "instance_id")){
const err24 = {instancePath:instancePath+"/participants/" + i0,schemaPath:"urn:aigs:schema:v1:runtime-instance-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data7.instance_id !== undefined){
let data8 = data7.instance_id;
if(typeof data8 === "string"){
if(!(formats0.test(data8))){
const err25 = {instancePath:instancePath+"/participants/" + i0+"/instance_id",schemaPath:"urn:aigs:schema:v1:runtime-instance-ref/properties/instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
else {
const err26 = {instancePath:instancePath+"/participants/" + i0+"/instance_id",schemaPath:"urn:aigs:schema:v1:runtime-instance-ref/properties/instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
}
else {
const err27 = {instancePath:instancePath+"/participants/" + i0,schemaPath:"urn:aigs:schema:v1:runtime-instance-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
outer0:
for(;i1--;){
for(j0 = i1; j0--;){
if(func0(data6[i1], data6[j0])){
const err28 = {instancePath:instancePath+"/participants",schemaPath:"#/properties/participants/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
break outer0;
}
}
}
}
}
else {
const err29 = {instancePath:instancePath+"/participants",schemaPath:"#/properties/participants/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(data.source_event_ids !== undefined){
let data9 = data.source_event_ids;
if(Array.isArray(data9)){
const len1 = data9.length;
for(let i2=0; i2<len1; i2++){
let data10 = data9[i2];
if(typeof data10 === "string"){
if(!(formats0.test(data10))){
const err30 = {instancePath:instancePath+"/source_event_ids/" + i2,schemaPath:"#/properties/source_event_ids/items/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
else {
const err31 = {instancePath:instancePath+"/source_event_ids/" + i2,schemaPath:"#/properties/source_event_ids/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
let i3 = data9.length;
let j1;
if(i3 > 1){
const indices0 = {};
for(;i3--;){
let item0 = data9[i3];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j1 = indices0[item0];
const err32 = {instancePath:instancePath+"/source_event_ids",schemaPath:"#/properties/source_event_ids/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
break;
}
indices0[item0] = i3;
}
}
}
else {
const err33 = {instancePath:instancePath+"/source_event_ids",schemaPath:"#/properties/source_event_ids/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
if(data.learned_facts !== undefined){
let data11 = data.learned_facts;
if(Array.isArray(data11)){
const len2 = data11.length;
for(let i4=0; i4<len2; i4++){
if(!(validate79(data11[i4], {instancePath:instancePath+"/learned_facts/" + i4,parentData:data11,parentDataProperty:i4,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate79.errors : vErrors.concat(validate79.errors);
errors = vErrors.length;
}
}
}
else {
const err34 = {instancePath:instancePath+"/learned_facts",schemaPath:"#/properties/learned_facts/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data.salience !== undefined){
let data13 = data.salience;
if((typeof data13 == "number") && (isFinite(data13))){
if(data13 > 1 || isNaN(data13)){
const err35 = {instancePath:instancePath+"/salience",schemaPath:"#/properties/salience/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
if(data13 < 0 || isNaN(data13)){
const err36 = {instancePath:instancePath+"/salience",schemaPath:"#/properties/salience/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
else {
const err37 = {instancePath:instancePath+"/salience",schemaPath:"#/properties/salience/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data.affect !== undefined){
let data14 = data.affect;
if(data14 && typeof data14 == "object" && !Array.isArray(data14)){
if(data14.valence === undefined){
const err38 = {instancePath:instancePath+"/affect",schemaPath:"#/properties/affect/required",keyword:"required",params:{missingProperty: "valence"},message:"must have required property '"+"valence"+"'"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
if(data14.arousal === undefined){
const err39 = {instancePath:instancePath+"/affect",schemaPath:"#/properties/affect/required",keyword:"required",params:{missingProperty: "arousal"},message:"must have required property '"+"arousal"+"'"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
for(const key2 in data14){
if(!((key2 === "valence") || (key2 === "arousal"))){
const err40 = {instancePath:instancePath+"/affect",schemaPath:"#/properties/affect/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data14.valence !== undefined){
let data15 = data14.valence;
if((typeof data15 == "number") && (isFinite(data15))){
if(data15 > 1 || isNaN(data15)){
const err41 = {instancePath:instancePath+"/affect/valence",schemaPath:"#/properties/affect/properties/valence/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
if(data15 < -1 || isNaN(data15)){
const err42 = {instancePath:instancePath+"/affect/valence",schemaPath:"#/properties/affect/properties/valence/minimum",keyword:"minimum",params:{comparison: ">=", limit: -1},message:"must be >= -1"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
else {
const err43 = {instancePath:instancePath+"/affect/valence",schemaPath:"#/properties/affect/properties/valence/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
if(data14.arousal !== undefined){
let data16 = data14.arousal;
if((typeof data16 == "number") && (isFinite(data16))){
if(data16 > 1 || isNaN(data16)){
const err44 = {instancePath:instancePath+"/affect/arousal",schemaPath:"#/properties/affect/properties/arousal/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
if(data16 < 0 || isNaN(data16)){
const err45 = {instancePath:instancePath+"/affect/arousal",schemaPath:"#/properties/affect/properties/arousal/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
}
else {
const err46 = {instancePath:instancePath+"/affect/arousal",schemaPath:"#/properties/affect/properties/arousal/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
}
}
else {
const err47 = {instancePath:instancePath+"/affect",schemaPath:"#/properties/affect/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
if(data.created_game_time !== undefined){
let data17 = data.created_game_time;
if(!(((typeof data17 == "number") && (!(data17 % 1) && !isNaN(data17))) && (isFinite(data17)))){
const err48 = {instancePath:instancePath+"/created_game_time",schemaPath:"#/properties/created_game_time/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
if((typeof data17 == "number") && (isFinite(data17))){
if(data17 < 0 || isNaN(data17)){
const err49 = {instancePath:instancePath+"/created_game_time",schemaPath:"#/properties/created_game_time/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
}
}
if(data.retention !== undefined){
let data18 = data.retention;
if(data18 && typeof data18 == "object" && !Array.isArray(data18)){
if(data18.policy === undefined){
const err50 = {instancePath:instancePath+"/retention",schemaPath:"#/properties/retention/required",keyword:"required",params:{missingProperty: "policy"},message:"must have required property '"+"policy"+"'"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
for(const key3 in data18){
if(!(key3 === "policy")){
const err51 = {instancePath:instancePath+"/retention",schemaPath:"#/properties/retention/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
}
if(data18.policy !== undefined){
let data19 = data18.policy;
if(!((((data19 === "short") || (data19 === "normal")) || (data19 === "long")) || (data19 === "permanent"))){
const err52 = {instancePath:instancePath+"/retention/policy",schemaPath:"#/properties/retention/properties/policy/enum",keyword:"enum",params:{allowedValues: schema107.properties.retention.properties.policy.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
}
}
else {
const err53 = {instancePath:instancePath+"/retention",schemaPath:"#/properties/retention/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
}
}
else {
const err54 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
validate98.errors = vErrors;
return errors === 0;
}
validate98.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator25 = validate100;
const schema109 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:object-definition","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.object.definition"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"object"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"affordance_refs":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:definition-ref"},"uniqueItems":true},"component_config_refs":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:definition-ref"},"uniqueItems":true},"asset_identity_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"portable":{"type":"boolean"}},"required":["schema_id","schema_version","id","kind","display_name"]};

function validate100(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:object-definition" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate100.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema109.properties, key0))){
const err5 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.object.definition" !== data.schema_id){
const err6 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.object.definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err7 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err8 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.kind !== undefined){
if("object" !== data.kind){
const err10 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "object"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err11 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err13 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err14 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err16 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err17 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err18 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err19 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err20 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
}
else {
const err21 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.affordance_refs !== undefined){
let data10 = data.affordance_refs;
if(Array.isArray(data10)){
const len1 = data10.length;
for(let i2=0; i2<len1; i2++){
let data11 = data10[i2];
if(data11 && typeof data11 == "object" && !Array.isArray(data11)){
if(data11.ref === undefined){
const err22 = {instancePath:instancePath+"/affordance_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
for(const key3 in data11){
if(!(key3 === "ref")){
const err23 = {instancePath:instancePath+"/affordance_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data11.ref !== undefined){
let data12 = data11.ref;
if(typeof data12 === "string"){
if(!pattern4.test(data12)){
const err24 = {instancePath:instancePath+"/affordance_refs/" + i2+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
else {
const err25 = {instancePath:instancePath+"/affordance_refs/" + i2+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
}
else {
const err26 = {instancePath:instancePath+"/affordance_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
let i3 = data10.length;
let j1;
if(i3 > 1){
outer0:
for(;i3--;){
for(j1 = i3; j1--;){
if(func0(data10[i3], data10[j1])){
const err27 = {instancePath:instancePath+"/affordance_refs",schemaPath:"#/properties/affordance_refs/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
break outer0;
}
}
}
}
}
else {
const err28 = {instancePath:instancePath+"/affordance_refs",schemaPath:"#/properties/affordance_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data.component_config_refs !== undefined){
let data13 = data.component_config_refs;
if(Array.isArray(data13)){
const len2 = data13.length;
for(let i4=0; i4<len2; i4++){
let data14 = data13[i4];
if(data14 && typeof data14 == "object" && !Array.isArray(data14)){
if(data14.ref === undefined){
const err29 = {instancePath:instancePath+"/component_config_refs/" + i4,schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
for(const key4 in data14){
if(!(key4 === "ref")){
const err30 = {instancePath:instancePath+"/component_config_refs/" + i4,schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data14.ref !== undefined){
let data15 = data14.ref;
if(typeof data15 === "string"){
if(!pattern4.test(data15)){
const err31 = {instancePath:instancePath+"/component_config_refs/" + i4+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
else {
const err32 = {instancePath:instancePath+"/component_config_refs/" + i4+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
}
else {
const err33 = {instancePath:instancePath+"/component_config_refs/" + i4,schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
let i5 = data13.length;
let j2;
if(i5 > 1){
outer1:
for(;i5--;){
for(j2 = i5; j2--;){
if(func0(data13[i5], data13[j2])){
const err34 = {instancePath:instancePath+"/component_config_refs",schemaPath:"#/properties/component_config_refs/uniqueItems",keyword:"uniqueItems",params:{i: i5, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i5+" are identical)"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
break outer1;
}
}
}
}
}
else {
const err35 = {instancePath:instancePath+"/component_config_refs",schemaPath:"#/properties/component_config_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
if(data.asset_identity_ref !== undefined){
let data16 = data.asset_identity_ref;
if(data16 && typeof data16 == "object" && !Array.isArray(data16)){
if(data16.ref === undefined){
const err36 = {instancePath:instancePath+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
for(const key5 in data16){
if(!(key5 === "ref")){
const err37 = {instancePath:instancePath+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data16.ref !== undefined){
let data17 = data16.ref;
if(typeof data17 === "string"){
if(!pattern4.test(data17)){
const err38 = {instancePath:instancePath+"/asset_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
else {
const err39 = {instancePath:instancePath+"/asset_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
}
else {
const err40 = {instancePath:instancePath+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data.portable !== undefined){
if(typeof data.portable !== "boolean"){
const err41 = {instancePath:instancePath+"/portable",schemaPath:"#/properties/portable/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
}
else {
const err42 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
validate100.errors = vErrors;
return errors === 0;
}
validate100.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator26 = validate101;
const schema113 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:perception-record","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.perception.record"},"schema_version":{"const":1},"perception_id":{"type":"string","format":"uuid"},"observer_instance_id":{"type":"string","format":"uuid"},"source_event_id":{"type":["string","null"],"format":"uuid"},"channel":{"enum":["vision","hearing","touch","smell","system","reported"]},"facts":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:fact"},"minItems":1},"confidence":{"type":"number","minimum":0,"maximum":1},"game_time":{"type":"integer","minimum":0}},"required":["schema_id","schema_version","perception_id","observer_instance_id","source_event_id","channel","facts","confidence","game_time"]};

function validate101(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:perception-record" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate101.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.perception_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "perception_id"},message:"must have required property '"+"perception_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.observer_instance_id === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "observer_instance_id"},message:"must have required property '"+"observer_instance_id"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.source_event_id === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "source_event_id"},message:"must have required property '"+"source_event_id"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.channel === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "channel"},message:"must have required property '"+"channel"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.facts === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "facts"},message:"must have required property '"+"facts"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.confidence === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "confidence"},message:"must have required property '"+"confidence"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.game_time === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "game_time"},message:"must have required property '"+"game_time"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema113.properties, key0))){
const err9 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.perception.record" !== data.schema_id){
const err10 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.perception.record"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err11 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.perception_id !== undefined){
let data2 = data.perception_id;
if(typeof data2 === "string"){
if(!(formats0.test(data2))){
const err12 = {instancePath:instancePath+"/perception_id",schemaPath:"#/properties/perception_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/perception_id",schemaPath:"#/properties/perception_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.observer_instance_id !== undefined){
let data3 = data.observer_instance_id;
if(typeof data3 === "string"){
if(!(formats0.test(data3))){
const err14 = {instancePath:instancePath+"/observer_instance_id",schemaPath:"#/properties/observer_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/observer_instance_id",schemaPath:"#/properties/observer_instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.source_event_id !== undefined){
let data4 = data.source_event_id;
if((typeof data4 !== "string") && (data4 !== null)){
const err16 = {instancePath:instancePath+"/source_event_id",schemaPath:"#/properties/source_event_id/type",keyword:"type",params:{type: schema113.properties.source_event_id.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(typeof data4 === "string"){
if(!(formats0.test(data4))){
const err17 = {instancePath:instancePath+"/source_event_id",schemaPath:"#/properties/source_event_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
}
if(data.channel !== undefined){
let data5 = data.channel;
if(!((((((data5 === "vision") || (data5 === "hearing")) || (data5 === "touch")) || (data5 === "smell")) || (data5 === "system")) || (data5 === "reported"))){
const err18 = {instancePath:instancePath+"/channel",schemaPath:"#/properties/channel/enum",keyword:"enum",params:{allowedValues: schema113.properties.channel.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.facts !== undefined){
let data6 = data.facts;
if(Array.isArray(data6)){
if(data6.length < 1){
const err19 = {instancePath:instancePath+"/facts",schemaPath:"#/properties/facts/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
if(!(validate79(data6[i0], {instancePath:instancePath+"/facts/" + i0,parentData:data6,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate79.errors : vErrors.concat(validate79.errors);
errors = vErrors.length;
}
}
}
else {
const err20 = {instancePath:instancePath+"/facts",schemaPath:"#/properties/facts/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
if(data.confidence !== undefined){
let data8 = data.confidence;
if((typeof data8 == "number") && (isFinite(data8))){
if(data8 > 1 || isNaN(data8)){
const err21 = {instancePath:instancePath+"/confidence",schemaPath:"#/properties/confidence/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if(data8 < 0 || isNaN(data8)){
const err22 = {instancePath:instancePath+"/confidence",schemaPath:"#/properties/confidence/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
else {
const err23 = {instancePath:instancePath+"/confidence",schemaPath:"#/properties/confidence/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data.game_time !== undefined){
let data9 = data.game_time;
if(!(((typeof data9 == "number") && (!(data9 % 1) && !isNaN(data9))) && (isFinite(data9)))){
const err24 = {instancePath:instancePath+"/game_time",schemaPath:"#/properties/game_time/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if((typeof data9 == "number") && (isFinite(data9))){
if(data9 < 0 || isNaN(data9)){
const err25 = {instancePath:instancePath+"/game_time",schemaPath:"#/properties/game_time/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
}
}
else {
const err26 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
validate101.errors = vErrors;
return errors === 0;
}
validate101.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator27 = validate103;
const schema114 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:project-manifest","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.project.manifest"},"schema_version":{"const":1},"project_id":{"type":"string","pattern":"^project\\.[a-z0-9][a-z0-9_-]*$"},"display_name":{"type":"string","minLength":1},"project_format_version":{"type":"integer","minimum":1},"definition_roots":{"type":"array","items":{"type":"string","minLength":1},"minItems":1,"uniqueItems":true},"asset_catalog_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"default_ai_profiles":{"type":"object","additionalProperties":false,"properties":{"creator_copilot":{"$ref":"urn:aigs:schema:v1:definition-ref"},"npc_planner":{"$ref":"urn:aigs:schema:v1:definition-ref"},"npc_dialogue":{"$ref":"urn:aigs:schema:v1:definition-ref"}}},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}}},"required":["schema_id","schema_version","project_id","display_name","project_format_version","definition_roots"]};
const pattern129 = new RegExp("^project\\.[a-z0-9][a-z0-9_-]*$", "u");

function validate103(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:project-manifest" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate103.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.project_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "project_id"},message:"must have required property '"+"project_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.display_name === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.project_format_version === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "project_format_version"},message:"must have required property '"+"project_format_version"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.definition_roots === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "definition_roots"},message:"must have required property '"+"definition_roots"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema114.properties, key0))){
const err6 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.project.manifest" !== data.schema_id){
const err7 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.project.manifest"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err8 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.project_id !== undefined){
let data2 = data.project_id;
if(typeof data2 === "string"){
if(!pattern129.test(data2)){
const err9 = {instancePath:instancePath+"/project_id",schemaPath:"#/properties/project_id/pattern",keyword:"pattern",params:{pattern: "^project\\.[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^project\\.[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
else {
const err10 = {instancePath:instancePath+"/project_id",schemaPath:"#/properties/project_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.display_name !== undefined){
let data3 = data.display_name;
if(typeof data3 === "string"){
if(func2(data3) < 1){
const err11 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.project_format_version !== undefined){
let data4 = data.project_format_version;
if(!(((typeof data4 == "number") && (!(data4 % 1) && !isNaN(data4))) && (isFinite(data4)))){
const err13 = {instancePath:instancePath+"/project_format_version",schemaPath:"#/properties/project_format_version/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if((typeof data4 == "number") && (isFinite(data4))){
if(data4 < 1 || isNaN(data4)){
const err14 = {instancePath:instancePath+"/project_format_version",schemaPath:"#/properties/project_format_version/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
}
if(data.definition_roots !== undefined){
let data5 = data.definition_roots;
if(Array.isArray(data5)){
if(data5.length < 1){
const err15 = {instancePath:instancePath+"/definition_roots",schemaPath:"#/properties/definition_roots/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
const len0 = data5.length;
for(let i0=0; i0<len0; i0++){
let data6 = data5[i0];
if(typeof data6 === "string"){
if(func2(data6) < 1){
const err16 = {instancePath:instancePath+"/definition_roots/" + i0,schemaPath:"#/properties/definition_roots/items/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/definition_roots/" + i0,schemaPath:"#/properties/definition_roots/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
let i1 = data5.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data5[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err18 = {instancePath:instancePath+"/definition_roots",schemaPath:"#/properties/definition_roots/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err19 = {instancePath:instancePath+"/definition_roots",schemaPath:"#/properties/definition_roots/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.asset_catalog_ref !== undefined){
let data7 = data.asset_catalog_ref;
if(data7 && typeof data7 == "object" && !Array.isArray(data7)){
if(data7.ref === undefined){
const err20 = {instancePath:instancePath+"/asset_catalog_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
for(const key1 in data7){
if(!(key1 === "ref")){
const err21 = {instancePath:instancePath+"/asset_catalog_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data7.ref !== undefined){
let data8 = data7.ref;
if(typeof data8 === "string"){
if(!pattern4.test(data8)){
const err22 = {instancePath:instancePath+"/asset_catalog_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
else {
const err23 = {instancePath:instancePath+"/asset_catalog_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
}
else {
const err24 = {instancePath:instancePath+"/asset_catalog_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data.default_ai_profiles !== undefined){
let data9 = data.default_ai_profiles;
if(data9 && typeof data9 == "object" && !Array.isArray(data9)){
for(const key2 in data9){
if(!(((key2 === "creator_copilot") || (key2 === "npc_planner")) || (key2 === "npc_dialogue"))){
const err25 = {instancePath:instancePath+"/default_ai_profiles",schemaPath:"#/properties/default_ai_profiles/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data9.creator_copilot !== undefined){
let data10 = data9.creator_copilot;
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
if(data10.ref === undefined){
const err26 = {instancePath:instancePath+"/default_ai_profiles/creator_copilot",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
for(const key3 in data10){
if(!(key3 === "ref")){
const err27 = {instancePath:instancePath+"/default_ai_profiles/creator_copilot",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data10.ref !== undefined){
let data11 = data10.ref;
if(typeof data11 === "string"){
if(!pattern4.test(data11)){
const err28 = {instancePath:instancePath+"/default_ai_profiles/creator_copilot/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
else {
const err29 = {instancePath:instancePath+"/default_ai_profiles/creator_copilot/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
}
else {
const err30 = {instancePath:instancePath+"/default_ai_profiles/creator_copilot",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data9.npc_planner !== undefined){
let data12 = data9.npc_planner;
if(data12 && typeof data12 == "object" && !Array.isArray(data12)){
if(data12.ref === undefined){
const err31 = {instancePath:instancePath+"/default_ai_profiles/npc_planner",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
for(const key4 in data12){
if(!(key4 === "ref")){
const err32 = {instancePath:instancePath+"/default_ai_profiles/npc_planner",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
if(data12.ref !== undefined){
let data13 = data12.ref;
if(typeof data13 === "string"){
if(!pattern4.test(data13)){
const err33 = {instancePath:instancePath+"/default_ai_profiles/npc_planner/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
else {
const err34 = {instancePath:instancePath+"/default_ai_profiles/npc_planner/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
}
else {
const err35 = {instancePath:instancePath+"/default_ai_profiles/npc_planner",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
if(data9.npc_dialogue !== undefined){
let data14 = data9.npc_dialogue;
if(data14 && typeof data14 == "object" && !Array.isArray(data14)){
if(data14.ref === undefined){
const err36 = {instancePath:instancePath+"/default_ai_profiles/npc_dialogue",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
for(const key5 in data14){
if(!(key5 === "ref")){
const err37 = {instancePath:instancePath+"/default_ai_profiles/npc_dialogue",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data14.ref !== undefined){
let data15 = data14.ref;
if(typeof data15 === "string"){
if(!pattern4.test(data15)){
const err38 = {instancePath:instancePath+"/default_ai_profiles/npc_dialogue/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
else {
const err39 = {instancePath:instancePath+"/default_ai_profiles/npc_dialogue/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
}
else {
const err40 = {instancePath:instancePath+"/default_ai_profiles/npc_dialogue",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
}
else {
const err41 = {instancePath:instancePath+"/default_ai_profiles",schemaPath:"#/properties/default_ai_profiles/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
if(data.extensions !== undefined){
let data16 = data.extensions;
if(data16 && typeof data16 == "object" && !Array.isArray(data16)){
for(const key6 in data16){
const _errs43 = errors;
if(typeof key6 === "string"){
if(!pattern4.test(key6)){
const err42 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key6};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
var valid13 = _errs43 === errors;
if(!valid13){
const err43 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key6},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
for(const key7 in data16){
let data17 = data16[key7];
if(!(data17 && typeof data17 == "object" && !Array.isArray(data17))){
const err44 = {instancePath:instancePath+"/extensions/" + key7.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
}
else {
const err45 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
}
}
else {
const err46 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
validate103.errors = vErrors;
return errors === 0;
}
validate103.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator28 = validate104;
const schema119 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:relationship-dimension-definition","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.relationship_dimension.definition"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"relationship_dimension"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"range":{"type":"object","additionalProperties":false,"properties":{"min":{"type":"number"},"max":{"type":"number"},"default":{"type":"number"}},"required":["min","max","default"]},"ai_description":{"type":"string"}},"required":["schema_id","schema_version","id","kind","display_name","range"]};

function validate104(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:relationship-dimension-definition" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate104.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.range === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "range"},message:"must have required property '"+"range"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema119.properties, key0))){
const err6 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.relationship_dimension.definition" !== data.schema_id){
const err7 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.relationship_dimension.definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err8 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err9 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
else {
const err10 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.kind !== undefined){
if("relationship_dimension" !== data.kind){
const err11 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "relationship_dimension"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err12 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err14 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err15 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
else {
const err16 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err17 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err18 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err19 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err20 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err21 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
}
else {
const err22 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data.range !== undefined){
let data10 = data.range;
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
if(data10.min === undefined){
const err23 = {instancePath:instancePath+"/range",schemaPath:"#/properties/range/required",keyword:"required",params:{missingProperty: "min"},message:"must have required property '"+"min"+"'"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
if(data10.max === undefined){
const err24 = {instancePath:instancePath+"/range",schemaPath:"#/properties/range/required",keyword:"required",params:{missingProperty: "max"},message:"must have required property '"+"max"+"'"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(data10.default === undefined){
const err25 = {instancePath:instancePath+"/range",schemaPath:"#/properties/range/required",keyword:"required",params:{missingProperty: "default"},message:"must have required property '"+"default"+"'"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
for(const key3 in data10){
if(!(((key3 === "min") || (key3 === "max")) || (key3 === "default"))){
const err26 = {instancePath:instancePath+"/range",schemaPath:"#/properties/range/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(data10.min !== undefined){
let data11 = data10.min;
if(!((typeof data11 == "number") && (isFinite(data11)))){
const err27 = {instancePath:instancePath+"/range/min",schemaPath:"#/properties/range/properties/min/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data10.max !== undefined){
let data12 = data10.max;
if(!((typeof data12 == "number") && (isFinite(data12)))){
const err28 = {instancePath:instancePath+"/range/max",schemaPath:"#/properties/range/properties/max/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data10.default !== undefined){
let data13 = data10.default;
if(!((typeof data13 == "number") && (isFinite(data13)))){
const err29 = {instancePath:instancePath+"/range/default",schemaPath:"#/properties/range/properties/default/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
}
else {
const err30 = {instancePath:instancePath+"/range",schemaPath:"#/properties/range/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data.ai_description !== undefined){
if(typeof data.ai_description !== "string"){
const err31 = {instancePath:instancePath+"/ai_description",schemaPath:"#/properties/ai_description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
}
else {
const err32 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
validate104.errors = vErrors;
return errors === 0;
}
validate104.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator29 = validate105;
const schema120 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:relationship-state","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.relationship.state"},"schema_version":{"const":1},"relationship_id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"source_character_instance_id":{"type":"string","format":"uuid"},"target_character_instance_id":{"type":"string","format":"uuid"},"dimension_values":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"number"}}},"required":["schema_id","schema_version","relationship_id","source_character_instance_id","target_character_instance_id","dimension_values"]};

function validate105(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:relationship-state" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate105.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.relationship_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "relationship_id"},message:"must have required property '"+"relationship_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.source_character_instance_id === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "source_character_instance_id"},message:"must have required property '"+"source_character_instance_id"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.target_character_instance_id === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "target_character_instance_id"},message:"must have required property '"+"target_character_instance_id"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.dimension_values === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "dimension_values"},message:"must have required property '"+"dimension_values"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
for(const key0 in data){
if(!((((((key0 === "schema_id") || (key0 === "schema_version")) || (key0 === "relationship_id")) || (key0 === "source_character_instance_id")) || (key0 === "target_character_instance_id")) || (key0 === "dimension_values"))){
const err6 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.relationship.state" !== data.schema_id){
const err7 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.relationship.state"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err8 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.relationship_id !== undefined){
let data2 = data.relationship_id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err9 = {instancePath:instancePath+"/relationship_id",schemaPath:"#/properties/relationship_id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
else {
const err10 = {instancePath:instancePath+"/relationship_id",schemaPath:"#/properties/relationship_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.source_character_instance_id !== undefined){
let data3 = data.source_character_instance_id;
if(typeof data3 === "string"){
if(!(formats0.test(data3))){
const err11 = {instancePath:instancePath+"/source_character_instance_id",schemaPath:"#/properties/source_character_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/source_character_instance_id",schemaPath:"#/properties/source_character_instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.target_character_instance_id !== undefined){
let data4 = data.target_character_instance_id;
if(typeof data4 === "string"){
if(!(formats0.test(data4))){
const err13 = {instancePath:instancePath+"/target_character_instance_id",schemaPath:"#/properties/target_character_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/target_character_instance_id",schemaPath:"#/properties/target_character_instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.dimension_values !== undefined){
let data5 = data.dimension_values;
if(data5 && typeof data5 == "object" && !Array.isArray(data5)){
for(const key1 in data5){
const _errs12 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err15 = {instancePath:instancePath+"/dimension_values",schemaPath:"#/properties/dimension_values/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
var valid1 = _errs12 === errors;
if(!valid1){
const err16 = {instancePath:instancePath+"/dimension_values",schemaPath:"#/properties/dimension_values/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
for(const key2 in data5){
let data6 = data5[key2];
if(!((typeof data6 == "number") && (isFinite(data6)))){
const err17 = {instancePath:instancePath+"/dimension_values/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/dimension_values/additionalProperties/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
}
else {
const err18 = {instancePath:instancePath+"/dimension_values",schemaPath:"#/properties/dimension_values/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
}
else {
const err19 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
validate105.errors = vErrors;
return errors === 0;
}
validate105.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator30 = validate106;
const schema121 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:room-definition","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.room.definition"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"room"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"parent_location_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"object_refs":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:definition-ref"},"uniqueItems":true},"portal_refs":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:definition-ref"},"uniqueItems":true},"visual_identity_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"},"component_config_refs":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:definition-ref"},"uniqueItems":true}},"required":["schema_id","schema_version","id","kind","display_name","parent_location_ref"]};

function validate106(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:room-definition" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate106.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.parent_location_ref === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "parent_location_ref"},message:"must have required property '"+"parent_location_ref"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema121.properties, key0))){
const err6 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.room.definition" !== data.schema_id){
const err7 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.room.definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err8 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err9 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
else {
const err10 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.kind !== undefined){
if("room" !== data.kind){
const err11 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "room"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err12 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err14 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err15 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
else {
const err16 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err17 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err18 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err19 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err20 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err21 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
}
else {
const err22 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data.parent_location_ref !== undefined){
let data10 = data.parent_location_ref;
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
if(data10.ref === undefined){
const err23 = {instancePath:instancePath+"/parent_location_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
for(const key3 in data10){
if(!(key3 === "ref")){
const err24 = {instancePath:instancePath+"/parent_location_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data10.ref !== undefined){
let data11 = data10.ref;
if(typeof data11 === "string"){
if(!pattern4.test(data11)){
const err25 = {instancePath:instancePath+"/parent_location_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
else {
const err26 = {instancePath:instancePath+"/parent_location_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
}
else {
const err27 = {instancePath:instancePath+"/parent_location_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data.object_refs !== undefined){
let data12 = data.object_refs;
if(Array.isArray(data12)){
const len1 = data12.length;
for(let i2=0; i2<len1; i2++){
let data13 = data12[i2];
if(data13 && typeof data13 == "object" && !Array.isArray(data13)){
if(data13.ref === undefined){
const err28 = {instancePath:instancePath+"/object_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
for(const key4 in data13){
if(!(key4 === "ref")){
const err29 = {instancePath:instancePath+"/object_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(data13.ref !== undefined){
let data14 = data13.ref;
if(typeof data14 === "string"){
if(!pattern4.test(data14)){
const err30 = {instancePath:instancePath+"/object_refs/" + i2+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
else {
const err31 = {instancePath:instancePath+"/object_refs/" + i2+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
}
else {
const err32 = {instancePath:instancePath+"/object_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
let i3 = data12.length;
let j1;
if(i3 > 1){
outer0:
for(;i3--;){
for(j1 = i3; j1--;){
if(func0(data12[i3], data12[j1])){
const err33 = {instancePath:instancePath+"/object_refs",schemaPath:"#/properties/object_refs/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
break outer0;
}
}
}
}
}
else {
const err34 = {instancePath:instancePath+"/object_refs",schemaPath:"#/properties/object_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data.portal_refs !== undefined){
let data15 = data.portal_refs;
if(Array.isArray(data15)){
const len2 = data15.length;
for(let i4=0; i4<len2; i4++){
let data16 = data15[i4];
if(data16 && typeof data16 == "object" && !Array.isArray(data16)){
if(data16.ref === undefined){
const err35 = {instancePath:instancePath+"/portal_refs/" + i4,schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
for(const key5 in data16){
if(!(key5 === "ref")){
const err36 = {instancePath:instancePath+"/portal_refs/" + i4,schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data16.ref !== undefined){
let data17 = data16.ref;
if(typeof data17 === "string"){
if(!pattern4.test(data17)){
const err37 = {instancePath:instancePath+"/portal_refs/" + i4+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
else {
const err38 = {instancePath:instancePath+"/portal_refs/" + i4+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
}
else {
const err39 = {instancePath:instancePath+"/portal_refs/" + i4,schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
let i5 = data15.length;
let j2;
if(i5 > 1){
outer1:
for(;i5--;){
for(j2 = i5; j2--;){
if(func0(data15[i5], data15[j2])){
const err40 = {instancePath:instancePath+"/portal_refs",schemaPath:"#/properties/portal_refs/uniqueItems",keyword:"uniqueItems",params:{i: i5, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i5+" are identical)"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
break outer1;
}
}
}
}
}
else {
const err41 = {instancePath:instancePath+"/portal_refs",schemaPath:"#/properties/portal_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
if(data.visual_identity_ref !== undefined){
let data18 = data.visual_identity_ref;
if(data18 && typeof data18 == "object" && !Array.isArray(data18)){
if(data18.ref === undefined){
const err42 = {instancePath:instancePath+"/visual_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
for(const key6 in data18){
if(!(key6 === "ref")){
const err43 = {instancePath:instancePath+"/visual_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key6},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
if(data18.ref !== undefined){
let data19 = data18.ref;
if(typeof data19 === "string"){
if(!pattern4.test(data19)){
const err44 = {instancePath:instancePath+"/visual_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
else {
const err45 = {instancePath:instancePath+"/visual_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
}
}
else {
const err46 = {instancePath:instancePath+"/visual_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
}
if(data.component_config_refs !== undefined){
let data20 = data.component_config_refs;
if(Array.isArray(data20)){
const len3 = data20.length;
for(let i6=0; i6<len3; i6++){
let data21 = data20[i6];
if(data21 && typeof data21 == "object" && !Array.isArray(data21)){
if(data21.ref === undefined){
const err47 = {instancePath:instancePath+"/component_config_refs/" + i6,schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
for(const key7 in data21){
if(!(key7 === "ref")){
const err48 = {instancePath:instancePath+"/component_config_refs/" + i6,schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key7},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
}
if(data21.ref !== undefined){
let data22 = data21.ref;
if(typeof data22 === "string"){
if(!pattern4.test(data22)){
const err49 = {instancePath:instancePath+"/component_config_refs/" + i6+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
}
else {
const err50 = {instancePath:instancePath+"/component_config_refs/" + i6+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
}
}
else {
const err51 = {instancePath:instancePath+"/component_config_refs/" + i6,schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
}
let i7 = data20.length;
let j3;
if(i7 > 1){
outer2:
for(;i7--;){
for(j3 = i7; j3--;){
if(func0(data20[i7], data20[j3])){
const err52 = {instancePath:instancePath+"/component_config_refs",schemaPath:"#/properties/component_config_refs/uniqueItems",keyword:"uniqueItems",params:{i: i7, j: j3},message:"must NOT have duplicate items (items ## "+j3+" and "+i7+" are identical)"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
break outer2;
}
}
}
}
}
else {
const err53 = {instancePath:instancePath+"/component_config_refs",schemaPath:"#/properties/component_config_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
}
}
else {
const err54 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
validate106.errors = vErrors;
return errors === 0;
}
validate106.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator31 = validate107;
const schema127 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:action-open-parameters","type":"object","additionalProperties":false,"properties":{"target_instance_id":{"type":"string","format":"uuid"}},"required":["target_instance_id"]};

function validate107(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:action-open-parameters" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate107.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.target_instance_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "target_instance_id"},message:"must have required property '"+"target_instance_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
for(const key0 in data){
if(!(key0 === "target_instance_id")){
const err1 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
}
if(data.target_instance_id !== undefined){
let data0 = data.target_instance_id;
if(typeof data0 === "string"){
if(!(formats0.test(data0))){
const err2 = {instancePath:instancePath+"/target_instance_id",schemaPath:"#/properties/target_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
else {
const err3 = {instancePath:instancePath+"/target_instance_id",schemaPath:"#/properties/target_instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
}
else {
const err4 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
validate107.errors = vErrors;
return errors === 0;
}
validate107.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator32 = validate108;
const schema128 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:activity-cook-meal-parameters","type":"object","additionalProperties":false,"properties":{"recipe_ref":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"}},"required":["recipe_ref"]};

function validate108(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:activity-cook-meal-parameters" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate108.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.recipe_ref === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "recipe_ref"},message:"must have required property '"+"recipe_ref"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
for(const key0 in data){
if(!(key0 === "recipe_ref")){
const err1 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
}
if(data.recipe_ref !== undefined){
let data0 = data.recipe_ref;
if(typeof data0 === "string"){
if(!pattern4.test(data0)){
const err2 = {instancePath:instancePath+"/recipe_ref",schemaPath:"#/properties/recipe_ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
else {
const err3 = {instancePath:instancePath+"/recipe_ref",schemaPath:"#/properties/recipe_ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
}
else {
const err4 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
validate108.errors = vErrors;
return errors === 0;
}
validate108.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator33 = validate109;

function validate109(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:asset-variant-ref" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate109.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.variant_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "variant_id"},message:"must have required property '"+"variant_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
for(const key0 in data){
if(!(key0 === "variant_id")){
const err1 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
}
if(data.variant_id !== undefined){
let data0 = data.variant_id;
if(typeof data0 === "string"){
if(!pattern4.test(data0)){
const err2 = {instancePath:instancePath+"/variant_id",schemaPath:"#/properties/variant_id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
else {
const err3 = {instancePath:instancePath+"/variant_id",schemaPath:"#/properties/variant_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
}
else {
const err4 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
validate109.errors = vErrors;
return errors === 0;
}
validate109.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator34 = validate21;

export const aigsValidator35 = validate110;

function validate110(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:definition-ref" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate110.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.ref === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
for(const key0 in data){
if(!(key0 === "ref")){
const err1 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
}
if(data.ref !== undefined){
let data0 = data.ref;
if(typeof data0 === "string"){
if(!pattern4.test(data0)){
const err2 = {instancePath:instancePath+"/ref",schemaPath:"#/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
else {
const err3 = {instancePath:instancePath+"/ref",schemaPath:"#/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
}
else {
const err4 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
validate110.errors = vErrors;
return errors === 0;
}
validate110.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator36 = validate111;

function validate111(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:effect-operation" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate111.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.effect_type === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "effect_type"},message:"must have required property '"+"effect_type"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.parameters === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "parameters"},message:"must have required property '"+"parameters"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
for(const key0 in data){
if(!((key0 === "effect_type") || (key0 === "parameters"))){
const err2 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
if(data.effect_type !== undefined){
let data0 = data.effect_type;
if(typeof data0 === "string"){
if(!pattern7.test(data0)){
const err3 = {instancePath:instancePath+"/effect_type",schemaPath:"#/properties/effect_type/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"+"\""};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
else {
const err4 = {instancePath:instancePath+"/effect_type",schemaPath:"#/properties/effect_type/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.parameters !== undefined){
let data1 = data.parameters;
if(!(data1 && typeof data1 == "object" && !Array.isArray(data1))){
const err5 = {instancePath:instancePath+"/parameters",schemaPath:"#/properties/parameters/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
}
else {
const err6 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
validate111.errors = vErrors;
return errors === 0;
}
validate111.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator37 = validate80;

export const aigsValidator38 = validate79;

export const aigsValidator39 = validate112;

function validate112(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:runtime-instance-ref" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate112.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.instance_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "instance_id"},message:"must have required property '"+"instance_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
for(const key0 in data){
if(!(key0 === "instance_id")){
const err1 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
}
if(data.instance_id !== undefined){
let data0 = data.instance_id;
if(typeof data0 === "string"){
if(!(formats0.test(data0))){
const err2 = {instancePath:instancePath+"/instance_id",schemaPath:"#/properties/instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
else {
const err3 = {instancePath:instancePath+"/instance_id",schemaPath:"#/properties/instance_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
}
else {
const err4 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
validate112.errors = vErrors;
return errors === 0;
}
validate112.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator40 = validate70;

export const aigsValidator41 = validate90;

export const aigsValidator42 = validate113;
const schema133 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:validation-error","type":"object","additionalProperties":false,"properties":{"code":{"type":"string","pattern":"^[A-Z][A-Z0-9_]+$"},"severity":{"enum":["error","warning","info"]},"schema_id":{"type":["string","null"]},"object_id":{"type":["string","null"]},"path":{"type":"array","items":{"oneOf":[{"type":"string"},{"type":"integer"}]}},"message":{"type":"string"},"details":{"type":"object"}},"required":["code","severity","schema_id","object_id","path","message","details"]};

function validate113(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:validation-error" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate113.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.code === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "code"},message:"must have required property '"+"code"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.severity === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "severity"},message:"must have required property '"+"severity"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.schema_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.object_id === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "object_id"},message:"must have required property '"+"object_id"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.path === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "path"},message:"must have required property '"+"path"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.message === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "message"},message:"must have required property '"+"message"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.details === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "details"},message:"must have required property '"+"details"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
for(const key0 in data){
if(!(((((((key0 === "code") || (key0 === "severity")) || (key0 === "schema_id")) || (key0 === "object_id")) || (key0 === "path")) || (key0 === "message")) || (key0 === "details"))){
const err7 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.code !== undefined){
let data0 = data.code;
if(typeof data0 === "string"){
if(!pattern11.test(data0)){
const err8 = {instancePath:instancePath+"/code",schemaPath:"#/properties/code/pattern",keyword:"pattern",params:{pattern: "^[A-Z][A-Z0-9_]+$"},message:"must match pattern \""+"^[A-Z][A-Z0-9_]+$"+"\""};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/code",schemaPath:"#/properties/code/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.severity !== undefined){
let data1 = data.severity;
if(!(((data1 === "error") || (data1 === "warning")) || (data1 === "info"))){
const err10 = {instancePath:instancePath+"/severity",schemaPath:"#/properties/severity/enum",keyword:"enum",params:{allowedValues: schema133.properties.severity.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.schema_id !== undefined){
let data2 = data.schema_id;
if((typeof data2 !== "string") && (data2 !== null)){
const err11 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/type",keyword:"type",params:{type: schema133.properties.schema_id.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.object_id !== undefined){
let data3 = data.object_id;
if((typeof data3 !== "string") && (data3 !== null)){
const err12 = {instancePath:instancePath+"/object_id",schemaPath:"#/properties/object_id/type",keyword:"type",params:{type: schema133.properties.object_id.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.path !== undefined){
let data4 = data.path;
if(Array.isArray(data4)){
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
let data5 = data4[i0];
const _errs12 = errors;
let valid3 = false;
let passing0 = null;
const _errs13 = errors;
if(typeof data5 !== "string"){
const err13 = {instancePath:instancePath+"/path/" + i0,schemaPath:"#/properties/path/items/oneOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
var _valid0 = _errs13 === errors;
if(_valid0){
valid3 = true;
passing0 = 0;
}
const _errs15 = errors;
if(!(((typeof data5 == "number") && (!(data5 % 1) && !isNaN(data5))) && (isFinite(data5)))){
const err14 = {instancePath:instancePath+"/path/" + i0,schemaPath:"#/properties/path/items/oneOf/1/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
var _valid0 = _errs15 === errors;
if(_valid0 && valid3){
valid3 = false;
passing0 = [passing0, 1];
}
else {
if(_valid0){
valid3 = true;
passing0 = 1;
}
}
if(!valid3){
const err15 = {instancePath:instancePath+"/path/" + i0,schemaPath:"#/properties/path/items/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
else {
errors = _errs12;
if(vErrors !== null){
if(_errs12){
vErrors.length = _errs12;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err16 = {instancePath:instancePath+"/path",schemaPath:"#/properties/path/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.message !== undefined){
if(typeof data.message !== "string"){
const err17 = {instancePath:instancePath+"/message",schemaPath:"#/properties/message/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.details !== undefined){
let data7 = data.details;
if(!(data7 && typeof data7 == "object" && !Array.isArray(data7))){
const err18 = {instancePath:instancePath+"/details",schemaPath:"#/properties/details/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
}
else {
const err19 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
validate113.errors = vErrors;
return errors === 0;
}
validate113.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator43 = validate114;
const schema134 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:world-entity-definition","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.world_entity.definition"},"schema_version":{"const":1},"id":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"kind":{"const":"world_entity"},"display_name":{"type":"string","minLength":1},"description":{"type":"string"},"tags":{"type":"array","items":{"type":"string","pattern":"^[a-z0-9][a-z0-9_-]*$"},"uniqueItems":true},"extensions":{"type":"object","propertyNames":{"pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},"additionalProperties":{"type":"object"}},"affordance_refs":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:definition-ref"},"uniqueItems":true},"component_config_refs":{"type":"array","items":{"$ref":"urn:aigs:schema:v1:definition-ref"},"uniqueItems":true},"asset_identity_ref":{"$ref":"urn:aigs:schema:v1:definition-ref"}},"required":["schema_id","schema_version","id","kind","display_name"]};

function validate114(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:world-entity-definition" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate114.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.display_name === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "display_name"},message:"must have required property '"+"display_name"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema134.properties, key0))){
const err5 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.world_entity.definition" !== data.schema_id){
const err6 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.world_entity.definition"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err7 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.id !== undefined){
let data2 = data.id;
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
const err8 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.kind !== undefined){
if("world_entity" !== data.kind){
const err10 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/const",keyword:"const",params:{allowedValue: "world_entity"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.display_name !== undefined){
let data4 = data.display_name;
if(typeof data4 === "string"){
if(func2(data4) < 1){
const err11 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/display_name",schemaPath:"#/properties/display_name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err13 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.tags !== undefined){
let data6 = data.tags;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!pattern5.test(data7)){
const err14 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/pattern",keyword:"pattern",params:{pattern: "^[a-z0-9][a-z0-9_-]*$"},message:"must match pattern \""+"^[a-z0-9][a-z0-9_-]*$"+"\""};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/tags/" + i0,schemaPath:"#/properties/tags/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err16 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err17 = {instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.extensions !== undefined){
let data8 = data.extensions;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
for(const key1 in data8){
const _errs17 = errors;
if(typeof key1 === "string"){
if(!pattern4.test(key1)){
const err18 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\"",propertyName:key1};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
var valid4 = _errs17 === errors;
if(!valid4){
const err19 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/propertyNames",keyword:"propertyNames",params:{propertyName: key1},message:"property name must be valid"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
for(const key2 in data8){
let data9 = data8[key2];
if(!(data9 && typeof data9 == "object" && !Array.isArray(data9))){
const err20 = {instancePath:instancePath+"/extensions/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/extensions/additionalProperties/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
}
else {
const err21 = {instancePath:instancePath+"/extensions",schemaPath:"#/properties/extensions/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.affordance_refs !== undefined){
let data10 = data.affordance_refs;
if(Array.isArray(data10)){
const len1 = data10.length;
for(let i2=0; i2<len1; i2++){
let data11 = data10[i2];
if(data11 && typeof data11 == "object" && !Array.isArray(data11)){
if(data11.ref === undefined){
const err22 = {instancePath:instancePath+"/affordance_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
for(const key3 in data11){
if(!(key3 === "ref")){
const err23 = {instancePath:instancePath+"/affordance_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data11.ref !== undefined){
let data12 = data11.ref;
if(typeof data12 === "string"){
if(!pattern4.test(data12)){
const err24 = {instancePath:instancePath+"/affordance_refs/" + i2+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
else {
const err25 = {instancePath:instancePath+"/affordance_refs/" + i2+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
}
else {
const err26 = {instancePath:instancePath+"/affordance_refs/" + i2,schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
let i3 = data10.length;
let j1;
if(i3 > 1){
outer0:
for(;i3--;){
for(j1 = i3; j1--;){
if(func0(data10[i3], data10[j1])){
const err27 = {instancePath:instancePath+"/affordance_refs",schemaPath:"#/properties/affordance_refs/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
break outer0;
}
}
}
}
}
else {
const err28 = {instancePath:instancePath+"/affordance_refs",schemaPath:"#/properties/affordance_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data.component_config_refs !== undefined){
let data13 = data.component_config_refs;
if(Array.isArray(data13)){
const len2 = data13.length;
for(let i4=0; i4<len2; i4++){
let data14 = data13[i4];
if(data14 && typeof data14 == "object" && !Array.isArray(data14)){
if(data14.ref === undefined){
const err29 = {instancePath:instancePath+"/component_config_refs/" + i4,schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
for(const key4 in data14){
if(!(key4 === "ref")){
const err30 = {instancePath:instancePath+"/component_config_refs/" + i4,schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data14.ref !== undefined){
let data15 = data14.ref;
if(typeof data15 === "string"){
if(!pattern4.test(data15)){
const err31 = {instancePath:instancePath+"/component_config_refs/" + i4+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
else {
const err32 = {instancePath:instancePath+"/component_config_refs/" + i4+"/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
}
else {
const err33 = {instancePath:instancePath+"/component_config_refs/" + i4,schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
let i5 = data13.length;
let j2;
if(i5 > 1){
outer1:
for(;i5--;){
for(j2 = i5; j2--;){
if(func0(data13[i5], data13[j2])){
const err34 = {instancePath:instancePath+"/component_config_refs",schemaPath:"#/properties/component_config_refs/uniqueItems",keyword:"uniqueItems",params:{i: i5, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i5+" are identical)"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
break outer1;
}
}
}
}
}
else {
const err35 = {instancePath:instancePath+"/component_config_refs",schemaPath:"#/properties/component_config_refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
if(data.asset_identity_ref !== undefined){
let data16 = data.asset_identity_ref;
if(data16 && typeof data16 == "object" && !Array.isArray(data16)){
if(data16.ref === undefined){
const err36 = {instancePath:instancePath+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/required",keyword:"required",params:{missingProperty: "ref"},message:"must have required property '"+"ref"+"'"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
for(const key5 in data16){
if(!(key5 === "ref")){
const err37 = {instancePath:instancePath+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data16.ref !== undefined){
let data17 = data16.ref;
if(typeof data17 === "string"){
if(!pattern4.test(data17)){
const err38 = {instancePath:instancePath+"/asset_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9][a-z0-9_-]*)+$"+"\""};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
else {
const err39 = {instancePath:instancePath+"/asset_identity_ref/ref",schemaPath:"urn:aigs:schema:v1:definition-ref/properties/ref/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
}
else {
const err40 = {instancePath:instancePath+"/asset_identity_ref",schemaPath:"urn:aigs:schema:v1:definition-ref/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
}
else {
const err41 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
validate114.errors = vErrors;
return errors === 0;
}
validate114.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const aigsValidator44 = validate115;
const schema138 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:aigs:schema:v1:world-event","type":"object","additionalProperties":false,"properties":{"schema_id":{"const":"aigs.world_event"},"schema_version":{"const":1},"event_id":{"type":"string","format":"uuid"},"event_type":{"type":"string","pattern":"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},"game_time":{"type":"integer","minimum":0},"actor_instance_id":{"type":["string","null"],"format":"uuid"},"target_instance_ids":{"type":"array","items":{"type":"string","format":"uuid"},"uniqueItems":true},"payload":{"type":"object"},"causal":{"type":"object","additionalProperties":false,"properties":{"action_request_id":{"type":["string","null"],"format":"uuid"},"parent_event_id":{"type":["string","null"],"format":"uuid"}},"required":["action_request_id","parent_event_id"]}},"required":["schema_id","schema_version","event_id","event_type","game_time","actor_instance_id","target_instance_ids","payload","causal"]};

function validate115(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:aigs:schema:v1:world-event" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate115.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schema_id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_id"},message:"must have required property '"+"schema_id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.schema_version === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "schema_version"},message:"must have required property '"+"schema_version"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.event_id === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "event_id"},message:"must have required property '"+"event_id"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.event_type === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "event_type"},message:"must have required property '"+"event_type"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.game_time === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "game_time"},message:"must have required property '"+"game_time"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.actor_instance_id === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "actor_instance_id"},message:"must have required property '"+"actor_instance_id"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.target_instance_ids === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "target_instance_ids"},message:"must have required property '"+"target_instance_ids"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.payload === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "payload"},message:"must have required property '"+"payload"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.causal === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "causal"},message:"must have required property '"+"causal"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema138.properties, key0))){
const err9 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.schema_id !== undefined){
if("aigs.world_event" !== data.schema_id){
const err10 = {instancePath:instancePath+"/schema_id",schemaPath:"#/properties/schema_id/const",keyword:"const",params:{allowedValue: "aigs.world_event"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.schema_version !== undefined){
if(1 !== data.schema_version){
const err11 = {instancePath:instancePath+"/schema_version",schemaPath:"#/properties/schema_version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.event_id !== undefined){
let data2 = data.event_id;
if(typeof data2 === "string"){
if(!(formats0.test(data2))){
const err12 = {instancePath:instancePath+"/event_id",schemaPath:"#/properties/event_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/event_id",schemaPath:"#/properties/event_id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.event_type !== undefined){
let data3 = data.event_type;
if(typeof data3 === "string"){
if(!pattern7.test(data3)){
const err14 = {instancePath:instancePath+"/event_type",schemaPath:"#/properties/event_type/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"},message:"must match pattern \""+"^[a-z][a-z0-9_]*(\\.[a-z0-9_-]+)+$"+"\""};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/event_type",schemaPath:"#/properties/event_type/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.game_time !== undefined){
let data4 = data.game_time;
if(!(((typeof data4 == "number") && (!(data4 % 1) && !isNaN(data4))) && (isFinite(data4)))){
const err16 = {instancePath:instancePath+"/game_time",schemaPath:"#/properties/game_time/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if((typeof data4 == "number") && (isFinite(data4))){
if(data4 < 0 || isNaN(data4)){
const err17 = {instancePath:instancePath+"/game_time",schemaPath:"#/properties/game_time/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
}
if(data.actor_instance_id !== undefined){
let data5 = data.actor_instance_id;
if((typeof data5 !== "string") && (data5 !== null)){
const err18 = {instancePath:instancePath+"/actor_instance_id",schemaPath:"#/properties/actor_instance_id/type",keyword:"type",params:{type: schema138.properties.actor_instance_id.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(typeof data5 === "string"){
if(!(formats0.test(data5))){
const err19 = {instancePath:instancePath+"/actor_instance_id",schemaPath:"#/properties/actor_instance_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
}
if(data.target_instance_ids !== undefined){
let data6 = data.target_instance_ids;
if(Array.isArray(data6)){
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(!(formats0.test(data7))){
const err20 = {instancePath:instancePath+"/target_instance_ids/" + i0,schemaPath:"#/properties/target_instance_ids/items/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
else {
const err21 = {instancePath:instancePath+"/target_instance_ids/" + i0,schemaPath:"#/properties/target_instance_ids/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err22 = {instancePath:instancePath+"/target_instance_ids",schemaPath:"#/properties/target_instance_ids/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err23 = {instancePath:instancePath+"/target_instance_ids",schemaPath:"#/properties/target_instance_ids/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data.payload !== undefined){
let data8 = data.payload;
if(!(data8 && typeof data8 == "object" && !Array.isArray(data8))){
const err24 = {instancePath:instancePath+"/payload",schemaPath:"#/properties/payload/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data.causal !== undefined){
let data9 = data.causal;
if(data9 && typeof data9 == "object" && !Array.isArray(data9)){
if(data9.action_request_id === undefined){
const err25 = {instancePath:instancePath+"/causal",schemaPath:"#/properties/causal/required",keyword:"required",params:{missingProperty: "action_request_id"},message:"must have required property '"+"action_request_id"+"'"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
if(data9.parent_event_id === undefined){
const err26 = {instancePath:instancePath+"/causal",schemaPath:"#/properties/causal/required",keyword:"required",params:{missingProperty: "parent_event_id"},message:"must have required property '"+"parent_event_id"+"'"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
for(const key1 in data9){
if(!((key1 === "action_request_id") || (key1 === "parent_event_id"))){
const err27 = {instancePath:instancePath+"/causal",schemaPath:"#/properties/causal/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data9.action_request_id !== undefined){
let data10 = data9.action_request_id;
if((typeof data10 !== "string") && (data10 !== null)){
const err28 = {instancePath:instancePath+"/causal/action_request_id",schemaPath:"#/properties/causal/properties/action_request_id/type",keyword:"type",params:{type: schema138.properties.causal.properties.action_request_id.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
if(typeof data10 === "string"){
if(!(formats0.test(data10))){
const err29 = {instancePath:instancePath+"/causal/action_request_id",schemaPath:"#/properties/causal/properties/action_request_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
}
if(data9.parent_event_id !== undefined){
let data11 = data9.parent_event_id;
if((typeof data11 !== "string") && (data11 !== null)){
const err30 = {instancePath:instancePath+"/causal/parent_event_id",schemaPath:"#/properties/causal/properties/parent_event_id/type",keyword:"type",params:{type: schema138.properties.causal.properties.parent_event_id.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
if(typeof data11 === "string"){
if(!(formats0.test(data11))){
const err31 = {instancePath:instancePath+"/causal/parent_event_id",schemaPath:"#/properties/causal/properties/parent_event_id/format",keyword:"format",params:{format: "uuid"},message:"must match format \""+"uuid"+"\""};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
}
}
else {
const err32 = {instancePath:instancePath+"/causal",schemaPath:"#/properties/causal/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
}
else {
const err33 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
validate115.errors = vErrors;
return errors === 0;
}
validate115.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const schemaValidators = [aigsValidator0, aigsValidator1, aigsValidator2, aigsValidator3, aigsValidator4, aigsValidator5, aigsValidator6, aigsValidator7, aigsValidator8, aigsValidator9, aigsValidator10, aigsValidator11, aigsValidator12, aigsValidator13, aigsValidator14, aigsValidator15, aigsValidator16, aigsValidator17, aigsValidator18, aigsValidator19, aigsValidator20, aigsValidator21, aigsValidator22, aigsValidator23, aigsValidator24, aigsValidator25, aigsValidator26, aigsValidator27, aigsValidator28, aigsValidator29, aigsValidator30, aigsValidator31, aigsValidator32, aigsValidator33, aigsValidator34, aigsValidator35, aigsValidator36, aigsValidator37, aigsValidator38, aigsValidator39, aigsValidator40, aigsValidator41, aigsValidator42, aigsValidator43, aigsValidator44] as const;
