//@flow
export function bindMethods(component: any, ...methodNames: string[]): void{
	methodNames.forEach(
		(methodName: string) => {
			component[methodName] = component[methodName].bind(component);	
		}
	);
}

export function sendMessageOneTime(checkChange: Function, onChange: Function) : Function{
	let lastValue;
	return function(component){
		const changeValue = checkChange(component);
		if(!!changeValue && lastValue !== changeValue){
			lastValue = changeValue;
			onChange(component)
		}
	}
}