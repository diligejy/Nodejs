import common from './common';
import local from './local';
import dev from './dev';
import prod from './prod';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const phase = process.env.NODE_ENV;  // ❶ phase에 NODE_ENV값을 저장 

let conf = {}; // ❷ phase의 값에 따라서 적절한 환경 변숫값을 conf에 저장
if (phase === 'local') {
  conf = local;
} else if (phase === 'dev') {
  conf = dev;
} else if (phase === 'prod') {
  conf = prod;
}
const yamlConfig: Record<string, any> = yaml.load(  // ❶ YAML 파일 로딩
  readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf8'), 
);

export default () => ({ // ❸ common과 conf에서 받은 값을 합쳐서 결괏값으로 주는 함수 반환
  ...common,
  ...conf,
  ...yamlConfig, // ❷ 기존 설정의 마지막에 덧붙임 
});
