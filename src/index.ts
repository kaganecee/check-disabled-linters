import CheckDisabledLinters from './checkDisabledLinters';   

const GITHUB_TOKEN = process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN : "";

const action = new CheckDisabledLinters(GITHUB_TOKEN);

action.run();