export interface Character {
    id: string;
    img: string;
  }
  
  const baseUrl = import.meta.env.VITE_AWS_S3_BASE_URL;
  
  export const characters: Character[] = [
    { id: "cole", img: `${baseUrl}dinos/cole.png` },
    { id: "doux", img: `${baseUrl}dinos/doux.png` },
    { id: "kira", img: `${baseUrl}dinos/kira.png` },
    { id: "kuro", img: `${baseUrl}dinos/kuro.png` },
    { id: "loki", img: `${baseUrl}dinos/loki.png` },
    { id: "mono", img: `${baseUrl}dinos/mono.png` },
    { id: "mort", img: `${baseUrl}dinos/mort.png` },
    { id: "nico", img: `${baseUrl}dinos/nico.png` },
    { id: "olaf", img: `${baseUrl}dinos/olaf.png` },
    { id: "sena", img: `${baseUrl}dinos/sena.png` },
    { id: "tard", img: `${baseUrl}dinos/tard.png` },
    { id: "vita", img: `${baseUrl}dinos/vita.png` },
  ];