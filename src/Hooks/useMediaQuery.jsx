// import { useState, useEffect } from 'react';

// function useMediaQuery(query) {
//     const [matches, setMatches] = useState(false);

//     useEffect(() => {
//         const media = window.matchMedia(query);
//         if (media.matches !== matches) {
//             setMatches(media.matches);
//         }
//         const listener = () => setMatches(media.matches);
//         media.addListener(listener);
//         return () => media.removeListener(listener);
//     }, [matches, query]);

//     return matches;
// }

// export default useMediaQuery;

import { useState, useEffect } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);

    // Atualizar o estado quando houver mudanças
    const listener = (event) => setMatches(event.matches);

    // Usar addEventListener para compatibilidade com navegadores modernos
    media.addEventListener("change", listener);

    // Limpeza ao desmontar o componente
    return () => media.removeEventListener("change", listener);
  }, [query]); // A dependência é apenas o query

  return matches;
}

export default useMediaQuery;
