export interface TileMapProps {
  tilesetPath: string
  tileSize: number
  mapWidth: number
  mapHeight: number
  tileData: number[]
  scale: number
  wScale: number
  hScale?: number
  color?: string
}
