import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T = {} as T) {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			if (typeof window === 'undefined') return initialValue;
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const setValue = (value: T | ((val: T) => T)): void => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return {storedValue, setValue} as const;
}

export default useLocalStorage;
