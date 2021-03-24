'use strict';
var fs = require('fs');
const esprima = require("esprima");
const ts = require('typescript');

const LOG_LEVEL_SUCCESS = 0;
const LOG_LEVEL_FAIL = 1;

const INDEX_FILE = 'index.js';
const TS_DEF_FILE_PATH = 'index.d.ts';
const MODULE_DIR = 'modules/';

const JS_FILES = 'Javascript Files';
const TS_DEF_FILE = 'Typescript Definition File';

function parseModule(block) {
    var functions = [];
    var enums = [];
    let tree = esprima.parseModule(block);
    tree.body.forEach((el) => {
        if ((el.type == "VariableDeclaration" && el.declarations[0].init.type == "ObjectExpression") || (el.type == "ExportDefaultDeclaration" && el.declaration.type == "ObjectExpression")) {
            var props = [];
            if (el.type == "ExportDefaultDeclaration" && el.declaration.type == "ObjectExpression") {
                props = el.declaration.properties;
            } else {
                props = el.declarations[0].init.properties;
            }
            props.forEach((prop) => {
                if (prop.value.type == "FunctionExpression") {
                    var params = [];
                    prop.value.params.forEach((param) => {
                        if (param.type == "ObjectPattern") { //  flatten composite object params
                            param.properties.forEach((param) => {
                                params.push(param.key.name)
                            });
                        } else {
                            params.push(param.name)
                        }
                    });
                    functions.push({ name: prop.key.name, params: params });
                } else {
                    var values = [];
                    prop.value.properties.forEach((value) => {
                        values.push(value.key.name)
                    });
                    enums.push({ name: prop.key.name, values: values });
                }
            });
        }
    });
    return { functions: functions, enums: enums };
}

function parseDefinition() {
    const node = ts.createSourceFile(
        TS_DEF_FILE_PATH,
        fs.readFileSync(TS_DEF_FILE_PATH, 'utf8'),
        ts.ScriptTarget.Latest
    );
    var allDef = [];
    var indexFunctions = [];
    var indexEnums = [];
    node.statements.forEach((statement) => {
        if (statement.body) {
            // this is a module
            var functions = [];
            var enums = [];
            statement.body.statements.forEach((moduleStatement) => {
                var params = [];
                if (moduleStatement.parameters) {
                    moduleStatement.parameters.forEach((param) => {
                        if (param.type.members) {
                            param.type.members.forEach((member) => {
                                params.push(member.name.escapedText);
                            });
                        } else {
                            params.push(param.name.escapedText);
                        }
                    });
                    functions.push({ name: moduleStatement.name.escapedText, params: params });
                } else {
                    var enumValues = [];
                    moduleStatement.members.forEach((member) => {
                        enumValues.push(member.name.escapedText);
                    });
                    enums.push({ name: moduleStatement.name.escapedText, values: enumValues });
                }
            });
            allDef.push({ moduleName: statement.name.escapedText, data: { functions: functions, enums: enums } });
        } else {
            var params = [];
            var enumValues = [];
            if (statement.parameters) {
                statement.parameters.forEach((param) => { //  flatten composite object params
                    if (param.type.members) {
                        param.type.members.forEach((member) => {
                            params.push(member.name.escapedText);
                        });
                    } else {
                        params.push(param.name.escapedText);
                    }
                });
                indexFunctions.push({ name: statement.name.escapedText, params: params });
            } else {
                if (statement.kind == 252) { // statement kind 252 indicates an enum declare statement
                    var enumValues = [];
                    statement.members.forEach((member) => {
                        enumValues.push(member.name.escapedText);
                    });
                    indexEnums.push({ name: statement.name.escapedText, values: enumValues });
                }
            }
        }
    });
    allDef.push({ moduleName: "index", data: { functions: indexFunctions, enums: indexEnums } });
    return allDef;
}

function compareModuleDefinition(module, definition, baseFile) {
    var flag = true;
    module.data.functions.forEach((func) => {
        var funcFound = false;
        for (var i = 0; i < definition.data.functions.length; i++) {
            if (func.name === definition.data.functions[i].name) {
                func.params.forEach((param) => {
                    var paramFound = false;
                    for (var j = 0; j < definition.data.functions[i].params.length; j++) {
                        if (param === definition.data.functions[i].params[j]) {
                            paramFound = true;
                            break;
                        }
                    }
                    if (!paramFound) {
                        logParamDiscrepency(param, func.name, module.moduleName, baseFile);
                        flag = false;
                    }
                });
                var funcFound = true;
                break;
            }
        }
        if (!funcFound && func.name[0] !== "_") {
            logFunctionDiscrepency(module.moduleName, func.name, baseFile);
            flag = false;
        }
    });

    module.data.enums.forEach((en) => {
        var enumFound = false;
        for (var i = 0; i < definition.data.enums.length; i++) {
            if (en.name === definition.data.enums[i].name) {
                en.values.forEach((value) => {
                    var valueFound = false;
                    for (var j = 0; j < definition.data.enums[i].values.length; j++) {
                        if (value === definition.data.enums[i].values[j]) {
                            valueFound = true;
                            break;
                        }
                    }
                    if (!valueFound) {
                        logEnumValueDiscrepency(value, en.name, module.moduleName, baseFile);
                        flag = false;
                    }
                });
                var enumFound = true;
                break;
            }
        }
        if (!enumFound) {
            logEnumDiscrepency(en.name, module.moduleName, baseFile);
            flag = false;
        }
    });

    return flag;
}

function logModuleDiscrepency(module, fileName) {
    console.error(" Module: " + module + " was not found in" + fileName);
}

function logFunctionDiscrepency(module, func, fileName) {
    console.error("Function: " + func + " in Module: " + module + " was not found in " + fileName);

}

function logParamDiscrepency(param, func, module, fileName) {
    console.error("Param: " + param + " for the function: " + func + " in Module: " + module + " was not found in " + fileName);
}

function logEnumDiscrepency(en, module, fileName) {
    console.error("Enum: " + en + " in Module: " + module + " was not found in " + fileName)
}


function logEnumValueDiscrepency(value, en, module, fileName) {
    console.error("Value: " + value + " for the Enum: " + en + " in Module: " + module + " was not found in " + fileName);
}


function finish(logLevel, message) {
    if (logLevel === LOG_LEVEL_SUCCESS) {
        console.info(message);
    } else {
        console.error(message);
        process.exit(1);
    }
}

var allMatch = true;
var all = [];
var allDef = [];
var modules = fs.readdirSync(MODULE_DIR);
for (var i = 0; i < modules.length; i++) {
    modules[i] = MODULE_DIR + modules[i];
}
modules.push(INDEX_FILE);
modules.forEach((module) => {
    var data = fs.readFileSync(module);
    all.push({ moduleName: module.replace('.js', '').replace(MODULE_DIR, ''), data: parseModule(data.toString()) });
});

allDef = parseDefinition();

console.log(JS_FILES + ' <-- ' + TS_DEF_FILE);
for (var i = 0; i < allDef.length; i++) {
    var moduleFound = false;
    for (var j = 0; j < all.length; j++) {
        if (allDef[i].moduleName === all[j].moduleName) {
            if (!compareModuleDefinition(allDef[i], all[j], JS_FILES)) {
                allMatch = false;
            }
            moduleFound = true;
            break;
        }
    }
    if (!moduleFound) {
        logModuleDiscrepency(allDef[i].moduleName, JS_FILES);
        allMatch = false;
    }
}
if (allMatch) {
    console.log('✅');
}
console.log('\n');
console.log(TS_DEF_FILE + ' <-- ' + JS_FILES);
for (var i = 0; i < all.length; i++) {
    var moduleFound = false;
    for (var j = 0; j < allDef.length; j++) {
        if (all[i].moduleName === allDef[j].moduleName) {
            if (!compareModuleDefinition(all[i], allDef[j], TS_DEF_FILE)) {
                allMatch = false;
            }
            moduleFound = true;
            break;
        }
    }
    if (!moduleFound) {
        logModuleDiscrepency(all[i].moduleName, TS_DEF_FILE);
        allMatch = false;
    }
}
if (allMatch) {
    console.log('✅');
    finish(LOG_LEVEL_SUCCESS, "Javascript and Typescript Definition match!")
} else {
    finish(LOG_LEVEL_FAIL, "\n ❌ Javascript and Typescript Definition do not match!")

}
