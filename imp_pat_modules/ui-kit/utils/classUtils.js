//@flow
export function bindMethods(component: any, ...methodNames: string[]): void{
	methodNames.forEach(
		(methodName: string) => {
			component[methodName] = component[methodName].bind(component);	
		}
	);
}