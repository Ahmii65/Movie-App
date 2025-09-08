// import { useEffect, useState } from "react";

// const useFetch = <T, A extends any[]>(
//   fetchFunction: (...args: A) => Promise<T>,
//   autofetch = true,
//   initialArgs?: A
// ) => {
//   const [data, setdata] = useState<T | null>(null);
//   const [loading, setloading] = useState<boolean>(false);
//   const [error, setError] = useState<Error | null>(null);

//   const fetchData = async (...args: A) => {
//     try {
//       setloading(true);
//       setError(null);
//       const result = await fetchFunction(...args);
//       setdata(result);
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error("An Error Occurd"));
//     } finally {
//       setloading(false);
//     }
//   };

//   const reset = () => {
//     setdata(null);
//     setloading(false);
//     setError(null);
//   };

//   useEffect(() => {
//     if (autofetch && initialArgs) {
//       fetchData(...initialArgs);
//     }
//   }, []);

//   return { data, loading, error, refetch: fetchData, reset };
// };

// export default useFetch;
