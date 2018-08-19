import AddonComponent from '../ui/components/AddonComponent/component';
import AddonComponentTemplate from '../ui/components/AddonComponent/template';

export interface Dict<T> {
  [index: string]: T;
}

export default function registerComponents(rootName: string, moduleMap: Dict<any>) {
  moduleMap[`component:/${rootName}/components/AddonComponent`] = AddonComponent;
  moduleMap[`template:/${rootName}/components/AddonComponent`] = AddonComponentTemplate;
}
