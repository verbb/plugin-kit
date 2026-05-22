import { emailRule } from './email';
import { emailOrVariableRule } from './emailOrVariable';
import { handleRule } from './handle';
import { maxRule } from './max';
import { minRule } from './min';
import { requiredRule } from './required';
import { uniqueHandleRule } from './uniqueHandle';

import type { SchemaNode } from '../SchemaIndex';

export type RuleHandlerContext = {
    path: string;
    values: Record<string, unknown>;
    field: SchemaNode;
};

export type RuleHandler = (value: unknown, label: string, args: string[], context?: RuleHandlerContext) => string | null;

export const ruleHandlers: Record<string, RuleHandler> = {
    required: (value, label) => { return requiredRule(value, label); },
    min: (value, label, args) => { return minRule(value, label, args); },
    max: (value, label, args) => { return maxRule(value, label, args); },
    email: (value, label) => { return emailRule(value, label); },
    emailOrVariable: (value, label) => { return emailOrVariableRule(value, label); },
    handle: (value) => { return handleRule(value); },
    uniqueHandle: (value, label, args, context) => { return uniqueHandleRule(value, label, args, context); },
};
