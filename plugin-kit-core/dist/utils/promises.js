//#region src/utils/promises.ts
/**
* Creates a function that ensures a promise takes at least a minimum amount of time to resolve
*
* @param ms - The minimum time in milliseconds that the promise should take
* @returns A function that wraps a promise or promise-returning function
* @example
* ```ts
* const slowFetch = takeAtLeast(1000)(fetch('https://api.example.com'));
* // Will take at least 1 second even if the fetch is faster
* ```
*/
var takeAtLeast = function(ms) {
	/**
	* Wraps a promise or promise-returning function to ensure minimum execution time
	*
	* @param promiseOrFn - A promise or a function that returns a promise
	* @returns A promise that resolves with the original promise's value after at least `ms` milliseconds
	* @throws Will throw if the original promise rejects
	*/
	return function(promiseOrFn) {
		const promise = typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn;
		const delay = new Promise((resolve) => {
			return setTimeout(resolve, ms);
		});
		return Promise.allSettled([promise, delay]).then((results) => {
			const [promiseResult] = results;
			if (promiseResult.status === "rejected") throw promiseResult.reason;
			return promiseResult.value;
		});
	};
};
//#endregion
export { takeAtLeast };

//# sourceMappingURL=promises.js.map