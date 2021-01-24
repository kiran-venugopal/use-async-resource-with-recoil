# use-async-resource-with-recoil

### Installation

```
 npm i use-async-resource-with-recoil
```


### How to use ?

```javascript
	....
	import useAsyncResourceWithRecoil from  "use-async-resource-with-recoil";
	import React, {Suspense} from ""
	
	//inside the component
	...
	const callOnlyOnFetchAgain = false 
	const {
		dataReader,
		data,
		fetchAgain,
		dataSetter
			} = useAsyncResourceWithRecoil(
				apiFunction,
				argumentsOfapiFunction,
				recoilAtom,
				callOnlyOnFetchAgain
			)

	//inside the jsx
	....
	<Suspense fallback="Loading data..">
		<Data dataReader={dataReader} />
	</Suspense>

	//inside <Data /> Component
	...
	function Data({dataReader}){
		const data = dataReader()
		return (
			<>
				data.map(d => <div key={d.id}> {d.value} </div>)
			</>
		)
	}
```

### Arguments 
The `useAsyncResourceWithRecoil` hook accepts the following arguments:

| Name  | Type | Description  |  Default Value | Required|
|--|--|--|--|--|
| apiFunction | `Function` | Accepts an asynchronous function to call backend API |  | `Yes` |
| argumentsOfapiFunction | `Array` | Accepts an array of arguments for `apiFunction` <br> <br> eg: apiFunction(arg1, arg2, arg3) given as `[arg1, arg2, arg3]` |  | `Yes` |
| recoilAtom | `RecoilState` | Accepts a RecoilState that created using atom() from [recoil](https://recoiljs.org/) |  | `Yes` |
| callOnlyOnFetchAgain | `Boolean` | if it is given as `true` then the `apiFunction` won't execute during the initialization and only executed on calling `fetchAgain`   | `false`| `No` |


### Results
After being called, the `useAsyncResourceWithRecoil` hook returns a result object with the following properties.

| Name  | Type | Description  |  
|--|--|--|
| dataReader | `Function` | invoke this function get the API results 
| fetchAgain | `Function` | invoke this function to get results the API function again on dataReader()
| data | `RecoilStateValue` | value of the RecoilState or Recoil Atom
| setData | `Function` | A function to set the value of RecoilState  



### Example app

 [Example 1](https://stackblitz.com/edit/react-egkuwl?file=src/recoilAtoms.js/) 
