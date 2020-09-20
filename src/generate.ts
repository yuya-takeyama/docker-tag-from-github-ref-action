import type { Inputs } from './inputs';

const branchRefPrefix = /^refs\/heads\//;
const tagRefPrefix = /^refs\/tags\//;
const pullRequestRefPrefix = /^refs\/pull\//;
const pullRequestRefSuffix = /\/merge$/;

export const generate = (githubRef: string, inputs: Inputs): string => {
  // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
  if (branchRefPrefix.test(githubRef)) {
    return generateForBranch(githubRef, inputs);
    // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
  } else if (tagRefPrefix.test(githubRef)) {
    return generateForTag(githubRef, inputs);
  } else if (
    // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
    pullRequestRefPrefix.test(githubRef) &&
    // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
    pullRequestRefSuffix.test(githubRef)
  ) {
    return generateForPullRequest(githubRef);
  }

  throw new Error(`Invalid "github.ref" format: ${githubRef}`);
};

const generateForBranch = (githubRef: string, inputs: Inputs): string => {
  const branch = githubRef.replace(branchRefPrefix, '');

  for (const latestBranch of inputs.latestBranches) {
    if (latestBranch === branch) {
      return 'latest';
    }
  }

  return branch;
};

const generateForTag = (githubRef: string, inputs: Inputs): string => {
  const tag = githubRef.replace(tagRefPrefix, '');

  if (inputs.removeVersionTagPrefix && /^v\d+\.\d+\.\d+$/.test(tag)) {
    return tag.replace(/^v/, '');
  }

  return tag;
};

const generateForPullRequest = (githubRef: string): string => {
  const number = githubRef
    .replace(pullRequestRefPrefix, '')
    .replace(pullRequestRefSuffix, '');
  return `pr-${number}`;
};
