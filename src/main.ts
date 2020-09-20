import * as core from '@actions/core';
import * as github from '@actions/github';
import { generate } from './generate';
import { getInputs } from './inputs';

const tag = generate(github.context.ref, getInputs());
core.setOutput('tag', tag);
