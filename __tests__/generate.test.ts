import { generate } from '../src/generate';
import { Inputs } from '../src/inputs';

describe('#generate', () => {
  const defaultInputs: Inputs = {
    latestBranches: ['main', 'master'],
    removeVersionTagPrefix: true,
  };

  describe('when Branches', () => {
    describe('with latest-branches are ["main", "master"]', () => {
      describe('branch name is "main"', () => {
        it('returns "latest"', () => {
          const result = generate('refs/heads/main', defaultInputs);

          expect(result).toEqual('latest');
        });
      });

      describe('branch name is "master"', () => {
        it('returns "latest"', () => {
          const result = generate('refs/heads/master', defaultInputs);

          expect(result).toEqual('latest');
        });
      });

      describe('branch name is "develop"', () => {
        it('returns "develop"', () => {
          const result = generate('refs/heads/develop', defaultInputs);

          expect(result).toEqual('develop');
        });
      });
    });

    describe('with latest-branches are ["develop"]', () => {
      const inputsWithLatestBranchesAreDevelop = {
        ...defaultInputs,
        latestBranches: ['develop'],
      };

      describe('branch name is "main"', () => {
        it('returns "main"', () => {
          const result = generate(
            'refs/heads/main',
            inputsWithLatestBranchesAreDevelop,
          );

          expect(result).toEqual('main');
        });
      });

      describe('branch name is "master"', () => {
        it('returns "master"', () => {
          const result = generate(
            'refs/heads/master',
            inputsWithLatestBranchesAreDevelop,
          );

          expect(result).toEqual('master');
        });
      });

      describe('branch name is "develop"', () => {
        it('returns "latest"', () => {
          const result = generate(
            'refs/heads/develop',
            inputsWithLatestBranchesAreDevelop,
          );

          expect(result).toEqual('latest');
        });
      });
    });
  });

  describe('when Tags', () => {
    describe('with remove-version-tag-prefix is true', () => {
      describe('tag name is "v1.2.3"', () => {
        it('returns "1.2.3"', () => {
          const result = generate('refs/tags/v1.2.3', defaultInputs);

          expect(result).toEqual('1.2.3');
        });
      });

      describe('tag name is "v1.2.3.dev"', () => {
        it('returns "1.2.3.dev"', () => {
          const result = generate('refs/tags/v1.2.3.dev', defaultInputs);

          expect(result).toEqual('1.2.3.dev');
        });
      });

      describe('tag name is "v1.2"', () => {
        it('returns "1.2"', () => {
          const result = generate('refs/tags/v1.2', defaultInputs);

          expect(result).toEqual('1.2');
        });
      });

      describe('tag name is "v1.2.beta"', () => {
        it('returns "1.2.beta"', () => {
          const result = generate('refs/tags/v1.2.beta', defaultInputs);

          expect(result).toEqual('1.2.beta');
        });
      });

      describe('tag name is "v1"', () => {
        it('returns "1"', () => {
          const result = generate('refs/tags/v1', defaultInputs);

          expect(result).toEqual('1');
        });
      });

      describe('tag name is "v1.rc3"', () => {
        it('returns "1.rc3"', () => {
          const result = generate('refs/tags/v1.rc3', defaultInputs);

          expect(result).toEqual('1.rc3');
        });
      });

      describe('tag name is "foo"', () => {
        it('returns "foo"', () => {
          const result = generate('refs/tags/foo', defaultInputs);

          expect(result).toEqual('foo');
        });
      });
    });

    describe('with remove-version-tag-prefix is false', () => {
      const inputsWithRemoveVersionTagPrefixIsFalse = {
        ...defaultInputs,
        removeVersionTagPrefix: false,
      };

      describe('tag name is "v1.2.3"', () => {
        it('returns "v1.2.3"', () => {
          const result = generate(
            'refs/tags/v1.2.3',
            inputsWithRemoveVersionTagPrefixIsFalse,
          );

          expect(result).toEqual('v1.2.3');
        });
      });

      describe('tag name is "v1.2"', () => {
        it('returns "v1.2"', () => {
          const result = generate(
            'refs/tags/v1.2',
            inputsWithRemoveVersionTagPrefixIsFalse,
          );

          expect(result).toEqual('v1.2');
        });
      });

      describe('tag name is "foo"', () => {
        it('returns "foo"', () => {
          const result = generate(
            'refs/tags/foo',
            inputsWithRemoveVersionTagPrefixIsFalse,
          );

          expect(result).toEqual('foo');
        });
      });
    });
  });

  describe('when Pull Requests', () => {
    describe('Pull Request number is 123', () => {
      it('returns "pr-123"', () => {
        const result = generate('refs/pull/123/merge', defaultInputs);

        expect(result).toEqual('pr-123');
      });
    });
  });
});
