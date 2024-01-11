import { type Instance, loadInstances } from "./loadInstances";

class InstancesClass {
	initialized = false;
	instances: Instance[] = [];

	async init() {
		this.instances = await loadInstances();
		this.initialized = true;
	}
}

export const Instances = new InstancesClass();
