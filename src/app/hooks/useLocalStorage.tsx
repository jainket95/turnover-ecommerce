import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T = {} as T) {
	const [storedValue, setStoredValue] = useState<T>(getValue(key));

	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === key) {
				setStoredValue(() =>
					event.newValue
						? (JSON.parse(event.newValue) as T)
						: initialValue
				);
			}
		};

		window.addEventListener('storage', handleStorageChange);
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	});

	function getValue(key: string) {
		try {
			if (typeof window === 'undefined') return initialValue;
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	}

	const setValue = (value: T | ((val: T) => T)): void => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(() => valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.log(error);
		}
	};

	const removeValue = (key: string): void => {
		try {
			if (typeof window === 'undefined') return;
			window.localStorage.removeItem(key);
		} catch (error) {
			console.log(error);
		}
	};

	return { storedValue, setValue, removeValue } as const;
}

export default useLocalStorage;
