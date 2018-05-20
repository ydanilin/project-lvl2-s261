import buildGitStyleDiffString from './gitstyle';
import buildLogStyleDiffString from './logstyle';
import buildJsonDiffString from './json';

export default {
  git: buildGitStyleDiffString,
  log: buildLogStyleDiffString,
  json: buildJsonDiffString,
};
