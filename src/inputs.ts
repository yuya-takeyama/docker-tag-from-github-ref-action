import * as core from '@actions/core';

export interface Inputs {
  latestBranches: string[];
  removeVersionTagPrefix: boolean;
}

export const getInputs = (): Inputs => {
  const latestBranches = core
    .getInput('latest-branches', { required: true })
    .split(',');
  const removeVersionTagPrefix =
    core.getInput('remove-version-tag-prefix', {
      required: true,
    }) === 'true';

  return {
    latestBranches,
    removeVersionTagPrefix,
  };
};
