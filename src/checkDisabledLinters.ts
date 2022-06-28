import { getOctokit,context } from '@actions/github'
import { Context } from '@actions/github/lib/context';
import { error as logError } from '@actions/core';

class CheckDisabledLinters {
  private readonly authToken: string; 
  private readonly context: Context;

  constructor(authToken: string) {
    this.authToken = authToken;  
    this.context = context;
  }
  run = async () => {
    this.runCheckDisabledLinters()!;
  };
  runCheckDisabledLinters = () => {
 
    try {
      this.findLintersString()
    } catch (e) {
      if (e instanceof Error) {
        exitWithError(`${e.message}`);
      } else {
        console.log('Unexpected error', e);
      }

      return null;
    }
  };
  private async findLintersString() {

    const base = this.context.payload.pull_request?.base.sha;
    const head = this.context.payload.pull_request?.head.sha;
    const octokit = getOctokit(this.authToken);

    const response = await octokit.rest.repos.compareCommits({
      ...context.repo,
      base:base,
      head:head
    });

    const files = response.data.files;
    let check = false;
      
    files?.find(function(file,index){
      if(file.filename.includes("eslint-disable-line") || file.filename.includes("eslint-disable")){
        check=true;
      }
    })

    if(check){
      this.comment()
    }
  }  
  private async comment() {
    const octokit = getOctokit(this.authToken);
    await octokit.rest.issues.createComment({
        issue_number: this.context.issue.number,
        owner: this.context.repo.owner,
        repo: this.context.repo.repo,
        body: 'Pleaes specifiy why did you disabled linters.',
    })
}
}

function exitWithError(errorMessage: string) {
  logError(errorMessage);
  process.exit(1);
}

export default CheckDisabledLinters;